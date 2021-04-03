import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface WakatimePluginSettings {
	wakaTimeAPIKey: string;
}

const DEFAULT_WAKATIME_SETTINGS: WakatimePluginSettings = {
	wakaTimeAPIKey: ''
}
export default class WakatimePlugin extends Plugin {
	settings: WakatimePluginSettings;

	async onload() {

		await this.loadSettings();

		this.initializeWakatime();

		// This adds an icon on the left sidebar
		// this.addRibbonIcon('dice', 'Sample Plugin', () => {
		// 	new Notice('This is a notice!');
		// });

		// This adds a label at the statusbar at the bottom of the screen.
		// this.addStatusBarItem().setText('Status Bar Text');

		// This adds a modal when you do command + p
		this.addCommand({
			id: 'open-wakatime-dashboard',
			name: 'Open Wakatime Dashboard',
			callback: () => {
				console.log('Simple Callback');
			},
			checkCallback: (checking: boolean) => {
				let leaf = this.app.workspace.activeLeaf;
				if (leaf) {
					if (!checking) {
						window.open('http://www.wakatime.com/dashboard')
					}
					return true;
				}
				return false;
			}
		});

		this.addSettingTab(new SampleSettingTab(this.app, this));

		this.registerCodeMirror((cm: CodeMirror.Editor) => {
			console.log('codemirror', cm);
		});

		// This registers click anywhere on the screen of obsidian
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		console.info('Initializing WakaTime plugin...');
		this.settings = Object.assign({}, DEFAULT_WAKATIME_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		console.info('Saving Wakatime settings...');
		await this.saveData(this.settings);
	}


	initializeWakatime() {
		// Setup any global variables, like plugin version, editor/IDE version
    // Check for wakatime-cli, download into plugin directory if does not exist
    // Check for python, download and install if does not exist (Windows only)
    // Check for api key, prompt user to enter if does not exist
    // Setup event listeners to detect when current file changes, a file is modified, and a file is saved
		console.log('testing...')
	}

	setupGlobalVariables() {
		
	}


}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Starting up WakatimePlugin...!');
	}

	onClose() {
		let {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: WakatimePlugin;

	constructor(app: App, plugin: WakatimePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;
		const plugin: WakatimePlugin = (this as any).plugin;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for Wakatime' });
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
					console.log('Wakatime API Key: ' + value);
					this.plugin.settings.wakaTimeAPIKey = value;
					this.plugin.saveData(this.plugin.settings);
				}));
	}
}
