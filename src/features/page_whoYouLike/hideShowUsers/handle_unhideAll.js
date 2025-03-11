export function handle_unhideAll() {
  const btns = document.querySelectorAll("#dr_UI_body_hiddenUsers .dr_UI_row button");
  btns.forEach((btn) => {
    const clickEvent = new Event("click", { bubbles: true });
    btn.dispatchEvent(clickEvent);
  });
}