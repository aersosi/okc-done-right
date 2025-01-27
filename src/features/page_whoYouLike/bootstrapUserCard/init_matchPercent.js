export function init_matchPercent(className, matchPercent) {
  const element = document.createElement("div");
  element.classList.add(className);
  element.classList.toggle("dr_matchHigh", matchPercent >= 90);

  element.textContent = matchPercent + "%";
  return element;
}
