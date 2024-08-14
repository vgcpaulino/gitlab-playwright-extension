import { ExtensionProjects } from "../interfaces";

export async function getLogToggleState() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ enableLogs: false }, function (data) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(data.enableLogs);
    });
  });
}



export async function getProjects(): Promise<ExtensionProjects[] | []> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get({ projects: [] }, function (data) {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(data.projects);
    });
  });
}
