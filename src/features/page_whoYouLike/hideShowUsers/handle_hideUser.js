import { update_hiddenUserList } from "./update_hiddenUserList.js";

export function handle_hideUser(event, logConsole = false, logError = false) {
  const userCard = event.target.closest(".userrow-bucket-display-card");
  if (!userCard) {
    logError && console.error("userCard element not found");
    return;
  }

  const userID = userCard.dataset.dr_user_id;
  const userName = userCard.dataset.dr_user_name;
  const userAge = userCard.dataset.dr_user_age;
  const userNameAge = `${userName}, ${userAge}`;
  const userImgSrc = userCard.querySelector("img").getAttribute("src");

  if (!userNameAge) {
    logError && console.error(`Username and age information not found for userCard with ID "${userID}".`);
    return;
  }

  // Safely parse hidden users from localStorage
  const hiddenUsers = (() => {
    try {
      return JSON.parse(localStorage.getItem("dr_hiddenUsers")) || {};
    } catch (error) {
      logError && console.error("Failed to parse hidden users from localStorage:", error);
      return {};
    }
  })();

  // Add or update the hidden user in localStorage
  hiddenUsers[userID] = [userNameAge, userImgSrc];
  try {
    localStorage.setItem("dr_hiddenUsers", JSON.stringify(hiddenUsers));
    logConsole && console.log(`User "${userNameAge}" (ID: ${userID}) added to hidden users.`);
  } catch (error) {
    logError && console.error("Failed to update hidden users in localStorage:", error);
    return;
  }

  // Hide the user card visually
  const parentElement = userCard.parentElement;
  if (parentElement) {
    parentElement.classList.add("manually-hidden");
    logConsole && console.log(`User card for ID "${userID}" visually hidden.`);
  } else {
    logError && console.error(`Parent element not found for userCard with ID "${userID}".`);
  }

  // Update the hide list UI
  update_hiddenUserList();

}