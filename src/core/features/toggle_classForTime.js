export function toggle_classForTime(elementID, className1 = "visible", className2 = "hidden", timeout= 500, logError = false) {
  const element = document.getElementById(elementID);
  if (!element) {
    logError && console.error(`Error: Element "${elementID}" not found.`);
    return;
  }
  element.classList.toggle(className1);
  element.classList.toggle(className2);
  setTimeout(() => {
    element.classList.toggle(className2);
    element.classList.toggle(className1);
  }, timeout);
}