import { inject_blockUser } from "../../../../dist_js/inject_blockUser.js";
import { handle_hideUser } from "../hideShowUsers/handle_hideUser.js";

export function handle_blockUser(event, logConsole = false, logError = false) {
  const userCard = event.target.closest(".userrow-bucket-display-card");
  if (!userCard) {
    logError && console.error("Invalid userCard element");
    return;
  }

  const userID = userCard.dataset.dr_user_id;
  const profileLink = `/profile/${userID}`;

  handle_hideUser(event);

  const newTab = window.open(profileLink, "_blank");
  newTab.addEventListener("load", () => injectBlockScript(newTab));
}

// Inject blocking script in new tab
function injectBlockScript(tab) {
  const scriptContent = `${inject_blockUser}`;

  const scriptElement = tab.document.createElement("script");
  scriptElement.textContent = scriptContent;
  tab.document.body.appendChild(scriptElement);
}