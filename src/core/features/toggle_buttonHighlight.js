export function toggle_buttonHighlight(buttonID) {
  const button = document.getElementById(buttonID);
  if (!button) {
    console.error(`Error: Button "${buttonID}" not found.`);
    return;
  }
  button.classList.toggle("ae_btn_primary");
  button.classList.toggle("ae_btn_secondary");
  button.classList.toggle("active");
}