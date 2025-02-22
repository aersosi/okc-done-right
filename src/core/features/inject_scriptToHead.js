export function inject_scriptToHead(inject, id = "injected-script", logConsole = false, logError = false) {
  let scriptElement = document.getElementById(id);
  if (scriptElement) {
    logError && console.error(`Script with ID "${id}" already exists.`);
    return;
  }

  const script = document.createElement("script");
  script.id = id; // Assign an ID for easy identification
  script.textContent = inject;

  if (document.head) document.head.appendChild(script);
  logConsole && console.log(`Script with ID "${id}" injected.`);

}
