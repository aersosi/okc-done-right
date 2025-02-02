import { inject_scriptToHead, inject_stylesToHead, observe_stateChanges, remove_elementsWithID } from "./core";

import { init_whoYouLike_UI } from "./features/page_whoYouLike/init_whoYouLike_UI.js";
import { init_discover_UI } from "./features/page_discover/init_discover_UI.js";
import { init_profile_UI } from "./features/page_profile/init_profile_UI.js";

import { inject_storeUserData } from "../dist_js/inject_storeUserData.js";

import { censor_okc } from "../dist_styles/censor_okc.js";
import { okc_overrides } from "../dist_styles/okc_overrides.js";
import { okc_superlikeBtn } from "../dist_styles/okc_superlikeBtn.js";
import { okc_userThumb } from "../dist_styles/okc_userThumb.js";
import { dr_blockBtn } from "../dist_styles/dr_blockBtn.js";

import { dr_variables } from "../dist_styles/dr_variables.js";
import { dr_helper } from "../dist_styles/dr_helper.js";
import { dr_UI } from "../dist_styles/dr_UI.js";
import { dr_UI_sections_whoYouLike } from "../dist_styles/dr_UI_sections_whoYouLike.js";
import { dr_components } from "../dist_styles/dr_components.js";

import { styles_pageDiscover } from "../dist_styles/styles_pageDiscover.js";
import { styles_pageMessages } from "../dist_styles/styles_pageMessages.js";
import { styles_pageProfile } from "../dist_styles/styles_pageProfile.js";
import { styles_pageWhoYouLike } from "../dist_styles/styles_pageWhoYouLike.js";
import { init_resizeChat } from "./features/resizeChat/init_resizeChat.js";

(async function() {
  "use strict";

  observe_stateChanges(
    {
      URL_includes: "okcupid.com",
      before_document_interactive: [
        () => remove_elementsWithID(["dr_UI_wrapper", "okc_superlikeBtn", "okc_userThumb"]),

        () => inject_stylesToHead(dr_variables, "dr_variables"),
        () => inject_stylesToHead(dr_helper, "dr_helper"),
        () => inject_stylesToHead(dr_UI, "dr_UI"),
        () => inject_stylesToHead(dr_components, "dr_components"),
      ],
      document_interactive: [
        () => inject_stylesToHead(okc_overrides, "okc_overrides"),
        () => inject_stylesToHead(censor_okc, "censor_okc"),
        () => init_resizeChat(),
      ]
    }
  );

  observe_stateChanges(
    {
      URL_includes: "discover",
      waitForElement: ".dt-action-buttons",
      document_interactive: [
        () => inject_stylesToHead(dr_blockBtn, "dr_blockBtn"),
        () => inject_stylesToHead(styles_pageDiscover, "styles_pageDiscover"),
      ],
      document_complete: [
        () => {
          init_discover_UI();
        }
      ]
    }
  );

  observe_stateChanges(
    {
      URL_includes: "messages",
      document_interactive: [
        () => inject_stylesToHead(styles_pageMessages, "styles_pageMessages")
      ],
      document_complete: [
        () => console.log("Messages Page is ready!")
      ]
    }
  );

  observe_stateChanges(
    {
      URL_includes: "profile",
      waitForElement: ".profile-userinfo",
      document_interactive: [
        () => inject_stylesToHead(dr_blockBtn, "dr_blockBtn"),
        () => inject_stylesToHead(styles_pageProfile, "styles_pageProfile"),
      ],
      document_complete: [
        () => {
          init_profile_UI();
        }
      ]
    }
  );

  observe_stateChanges(
    {
      URL_includes: "who-you-like",
      waitForElement: ".userrow-bucket-container",
      document_interactive: [
        () => inject_scriptToHead(inject_storeUserData, "inject_storeUserData"),
        () => inject_stylesToHead(okc_superlikeBtn, "okc_superlikeBtn"),
        () => inject_stylesToHead(okc_userThumb, "okc_userThumb"),
        () => inject_stylesToHead(dr_UI_sections_whoYouLike, "dr_UI_sections_whoYouLike"),
        () => inject_stylesToHead(styles_pageWhoYouLike, "styles_pageWhoYouLike")
      ],
      document_complete: [
        () => init_whoYouLike_UI()
      ]
    }
  );

})();
