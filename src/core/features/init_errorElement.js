import { init_element } from "./init_element.js";
import { init_iconButton } from "./init_iconButton.js";
import { remove_elementsWithID } from "./remove_elementsWithID.js";
import { x } from "../../../dist_feather_icons/x.js";

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
  init_iconButton(`#${errorWrapperID}`, null , closeButtonID, x,
    () => {
      remove_elementsWithID([errorWrapperID]);
    }
  );

}
