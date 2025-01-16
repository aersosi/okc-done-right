import { update_hiddenUserList } from "./update_hiddenUserList.js";

export function handle_hideUser(userCard, logConsole = false) {
  // Validate the input
  if (!userCard) {
    console.error("Invalid userCard element or missing 'id' attribute.");
    return;
  }

  const userId = userCard.id;
  const userNameAge = userCard.querySelector(".userInfo-username-name")?.textContent.trim();

  if (!userNameAge) {
    console.error(`Username and age information not found for userCard with ID "${userId}".`);
    return;
  }

  // Safely parse hidden users from localStorage
  const hiddenUsers = (() => {
    try {
      return JSON.parse(localStorage.getItem("dr_hiddenUsers")) || {};
    } catch (error) {
      console.error("Failed to parse hidden users from localStorage:", error);
      return {};
    }
  })();

  // Add or update the hidden user in localStorage
  hiddenUsers[userId] = userNameAge;
  try {
    localStorage.setItem("dr_hiddenUsers", JSON.stringify(hiddenUsers));
    logConsole && console.log(`User "${userNameAge}" (ID: ${userId}) added to hidden users.`);
  } catch (error) {
    console.error("Failed to update hidden users in localStorage:", error);
    return;
  }

  // Hide the user card visually
  const parentElement = userCard.parentElement;
  if (parentElement) {
    parentElement.classList.add("opacity-10", "pointer-events-none");
    logConsole && console.log(`User card for ID "${userId}" visually hidden.`);
  } else {
    console.error(`Parent element not found for userCard with ID "${userId}".`);
  }

  // Update the hide list UI
  update_hiddenUserList();
}
