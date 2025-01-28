export function toggle_elementClass(elementID, className = "hidden") {
  const element = document.getElementById(elementID);
  if (!element) {
  logError && console.error(`Error: Element "${elementID}" not found.`);
    return;
  }
  element.classList.toggle(className);
}