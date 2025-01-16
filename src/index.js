import { init_element, inject_script, inject_stylesheetToHead, observe_URLChanges, waitForElement } from "./core";

import { inject_interceptGraphQL } from "../dist_js/inject_interceptGraphQL.js";
import { inject_matchPercent } from "../dist_js/inject_matchPercent.js";
import { okc_overrides } from "../dist_styles/okc_overrides.js";
import { dr_variables } from "../dist_styles/dr_variables.js";
import { dr_elements } from "../dist_styles/dr_elements.js";
import { dr_UI_sections } from "../dist_styles/dr_UI_sections.js";
import { dr_UI } from "../dist_styles/dr_UI.js";
import { dr_helper } from "../dist_styles/dr_helper.js";
import { whoyoulikePage_styles } from "../dist_styles/whoyoulikePage_styles.js";
import { messagesPage_styles } from "../dist_styles/messagesPage_styles.js";
import { discoverPage_styles } from "../dist_styles/discoverPage_styles.js";

import { init_whoYouLike_UI } from "./features/WhoYouLikePage/init_whoYouLike_UI.js";
import { init_discover_UI } from "./features/DiscoverPage/init_discover_UI.js";

(async function() {
  "use strict";

  observe_URLChanges(
    {
      URL_includes: "okcupid.com",
      document_interactive: [
        () => inject_script(inject_interceptGraphQL, "inject_interceptGraphQL"),
        () => inject_script(inject_matchPercent, "inject_matchPercent"),
        () => inject_stylesheetToHead(okc_overrides, "okc_overrides"),
        () => inject_stylesheetToHead(dr_variables, " dr_variables"),
        () => inject_stylesheetToHead(dr_elements, " dr_elements"),
        () => inject_stylesheetToHead(dr_UI, " dr_UI"),
        () => inject_stylesheetToHead(dr_helper, "dr_helper"),
        () => {
          // clear dr_UI on page load
          const dr_UI_wrapper = document.getElementById("dr_UI_wrapper");
          if (dr_UI_wrapper) dr_UI_wrapper.remove();
        }
      ]
    }
  )
  ;

  observe_URLChanges(
    {
      URL_includes: "who-you-like",
      document_interactive: [
        () => inject_stylesheetToHead(whoyoulikePage_styles, "whoyoulikePage_styles"),
        () => inject_stylesheetToHead(dr_UI_sections, " dr_UI_sections")
      ],
      document_complete: [
        () => waitForElement(".userrow-bucket-display-card", () => {
          init_element("body", "div", "dr_UI_wrapper", "dr_UI_wrapper");
          init_whoYouLike_UI();
        })
      ]
    }
  );

  observe_URLChanges(
    {
      URL_includes: "messages",
      document_interactive: [
        () => inject_stylesheetToHead(messagesPage_styles, "messagesPage_styles")
      ],
      document_complete: [
        () => console.log("Messages Page is ready!")
      ]
    }
  );

  observe_URLChanges(
    {
      URL_includes: "discover",
      document_interactive: [
        () => inject_stylesheetToHead(discoverPage_styles, "discoverPage_styles")
      ],
      document_complete: [
        () => {
          init_discover_UI();
        }
      ]
    }
  );

})();
