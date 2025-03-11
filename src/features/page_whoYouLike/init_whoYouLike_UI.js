import {
  bind_inputToElement,
  init_button,
  init_element,
  init_iconButton,
  init_input,
  observe_scroll,
  toggle_elementClass
} from "../../core";

// highlightNotCity
import { handle_btn_notCity } from "./highlightNotCity/handle_btn_notCity.js";
import { reset_userLocations } from "./highlightNotCity/reset_userLocations.js";

// scrollUntilLoaded
import { handle_scrollUntilLoaded } from "./scrollUntilLoaded/handle_scrollUntilLoaded.js";
import { handle_stopScrollUntilLoaded } from "./scrollUntilLoaded/handle_stopScrollUntilLoaded.js";

// hideOfflineUsers
import { handle_hideOfflineUsers } from "./hideOfflineUsers/handle_hideOfflineUsers.js";

// hideShowUsers
import { set_hiddenUsers } from "./hideShowUsers/set_hiddenUsers.js";

// hideAllMessagedUsers
import { handle_hideMessagedUsers } from "./hideAllMessagedUsers/handle_hideMessagedUsers.js";
import { handle_showMessagedUsers } from "./hideAllMessagedUsers/handle_showMessagedUsers.js";

import { handle_showOfflineUsers } from "./hideOfflineUsers/handle_showOfflineUsers.js";

// matchHighlightPercent
import { handle_btn_matchHighlightPercent } from "./matchHighlightPercent/handle_btn_matchHighlightPercent.js";
import { init_matchHighlightPercent } from "./matchHighlightPercent/init_matchHighlightPercent.js";
import { set_matchHighlightPercent } from "./matchHighlightPercent/set_matchHighlightPercent.js";
import { handle_showMatchHighlightPercent } from "./matchHighlightPercent/handle_showMatchHighlightPercent.js";
import { handle_hideMatchHighlightPercent } from "./matchHighlightPercent/handle_hideMatchHighlightPercent.js";

// minMaxAge
import { init_minMaxAge } from "./minMaxAge/init_minMaxAge.js";
import { handle_btn_hideMinMaxAge } from "./minMaxAge/handle_btn_hideMinMaxAge.js";
import { handle_btn_showMinMaxAge } from "./minMaxAge/handle_btn_showMinMaxAge.js";

// bootstrapUserCard
import { bootstrap_userCard } from "./bootstrapUserCard/bootstrap_userCard.js";


import { chevron_up } from "../../../dist_feather_icons/chevron-up.js";
import { chevron_down } from "../../../dist_feather_icons/chevron-down.js";
import { set_minMaxAge } from "./minMaxAge/set_minMaxAge.js";
import { handle_unhideAll } from "./hideShowUsers/handle_unhideAll.js";


