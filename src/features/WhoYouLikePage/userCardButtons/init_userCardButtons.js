import { init_button } from "../../../core";
import { set_userIDs_toUserCards } from "../set_userIDs_toUserCards.js";
import { handle_hideUser } from "./handle_hideUser.js";
import { handle_blockUser } from "./handle_blockUser.js";
import { openUserNewTab } from "../openUserNewTab/openUserNewTab.js";

export function init_blockHideButtons(logConsole = false) {

  const userCardClass = ".userrow-bucket-display-card";
  const userCards = document.querySelectorAll(userCardClass);
  if (!userCards || userCards.length === 0) {
    console.error("User Cards not found.");
    return;
  }
  set_userIDs_toUserCards(userCardClass);
  userCards.forEach((card) => {

    openUserNewTab(".ae_OKC_userNewTabLink", card);

    // Check if wrapper already exists, otherwise create it
    let wrapper = card.querySelector(".ae_OKC_wrapper_userCard_blockHide");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "ae_OKC_wrapper_userCard_blockHide";
      card.appendChild(wrapper);
    }

    if (wrapper.children.length === 0) {
      // Initialize buttons inside the wrapper
      init_button(
        `${userCardClass}[id="${card.id}"] .ae_OKC_wrapper_userCard_blockHide`,
        "ae_btn_primary",
        null,
        "Block",
        null,
        () => {
          handle_blockUser(card);
        });

      init_button(
        `${userCardClass}[id="${card.id}"] .ae_OKC_wrapper_userCard_blockHide`,
        "ae_btn_secondary",
        null,
        "Hide",
        null,
        () => {
          handle_hideUser(card);
        });
    } else {
      logConsole && console.log(`Buttons already applied.`);
    }
  });
}
