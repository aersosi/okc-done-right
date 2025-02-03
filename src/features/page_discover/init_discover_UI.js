import { init_blockBtn } from "../blockBtn/init_blockBtn.js";

export function init_discover_UI() {
  const buttonsWrapper = document.querySelector(".dt-action-buttons");
  init_blockBtn(buttonsWrapper, true);
}


