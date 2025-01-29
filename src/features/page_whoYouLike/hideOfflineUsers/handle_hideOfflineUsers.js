import { handle_emptyRows } from "./handle_emptyRows.js";

export function handle_hideOfflineUsers(logError = false) {
  const button = document.getElementById("btn_hideOfflineUsers");
  if (!button) {
    logError && console.error(`Button with ID "btn_hideOfflineUsers" not found.`);
    return;
  }

  // Check if the feature is active (adjust class name if needed)
  const isActive = button.classList.contains("hidden");
  if (!isActive) return;

  // Get all online status elements in one query
  const onlineMarkers = document.querySelectorAll(".userInfo-username-online");
  const onlineCards = new Set();

  // Collect parent cards of online markers
  onlineMarkers.forEach(marker => {
    const card = marker.closest(".userrow-bucket-card-link-container");
    if (card) onlineCards.add(card);
  });

  // Get all user cards
  const userCards = document.querySelectorAll(".userrow-bucket-card-link-container");
  if (!userCards.length) {
    logError && console.error("User Cards not found.");
    return;
  }

  // Update visibility in a single pass
  userCards.forEach(card => {
    card.classList.toggle("not-online", !onlineCards.has(card));
  });

  handle_emptyRows();
}