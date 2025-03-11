import { handle_showUser } from "./handle_showUser.js";
import { init_element } from "../../../core";
import { update_btn_unhideAll } from "./update_btn_unhideAll.js";

export function update_hiddenUserList(logError = false) {

  // Create Headline
  init_element("#dr_UI_section_hiddenUsers", "div", null, "dr_UI_body_hiddenUsers");

  const hideList = document.getElementById("dr_UI_body_hiddenUsers");
  if (!hideList) {
    logError && console.error("Hide List not found.");
    return;
  }

  // Clear the hide list
  hideList.innerHTML = "";

  // Populate the hide list
  const hiddenUsers = JSON.parse(localStorage.getItem("dr_hiddenUsers")) || {};

  // show/hide btn_unhideAll
  update_btn_unhideAll(hiddenUsers);

  Object.entries(hiddenUsers).forEach(([userId, [userNameAge, userImgSrc]]) => {

    const row = document.createElement("div");
    row.className = "dr_UI_row";
    row.dataset.okcUserId = userId;

    const userImg = document.createElement("img");
    userImg.classList.add("dr_UI_row_userImg");
    userImg.src = userImgSrc;

    const link = document.createElement("a");
    link.classList.add("dr_link_primary");
    link.href = `https://www.okcupid.com/profile/${userId}`; // URL, auf die der Link verweist
    link.target = "_blank";
    link.textContent = userNameAge;

    const unhideButton = document.createElement("button");
    unhideButton.dataset.okcUserId = userId;
    unhideButton.textContent = "Unhide";
    unhideButton.classList.add("dr_UI_row_btn", "dr_btn", "dr_btn_secondary");
    unhideButton.addEventListener("click", handle_showUser);

    row.appendChild(userImg);
    row.appendChild(link);
    row.appendChild(unhideButton);

    hideList.appendChild(row);
  });
}
