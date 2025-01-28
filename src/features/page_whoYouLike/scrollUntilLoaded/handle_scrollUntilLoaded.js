import { toggle_elementClass } from "../../../core";

export function handle_scrollUntilLoaded(globalIntervals, intervalID, logConsole = false, logError = false) {
  logConsole && console.log(intervalID);

  const loaderIndicator = document.querySelector(".ok-css-loader");
  let previousScrollPosition = 0;

  function handle_scrollDown() {
    // Scroll to the bottom of the page
    window.scrollTo({ top: document.body.scrollHeight - 200, behavior: "instant" });
    const currentScrollPosition = window.scrollY + window.innerHeight;
    const endOfData = localStorage.getItem('dr_isMoreData') === 'false';

    // Stop scrolling when the loader is gone and the scroll position hasn't changed
    if (endOfData && !loaderIndicator) {
      clearInterval(globalIntervals[intervalID]); // Clear the interval
      delete globalIntervals[intervalID]; // Remove interval from storage

      toggle_elementClass("btn_scrollUntilLoaded", "hidden");
      toggle_elementClass("btn_stopScrollUntilLoaded", "hidden");
      logConsole && console.log("All content is loaded.");
    }

    previousScrollPosition = currentScrollPosition;
  }

  // Ensure no interval is running already for this intervalID
  if (globalIntervals[intervalID]) {
  logError && console.error(`Interval ${intervalID} is already running.`);
    return;
  }

  // Start scrolling using setInterval (fallback if necessary)
  globalIntervals[intervalID] = setInterval(handle_scrollDown, 500);
}
