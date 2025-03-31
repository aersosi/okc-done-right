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

  // Hide user first
  handle_hideUser(event);

  // Open the profile link in a new tab and check if it was successful
  const newTab = window.open(profileLink, profileLink.slice(-7));
  // Check if the new tab was opened successfully
  if (newTab) {
    newTab.addEventListener("load", () => injectBlockScript(newTab));
  } else {
    logError && console.error("Failed to open new tab. Please check pop-up settings.");
  }
}

// Inject blocking script in new tab
function injectBlockScript(tab) {
  const scriptContent = `${inject_blockUser}`;

  const scriptElement = tab.document.createElement("script");
  scriptElement.textContent = scriptContent;
  tab.document.body.appendChild(scriptElement);
}