import { init_iconButton, toggle_elementClass, waitFor_element } from "../../core/index.js";
import { handle_scaleUp } from "./handle_scaleUp.js";
import { handle_scaleDown } from "./handle_scaleDown.js";

export async function init_resizeChat(logConsole = true, logError = true) {
  const elementIsAvailable = await waitFor_element(".messenger-main-window-user-row");

  if (elementIsAvailable) {
    const messangerMenuRow = document.querySelector(".messenger-main-window-user-row");
    logConsole && console.log("Element is available: ", ".messenger-main-window-user-row");

    if (!messangerMenuRow) {
      logError && console.error(`Error: "${messangerMenuRow}" not found.`);
      return;
    }
    const profileLink = messangerMenuRow.firstChild;

    // init scaleUp/Down wrapper
    const wrapper = document.createElement("div");
    wrapper.id = "dr_UI_resizeChat_wrapper";
    profileLink.after(wrapper);

    // append scaleUp/Down buttons to wrapper
    const icon_btn_resizeChat = [
      {
        parent: "#dr_UI_resizeChat_wrapper",
        tag: "button",
        className: "dr_icon_chevron_up",
        id: "dr_UI_resizeChat_scaleUp",
        handler: () => {
          handle_scaleUp();
          toggle_elementClass("dr_UI_resizeChat_scaleUp", "hidden");
          toggle_elementClass("dr_UI_resizeChat_scaleDown", "hidden");
        }
      },
      {
        parent: "#dr_UI_resizeChat_wrapper",
        tag: "button",
        className: "hidden dr_icon_chevron_down",
        id: "dr_UI_resizeChat_scaleDown",
        handler: () => {
          handle_scaleDown();
          toggle_elementClass("dr_UI_resizeChat_scaleDown", "hidden");
          toggle_elementClass("dr_UI_resizeChat_scaleUp", "hidden");
        }
      }
    ];

    icon_btn_resizeChat.forEach(({ parent, className, id, handler, insertBefore }) => {
      init_iconButton(parent, className, id, handler, insertBefore);
    });
  }

}