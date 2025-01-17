import { init_element, inject_scriptToHead, inject_stylesToHead, observe_URLChanges, waitForElement } from "./core";

import { inject_interceptGraphQL } from "../dist_js/inject_interceptGraphQL.js";
import { inject_matchPercent } from "../dist_js/inject_matchPercent.js";
import { okc_overrides } from "../dist_styles/okc_overrides.js";
import { okc_superlikeBtn } from "../dist_styles/okc_superlikeBtn.js";
import { okc_userThumb } from "../dist_styles/okc_userThumb.js";
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
import { remove_ElementsOnLoad } from "./core/features/remove_ElementsOnLoad.js";

(async function() {
  "use strict";

  observe_URLChanges(
    {
      URL_includes: "okcupid.com",
      document_interactive: [
        () => remove_ElementsOnLoad(["dr_UI_wrapper", "okc_superlikeBtn", "okc_userThumb"]),
        () => inject_scriptToHead(inject_interceptGraphQL, "inject_interceptGraphQL"),

        () => inject_stylesToHead(okc_overrides, "okc_overrides"),
        () => inject_stylesToHead(dr_variables, "dr_variables"),
        () => inject_stylesToHead(dr_elements, "dr_elements"),
        () => inject_stylesToHead(dr_UI, "dr_UI"),
        () => inject_stylesToHead(dr_helper, "dr_helper"),
      ]
    }
  );

  observe_URLChanges(
    {
      URL_includes: "who-you-like",
      document_interactive: [
        () => inject_scriptToHead(inject_matchPercent, "inject_matchPercent"),

        () => inject_stylesToHead(dr_UI_sections, "dr_UI_sections"),
        () => inject_stylesToHead(okc_superlikeBtn, "okc_superlikeBtn"),
        () => inject_stylesToHead(okc_userThumb, "okc_userThumb")
      ],
      document_complete: [
        () => inject_stylesToHead(whoyoulikePage_styles, "whoyoulikePage_styles"),
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
        () => inject_stylesToHead(messagesPage_styles, "messagesPage_styles")
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
        () => inject_stylesToHead(discoverPage_styles, "discoverPage_styles"),
      ],
      document_complete: [
        () => {
          init_discover_UI();
        }
      ]
    }
  );

})();
