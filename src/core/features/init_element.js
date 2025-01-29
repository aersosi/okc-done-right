export function init_element(parentElement, elementTag, elementClasses, elementID, elementText, logConsole = false, logError = false) {
  if (document.getElementById(elementID)) {
    logError && console.error(`Error: Element with ID "${elementID}" already exists.`);
    return;
  }

  const parent = document.querySelector(parentElement);
  if (!parent) {
    logError && console.error(`Error: Parent "${parentElement}" not found.`);
    return;
  }

  const element = document.createElement(elementTag);

  if (elementClasses) element.classList.add(...elementClasses.split(" "));
  if (elementID) element.id = elementID;
  if (elementText) element.textContent = elementText;

  parent.appendChild(element);

  logConsole && console.log(`Add: element "${elementTag}" with ID "${elementID}" to "${parentElement}".`);
}
