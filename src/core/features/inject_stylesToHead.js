export function inject_stylesToHead(styles, id = "custom-styles", logConsole = false, logError = false) {
  let styleElement = document.getElementById(id);

  if (styleElement) {
    logError && console.error(`Styles with ID "${id}" already exist.`);
    return;
  }

  styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.type = "text/css";
  styleElement.textContent = styles;

  document.head.appendChild(styleElement);
  logConsole && console.error(`Styles with ID "${id}" appended to head.`);
}
