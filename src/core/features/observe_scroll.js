import { debounce } from "../index.js";

export function observe_scroll(callbacks, debounceTime = 100, waitForNewScroll = 1000, logConsole = false) {
  let endTimer = null;

  const debouncedScrollHandler = debounce(() => {
    if (endTimer !== null) clearTimeout(endTimer);

    endTimer = setTimeout(() => {
      logConsole && console.log("Scroll ended");
      callbacks.forEach(fn => fn());
    }, waitForNewScroll);
  }, debounceTime);

  function logData(event) {
    console.log("EventType:", event.type);
  }

  const debouncedLogData = debounce(logData, debounceTime);

  window.addEventListener("scroll", debouncedScrollHandler);
  logConsole && window.addEventListener("scroll", debouncedLogData);
}