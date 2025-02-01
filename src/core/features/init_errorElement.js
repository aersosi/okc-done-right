import { init_element } from "./init_element.js";
import { remove_elementsWithID } from "./remove_elementsWithID.js";
import { init_iconButton } from "./init_iconButton.js";

export function init_errorElement(parentElement, errorID, errorText, logConsole = false, logError = false) {
  const parent = document.querySelector(parentElement);
  if (!parent) {
    logError && console.error(`Error: Parent "${parentElement}" not found.`);
    return;
  }

  if (document.getElementById(errorID)) {
    logError && console.error(`Error: Button with ID "${errorID}" already exists.`);
    return;
  }

  let errorWrapperID = `error_${errorID}`;
  // errorWrapper
  init_element(parentElement, "div", "dr_errorElement", errorWrapperID, errorText);

  // remove errorWrapper
  let closeButtonID = `closeError_${errorID}`;
  init_iconButton(`#${errorWrapperID}`, "dr_icon_close", closeButtonID,
    () => {
      remove_elementsWithID([errorWrapperID]);
    }
  );

}
