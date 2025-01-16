export function reset_userLocations() {
  const userLocations = document.querySelectorAll(".userInfo-meta-location");
  if (!userLocations) {
    console.error(`Error: User Locations "${userLocations}" not found.`);
    return;
  }

  userLocations.forEach(location => {
    location.classList.remove("not_City");
  });
}