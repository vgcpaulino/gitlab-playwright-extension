document.addEventListener("DOMContentLoaded", function () {
  const projectForm = document.getElementById("projectForm") as HTMLFormElement;
  const projectList = document.getElementById("projectList") as HTMLFormElement;
  const logToggle = document.getElementById("logToggle") as HTMLInputElement;

  loadProjects();
  loadLogToggle();

  if (projectForm) {
    projectForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = (document.getElementById("name") as HTMLInputElement).value;
      const projectId = (document.getElementById("projectId") as HTMLInputElement).value;
      const jobName = (document.getElementById("jobName") as HTMLInputElement).value;
      const artifactUrl = (document.getElementById("artifactUrl") as HTMLInputElement).value;

      addProject(name, projectId, jobName, artifactUrl);
    });

  }

  if (logToggle) {
    logToggle.addEventListener("change", function () {
      const isChecked = logToggle.checked;
      chrome.storage.sync.set({ enableLogs: isChecked }, function () {
        if (chrome.runtime.lastError) {
          console.error(
            "Error saving log toggle state:",
            chrome.runtime.lastError
          );
        } else {
          console.log("Log toggle state saved:", isChecked);
        }
      });
    });

  }

  function addProject(name: string, projectId: string, jobName: string, artifactUrl: string) {
    chrome.storage.sync.get({ projects: [] }, function (data) {
      const projects = data.projects;
      const newProject = { name, projectId, jobName, artifactUrl };
      projects.push(newProject);

      chrome.storage.sync.set({ projects }, function () {
        addProjectToList(newProject);
        projectForm.reset();
      });
    });
  }

  function addProjectToList(project: any) {
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";
    projectItem.innerHTML = `
        <div>
          <strong>Name:</strong> ${project.name}<br>
          <strong>Project ID:</strong> ${project.projectId}<br>
          <strong>Job Name:</strong> ${project.jobName}<br>
          <strong>Artifact URL:</strong> <a href="${project.artifactUrl}" target="_blank">${project.artifactUrl}</a>
        </div>
        <button class="remove-button">Remove</button>
      `;
    projectItem.setAttribute('data-testid', 'project-item');


    const projectItemRemoveBtn = projectItem.querySelector(".remove-button") as HTMLElement;
    projectItemRemoveBtn.addEventListener("click", function () {
      removeProject(project, projectItem);
    });

    projectList.appendChild(projectItem);


  }

  function removeProject(project: any, projectItem: any) {
    chrome.storage.sync.get({ projects: [] }, function (data) {
      let projects = data.projects;
      projects = projects.filter((p: any) => p.projectId !== project.projectId);

      chrome.storage.sync.set({ projects }, function () {
        projectList.removeChild(projectItem);
      });
    });
  }

  function loadProjects() {
    chrome.storage.sync.get({ projects: [] }, function (data) {
      const projects = data.projects;
      projects.forEach(addProjectToList);
    });
  }

  function loadLogToggle() {
    chrome.storage.sync.get({ enableLogs: false }, function (data) {
      logToggle.checked = data.enableLogs;
    });
  }
});
