import { waitFor_element } from "./waitFor_element.js";

export function observe_stateChanges({
                                       URL_includes,
                                       waitForElement = ["#root", null],
                                       logConsole = false,
                                       logEvent = false,
                                       logError = false,
                                       eventsToListen = ["visibilitychange", "resize"],
                                       run_before_interactive = [],
                                       document_interactive = [],
                                       document_complete = []
                                     }) {
  // Konvertiere Funktionen in Arrays
  run_before_interactive = typeof run_before_interactive === 'function' ? [run_before_interactive] : run_before_interactive;
  document_interactive = typeof document_interactive === 'function' ? [document_interactive] : document_interactive;
  document_complete = typeof document_complete === 'function' ? [document_complete] : document_complete;

  let oldHref = document.location.href;
  const observedElements = new Set();

  let hasRunBeforeInteractive = false;
  let hasRunDocumentInteractive = false;
  let hasRunDocumentComplete = false;
  let isRunning = false;

  const [targetSelector, elementCallback] = Array.isArray(waitForElement)
    ? waitForElement
    : [waitForElement, null];

  async function runFunctions(event) {
    logEvent && console.log("Event triggered:", event?.type, event?.target);

    if (!document.location.href.includes(URL_includes)) return;
    if (isRunning) return;
    isRunning = true;

    try {
      if (!hasRunBeforeInteractive) {
        try {
          logConsole && console.log("Running run_before_interactive functions");
          await Promise.all(run_before_interactive.map(fn => fn()));
          hasRunBeforeInteractive = true;
        } catch (error) {
          logError && console.error("Error in run_before_interactive:", error);
        }
      }

      if (!hasRunDocumentInteractive && (document.readyState === "interactive" || document.readyState === "complete")) {
        try {
          logConsole && console.log("Running document_interactive functions");
          await Promise.all(document_interactive.map(fn => fn()));
          hasRunDocumentInteractive = true;
        } catch (error) {
          logError && console.error("Error in document_interactive:", error);
        }
      }

      if (!observedElements.has(targetSelector)) {
        try {
          const element = await waitFor_element(targetSelector);
          if (element) {
            observedElements.add(targetSelector);
            if (elementCallback) {
              await elementCallback();
            }
          }
        } catch (error) {
          logError && console.error("Error waiting for element:", error);
        }
      }

      if (!hasRunDocumentComplete && (document.readyState === "complete" || observedElements.has(waitForElement))) {
        try {
          logConsole && console.log("Running document_complete functions");
          await Promise.all(document_complete.map(fn => fn()));
          hasRunDocumentComplete = true;
        } catch (error) {
          logError && console.error("Error in document_complete:", error);
        }
      }
    } finally {
      isRunning = false;
    }
  }

  runFunctions();

  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      hasRunBeforeInteractive = false;
      hasRunDocumentInteractive = false;
      hasRunDocumentComplete = false;
      runFunctions();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true, attributes: false });
  eventsToListen.forEach(event => window.addEventListener(event, runFunctions));

  window.addEventListener("beforeunload", () => {
    observer.disconnect();
    eventsToListen.forEach(event => window.removeEventListener(event, runFunctions));
  });
}