import { handle_emptyRows } from "./handle_emptyRows.js";

export function handle_hideOfflineUsers() {
  const userCards = document.querySelectorAll(".userrow-bucket-card-link-container");
  const button = document.getElementById("btn_hideOfflineUsers");

  if (!userCards || userCards.length === 0) {
    console.error("User Cards not found.");
    return;
  }
  if (!button) {
    console.error(`Button with ID "btn_hideOfflineUsers" not found.`);
    return;
  }

  const isActive = button.classList.contains("hidden");

  if (isActive) {
    userCards.forEach(card => {
      const isOnline = card.querySelector(".userInfo-username-online");
      if (!isOnline) card.classList.add("not-online");
    });
    handle_emptyRows();
  } else {
    userCards.forEach(card => {
      card.classList.remove("not-online");
    });
    handle_emptyRows();
  }
}