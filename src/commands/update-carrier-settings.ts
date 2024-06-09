import { Command, flags } from '@oclif/command'
import path from 'path'
import hasha from 'hasha'
import { promises as fs } from 'fs'

import { DEVICE_CONFIG_FLAGS, loadDeviceConfigs } from '../config/device'
import { CARRIER_SETTINGS_DIR, VENDOR_MODULE_SPECS_DIR } from '../config/paths'
import { downloadAllConfigs, decodeConfigs, fetchUpdateConfig } from '../blobs/carrier'
import { forEachDevice } from '../frontend/devices'
import { parseFileTreeSpecYaml, FileTreeSpec, fileTreeSpecToYaml } from '../util/file-tree-spec'
import { readFile, exists, listFilesRecursive } from '../util/fs'

export default class UpdateCarrierSettings extends Command {
  static description = 'download updated carrier protobuf configs.'

  static flags = {
    out: flags.string({
      char: 'o',
      description: 'out dir.',
      default: CARRIER_SETTINGS_DIR,
    }),
    generateDumps: flags.boolean({
      char: 'g',
      description: `generate protoc dumps of downlaoded configs`,
      default: false,
    }),
    debug: flags.boolean({
      description: 'debug output.',
      default: false,
    }),
    buildId: flags.string({
      description: 'specify build ID',
      char: 'b',
    }),
    updateSpec: flags.boolean({
      description: 'udpate spec with sha256 checksum of new config files',
      default: false,
    }),
    ...DEVICE_CONFIG_FLAGS,
  }

  async run() {
    let { flags } = this.parse(UpdateCarrierSettings)
    let devices = await loadDeviceConfigs(flags.devices)
    await forEachDevice(
      devices,
      false,
      async config => {
        // skip tangorpro due to lack of mobile connectivity
        if (config.device.mobile) {
          const buildId = flags.buildId !== undefined ? flags.buildId : config.device.build_id
          const outDir = path.join(flags.out, config.device.name)
          const updateConfig = await fetchUpdateConfig(config.device.name, buildId, flags.debug)
          if (flags.debug) console.log(updateConfig)
          await downloadAllConfigs(updateConfig, outDir, flags.debug)
          if (flags.updateSpec && (await exists(outDir))) {
            const specFile = path.join(VENDOR_MODULE_SPECS_DIR, config.device.vendor, `${config.device.name}.yml`)
            let spec: FileTreeSpec = parseFileTreeSpecYaml(await readFile(specFile))
            for await (let file of listFilesRecursive(outDir)) {
              if (path.extname(file) != '.pb') {
                continue
              }
              const filename = path.parse(file).base
              const hash = await hasha.fromFile(file, { algorithm: 'sha256' })
              spec.set(`proprietary/product/etc/CarrierSettings/${filename}`, hash)
            }
            await fs.writeFile(specFile, fileTreeSpecToYaml(spec))
          }
          if (flags.generateDumps && (await exists(outDir))) await decodeConfigs(outDir, path.join(outDir, 'decoded'))
        } else {
          this.log(`${config.device.name} is not supported due to lack of mobile connectivity`)
        }
      },
      config => `${config.device.name} ${flags.buildId !== undefined ? flags.buildId : config.device.build_id}`,
    )
  }
}
