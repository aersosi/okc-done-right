export function inject_stylesheetToHead(styles, id = "custom-styles", logConsole = false) {
  let styleElement = document.getElementById(id);

  if (styleElement) {
    logConsole && console.error(`Styles with ID "${id}" already exists.`);
    return;
  }

  styleElement = document.createElement("style");
  styleElement.id = id;
  styleElement.type = "text/css";
  styleElement.textContent = styles;

  document.head.appendChild(styleElement);
}
