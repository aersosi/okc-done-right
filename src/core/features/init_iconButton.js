export function init_iconButton(parentElement, iconButtonClasses, iconButtonID, iconButtonIcon, iconButtonHandler, insertBefore = false, logConsole = false, logError = false) {
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

  iconButton.classList.add("dr_icon_btn");

  if (iconButtonClasses) {
    let combine_iconButtonClasses = `${iconButtonClasses}`;
    iconButton.classList.add(...combine_iconButtonClasses.split(" "));
  }

  iconButton.id = iconButtonID;

  if (iconButtonIcon) {
    iconButton.innerHTML = iconButtonIcon;
  } else {
    logError && console.error(`Error: Icon "${iconButtonIcon}" not found.`);
    iconButton.textContent = "Icon not found";
  }

  if (iconButtonHandler) iconButton.addEventListener("click", iconButtonHandler);
  if (logConsole && iconButtonHandler) console.log(`Handler "click" added for iconButton with ID "${iconButtonID}".`);

  if (insertBefore) {
    parent.insertBefore(iconButton, parent.firstChild);
  } else {
    parent.appendChild(iconButton);
  }

  logConsole && console.log(`Add: iconButton with ID "${iconButtonID}" and iconName "${iconButtonIconName}" to "${parentElement}".`);
}
