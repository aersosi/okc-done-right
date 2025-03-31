import { init_blockHideButtons } from "./init_blockHideButtons.js";
import { init_firstMessage } from "./init_firstMessage.js";
import { init_matchPercent } from "./init_matchPercent.js";
import { init_userLinkNewTab } from "./init_userLinkNewTab.js";

export function bootstrap_userCard(logError = false) {
  const userCards = document.querySelectorAll(".userrow-bucket-display-card");
  if (!userCards || userCards.length === 0) {
    logError && console.error("User Cards not found.");
    return;
  }

  const allUserData = JSON.parse(localStorage.getItem("dr_allUserData")) || {};

  Object.keys(allUserData).forEach((userID, index) => {
    const userData = allUserData[userID];
    if (!userData) {
      logError && console.error("No user data for userID:", userID);
      return;
    }

    const userName = userData[0];
    const userAge = userData[1];
    const matchPercent = userData[2];
    const firstMessage = userData[3];

    userCards[index].dataset.dr_user_id = userID;
    userCards[index].dataset.dr_user_name = userName;
    userCards[index].dataset.dr_user_age = userAge;
    userCards[index].dataset.dr_match_percent = matchPercent;
    userCards[index].dataset.dr_user_messaged = firstMessage;

    if (!userCards[index].querySelector(".dr_OKC_matchPercent")) {
      const elmMatchPercent = init_matchPercent("dr_OKC_matchPercent", matchPercent);
      userCards[index].appendChild(elmMatchPercent);
    }

    if (!userCards[index].querySelector(".dr_OKC_firstMessage")) {
      const elmFirstMessage = init_firstMessage("dr_OKC_firstMessage", firstMessage);
      elmFirstMessage && userCards[index].appendChild(elmFirstMessage);
    }

    if (!userCards[index].querySelector(".dr_OKC_userNewTabLink")) {
      const elmNewTab = init_userLinkNewTab("dr_OKC_userNewTabLink", userID);
      userCards[index].appendChild(elmNewTab);
    }

    if (!userCards[index].querySelector(".dr_OKC_wrapper_blockHide")) {
      const elmBlockHide = init_blockHideButtons("dr_OKC_wrapper_blockHide");
      userCards[index].appendChild(elmBlockHide);
    }
  });


}