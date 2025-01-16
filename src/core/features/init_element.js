export function init_element(parentElement, elementName, elementClasses, elementID, elementText, adjacentElement, logConsole = false) {
  if (document.getElementById(elementID)) {
    logConsole && console.error(`Error: Element with ID "${elementID}" already exists.`);
    return;
  }

  const parent = document.querySelector(parentElement);
  if (!parent) {
    console.error(`Error: Parent "${parentElement}" not found.`);
    return;
  }

  const element = document.createElement(elementName);

  if (elementClasses) element.classList.add(...elementClasses.split(" "));
  if (elementID) element.id = elementID;
  if (elementText) element.textContent = elementText;

  if (!adjacentElement) {
    parent.appendChild(element);
  } else {
    parent.insertAdjacentElement("afterend", element);
  }


  logConsole && console.log(`Add: element "${elementName}" with ID "${elementID}" to "${parentElement}".`);
}
