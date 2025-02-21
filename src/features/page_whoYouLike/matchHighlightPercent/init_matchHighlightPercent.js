export function init_matchHighlightPercent() {
  let matchPercentValue;
  const storedValue = localStorage.getItem("dr_matchHighlightPercent");

  if (storedValue === null) {
    matchPercentValue = 90;
    localStorage.setItem("dr_matchHighlightPercent", JSON.stringify(matchPercentValue));
  }
}