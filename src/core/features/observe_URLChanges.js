import { waitFor_Element } from "./waitFor_Element.js";

export function observe_URLChanges({
                                     URL_includes,
                                     waitForElement = "#root",
                                     logConsole = false,
                                     document_interactive = [],
                                     document_complete = []
                                   }) {
  let oldHref = document.location.href;

  function runFunctions() {
    if (document.location.href.includes(URL_includes)) {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        logConsole && console.log("Page is interactive!");
        document_interactive.forEach(fn => fn());
      }

      const interval = setInterval(() => {
        if (document.readyState === "complete") {
          clearInterval(interval);
          logConsole && console.log("Page is complete!");
          document_complete.forEach(fn => fn());
        }
      }, 250);
    }
  }

  waitFor_Element(waitForElement, () => {
    logConsole && console.log("Element loaded!: ", waitForElement);
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
