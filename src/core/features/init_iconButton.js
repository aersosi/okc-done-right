export function init_iconButton(parentElement, iconButtonClasses, iconButtonID, iconButtonHandler, logConsole = false, logError = false) {
  const parent = document.querySelector(parentElement);
  if (!parent) {
    logError && console.error(`Error: Parent "${parentElement}" not found.`);
    return;
  }

  if (document.getElementById(iconButtonID)) {
    logError && console.error(`Error: Button with ID "${iconButtonID}" already exists.`);
    return;
  }

  const iconButton = document.createElement("button");

  if (iconButtonClasses) {
    let combine_iconButtonClasses = `dr_icon_btn ${iconButtonClasses}`;
    iconButton.classList.add(...combine_iconButtonClasses.split(" "));
  }

  iconButton.id = iconButtonID;

  if (iconButtonHandler) iconButton.addEventListener("click", iconButtonHandler);
  if (logConsole && iconButtonHandler) console.log(`Handler "click" added for iconButton with ID "${iconButtonID}".`);

  parent.appendChild(iconButton);
  logConsole && console.log(`Add: iconButton with ID "${iconButtonID}" to "${parentElement}".`);
}
