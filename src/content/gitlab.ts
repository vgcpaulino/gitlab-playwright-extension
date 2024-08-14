import { getProjects } from "./storage";
import { log } from "./logger";
import { Job, Pipeline } from "../interfaces";

interface GetLastJobProperties {
  gitLabHost: string;
  gitLabProjectId: string;
  mergeRequestId: string;
  jobName: string;
}

async function fetchBody({ gitLabHost, endpoint }: { gitLabHost?: string, endpoint: string }) {
  const host = gitLabHost || 'https://gitlab.com';
  const response = await fetch(`${host}/api/v4${endpoint}`);
  return await response.json();
};

export async function getLastJobInfo({ gitLabHost, gitLabProjectId, mergeRequestId, jobName }: GetLastJobProperties) {
  const pipelines: Pipeline[] = await fetchBody({ gitLabHost, endpoint:
    `/projects/${gitLabProjectId}/merge_requests/${mergeRequestId}/pipelines`
  });
  const lastPipelineId = pipelines[0].id;
  log.info(`GitLab - LAST PIPELINE ID: ${lastPipelineId}`);

  const jobs: Job[] = await fetchBody({ gitLabHost, endpoint:
    `/projects/${gitLabProjectId}/pipelines/${lastPipelineId}/jobs?per_page=100`
  });
  log.info(`GitLab - JOBS: ${JSON.stringify(jobs)}`);

  const lastJob = jobs.find((job: Job) => job.stage.toLowerCase() === "test" && job.name.toLowerCase() === jobName.toLocaleLowerCase());
  if (!lastJob) {
    log.error('GitLab - LAST JOB NOT FOUND!');
  }

  log.info(`GitLab - LAST JOB: ${lastJob}`);
  return {
    id: lastJob?.id,
    url: lastJob?.web_url,
  };
};

export async function getMergeRequestInfo() {
  const gitLabProjects = await getProjects();
  log.info("Setup - Projects" + JSON.stringify(gitLabProjects));
  const setupProjectNames = gitLabProjects.map((project: any) => project.name);

  const { protocol, hostname, pathname } = window.location;
  const urlParts = pathname.split("/");
  const projectName = urlParts.find((part) => setupProjectNames.includes(part));
  const projectSetup = gitLabProjects.find(
    (project: any) => project.name == projectName
  );

  const result = {
    gitLabHost: `${protocol}//${hostname}`, 
    projectName: projectName?.trim() || '',
    projectId: projectSetup?.projectId || '',
    artifactUrlPattern: projectSetup?.artifactUrl || '',
    jobName: projectSetup?.jobName || '',
    mergeRequestId: urlParts[urlParts.indexOf('merge_requests') + 1],
  };

  log.info(`GitLab - PROJECT FOUND: ${JSON.stringify(result)}`);

  return result;
};


