import { Command, flags } from '@oclif/command'
import path from 'path'

import { DEVICE_CONFIG_FLAGS } from '../config/device'
import { CARRIER_SETTINGS_DIR } from '../config/paths'
import { parseUpdateConfig, downloadAllConfigs, decodeConfigs } from '../blobs/carrier'

export default class DownloadCarrierSettings extends Command {
  static description = 'download carrier protobuf configs with a provided __update_config.'

  static flags = {
    ucPath: flags.string({
      char: 'c',
      description: 'path to update_config.pb',
      required: true,
    }),
    out: flags.string({
      char: 'o',
      description: 'out dir.',
      default: CARRIER_SETTINGS_DIR,
    }),
    generation: flags.string({
      char: 'g',
      description: 'generation of pixel device',
      required: true,
    }),
    debug: flags.boolean({
      char: 'd',
      description: 'debug output.',
      default: false,
    }),
    ...DEVICE_CONFIG_FLAGS,
  }

  async run() {
    let { flags } = this.parse(DownloadCarrierSettings)
    const config = await parseUpdateConfig(flags.ucPath)
    const outDir = path.join(flags.out, flags.generation)
    await downloadAllConfigs(config, outDir, flags.debug, flags.generation)
    await decodeConfigs(outDir, path.join(outDir, 'decoded'))
  }
}
