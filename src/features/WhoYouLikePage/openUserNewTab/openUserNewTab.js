export function openUserNewTab(newTabLinkClass, card) {
  if (!newTabLinkClass) {
    console.error("openNewTabClass is not defined.");
    return;
  }

  if (!card) {
    console.error("card is not defined.");
    return;
  }

  const hasNewTab = card.querySelector(newTabLinkClass);
  if (!hasNewTab) {
    const newTab = document.createElement("a");
    newTab.classList.add("dr_OKC_userNewTabLink");
    newTab.href = `/profile/${card.id}`;
    newTab.target = "_blank";
    newTab.rel = "noopener";
    card.appendChild(newTab);
  }
}
