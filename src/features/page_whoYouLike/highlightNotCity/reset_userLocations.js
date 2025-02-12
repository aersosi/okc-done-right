export function reset_userLocations(logError = false) {
  const userLocations = document.querySelectorAll(".userInfo-meta-location");
  if (!userLocations.length) {  // Check if the NodeList is empty
    logError && console.error('Error: No user locations found.');
    return;
  }

  userLocations.forEach(location => location?.classList.remove("not_City"));
}