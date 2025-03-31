import { toggle_classForTime } from "../../../core";

export function handle_blockUsersMessagedLongAgo(buttonID, logConsole = false) {
  // Toggle button color for 500ms
  toggle_classForTime(buttonID, "dr_btn_secondary", "dr_btn_primary");

  // Get all elements with the class "twoWeeksAgo"
  const twoWeeksAgoElements = document.querySelectorAll(".twoWeeksAgo");

  if (twoWeeksAgoElements.length > 0) {
    twoWeeksAgoElements.forEach((elm, index) => {
      setTimeout(() => {
          // Get the parent of .twoWeeksAgo
          const parentElement = elm.closest(".userrow-bucket-display-card");
          const blockButton = parentElement.querySelector(".btn_block");

          if (blockButton) {
            blockButton.click();
          } else {
            logConsole && console.log("No .btn_hide found inside:", parentElement);
          }
        }, index * 1000
      );
    });
  } else {
    logConsole && console.log("No users messaged long time ago found.");
  }
}
