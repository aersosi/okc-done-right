import { init_blockHideButtons } from "./userCardButtons/init_userCardButtons.js";
import { init_hiddenUsers } from "./userCardButtons/init_hiddenUsers.js";

export function observe_scroll() {
  window.addEventListener("scroll", () => {
    setTimeout(() => {
      init_blockHideButtons();
      init_hiddenUsers();
    }, 1000);
  });
}
