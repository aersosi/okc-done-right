export function clickBlockBtn(event, logError = true) {
  event.preventDefault();
  const clickEvent = new Event("click", { bubbles: true });

  // Locate all modal icons.
  const modalIcons = document.querySelectorAll("[class*='i-ellipsis']");

  if (!modalIcons.length) {
    logError && console.error("Keine Modal-Icons gefunden.");
    return;
  }

 // Find the right Button by filtering content of aria-label
  const modalButton = Array.from(modalIcons)
    .map(icon => icon.closest("button")) // Das nächste "button"-Element für jedes Icon suchen
    .find(button => button &&
      /report/i.test(button.getAttribute("aria-label")) &&
      /block/i.test(button.getAttribute("aria-label")));

  if (!modalButton) {
    logError && console.error("Kein passender Modal-Button gefunden.");
    return;
  }

  // Simulate a click to open the modal dialog.
  modalButton.dispatchEvent(clickEvent);

  // Wait for the modal to appear in the DOM.
  const baseModal = document.getElementById("BaseModal");
  if (!baseModal) {
    logError && console.error("Base modal not found.");
    return;
  }

  // Look for the "BLOCK" button inside the modal and click it.
  const blockButton = Array.from(baseModal.querySelectorAll("button"))
    .find(button => button.innerText.includes("BLOCK"));

  if (!blockButton) {
    logError && console.error("Block button not found in the modal.");
    return;
  }

  blockButton.dispatchEvent(clickEvent);

  // Wait for the confirmation modal to appear and close it.
  const closeConfirmationModal = setInterval(() => {
    const closeButton = baseModal.querySelector(
      "button[aria-label='Close block confirmation modal']"
    );

    if (closeButton) {
      clearInterval(closeConfirmationModal);
      closeButton.dispatchEvent(clickEvent);
      userLocalStorage();
      console.debug("Successfully blocked the user.");
    }
  }, 100);

  // Timeout to avoid infinite intervals in case of an error.
  setTimeout(() => {
    clearInterval(closeConfirmationModal);
  }, 5000);

}

function userLocalStorage(logConsole = false, logError = false) {

  const userID = window.location.pathname.replace("/profile/", "");
  if (!userID) {
    logError && console.error("Failed to extract userID from URL.");
    return;
  }

  const userName = document.querySelector(".profile-basics-username-text").textContent.trim();
  if (!userName) {
    logError && console.error("Username element not found.");
    return;
  }

  const userAge = document.querySelector(".profile-basics-asl-age").textContent.trim();
  if (!userAge) {
    logError && console.error("User age element not found.");
    return;
  }

  const userNameAge = `${userName}, ${userAge}`;

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
  hiddenUsers[userID] = userNameAge;
  try {
    localStorage.setItem("dr_hiddenUsers", JSON.stringify(hiddenUsers));
    logConsole && console.log(`User "${userNameAge}" (ID: ${userID}) added to hidden users.`);
  } catch (error) {
    logError && console.error("Failed to update hidden users in localStorage:", error);
  }
}