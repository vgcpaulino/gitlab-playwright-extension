export const getContainerElement = () => {
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("data-testid", "gitlab-playwright-container");
  buttonContainer.style.display = "flex";
  buttonContainer.style.marginRight = "8px";
  return buttonContainer;
};

export function getMainBtnElement(lastReportUrl: string) {
  let element = document.createElement("button");
  element.setAttribute("data-testid", "gitlab-playwright-button");
  element.textContent = "Playwright Report";

  const gitLabEditMRBtn = document.querySelector(
    'a[data-testid="edit-title-button"]'
  ) as HTMLElement;
  element.className = gitLabEditMRBtn.className;
  element.style.paddingLeft = "40px";
  element.style.marginRight = "8px";
  const logoUrl = chrome.runtime.getURL("/images/playwright-logo.svg");
  element.style.backgroundImage = `url(${logoUrl})`;
  element.style.backgroundSize = "30px";
  element.style.backgroundRepeat = "no-repeat";
  element.style.backgroundPosition = "8px center";

  element.addEventListener("click", () => {
    window.open(lastReportUrl, "_blank");
  });

  return element;
};

export function getOptionButton(lastJobUrl: string) {
  let div = document.createElement("div");
  const gitLabToggleDiv = document.querySelector(
    'div[data-testid="dropdown-toggle"]'
  );
  if (gitLabToggleDiv) {
    div.className = gitLabToggleDiv.className;
  }

  const button = document.createElement("button");
  button.setAttribute("data-testid", "gitlab-playwright-opt-btn");
  const gitLabToggleBtn = document.querySelector(
    'button[data-testid="mr-code-dropdown"]'
  );
  if (gitLabToggleBtn) {
    button.className = gitLabToggleBtn.className;
  }
  button.textContent = ":";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const dropdownDiv = div.querySelector(".dropdown-menu") as HTMLElement;
    if (dropdownDiv) {
      const rect = button.getBoundingClientRect();
      dropdownDiv.classList.toggle("show");
      const rectDiv = dropdownDiv.getBoundingClientRect();
      dropdownMenu.classList.remove("show");
      dropdownDiv.style.left = `${rect.right - rectDiv.width + 4}px`;
      dropdownDiv.style.top = `${rect.bottom}px`;
      dropdownDiv.classList.toggle("show");
    }
  });

  const dropdownMenu = document.createElement("div");
  dropdownMenu.className = "dropdown-menu";

  const lastPipelineLog = document.createElement("a");
  lastPipelineLog.setAttribute("data-testid", "gitlab-playwright-last-log-btn");
  lastPipelineLog.className = "dropdown-item";
  lastPipelineLog.textContent = "Last Pipeline Log";
  lastPipelineLog.href = lastJobUrl;
  lastPipelineLog.target = "_blank";
  lastPipelineLog.addEventListener("click", (event) => {
    dropdownMenu.classList.remove("show");
  });

  dropdownMenu.appendChild(lastPipelineLog);
  div.appendChild(button);
  div.appendChild(dropdownMenu);

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as Node;

    if (target && !div.contains(target)) {
      dropdownMenu.classList.remove("show");
    }
  });

  return div;
};
