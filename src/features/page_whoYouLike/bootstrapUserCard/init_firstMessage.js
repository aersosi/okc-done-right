export function init_firstMessage(className, firstMessage) {
  if (firstMessage == null) {
    return null;
  }
  const element = document.createElement("div");
  element.classList.add(className);
  return element;
}
