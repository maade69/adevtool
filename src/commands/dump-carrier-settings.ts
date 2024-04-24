import { Command, flags } from '@oclif/command'
import path from 'path'

import { DEVICE_CONFIG_FLAGS, loadDeviceConfigs, getDeviceBuildId } from '../config/device'
import { decodeConfigs } from '../blobs/carrier'
import { forEachDevice } from '../frontend/devices'
import { loadBuildIndex, BuildIndex } from '../images/build-index'
import { prepareFactoryImages } from '../frontend/source'
import { assert } from 'console'
import { exists } from '../util/fs'
import { VENDOR_MODULE_SKELS_DIR } from '../config/paths'

export default class DumpCarrierSettings extends Command {
  static description = 'generate protoc dumps of configs from factory image.'

  static flags = {
    buildId: flags.string({
      description: 'specify build ID',
      char: 'b',
    }),
    ...DEVICE_CONFIG_FLAGS,
  }

  async run() {
    let { flags } = this.parse(DumpCarrierSettings)
    let index: BuildIndex = await loadBuildIndex()
    let devices = await loadDeviceConfigs(flags.devices)
    await forEachDevice(
      devices,
      false,
      async config => {
        // skip tangorpro due to lack of mobile connectivity
        if (config.device.name !== 'tangorpro') {
          const build_id = flags.buildId !== undefined ? flags.buildId : config.device.build_id
          const images = await prepareFactoryImages(index, [config], [build_id])
          const deviceImages = images.get(getDeviceBuildId(config, build_id))!
          const stockCsPath = path.join(deviceImages.unpackedFactoryImageDir, 'product/etc/CarrierSettings')
          const outDir = path.join(
            VENDOR_MODULE_SKELS_DIR,
            config.device.vendor,
            config.device.name,
            'proprietary/product/etc/CarrierSettings',
          )
          assert(await exists(stockCsPath))
          await decodeConfigs(stockCsPath, outDir)
        } else {
          this.log('tangorpro is not supported due to lack of mobile connectivity')
        }
      },
      config => `${config.device.name} ${flags.buildId !== undefined ? flags.buildId : config.device.build_id}`,
    )
  }
}
