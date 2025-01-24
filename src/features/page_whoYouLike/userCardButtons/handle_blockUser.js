import { inject_blockUser } from "../../../../dist_js/inject_blockUser.js";

export function handle_blockUser(userCard) {
  if (!userCard) {
    console.error("Invalid userCard element or missing 'id' attribute.");
    return;
  }

  const profileLink = userCard.querySelector("a");
  if (!profileLink) {
    console.error("Profile link not found.");
    return;
  }

  const newTab = window.open(profileLink.href, "_blank");
  newTab.addEventListener("load", () => injectBlockScript(newTab));
}

// Inject blocking script in new tab
function injectBlockScript(tab) {
  const scriptContent = `${inject_blockUser}`;

  const scriptElement = tab.document.createElement("script");
  scriptElement.textContent = scriptContent;
  tab.document.body.appendChild(scriptElement);
}