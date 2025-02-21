export function set_minMaxAge( logError = false) {
  const storedValue = JSON.parse(localStorage.getItem("dr_minMaxAge"));
  const inputMinAge = document.getElementById("input_minAge");
  const inputMaxAge = document.getElementById("input_maxAge");

  const minAge = inputMinAge ? parseInt(inputMinAge.value) : storedValue.minAge;
  const maxAge = inputMaxAge ? parseInt(inputMaxAge.value) : storedValue.maxAge;

  document.querySelectorAll(".userrow-bucket-display-card").forEach(card => {
    const cardAge = parseInt(card.dataset.dr_user_age);
    const container = card.closest(".userrow-bucket-card-link-container");

    if (storedValue.areHidden && (cardAge < minAge || cardAge > maxAge)) {
      container.classList.add("not-minMaxAge");
    } else {
      container.classList.remove("not-minMaxAge");
    }
  });

}