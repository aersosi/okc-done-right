export function set_matchHighlightAbove() {
  const matchPercentValue = JSON.parse(localStorage.getItem("dr_matchHighlightAbove"));

  const matchPercentPills = document.querySelectorAll(".dr_OKC_matchPercent");
  matchPercentPills.forEach(pill => {
    const pillText = pill.textContent.replace(/%/g, '').trim();
    const pillValue = Number(pillText);

    if (pillValue >= matchPercentValue) {
      pill.classList.add("dr_matchHigh");
    } else {
      pill.classList.remove("dr_matchHigh");
    }
  });
}