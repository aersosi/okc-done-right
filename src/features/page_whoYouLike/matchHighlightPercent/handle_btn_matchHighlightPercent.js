export function handle_btn_matchHighlightPercent(inputID, buttonID, logError = false) {
  const input = document.getElementById(inputID);
  if (!input) {
    logError && console.error(`Input with ID "${inputID}" not found.`);
    return;
  }

  const button = document.getElementById(buttonID);
  console.log(button);
  if (!button) {
    logError && console.error(`Input with ID "${inputID}" not found.`);
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