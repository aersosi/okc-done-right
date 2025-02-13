import { init_blockBtn } from "../blockBtn/init_blockBtn.js";
import { init_element, init_iconButton } from "../../core";
import { activity } from "../../../dist_feather_icons/activity.js";

export function init_discover_UI() {
  const buttonsWrapper = document.querySelector(".dt-action-buttons");
  init_blockBtn(buttonsWrapper, true);


  // Init dr_UI_wrapper
  init_element("body", "div", "dr_UI_wrapper", "dr_UI_wrapper", false);
  init_iconButton("#dr_UI_wrapper", null, "dr_UI_test_icon_btn", activity, () => {
    console.log("test_icon_button");
  });

}


