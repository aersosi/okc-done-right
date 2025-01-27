import { handle_showUser } from "./handle_showUser.js";
import { init_element } from "../../../core";

export function update_hiddenUserList() {

  // Create Headline
  init_element("#dr_UI_section_hiddenUsers", "div", null, "dr_UI_body_hiddenUsers");

  let hideList = document.getElementById("dr_UI_body_hiddenUsers");
  if (!hideList) {
    console.error("Hide List not found.");
    return;
  }

  // Clear the hide list
  hideList.innerHTML = "";

  // Populate the hide list
  const hiddenUsers = JSON.parse(localStorage.getItem("dr_hiddenUsers")) || {};
  Object.entries(hiddenUsers).forEach(([userId, userNameAge]) => {

    const row = document.createElement("div");
    row.className = "dr_UI_row";
    row.dataset.okcUserId = userId;

    const link = document.createElement("a");
    link.classList.add("dr_link_primary");
    link.href = `https://www.okcupid.com/profile/${userId}`; // URL, auf die der Link verweist
    link.target = "_blank";
    link.textContent = userNameAge;

    const unhideButton = document.createElement("button");
    unhideButton.dataset.okcUserId = userId;
    unhideButton.textContent = "Unhide";
    unhideButton.classList.add("dr_btn_secondary");
    unhideButton.addEventListener("click", handle_showUser);

    row.appendChild(link);
    row.appendChild(unhideButton);

    hideList.appendChild(row);
  });
}