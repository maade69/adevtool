import path from 'path'
import fetch from 'node-fetch'

import { CarrierSettingsConfig } from '../proto-ts/vendor/adevtool/assets/carrier_settings_config'
import { exists, listFilesRecursive } from '../util/fs'
import assert from 'assert'
import { createWriteStream, promises as fs } from 'fs'
import { promises as stream } from 'stream'
import { run } from '../util/process'
import { OS_CHECKOUT_DIR } from '../config/paths'

const PROTO_PATH = `${OS_CHECKOUT_DIR}/packages/apps/CarrierConfig2/src/com/google/carrier`

export async function parseUpdateConfig(uc: string) {
  let result = new Map<string, string>()
  if (await exists(uc)) {
    const decodedCfg = CarrierSettingsConfig.decode(await fs.readFile(uc)).config
    Object.keys(decodedCfg).forEach(key => {
      result.set(key, decodedCfg[key])
    })
  }
  return result
}

export async function downloadAllConfigs(
  config: Map<string, string>,
  outDir: string,
  debug: boolean,
  genaration: string,
) {
  let clBaseUrl: string
  let csBaseUrl: string
  if (config.has('carrier_list_url')) {
    clBaseUrl = config.get('carrier_list_url') as string
  } else {
    clBaseUrl = ''
  }
  if (config.has('carrier_settings_url')) {
    csBaseUrl = config.get('carrier_settings_url') as string
  } else {
    csBaseUrl = ''
  }
  for (let [carrier, version] of config) {
    if (carrier === 'carrier_list_url' || carrier === 'carrier_settings_url') {
      continue
    }
    let url: string
    if (carrier === 'carrier_list') {
      url = clBaseUrl.replace(/%d/g, version)
    } else {
      if (genaration !== 'pixel2019') {
        url = csBaseUrl.replace(/%2\$s/i, carrier).replace(/%3\$d/i, version)
      } else {
        url = csBaseUrl.replace(/%s/i, genaration).replace(/%s/i, carrier).replace(/%d/i, version)
      }
    }
    if (debug) console.log(url)
    if (typeof genaration !== 'undefined') {
      if (!url.includes(genaration)) {
        throw new Error(`carrier_settings_url doesnt match with provided generation (${genaration})`)
      }
    }
    let tmpOutFile = path.join(outDir, `${carrier}.pb` + '.tmp')
    let outFile = path.join(outDir, `${carrier}.pb`)
    if (!(await exists(outDir))) await fs.mkdir(outDir, { recursive: true })
    await fs.rm(tmpOutFile, { force: true })
    let resp = await fetch(url)
    assert(resp.ok)
    await stream.pipeline(resp.body!, createWriteStream(tmpOutFile))
    await fs.rename(tmpOutFile, outFile)
    if (debug) console.log(`Downloaded ${carrier}-${version} to ${outFile}`)
  }
}

export async function decodeConfigs(cfgPath: string, outDir: string) {
  if (await exists(cfgPath)) {
    for await (let file of listFilesRecursive(cfgPath)) {
      if (path.extname(file) != '.pb') {
        continue
      }
      const filename = path.parse(file).name
      let decoded
      switch (filename) {
        case 'others':
          decoded = await run(
            `protoc --decode com.google.carrier.MultiCarrierSettings ${PROTO_PATH}/carrier_settings.proto --proto_path ${PROTO_PATH} < ${file}`,
          )
          break
        case 'carrier_list':
          decoded = await run(
            `protoc --decode com.google.carrier.CarrierList ${PROTO_PATH}/carrier_list.proto --proto_path ${PROTO_PATH} < ${file}`,
          )
          break
        default:
          decoded = await run(
            `protoc --decode com.google.carrier.CarrierSettings ${PROTO_PATH}/carrier_settings.proto --proto_path ${PROTO_PATH} < ${file}`,
          )
          break
      }
      const outFile = path.join(outDir, `${filename}`)
      if (!(await exists(outDir))) await fs.mkdir(outDir, { recursive: true })
      await fs.writeFile(outFile, decoded)
    }
  }
}
