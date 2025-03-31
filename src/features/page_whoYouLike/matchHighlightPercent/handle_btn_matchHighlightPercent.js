import { init_errorElement, toggle_classForTime } from "../../../core";

export function handle_btn_matchHighlightPercent(inputID, buttonID, logError = false) {
  const input = document.getElementById(inputID);
  if (!input) {
    logError && console.error(`Input with ID "${inputID}" not found.`);
    return;
  }

  // toggle button color for 500ms
  toggle_classForTime(buttonID, "dr_btn_secondary", "dr_btn_primary");

  // Throw err if input is empty or the value contains non letter characters
  if (!input.value || /[^0-9]/i.test(input.value)) {
    console.log(typeof input.value)
    logError && console.error(`Input with ID "${inputID}" has no value or not a string.`);

    // Error to user
    init_errorElement("[for='input_matchHighlightPercent']", "matchHighlightPercent", "Please enter a number between 1 and 100");
    return;
  }

  if (input.value < 0) {
    input.value = 0;
  } else if (input.value > 100) {
    input.value = 100;
  }

  localStorage.setItem("dr_matchHighlightPercent", JSON.stringify(input.value));
}