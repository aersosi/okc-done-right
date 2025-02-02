import { waitFor_element } from "./waitFor_element.js";

export function observe_stateChanges({
                                       URL_includes,
                                       waitForElement = "#root",
                                       logConsole = false,
                                       logEvent = false,
                                       logError = false,
                                       eventsToListen = ["visibilitychange", "resize"],
                                       before_document_interactive = [],
                                       document_interactive = [],
                                       document_complete = []
                                     }) {
  let oldHref = document.location.href;
  const observedElements = new Set();
  let isRunning = false;

  async function runFunctions(event) {
    logEvent && console.log(event?.type);
    logEvent && console.log(event?.target);

    if (!document.location.href.includes(URL_includes)) return;
    if (isRunning) return;
    isRunning = true;

    try {
      if (document.readyState === "interactive" || document.readyState === "complete") {
        logConsole && console.log("Page is interactive!");
        await Promise.all(before_document_interactive.map(fn => fn()));
        await Promise.all(document_interactive.map(fn => fn()));
      }

      // Wait for the target element and ensure it's handled only once
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
    } finally {
      isRunning = false;
    }
  }

  runFunctions();

  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      runFunctions();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: false });
  eventsToListen.forEach((event) => window.addEventListener(event, runFunctions));

  // Cleanup on unload
  window.addEventListener("beforeunload", () => {
    observer.disconnect();
    eventsToListen.forEach((event) => window.removeEventListener(event, runFunctions));
  });
}
