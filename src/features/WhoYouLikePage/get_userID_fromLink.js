export function get_userID_fromLink(userCard) {
  const profileLink = userCard.querySelector("a");
  if (!profileLink) {
    console.error("Profile link not found.");
    return;
  }
  // Extract and return userId
  return new URL(profileLink.href).pathname.split("/").pop();
}
