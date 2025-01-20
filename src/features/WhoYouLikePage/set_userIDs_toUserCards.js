import { get_userID_fromLink } from "./get_userID_fromLink.js";

export function set_userIDs_toUserCards(userCards) {
  if (!userCards) {
    console.error("Failed to find user cards.");
    return;
  }

  userCards.forEach((card) => {
    // Extract or define the user ID
    const userId = get_userID_fromLink(card);
    if (!userId) {
      console.error("Failed to extract user ID from card.");
      return;
    }
    card.id = userId;
  });
}