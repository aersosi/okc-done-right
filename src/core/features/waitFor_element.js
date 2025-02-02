export function waitFor_element(selector, interval = 250, logConsole = false) {
  return new Promise(resolve => {
    const checkElement = setInterval(() => {
      logConsole && console.log(`Search Element: ${selector}`);
      if (document.querySelector(selector)) {
        logConsole && console.log(`Element found: ${selector}`);
        clearInterval(checkElement);
        resolve(true);
      }
    }, interval);

    // Timeout to avoid infinite intervals in case of an error.
    setTimeout(() => {
      clearInterval(checkElement);
    }, 5000);
  });
}