export function waitFor_element(selector, interval = 250, timeout = 5000, logConsole = false, logError = false) {
  return new Promise((resolve, reject) => {
    // Start interval to check for the element
    const checkElement = setInterval(() => {
      logConsole && console.log(`Searching for element: ${selector}`);
      if (document.querySelector(selector)) {
        logConsole && console.log(`Element found: ${selector}`);
        clearInterval(checkElement);
        clearTimeout(timeoutId); // Cancel timeout since the element was found
        resolve(true);
      }
    }, interval);

    // Timeout to prevent endless checking
    const timeoutId = setTimeout(() => {
      clearInterval(checkElement);
      logError && console.error(`Timeout reached, element not found: ${selector}`);
      // Reject the promise if element not found within timeout
      reject(new Error(`Element '${selector}' was not found within timeout.`));
      // reject();
    }, timeout);
  });
}
