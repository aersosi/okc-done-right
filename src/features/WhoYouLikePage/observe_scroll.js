import { init_blockHideButtons } from "./userCardButtons/init_userCardButtons.js";
import { init_hiddenUsers } from "./userCardButtons/init_hiddenUsers.js";
import { set_matchPercentToUserCards } from "./set_matchPercent_toUserCards.js";

export function observe_scroll() {
  window.addEventListener("scroll", () => {
    setTimeout(() => {
      init_blockHideButtons();
      init_hiddenUsers();
      set_matchPercentToUserCards();
    }, 1000);
  });
}
