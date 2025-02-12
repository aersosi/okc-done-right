import { init_iconButton, waitFor_element } from "../../core/index.js";
import { handle_scaleChatDown } from "./handle_scaleChatDown.js";
import { handle_scaleChatUp } from "./handle_scaleChatUp.js";

export async function init_resizeChat(logConsole = false, logError = false) {
  // wait for chatWindow content to load
  const chatIsLoaded = await waitFor_element(".messenger-message-pane [data-cy='messenger.messageRow']");
  if (chatIsLoaded) {
    // if no wrapper, create it
    let resizeChat_wrapper = document.getElementById("dr_OKC_resizeChat_wrapper");
    if (!resizeChat_wrapper) {
      resizeChat_wrapper = document.createElement("div");
      resizeChat_wrapper.id = "dr_OKC_resizeChat_wrapper";

      // append wrapper in chatWindow head, after firstChild
      const messengerRow = document.querySelector(".messenger-main-window-user-row");
      const profileLink = messengerRow.firstElementChild;
      profileLink.after(resizeChat_wrapper);

      // append buttons to wrapper
      init_iconButton("#dr_OKC_resizeChat_wrapper", "dr_icon_chevron_up", "dr_btn_scaleChatUp", () => handle_scaleChatUp(dr_btn_scaleChatUp, dr_btn_scaleChatDown));
      init_iconButton("#dr_OKC_resizeChat_wrapper", "dr_icon_chevron_down", "dr_btn_scaleChatDown", () => handle_scaleChatDown(dr_btn_scaleChatUp, dr_btn_scaleChatDown));

      const dr_chatIsBig = localStorage.getItem("dr_chatIsBig");
      const dr_btn_scaleChatUp = document.getElementById("dr_btn_scaleChatUp");
      const dr_btn_scaleChatDown = document.getElementById("dr_btn_scaleChatDown");

      // if localStorage.dr_chatIsBig is set -> scaleChatUp, else -> scaleChatDown
      if (dr_chatIsBig) {
        handle_scaleChatUp(dr_btn_scaleChatUp, dr_btn_scaleChatDown);
      } else {
        handle_scaleChatDown(dr_btn_scaleChatUp, dr_btn_scaleChatDown);
      }
    }
  }
}

