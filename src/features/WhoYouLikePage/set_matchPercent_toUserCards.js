export function set_matchPercentToUserCards() {
  const allMatchPercent = JSON.parse(localStorage.getItem("dr_matchPercent")) || {};

  function init_matchPercent(tag, className, matchPercent) {
    const element = document.createElement(tag);
    element.classList.add(className);
    if (matchPercent >= 90) {
      element.classList.add("dr_matchHigh");
    }
    element.textContent = matchPercent + "%";
    return element;
  }

  function init_firstMessage(tag, className, firstMessage) {
    if (firstMessage == null) {
      return null;
    }
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
  }

  Object.entries(allMatchPercent).forEach(([parentId, matchPercent]) => {
    const parent = document.getElementById(parentId);

    if (!parent) {
      console.error(`Error: Parent with ID "${parentId}" not found.`);
      return;
    }

    if (parent) {
      const elmMatchPercent = init_matchPercent("div", "dr_OKC_matchPercent", matchPercent[0]);
      const elmFirstMessage = init_firstMessage("div", "dr_OKC_firstMessage", matchPercent[1]);
      parent.appendChild(elmMatchPercent);
      if (elmFirstMessage !== null) {
        parent.appendChild(elmFirstMessage);
      }
    }
  });

}
