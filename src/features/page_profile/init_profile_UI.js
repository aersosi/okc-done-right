import { init_blockBtn } from "../general/init_blockBtn.js";

export function init_profile_UI() {
  const buttonsWrapper = document.querySelector(".profile-userinfo-buttons .profile-pill-buttons");
  console.log(buttonsWrapper);
  if (buttonsWrapper) init_blockBtn(buttonsWrapper, true);
}
