import { handle_blockUser } from "../blockUsers/handle_blockUser.js";
import { handle_hideUser } from "../hideShowUsers/handle_hideUser.js";

export function init_blockHideButtons(wrapperClass) {
  const elementWrapper = document.createElement("div");
  elementWrapper.classList.add(wrapperClass);

  const btnBlockUser = document.createElement("button");
  btnBlockUser.classList.add("dr_btn", "dr_btn_secondary", "btn_block");
  btnBlockUser.textContent = "Block";
  btnBlockUser.addEventListener("click", handle_blockUser);

  const btnHideUser = document.createElement("button");
  btnHideUser.classList.add("dr_btn", "dr_btn_secondary", "btn_hide");
  btnHideUser.textContent = "Hide";
  btnHideUser.addEventListener("click", handle_hideUser);

  elementWrapper.appendChild(btnBlockUser);
  elementWrapper.appendChild(btnHideUser);

  return elementWrapper;
}