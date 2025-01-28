export function init_input(parentElement, inputID, inputClasses, inputType, inputPlaceholder, inputValue, labelText, labelClasses, inputHandler, logConsole = false, logError = false) {
  if (document.getElementById(inputID)) {
    logError && console.error(`Error: Input with ID "${inputID}" already exists.`);
    return;
  }

  const parent = document.querySelector(parentElement);
  if (!parent) {
  logError && console.error(`Error: Parent "${parentElement}" not found.`);
    return;
  }

  // Create the label element
  const label = document.createElement("label");
  if (inputID) label.setAttribute("for", inputID);

  if (labelText) {
    const labelTextNode = document.createTextNode(labelText);
    label.appendChild(labelTextNode);
  }

  if (labelClasses) label.classList.add(...labelClasses.split(" "));

  // Create the input element
  const input = document.createElement("input");

  if (inputClasses) input.classList.add(...inputClasses.split(" "));
  if (inputID) input.id = inputID;

  input.type = inputType || "text";

  if (inputPlaceholder) input.placeholder = inputPlaceholder;
  if (inputValue) input.value = inputValue;

  if (inputHandler) input.addEventListener("input", inputHandler);
  if (logConsole && inputHandler) console.log(`Handler added for input with ID "${inputID}".`);

  // Append input to label
  label.appendChild(input);
  parent.appendChild(label);

  logConsole && console.log(`Add: input, type "${inputType}" with ID "${inputID}" to "${parentElement}".`);
}
