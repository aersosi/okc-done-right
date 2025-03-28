import { clickBlockBtn } from "./click_blockBtn.js";

export function init_blockBtn(buttonsWrapper, insertBefore = false) {
  const blockButtonExists = document.getElementById("dr_OKC_blockBtn");
  if (blockButtonExists) return false;

  const blockButton = document.createElement("button");
  blockButton.classList.add("dr_blockBtn");
  blockButton.id = "dr_OKC_blockBtn";

  const span = document.createElement("span");
  span.className = "dr_blockBtn-text";
  span.setAttribute("aria-hidden", "true");
  span.textContent = "BLOCK";
  blockButton.appendChild(span);

  if (insertBefore) {
    buttonsWrapper.insertBefore(blockButton, buttonsWrapper.firstChild);
  } else {
    buttonsWrapper.appendChild(blockButton);
  }

  blockButton.addEventListener("click", clickBlockBtn);
}