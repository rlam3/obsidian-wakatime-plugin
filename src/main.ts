import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'
import os from 'os'
import path from 'path'
import request from 'request'

// import { Dependencies } from 'dependencies';
// import { COMMAND_DASHBOARD, LogLevel } from './constants';
// import { Options } from './options';
// import { Logger } from './logger';
// import { Libs } from './libs';

interface WakatimePluginSettings {
  wakaTimeAPIKey: string
}

const DEFAULT_WAKATIME_SETTINGS: WakatimePluginSettings = {
  wakaTimeAPIKey: ''
}
export default class WakatimePlugin extends Plugin {
  settings: WakatimePluginSettings;

  async onload() {

    await this.loadSettings()

    this.initializeWakatime()

    // This adds an icon on the left sidebar
    // this.addRibbonIcon('dice', 'Sample Plugin', () => {
    //   new Notice('This is a notice!');
    // });

    // This adds a label at the statusbar at the bottom of the screen.
    // this.addStatusBarItem().setText('Status Bar Text');

    // This adds a modal when you do command + p
    this.addCommand({
      id: 'open-wakatime-dashboard',
      name: 'Open Wakatime Dashboard',
      callback: () => {
        console.log('Simple Callback')
      },
      checkCallback: (checking: boolean) => {
        const leaf = this.app.workspace.activeLeaf
        if (leaf) {
          if (!checking) {
            window.open('http://www.wakatime.com/dashboard')
          }
          return true
        }
        return false
      }
    })

    this.addSettingTab(new WakatimeSettingTab(this.app, this))

    this.registerCodeMirror((cm: CodeMirror.Editor) => {
      console.log('codemirror', cm)
    })

    // This registers click anywhere on the screen of obsidian
    // this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
    //   console.log('click', evt);
    // });

    this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000))
  }

  onunload(): void {
    console.log('unloading plugin')
  }

  async loadSettings() {
    console.info('Initializing WakaTime plugin...')
    this.settings = Object.assign({}, DEFAULT_WAKATIME_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    console.info('Saving Wakatime settings...')
    await this.saveData(this.settings)
  }


  initializeWakatime() {
    // Setup any global variables, like plugin version, editor/IDE version
    // Check for wakatime-cli, download into plugin directory if does not exist
    // Check for python, download and install if does not exist (Windows only)
    // Check for api key, prompt user to enter if does not exist
    // Setup event listeners to detect when current file changes, a file is modified, and a file is saved
    console.log('testing...')
    this.checkCLI()
  }

  setupGlobalVariables(): void {
    console.log('setup global variables')
  }

  checkCLI(): void {
    // If CLI is not installed
    if (! this.isCLIInstalled()) {
      this.installCLI()
    }
  }

  isCLIInstalled(): boolean {
    console.log('is cli installed?..')
    return false
  }


  architecture() :string {
    if (os.arch().indexOf('32') > -1) {
      return '32'
    }
    return '64'
  }
  

  s3BucketUrl(): string {
    const prefix = 'https://wakatime-cli.s3-us-west-2.amazonaws.com/'
    const p = process.platform

    switch (p) {
    case 'darwin':
      return prefix + 'mac-x86-64/'
    case 'win32':
      return prefix + 'windows-x86-' + this.architecture() + '/'
    default:
      return prefix + 'linux-x86-64/'  
    }
      
  }


  installCLI(): void {
    console.log('install wakatime-cli')
    console.debug('Downloading wakatime-cli')

    const url: string = this.s3BucketUrl() + 'wakatime-cli.zip'
    
    console.log('installing wakatime-cli from .... %s', url)
    const zipFile: string = path.join(__dirname, 'wakatime-cli.zip')
    console.debug(zipFile)
		

  }
	
  downloadFile(): void{
		
  }


}


class SampleModal extends Modal {
  constructor(app: App) {
    super(app)
  }

  onOpen() {
    const {contentEl} = this
    contentEl.setText('Starting up WakatimePlugin...!')
  }

  onClose() {
    const {contentEl} = this
    contentEl.empty()
  }
}

class WakatimeSettingTab extends PluginSettingTab {
  plugin: WakatimePlugin;

  constructor(app: App, plugin: WakatimePlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const {containerEl} = this
    const plugin: WakatimePlugin = (this as any).plugin
    containerEl.empty()

    containerEl.createEl('h2', { text: 'Settings for Wakatime' })
    containerEl.createEl('a',
      {
        text: 'Wakatime',
        href: 'https://wakatime.com/'
      })

    // new Setting(containerEl)
    //   .setName("Set Custom Vault Name")
    //   .setDesc(
    //     "Change the vault name shown publicly. Leave blank to use your actual vault name."
    //   )
    //   .addText((text) =>
    //     text.setValue(plugin.settings.customVaultName).onChange((value) => {
    //       plugin.settings.customVaultName = value;
    //       plugin.saveData(plugin.settings);

    //       plugin.setActivity(
    //         this.app.vault.getName(),
    //         plugin.currentFile.basename,
    //         plugin.currentFile.extension
    //       );
    //     })
    //   );

    new Setting(containerEl)
      .setName('Wakatime API Key')
      .setDesc('You may find the key here: https://wakatime.com/settings/api-key')
      .addText(text => text
      // .setPlaceholder('Enter your secret')
        .setValue(plugin.settings.wakaTimeAPIKey)
        .onChange(async (value) => {
          console.log('Wakatime API Key: ' + value)
          this.plugin.settings.wakaTimeAPIKey = value
          this.plugin.saveData(this.plugin.settings)
        }))
  }
}
