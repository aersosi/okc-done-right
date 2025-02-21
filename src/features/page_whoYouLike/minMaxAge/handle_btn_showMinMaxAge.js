import { set_minMaxAge } from "./set_minMaxAge.js";

export function handle_btn_showMinMaxAge() {
  const storedValue = JSON.parse(localStorage.getItem("dr_minMaxAge"));
  storedValue.areHidden = false;
  localStorage.setItem("dr_minMaxAge", JSON.stringify(storedValue));

  set_minMaxAge();
}
