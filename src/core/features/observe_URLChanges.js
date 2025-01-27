import { waitFor_element } from "./waitFor_element.js";

export function observe_URLChanges({
                                     URL_includes,
                                     waitForElement = "#root",
                                     logConsole = false,
                                     document_interactive = [],
                                     document_complete = []
                                   }) {

  let oldHref = document.location.href;
  const observedElements = new Set();
  let isRunning = false; // Prevent multiple executions

  async function runFunctions() {
    if (!document.location.href.includes(URL_includes)) return;
    if (isRunning) return;
    isRunning = true;

    if (document.readyState === "interactive" || document.readyState === "complete") {
      logConsole && console.log("Page is interactive!");
      document_interactive.forEach(fn => fn());
    }

    const elementIsNew = !observedElements.has(waitForElement);
    const elementIsAvailable = await waitFor_element(waitForElement);

    if (elementIsNew && elementIsAvailable) {
      observedElements.add(waitForElement);
      logConsole && console.log("Element is available: ", waitForElement);
    }

    if (document.readyState === "complete" && observedElements.has(waitForElement)) {
      logConsole && console.log("Page is complete!");
      document_complete.forEach(fn => fn());
    }

    isRunning = false;
  }

  runFunctions();

  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      runFunctions();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
