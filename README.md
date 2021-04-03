## Obsidian Wakatime Plugin

This plugin is intended to integrate with wakatime's api to track your vaults time spent.

Some basic features:
- [ ] Continously tracks time spent in current vault.
- [ ] Send beat to wakatime for all changes to the current vault plugin is installed in.
- [x] Adds a plugin setting tab to the settings page.
- [x] Update API key of wakatime
- [x] Provide shortcut link to wakatime dashboard

---
https://wakatime.com/help/creating-plugin#plugin-overview

This is a high-level overview of a WakaTime plugin from the time it's loaded, until the editor is exited.

    Plugin loaded by text editor/IDE, runs plugin's initialization code
    Initialization code
        Setup any global variables, like plugin version, editor/IDE version
        Check for wakatime-cli, download into plugin directory if does not exist
        Check for python, download and install if does not exist (Windows only)
        Check for api key, prompt user to enter if does not exist
        Setup event listeners to detect when current file changes, a file is modified, and a file is saved
    Current file changed (our file change event listener code is run)
        go to Send heartbeat function with isWrite false
    User types in a file (our file modified event listener code is run)
        go to Send heartbeat function with isWrite false
    A file is saved (our file save event listener code is run)
        go to Send heartbeat function with isWrite true
    Send heartbeat function
        check lastHeartbeat variable. if isWrite is false, and file has not changed since last heartbeat, and less than 2 minutes since last heartbeat, then return and do nothing
        run wakatime-cli in background process passing it the current file
        update lastHeartbeat variable with current file and current time


---

### References:
- https://wakatime.com/help/creating-plugin#getting-started
- https://github.com/obsidianmd/obsidian-api
- https://github.com/wakatime/vscode-wakatime

### Development help

Quick starting guide for new plugin devs:

- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.

### Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments.
- Publish the release.

### Adding your plugin to the community plugin list

- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.

### How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

### Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

### Commiting code

Use commitizen to commit code. 

```bash
npx cz OR npm run cz
```

### API Documentation

See https://github.com/obsidianmd/obsidian-api
