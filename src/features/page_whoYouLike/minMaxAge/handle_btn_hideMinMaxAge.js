import { set_minMaxAge } from "./set_minMaxAge.js";

export function handle_btn_hideMinMaxAge() {
  const inputMinAge = document.getElementById("input_minAge");
  const inputMaxAge = document.getElementById("input_maxAge");
  const minAgeValue = inputMinAge ? parseInt(inputMinAge.value) : 18;
  const maxAgeValue = inputMaxAge ? parseInt(inputMaxAge.value) : 99;

  const newState = { areHidden: true, minAge: minAgeValue, maxAge: maxAgeValue };
  localStorage.setItem("dr_minMaxAge", JSON.stringify(newState));

  set_minMaxAge();
}
