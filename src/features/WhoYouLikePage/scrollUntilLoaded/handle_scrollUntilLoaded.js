import { toggle_elementClass } from "../../../core";

export function handle_scrollUntilLoaded(gloabalIntervals, intervaID, logConsole = false) {
  logConsole && console.log(intervaID);

  let previousScrollPosition = 0;

  function handle_scrollDown() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });

    const loaderIndicator = document.querySelector(".ok-css-loader");
    const currentScrollPosition = window.scrollY + window.innerHeight;

    // Stop scrolling
    if (!loaderIndicator && previousScrollPosition === currentScrollPosition) {
      clearInterval(gloabalIntervals[intervaID]); // Use the interval name to clear
      delete gloabalIntervals[intervaID]; // Remove the interval from storage

      toggle_elementClass("btn_scrollUntilLoaded", "hidden");
      toggle_elementClass("btn_stopScrollUntilLoaded", "hidden");
      logConsole && console.log("All content is loaded.");
    }
    previousScrollPosition = currentScrollPosition;
  }

  if (gloabalIntervals[intervaID]) {
    console.error(`Interval ${intervaID} is already running.`);
    return;
  }

  // Store interval to global interval object and et the interval
  gloabalIntervals[intervaID] = setInterval(handle_scrollDown, 500);
}