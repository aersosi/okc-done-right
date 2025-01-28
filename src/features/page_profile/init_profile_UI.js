import { init_blockBtn } from "../general/init_blockBtn.js";

export function init_profile_UI(logConsole = false, logError = false) {
  const buttonsWrapper = document.querySelector(".profile-userinfo-buttons .profile-pill-buttons");

  if (!buttonsWrapper) {
    logError && console.error("Buttons wrapper not found.");
    return;
  }

  logConsole && console.log(buttonsWrapper);
  init_blockBtn(buttonsWrapper, true);
}
