export function init_button(parentElement, buttonClasses, buttonID, buttonText, dataUserID, buttonHandler, logConsole = false, logError = false) {
  const parent = document.querySelector(parentElement);
  if (!parent) {
    logError && console.error(`Error: Parent "${parentElement}" not found.`);
    return;
  }

  if (document.getElementById(buttonID)) {
    logError && console.error(`Error: Button with ID "${buttonID}" already exists.`);
    return;
  }

  const button = document.createElement("button");

  if (buttonClasses) button.classList.add(...buttonClasses.split(" "));
  if (buttonID) button.id = buttonID;
  if (dataUserID) button.dataset.userId = dataUserID;
  if (buttonText) button.textContent = buttonText;

  if (buttonHandler) button.addEventListener("click", buttonHandler);
  if (logConsole && buttonHandler) console.log(`Handler "click" added for button with ID "${buttonID}".`);

  parent.appendChild(button);
  logConsole && console.log(`Add: button "${buttonText}" with ID "${buttonID}" to "${parentElement}".`);
}
