import {
  getContainerElement,
  getMainBtnElement,
  getOptionButton,
} from "./elements";
import { getLogToggleState, getProjects } from "./storage";
import { log, setLogState } from "./logger";
import { getLastJobInfo, getMergeRequestInfo } from "./gitlab";

window.onload = async function () {
  const logEnabled = await getLogToggleState();
  setLogState(logEnabled);
  await createButton();
};

async function createButton() {
  const gitLabProjects = await getProjects();
  if (!gitLabProjects || gitLabProjects.length === 0) {
    log.warning('No project is configured, so please add your GitLab projects to the Extension Setup.');
    return;
  }

  try {
    const { gitLabHost, projectId, jobName, artifactUrlPattern, mergeRequestId } = await getMergeRequestInfo();
    log.info(`GitLab - PROJECT ID: ${projectId}`);
    const { id: lastJobId, url: lastJobUrl } = await getLastJobInfo({
      gitLabHost,
      gitLabProjectId: projectId,
      mergeRequestId,
      jobName
    });
    if (!lastJobId || !lastJobUrl) {
      log.error('Last jobID or lastJobUrl was not found.');
      return;
    }

    const lastReportUrl = artifactUrlPattern.replace("${jobId}", lastJobId.toString());
    log.info(`GitLab - LAST REPORT URL: ${lastReportUrl}`);

    const gitLabContainer = document.querySelector(
      ".detail-page-header-actions"
    );
    if (gitLabContainer) {
      const extensionContainer = getContainerElement();
      const optionsBtn = getOptionButton(lastJobUrl);
      const mainButton = getMainBtnElement(lastReportUrl);

      extensionContainer.appendChild(mainButton);
      extensionContainer.appendChild(optionsBtn);
      gitLabContainer.prepend(extensionContainer);
    } else {
      log.error('The gitLabContainer was not found!');
    }
  } catch (error: any) {
    console.error(`Error: ${error?.message}`);
  }
};

