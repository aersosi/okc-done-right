import { update_hiddenUserList } from "./update_hiddenUserList.js";

export const init_hiddenUsers = (logConsole = false, logError = false) => {
  const hiddenUsers = (() => {
    try {
      return JSON.parse(localStorage.getItem("dr_hiddenUsers")) ?? {};
    } catch {
      logError && console.error("Failed to parse hidden users from localStorage.");
      return {};
    }
  })();

  if (!Object.keys(hiddenUsers).length) {
    logError && console.error("No hidden users found.");
    return;
  }

  Object.keys(hiddenUsers).forEach(userId => {
    const userCard = document.querySelector(`a[href*="${userId}"]`)?.closest(".userrow-bucket-display-card");

    if (!userCard) {
      logError && console.error(`userCard not found for ID "${userId}".`);
      return;
    }

    if (userCard) {
      const parentElement = userCard.parentElement;
      parentElement.classList.add("opacity-10", "pointer-events-none");

      userCard.dataset.userId = userId;
    }
  });

  update_hiddenUserList();
};
