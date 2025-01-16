import { get_userID_fromLink } from "./get_userID_fromLink.js";

export function set_userIDs_toUserCards(userCardClass) {
  const userCards = document.querySelectorAll(userCardClass);
  if (!userCards) {
    console.error("Failed to find user cards.");
    return;
  }

  userCards.forEach((card) => {
    const userId = get_userID_fromLink(card); // Extract or define the user ID
    if (!userId) {
      console.error("Failed to extract user ID from card.");
      return;
    }
    card.id = userId;
  });
}