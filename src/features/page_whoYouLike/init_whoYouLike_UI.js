import {
  bind_inputToElement,
  init_button,
  init_element,
  init_input,
  toggle_elementClass
} from "../../core";

import { handle_btn_notCity } from "./highlightNotCity/handle_btn_notCity.js";
import { reset_userLocations } from "./highlightNotCity/reset_userLocations.js";
import { observe_scrollTimeout } from "./observe_scroll.js";
import { handle_scrollUntilLoaded } from "./scrollUntilLoaded/handle_scrollUntilLoaded.js";
import { handle_stopScrollUntilLoaded } from "./scrollUntilLoaded/handle_stopScrollUntilLoaded.js";
import { handle_hideOfflineUsers } from "./hideOfflineUsers/handle_hideOfflineUsers.js";
import { init_hiddenUsers } from "./hideShowUsers/init_hiddenUsers.js";
import { handle_hideMessagedUsers } from "./hideAllMessagedUsers/handle_hideMessagedUsers.js";
import { handle_showMessagedUsers } from "./hideAllMessagedUsers/handle_showMessagedUsers.js";
import { handle_showOfflineUsers } from "./hideOfflineUsers/handle_showOfflineUsers.js";
import { bootstrap_userCard } from "./bootstrapUserCard/bootstrap_userCard.js";
import { handle_btn_matchHighlightPercent } from "./matchHighlightPercent/handle_btn_matchHighlightPercent.js";
import { init_matchHighlightPercent } from "./matchHighlightPercent/init_matchHighlightPercent.js";
import { set_matchHighlightPercent } from "./matchHighlightPercent/set_matchHighlightPercent.js";
import { init_iconButton } from "../../core";

export function init_whoYouLike_UI() {
  // Functions to init on Load
  const init_okc_UI = [
    init_matchHighlightPercent,
    bootstrap_userCard
  ];
  init_okc_UI.forEach(callback => callback());
  observe_scrollTimeout(init_okc_UI);

  // Init dr_UI_wrapper
  init_element("body", "div", "dr_UI_wrapper", "dr_UI_wrapper", false);

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
    }
  ];

  section_hiddenUsers.forEach(({ parent, tag, className, id, text }) => {
    init_element(parent, tag, className, id, text);
  });
  section_tools.forEach(({ parent, tag, className, id, text }) => {
    init_element(parent, tag, className, id, text);
  });

  const icon_btn_dr_UI_headlines = [
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "button",
      className: "dr_icon_chevron_down",
      id: "dr_UI_section_hiddenUsers_close",
      handler: () => {
        toggle_elementClass("dr_UI_section_hiddenUsers_close", "hidden");
        toggle_elementClass("dr_UI_section_hiddenUsers_open", "hidden");
        toggle_elementClass("dr_UI_body_hiddenUsers", "max-height-0");
      }
    },
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "button",
      className: "hidden dr_icon_chevron_up",
      id: "dr_UI_section_hiddenUsers_open",
      handler: () => {
        toggle_elementClass("dr_UI_section_hiddenUsers_close", "hidden");
        toggle_elementClass("dr_UI_section_hiddenUsers_open", "hidden");
        toggle_elementClass("dr_UI_body_hiddenUsers", "max-height-0");
      }
    },
    {
      parent: "#dr_UI_section_tools .dr_UI_head",
      className: "dr_icon_chevron_down",
      id: "dr_UI_section_tools_close",
      handler: () => {
        toggle_elementClass("dr_UI_section_tools_close", "hidden");
        toggle_elementClass("dr_UI_section_tools_open", "hidden");
        toggle_elementClass("dr_UI_body_tools", "max-height-0");
      }
    },
    {
      parent: "#dr_UI_section_tools .dr_UI_head",
      className: "hidden dr_icon_chevron_up",
      id: "dr_UI_section_tools_open",
      handler: () => {
        toggle_elementClass("dr_UI_section_tools_close", "hidden");
        toggle_elementClass("dr_UI_section_tools_open", "hidden");
        toggle_elementClass("dr_UI_body_tools", "max-height-0");
      }
    }
  ];

  icon_btn_dr_UI_headlines.forEach(({ parent, className, id, handler }) => {
    init_iconButton(parent, className, id, handler);
  });


  const intervals_btn_sectionTools = {};
  // init first two buttons
  const btn_sectionTools = [
    {
      className: "dr_btn_primary hidden",
      id: "btn_stopScrollUntilLoaded",
      text: "Stop scrolling",
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
      id: "btn_hideOfflineUsers",
      text: "Hide Offline Users",
      dataUserID: null,
      handler: () => {
        toggle_elementClass("btn_hideOfflineUsers", "hidden");
        toggle_elementClass("btn_showOfflineUsers", "hidden");
        handle_hideOfflineUsers();
      }
    },
    {
      className: "dr_btn_primary hidden",
      id: "btn_showOfflineUsers",
      text: "Show Offline Users",
      dataUserID: null,
      handler: () => {
        toggle_elementClass("btn_showOfflineUsers", "hidden");
        toggle_elementClass("btn_hideOfflineUsers", "hidden");
        handle_showOfflineUsers();
      }
    },
    {
      className: "dr_btn_secondary",
      id: "btn_hideMessagedUsers",
      text: "Hide Messaged Users",
      dataUserID: null,
      handler: () => {
        toggle_elementClass("btn_hideMessagedUsers", "hidden");
        toggle_elementClass("btn_showMessagedUsers", "hidden");
        handle_hideMessagedUsers();
      }
    },
    {
      className: "dr_btn_primary hidden",
      id: "btn_showMessagedUsers",
      text: "Show Messaged Users",
      dataUserID: null,
      handler: () => {
        toggle_elementClass("btn_showMessagedUsers", "hidden");
        toggle_elementClass("btn_hideMessagedUsers", "hidden");
        handle_showMessagedUsers();
      }
    }
  ];
  btn_sectionTools.forEach(({ className, id, text, dataUserID, handler }) => {
    init_button("#dr_UI_body_tools", className, id, text, dataUserID, handler);
  });

  // init input_matchHighlightPercent
  let matchPercentValue = JSON.parse(localStorage.getItem("dr_matchHighlightPercent"));
  init_input("#dr_UI_body_tools", "input_matchHighlightPercent", "dr_input", "number", "Match highlight above",
    matchPercentValue, "Match highlight above", "dr_label", null
  );

  // init btn_matchHighlightPercent
  init_button("[for='input_matchHighlightPercent']", "dr_btn_secondary", "btn_matchHighlightPercent", "Set match highlight", null, () => {
    // toggle match highlight
    handle_btn_matchHighlightPercent("input_matchHighlightPercent", "btn_matchHighlightPercent");
    set_matchHighlightPercent();
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
  init_button("[for='input_notCity']", "dr_btn_secondary", "btn_notCity", null, null, () => {
    // toggle city highlight
    handle_btn_notCity("input_notCity", "btn_notCity");
  });
  // append button children
  init_element("#btn_notCity", "span", null, "btn_notCity_text");

  // set input value to button child on load
  bind_inputToElement("input_notCity", "btn_notCity_text", "textContent");


  const init_dr_UI = [
    handle_hideOfflineUsers,
    init_hiddenUsers
  ];
  init_dr_UI.forEach(callback => callback());
  observe_scrollTimeout(init_dr_UI);

}

