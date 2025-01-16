import { handle_emptyRows } from "./handle_emptyRows.js";

export function handle_showIsOnline() {
  const userCards = document.querySelectorAll(".userrow-bucket-card-link-container");
  const button = document.getElementById("btn_showIsOnline");

  if (!userCards || userCards.length === 0) {
    console.error("User Cards not found.");
    return;
  }
  if (!button) {
    console.error(`Button with ID "btn_showIsOnline" not found.`);
    return;
  }

  const isActive = button.classList.contains("active");

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