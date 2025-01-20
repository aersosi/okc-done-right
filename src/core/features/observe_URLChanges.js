import { waitForElement } from "./waitForElement.js";

export function observe_URLChanges({
                                     URL_includes,
                                     document_interactive = [],
                                     document_complete = []
                                   }) {
  let oldHref = document.location.href;

  function runFunctions() {
    if (document.location.href.includes(URL_includes)) {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        document_interactive.forEach(fn => fn());
      }

      if (document.readyState === "complete") {
        document_complete.forEach(fn => fn());
      }
    }
  }


  waitForElement(".desktop-dt-wrapper", () => {
    // Initial on page load
    runFunctions();
  });


  // Observe URL changes
  const observer = new MutationObserver(() => {
    // When the URL has changed
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      runFunctions();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
