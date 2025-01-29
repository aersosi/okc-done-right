export function handle_showUser(event, logConsole = false, logError = false) {
  const userId = event.target.closest(".dr_UI_row")?.dataset.okcUserId;
  if (!userId) {
    logError && console.error("No 'data-okc-user-id' found on '.dr_UI_row' element.");
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

  // Remove userId from hiddenUsers
  if (hiddenUsers[userId]) {
    delete hiddenUsers[userId];
    localStorage.setItem("dr_hiddenUsers", JSON.stringify(hiddenUsers));
    logConsole && console.log(`User ID "${userId}" removed from hidden users.`);
  } else {
    logConsole && console.log(`User ID "${userId}" not found in hidden users.`);
  }

  // Unhide the corresponding user card
  const userCard = document.querySelector(`a[href*="${userId}"]`)?.closest(".userrow-bucket-display-card");
  if (userCard) {
    const parentElement = userCard.parentElement;
    parentElement.classList.remove("opacity-10", "pointer-events-none");

    logConsole && console.log(`User card for ID "${userId}" is now visible.`);
  } else {
    logError && console.error(`User card not found for ID "${userId}".`);
  }

  // Remove dr_UI_row from dr_UI
  const hideListRow = document.querySelector(`.dr_UI_row[data-okc-user-id="${userId}"]`);
  if (hideListRow) {
    hideListRow.remove();
    logConsole && console.log(`Hide list row for ID "${userId}" removed.`);
  }
}

