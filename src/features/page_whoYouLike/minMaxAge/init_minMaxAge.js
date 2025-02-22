export function init_minMaxAge() {
  const storedValue = localStorage.getItem("dr_minMaxAge");
  if (storedValue === null) {
    let minMaxAgeValue = { areHidden: false, minAge: 18, maxAge: 99 };
    localStorage.setItem("dr_minMaxAge", JSON.stringify(minMaxAgeValue));
  } else {
    const newValue = JSON.parse(storedValue);
    const newState = { areHidden: false, minAge: newValue.minAge, maxAge: newValue.maxAge };
    localStorage.setItem("dr_minMaxAge", JSON.stringify(newState));
  }
}