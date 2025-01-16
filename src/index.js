import { init_element, inject_script, inject_stylesheetToHead, observe_URLChanges, waitForElement } from "./core";

import { inject_interceptGraphQL } from "../dist_js/inject_interceptGraphQL.js";
import { okc_overrides } from "../dist_styles/okc_overrides.js";
import { ae_colors } from "../dist_styles/ae_colors.js";
import { ae_elements } from "../dist_styles/ae_elements.js";
import { ae_UI_sections } from "../dist_styles/ae_UI_sections.js";
import { ae_UI } from "../dist_styles/ae_UI.js";
import { ae_helper } from "../dist_styles/ae_helper.js";
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
        () => inject_stylesheetToHead(okc_overrides, "okc_overrides"),
        () => inject_stylesheetToHead(ae_colors, " ae_colors"),
        () => inject_stylesheetToHead(ae_elements, " ae_elements"),
        () => inject_stylesheetToHead(ae_UI, " ae_UI"),
        () => inject_stylesheetToHead(ae_helper, "ae_helper"),
        () => {
          // clear ae_UI on page load
          const ae_UI_wrapper = document.getElementById("ae_UI_wrapper");
          if (ae_UI_wrapper) ae_UI_wrapper.remove();
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
        () => inject_stylesheetToHead(ae_UI_sections, " ae_UI_sections")
      ],
      document_complete: [
        () => waitForElement(".userrow-bucket-display-card", () => {
          init_element("body", "div", "ae_UI_wrapper", "ae_UI_wrapper");
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
