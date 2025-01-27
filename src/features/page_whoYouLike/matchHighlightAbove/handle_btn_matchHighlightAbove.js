export function handle_btn_matchHighlightAbove(inputID) {
  const input = document.getElementById(inputID);
  if (!input) {
    console.error(`Input with ID "${inputID}" not found.`);
    return;
  }

  if (input.value < 0) {
    input.value = 0;
  } else if (input.value > 100) {
    input.value = 100;
  }

  localStorage.setItem("dr_matchHighlightAbove", JSON.stringify(input.value));
}