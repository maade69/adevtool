import path from 'path'
import fetch from 'node-fetch'
import os from 'os'

import { Response } from '../proto-ts/vendor/adevtool/assets/response'
import { Request } from '../proto-ts/vendor/adevtool/assets/request'
import { exists, listFilesRecursive, TMP_PREFIX } from '../util/fs'
import assert from 'assert'
import { createWriteStream, promises as fs } from 'fs'
import { promises as stream } from 'stream'
import { run } from '../util/process'
import { OS_CHECKOUT_DIR } from '../config/paths'

const PROTO_PATH = `${OS_CHECKOUT_DIR}/packages/apps/CarrierConfig2/src/com/google/carrier`

function getRandom(): string {
  return `${Math.random()}`.slice(2, 10)
}

export async function fetchUpdateConfig(
  device: string,
  build_id: string,
  debug: boolean,
): Promise<Map<string, string>> {
  const requestData: Request = {
    field1: {
      info: {
        int: 4,
        deviceInfo: {
          apilevel: 34,
          name: device,
          buildId: build_id,
          name1: device,
          name2: device,
          locale1: 'en',
          locale2: 'US',
          manufacturer1: 'Google',
          manufacturer2: 'google',
          name3: device,
        },
      },
    },
    field2: {
      info: {
        pkgname: 'com.google.android.carrier',
      },
    },
  }
  const tmp = os.tmpdir()
  const tmpdir = `${tmp}/${TMP_PREFIX}${getRandom()}`
  if (debug) console.log(`tmpdir: ${tmpdir}`)
  fs.mkdir(tmpdir, { recursive: true })
  const outFile = path.join(tmpdir, getRandom())
  if (debug) console.log(`outFile: ${outFile}`)
  await fs.writeFile(outFile, JSON.stringify(Request.toJSON(requestData)))
  const encodedRequest = Request.encode(requestData).finish()
  const reqFile = path.join(tmpdir, getRandom())
  await fs.writeFile(reqFile, encodedRequest)
  if (debug) console.log(`reqFile: ${reqFile}`)
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-protobuf',
    },
    body: encodedRequest,
  }
  const response = await fetch(
    'https://www.googleapis.com/experimentsandconfigs/v1/getExperimentsAndConfigs?r=6&c=1',
    options,
  )
  assert(response.ok)
  const tmpOutFile = path.join(tmpdir, getRandom())
  if (debug) console.log(`tmpOutFile: ${tmpOutFile}`)
  await stream.pipeline(response.body, createWriteStream(tmpOutFile))
  let result = new Map<string, string>()
  const decodedResopnse = Response.decode(await fs.readFile(tmpOutFile)).field1!.settings!.cfg!
  fs.rm(tmpdir, { recursive: true })
  decodedResopnse.forEach(cfg => {
    if (cfg.name === 'CarrierSettings__update_config') {
      const updateConfig = cfg!.unk1!.n!.entry!
      Object.keys(updateConfig).forEach(key => {
        result.set(key, updateConfig[key])
      })
    }
  })
  return result
}

export async function downloadAllConfigs(
  config: Map<string, string>,
  outDir: string,
  debug: boolean,
  genaration: string,
) {
  //let build_id = flags.prevBuildId ? config.device.prev_build_id : config.device.build_id
  const clBaseUrl = config.has('carrier_list_url') ? (config.get('carrier_list_url') as string) : ''
  const csBaseUrl = config.has('carrier_settings_url') ? (config.get('carrier_settings_url') as string) : ''
  await fs.rm(outDir, { force: true, recursive: true })
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
    if (!url.includes(genaration)) {
      throw new Error(`carrier_settings_url doesnt match with provided generation (${genaration})`)
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
