export function init_matchHighlightAbove() {
  let matchPercentValue;
  const storedValue = localStorage.getItem("dr_matchHighlightAbove");

  if (storedValue === null) {
    matchPercentValue = 90;
    localStorage.setItem("dr_matchHighlightAbove", JSON.stringify(matchPercentValue));
  } else {
    matchPercentValue = JSON.parse(storedValue);
  }

  return matchPercentValue;
}