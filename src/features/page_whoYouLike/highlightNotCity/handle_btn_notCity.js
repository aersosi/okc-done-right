import { init_errorElement } from "../../../core";

export function handle_btn_notCity(inputID, buttonID, logError = false) {
  const input = document.getElementById(inputID);
  const button = document.getElementById(buttonID);

  if (!input || !button) {
    logError && console.error(`Element with ID "${!input ? inputID : buttonID}" not found.`);
    return;
  }

  const inputValue = input.value?.trim();

  if (!inputValue || /[^a-z]/i.test(inputValue)) {
    logError && console.error(`Invalid input: "${inputID}" must be a non-empty string with only letters.`);

    // Display error message to user
    init_errorElement("[for='input_notCity']", "notCity", "Please enter a city name");
    return;
  }

  const userLocations = document.querySelectorAll(".userInfo-meta-location");

  if (!userLocations.length) {
    logError && console.error(`User locations not found.`);
    return;
  }

  // Toggle button classes
  const isActive = button.classList.toggle("dr_btn_primary");
  button.classList.toggle("dr_btn_secondary", !isActive);

  // Apply "not_City" class conditionally
  userLocations.forEach(location => {
    location.textContent?.toLowerCase().includes(inputValue.toLowerCase())
      || location.classList.toggle("not_City", isActive);
  });
}
