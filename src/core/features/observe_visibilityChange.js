export function observe_visibilityChange(callbacks, localsStorageKey, justRun = false, logConsole = false) {
  document.addEventListener("visibilitychange", () => {
    // If tab is focused && (localsStorageKey || justRun)
    if (!document.hidden && (localStorage.getItem(localsStorageKey) || justRun)) {
      // Check if LocalStorage has a specific value
      logConsole && console.log("Running functions on visibilityChange");
      callbacks.forEach(fn => fn());
    }
  });
}