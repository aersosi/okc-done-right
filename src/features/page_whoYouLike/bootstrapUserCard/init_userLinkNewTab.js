export function init_userLinkNewTab(className, userID) {
  const element = document.createElement("a");
  element.classList.add(className);
  element.href = `/profile/${userID}`;
  element.target = "_blank";
  element.rel = "noopener";
  return element;
}