export function init_whoYouLike_UI() {
  // Functions to init on Load
  const init_okc_UI = [
    init_matchHighlightPercent,
    init_minMaxAge
  ];
  init_okc_UI.forEach(callback => callback());

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
    },
    {
      parent: "#dr_UI_section_hiddenUsers",
      tag: "div",
      className: "dr_UI_footer"
    }
  ];
  const section_filter = [
    {
      parent: "#dr_UI_wrapper",
      tag: "section",
      className: "dr_UI_section",
      id: "dr_UI_section_filter"
    },
    {
      parent: "#dr_UI_section_filter",
      tag: "div",
      className: "dr_UI_head"
    },
    {
      parent: "#dr_UI_section_filter .dr_UI_head",
      tag: "p",
      className: "dr_headline",
      text: "Filter"
    },

    {
      parent: "#dr_UI_section_filter",
      tag: "div",
      className: "dr_UI_body",
      id: "dr_UI_body_filter"
    }
  ];

  section_hiddenUsers.forEach(({ parent, tag, className, id, text }) => {
    init_element(parent, tag, className, id, text);
  });
  section_filter.forEach(({ parent, tag, className, id, text }) => {
    init_element(parent, tag, className, id, text);
  });

  const icon_btn_dr_UI_headlines = [
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "button",
      id: "dr_UI_section_hiddenUsers_close",
      icon: chevron_down,
      handler: () => {
        toggle_elementClass("dr_UI_section_hiddenUsers_close", "hidden");
        toggle_elementClass("dr_UI_section_hiddenUsers_open", "hidden");
        toggle_elementClass("dr_UI_body_hiddenUsers", "max-height-0");
      }
    },
    {
      parent: "#dr_UI_section_hiddenUsers .dr_UI_head",
      tag: "button",
      className: "hidden",
      id: "dr_UI_section_hiddenUsers_open",
      icon: chevron_up,
      handler: () => {
        toggle_elementClass("dr_UI_section_hiddenUsers_close", "hidden");
        toggle_elementClass("dr_UI_section_hiddenUsers_open", "hidden");
        toggle_elementClass("dr_UI_body_hiddenUsers", "max-height-0");
      }
    },
    {
      parent: "#dr_UI_section_filter .dr_UI_head",
      id: "dr_UI_section_filter_close",
      icon: chevron_down,
      handler: () => {
        toggle_elementClass("dr_UI_section_filter_close", "hidden");
        toggle_elementClass("dr_UI_section_filter_open", "hidden");
        toggle_elementClass("dr_UI_body_filter", "max-height-0");
      }
    },
    {
      parent: "#dr_UI_section_filter .dr_UI_head",
      className: "hidden",
      id: "dr_UI_section_filter_open",
      icon: chevron_up,
      handler: () => {
        toggle_elementClass("dr_UI_section_filter_close", "hidden");
        toggle_elementClass("dr_UI_section_filter_open", "hidden");
        toggle_elementClass("dr_UI_body_filter", "max-height-0");
      }
    }
  ];

  icon_btn_dr_UI_headlines.forEach(({ parent, className, id, icon, handler }) => {
    init_iconButton(parent, className, id, icon, handler);
  });

  init_button("#dr_UI_section_hiddenUsers .dr_UI_footer", "dr_btn_secondary hidden", "btn_unhideAll", "Unhide All", null, () => {
    handle_unhideAll();
  });

  const intervals_btn_sectionFilter = {};
  // init first two buttons
  const btn_sectionFilter = [
    {
      className: "dr_btn_primary hidden",
      id: "btn_stopScrollUntilLoaded",
      text: "Stop scrolling",
      handler: () => {
        toggle_elementClass("btn_stopScrollUntilLoaded", "hidden");
        toggle_elementClass("btn_scrollUntilLoaded", "hidden");
        handle_stopScrollUntilLoaded(intervals_btn_sectionFilter, "interval_scrollUntilLoaded");
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
        handle_scrollUntilLoaded(intervals_btn_sectionFilter, "interval_scrollUntilLoaded");
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
  btn_sectionFilter.forEach(({ className, id, text, dataUserID, handler }) => {
    init_button("#dr_UI_body_filter", className, id, text, dataUserID, handler);
  });


  // init dr_UI_wrapper_minMaxAge
  init_element("#dr_UI_body_filter", "div", "dr_UI_col", "dr_UI_wrapper_minMaxAge", null);

  init_element("#dr_UI_wrapper_minMaxAge", "div", "dr_UI_row", "dr_UI_wrapper_inputs_minMaxAge", null);
  // init input_minAge
  let minAgeValue = JSON.parse(localStorage.getItem("dr_minMaxAge")).minAge;
  init_input("#dr_UI_wrapper_inputs_minMaxAge", "input_minAge", "dr_input", "number", "18",
    minAgeValue, "Min Age", "dr_label", null
  );
  // init input_maxAge
  let maxAgeValue = JSON.parse(localStorage.getItem("dr_minMaxAge")).maxAge;
  init_input("#dr_UI_wrapper_inputs_minMaxAge", "input_maxAge", "dr_input", "number", "99",
    maxAgeValue, "Max Age", "dr_label", null
  );

  init_button("#dr_UI_wrapper_minMaxAge", "dr_btn_secondary", "btn_hideMinMaxAge", "Hide Users", null, () => {
    // toggle btn_minMaxAge
    toggle_elementClass("btn_hideMinMaxAge", "hidden");
    toggle_elementClass("btn_showMinMaxAge", "hidden");
    handle_btn_hideMinMaxAge();
  });
  init_button("#dr_UI_wrapper_minMaxAge", "dr_btn_primary hidden", "btn_showMinMaxAge", "Show Users", null, () => {
    // toggle btn_minMaxAge
    toggle_elementClass("btn_showMinMaxAge", "hidden");
    toggle_elementClass("btn_hideMinMaxAge", "hidden");
    handle_btn_showMinMaxAge();
  });


  // init input_matchHighlightPercent
  let matchPercentValue = JSON.parse(localStorage.getItem("dr_matchHighlightPercent"));
  init_input("#dr_UI_body_filter", "input_matchHighlightPercent", "dr_input", "number", "Match highlight above",
    matchPercentValue, "Match highlight above", "dr_label", null
  );

  // init btn_matchHighlightPercent
  init_button("[for='input_matchHighlightPercent']", "dr_btn_secondary", "btn_matchHighlightPercent", "Match highlight above", null, () => {
    // toggle match highlight
    handle_btn_matchHighlightPercent("input_matchHighlightPercent", "btn_matchHighlightPercent");
    set_matchHighlightPercent();
  });

  init_element("[for='input_matchHighlightPercent']", "div", null, "dr_UI_wrapper_hideMatchHighlightPercent", null);
  init_button("#dr_UI_wrapper_hideMatchHighlightPercent", "dr_btn_secondary", "btn_hideMatchHighlightPercent", "Hide Users below", null, () => {
    toggle_elementClass("btn_hideMatchHighlightPercent", "hidden");
    toggle_elementClass("btn_showMatchHighlightPercent", "hidden");
    handle_hideMatchHighlightPercent();
  });
  init_button("#dr_UI_wrapper_hideMatchHighlightPercent", "dr_btn_primary hidden", "btn_showMatchHighlightPercent", "Show Users below", null, () => {
    toggle_elementClass("btn_hideMatchHighlightPercent", "hidden");
    toggle_elementClass("btn_showMatchHighlightPercent", "hidden");
    handle_showMatchHighlightPercent();
  });

  // init input_notCity
  init_input("#dr_UI_body_filter", "input_notCity", "dr_input", "text", "Hightlight cities except this", "Hamburg", "Highlight except", "dr_label",
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
    bootstrap_userCard,
    handle_hideOfflineUsers,
    set_minMaxAge,
    set_hiddenUsers
  ];
  init_dr_UI.forEach(callback => callback());
  observe_scroll(init_dr_UI);

}

