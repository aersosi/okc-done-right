export function init_matchPercent(className, matchPercent) {
  const element = document.createElement("div");
  element.classList.add(className);

  let matchPercentValue = JSON.parse(localStorage.getItem("dr_matchHighlightAbove"));
  element.classList.toggle("dr_matchHigh", matchPercent >= matchPercentValue);

  element.textContent = matchPercent + "%";
  return element;
}
