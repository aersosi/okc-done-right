export function set_matchPercentToUserCards() {
  const allMatchPercent = JSON.parse(localStorage.getItem("dr_matchPercent")) || {};

  function init_Elm(tag, className, matchPercent) {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (matchPercent >= 90) {
      element.classList.add("dr_matchHigh");
    }
    element.textContent = matchPercent + "%";
    return element;
  }

  Object.entries(allMatchPercent).forEach(([parentId, matchPercent]) => {
    const parent = document.getElementById(parentId);

    if (!parent) {
      console.error(`Error: Parent with ID "${parentId}" not found.`);
      return;
    }

    if (parent) {
      const element = init_Elm("div", "dr_OKC_matchPercent", matchPercent);
      parent.appendChild(element);
    }
  });

}
