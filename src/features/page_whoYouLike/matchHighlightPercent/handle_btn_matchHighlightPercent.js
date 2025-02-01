import { init_errorElement } from "../../../core";

export function handle_btn_matchHighlightPercent(inputID, buttonID, logError = false) {
  const input = document.getElementById(inputID);
  if (!input) {
    logError && console.error(`Input with ID "${inputID}" not found.`);
    return;
  }

  const button = document.getElementById(buttonID);
  if (!button) {
    logError && console.error(`Input with ID "${inputID}" not found.`);
    return;
  }

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


  button.classList.remove("dr_btn_secondary");
  button.classList.add("dr_btn_primary");
  setTimeout(() => {
    button.classList.remove("dr_btn_primary");
    button.classList.add("dr_btn_secondary");
  }, 500);

  localStorage.setItem("dr_matchHighlightPercent", JSON.stringify(input.value));
}