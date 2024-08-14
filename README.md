# Gitlab Playwright Extension

## About
This project contains a Chrome Extension to be used with GitLab and Playwright. 

When integrating Playwright on GitLab pipelines, we must navigate several components and links to access the HTML report (or archived asset) and execution logs. This extension creates two buttons on the Merge Request page next to the `Edit` and `Code` buttons for quick visual access.

The Chrome Extension is currently not available on [Chrome Web Store](https://chromewebstore.google.com/?hl=en), but can be downloaded and installed manually (check the details [here](#how-to-manually-install)).

## Current Features:
- Multiple GitLab Projects
- Last Report
- Last Execution 

## How to Manually Install:
You can manually install the Chrome Extension after enabling the developer mode and loading the content, as described in the ["Load an unpacked extension"](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked) page.

The [releases](https://github.com/vgcpaulino/gitlab-playwright-extension/tree/main/releases) folder contains zip files you can download, extract the content and them load as described in the above page. Or if you prefer build the extension locally.

## Built With:
- [NodeJS](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [WebPack](https://webpack.js.org/)
- [Express](https://expressjs.com/)
- [Playwright](https://playwright.dev/)

## How to Build the Chrome Extension:
As the source code is mainly in TypeScript and divided into different modules, the following command will generate and copy all the required assets to the Chrome Extension to work:  
```sh 
npm run build
```

The output dir is `./dist`.

Or if you need to run in the environment:
``` sh npm run build:dev ```
 