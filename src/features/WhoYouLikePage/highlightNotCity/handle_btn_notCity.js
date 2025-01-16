export function handle_btn_notCity(inputID, buttonID) {
  const input = document.getElementById(inputID);
  const button = document.getElementById(buttonID);

  if (!input) {
    console.error(`Input with ID "${inputID}" not found.`);
    return;
  }
  if (!button) {
    console.error(`Button with ID "${buttonID}" not found.`);
    return;
  }
  const userLocationsSelector = ".userInfo-meta-location";
  const userLocation = document.querySelectorAll(userLocationsSelector);

  if (!userLocation) {
    console.error(`User Locations with class "${userLocationsSelector}" not found.`);
    return;
  }

  const isActive = button.classList.toggle("ae_btn_primary");
  button.classList.toggle("ae_btn_secondary", !isActive);

  userLocation.forEach(location => {
    if (!location.textContent.toLowerCase().includes(input.value.toLowerCase())) {
      location.classList.toggle("not_City", isActive);
    }
  });

}