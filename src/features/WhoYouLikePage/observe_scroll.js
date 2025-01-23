import { debounce } from "../../core";
import { init_blockHideButtons } from "./userCardButtons/init_userCardButtons.js";
import { init_hiddenUsers } from "./userCardButtons/init_hiddenUsers.js";
import { set_matchPercentToUserCards } from "./set_matchPercent_toUserCards.js";
import { handle_hideOfflineUsers } from "./hideOfflineUsers/handle_hideOfflineUsers.js";

export function observe_scroll(logConsole = true) {
  const debouncedScrollHandler = debounce(() => {
    init_blockHideButtons();
    init_hiddenUsers();
    set_matchPercentToUserCards();
    handle_hideOfflineUsers();
  }, 500);

  function logData(event) {
    console.log("EventType:", event.type);
  }

  window.addEventListener("scroll", debouncedScrollHandler);
  logConsole && window.addEventListener("scroll", logData);
}