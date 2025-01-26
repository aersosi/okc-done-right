export function waitFor_element(selector, interval = 250) {
  return new Promise(resolve => {
    const checkElement = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(checkElement);
        resolve(true);
      }
    }, interval);
  });
}