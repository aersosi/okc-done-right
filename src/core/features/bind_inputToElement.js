export function bind_inputToElement(inputID, elementID, attribute = "textContent", logConsole = false) {
  const input = document.getElementById(inputID);
  const element = document.getElementById(elementID);

  logConsole && console.log(input);
  logConsole && console.log(element);

  if (!input) {
    console.error(`Input with ID "${inputID}" not found.`);
    return;
  }
  if (!element) {
    console.error(`Element with ID "${elementID}" not found.`);
    return;
  }

  let inputValue = input.value;
  if (inputValue.length === 0) inputValue = "¯\\_(ツ)_/¯";

  if (attribute === "textContent") {
    element.textContent = inputValue;
    logConsole && console.log(`Set textContent of "${elementID}" to "${inputValue}".`);
  } else {
    element.setAttribute(attribute, inputValue);
    logConsole && console.log(`Set attribute "${attribute}" of "${elementID}" to "${inputValue}".`);
  }
}
