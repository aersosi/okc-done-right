import { debounce } from "../../core";

export function observe_scrollDebounced(callbacks, debounceTime = 100, logConsole = false) {
  const debouncedScrollHandler = debounce(() => {
  callbacks.forEach(fn => fn());
  }, debounceTime);

  function logData(event) {
    console.log("EventType:", event.type);
  }

  const debouncedLogData = debounce(logData, debounceTime);

  window.addEventListener("scroll", debouncedScrollHandler);
  logConsole && window.addEventListener("scroll", debouncedLogData);
}


export function observe_scrollTimeout(callbacks, waitForNewScroll = 1000, logConsole = false) {
  let timer = null;

  function onScrollEnd() {
    if (timer !== null) clearTimeout(timer);

    timer = setTimeout(() => {
      logConsole && console.log("Scroll ended");
      callbacks.forEach(fn => fn());
    }, waitForNewScroll);
  }

  window.addEventListener("scroll", onScrollEnd);
}