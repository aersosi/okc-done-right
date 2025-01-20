import {
  bind_inputToElement,
  init_button,
  init_element,
  init_input,
  toggle_buttonHighlight,
  toggle_elementClass
} from "../../core";

import { init_blockHideButtons } from "./userCardButtons/init_userCardButtons.js";
import { handle_btn_notCity } from "./highlightNotCity/handle_btn_notCity.js";
import { reset_userLocations } from "./highlightNotCity/reset_userLocations.js";
import { observe_scroll } from "./observe_scroll.js";
import { handle_scrollUntilLoaded } from "./scrollUntilLoaded/handle_scrollUntilLoaded.js";
import { handle_stopScrollUntilLoaded } from "./scrollUntilLoaded/handle_stopScrollUntilLoaded.js";
import { handle_showIsOnline } from "./showIsOnline/handle_showIsOnline.js";
import { init_hiddenUsers } from "./userCardButtons/init_hiddenUsers.js";
import { set_matchPercentToUserCards } from "./set_matchPercent_toUserCards.js";

export function init_whoYouLike_UI() {

  // init dr_UI_wrapper sections and headlines
  const section_hiddenUsers = [
    {
      parent: "#dr_UI_wrapper",
      tag: "section",
      className: "dr_UI_section",
      id: "dr_UI_section_hiddenUsers"
    },
    {
      parent: "#dr_UI_section_hiddenUsers",
      tag: "div",
      className: "dr_UI_head"
    },
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "p",
      className: "dr_headline",
      text: "Hidden Users"
    },
    {
      parent: "#dr_UI_section_hiddenUsers",
      tag: "div",
      className: "dr_UI_body",
      id: "dr_UI_body_hiddenUsers"
    },
    {
      parent: ".userrow-bucket-container",
      tag: "div",
      className: "hidden",
      id: "dr_wrapper_usersOnline",
      adjacent: true
    }
  ];
  const section_tools = [
    {
      parent: "#dr_UI_wrapper",
      tag: "section",
      className: "dr_UI_section",
      id: "dr_UI_section_tools"
    },
    {
      parent: "#dr_UI_section_tools",
      tag: "div",
      className: "dr_UI_head"
    },
    {
      parent: "#dr_UI_section_tools .dr_UI_head",
      tag: "p",
      className: "dr_headline",
      text: "Tools"
    },

    {
      parent: "#dr_UI_section_tools",
      tag: "div",
      className: "dr_UI_body",
      id: "dr_UI_body_tools"
    },
    {
      parent: ".userrow-bucket-container",
      tag: "div",
      className: "hidden",
      id: "dr_wrapper_usersOnline",
      adjacent: true
    }
  ];

  section_hiddenUsers.forEach(({ parent, tag, className, id, text, adjacent }) => {
    init_element(parent, tag, className, id, text, adjacent);
  });
  section_tools.forEach(({ parent, tag, className, id, text, adjacent }) => {
    init_element(parent, tag, className, id, text, adjacent);
  });


  const btn_dr_UI_headlines = [
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "button",
      className: "dr_icon_btn dr_icon_chevron_down",
      id: "dr_UI_section_hiddenUsers_close",
      handler: () => {
        toggle_elementClass("dr_UI_section_hiddenUsers_close", "hidden");
        toggle_elementClass("dr_UI_section_hiddenUsers_open", "hidden");
        toggle_elementClass("dr_UI_body_hiddenUsers", "height-0");
      }
    },
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "button",
      className: "dr_icon_btn hidden dr_icon_chevron_up",
      id: "dr_UI_section_hiddenUsers_open",
      handler: () => {
        toggle_elementClass("dr_UI_section_hiddenUsers_close", "hidden");
        toggle_elementClass("dr_UI_section_hiddenUsers_open", "hidden");
        toggle_elementClass("dr_UI_body_hiddenUsers", "height-0");
      }
    },
    {
      parent: "#dr_UI_section_tools .dr_UI_head",
      className: "dr_icon_btn dr_icon_chevron_down",
      id: "dr_UI_section_tools_close",
      handler: () => {
        toggle_elementClass("dr_UI_section_tools_close", "hidden");
        toggle_elementClass("dr_UI_section_tools_open", "hidden");
        toggle_elementClass("dr_UI_body_tools", "height-0");
      }
    },
    {
      parent: "#dr_UI_section_tools .dr_UI_head",
      className: "dr_icon_btn hidden dr_icon_chevron_up",
      id: "dr_UI_section_tools_open",
      handler: () => {
        toggle_elementClass("dr_UI_section_tools_close", "hidden");
        toggle_elementClass("dr_UI_section_tools_open", "hidden");
        toggle_elementClass("dr_UI_body_tools", "height-0");
      }
    }
  ];

  btn_dr_UI_headlines.forEach(({ parent, className, id, text, handler }) => {
    init_button(parent, className, id, text, null, handler);
  });


  const intervals_btn_sectionTools = {};
  // init first two buttons
  const btn_sectionTools = [
    {
      className: "dr_btn_primary hidden",
      id: "btn_stopScrollUntilLoaded",
      text: "Stop scroll",
      handler: () => {
        toggle_elementClass("btn_stopScrollUntilLoaded", "hidden");
        toggle_elementClass("btn_scrollUntilLoaded", "hidden");
        handle_stopScrollUntilLoaded(intervals_btn_sectionTools, "interval_scrollUntilLoaded");
      }
    },
    {
      className: "dr_btn_secondary",
      id: "btn_scrollUntilLoaded",
      text: "Scroll until loaded",
      dataUserID: null,
      handler: () => {
        toggle_elementClass("btn_scrollUntilLoaded", "hidden");
        toggle_elementClass("btn_stopScrollUntilLoaded", "hidden");
        handle_scrollUntilLoaded(intervals_btn_sectionTools, "interval_scrollUntilLoaded");
      }
    },
    {
      className: "dr_btn_secondary",
      id: "btn_showIsOnline",
      text: "Show is Online",
      dataUserID: null,
      handler: () => {
        toggle_buttonHighlight("btn_showIsOnline");
        handle_showIsOnline();
      }
    }
  ];
  btn_sectionTools.forEach(({ className, id, text, dataUserID, handler }) => {
    init_button("#dr_UI_body_tools", className, id, text, dataUserID, handler);
  });

  // init input_notCity
  init_input("#dr_UI_body_tools", "input_notCity", "dr_input", "text", "Hightlight cities except this", "Hamburg", "Highlight except", "dr_label",
    () => {
      // bind input to button child, reset UI on input change
      bind_inputToElement("input_notCity", "btn_notCity_text", "textContent");
      reset_userLocations();
    }
  );

  // init btn_notCity
  init_button("#dr_UI_body_tools", "dr_btn_secondary", "btn_notCity", null, null, () => {
    // toggle city highlight
    handle_btn_notCity("input_notCity", "btn_notCity");
  });
  // append button children
  init_element("#btn_notCity", "span", null, "btn_notCity_text");

  // set input value to button child on load
  bind_inputToElement("input_notCity", "btn_notCity_text", "textContent");

  // Set these funtions also to ./observe_scroll.js
  init_blockHideButtons();
  set_matchPercentToUserCards();
  init_hiddenUsers();
  observe_scroll();
}

