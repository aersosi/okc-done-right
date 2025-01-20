import { clickBlockBtn } from "./click_blockBtn.js";

export function init_discover_UI() {
  const bindTheButton = (buttonsWrapper) => {
    const blockButtonExists = document.getElementById("user-script-block");
    if (blockButtonExists) {
      return false;
    }

    const blockButton = document.createElement("button");
    blockButton.classList.add("dt-action-button", "dr_block");
    blockButton.id = "user-script-block";

    const span = document.createElement("span");
    span.className = "dt-action-buttons-button-text";
    span.setAttribute("aria-hidden", "true");
    span.textContent = "BLOCK";
    blockButton.appendChild(span);

    buttonsWrapper.append(blockButton);
    blockButton.addEventListener("click", (event) => clickBlockBtn(event));
  };

  const buttonsWrapper = document.querySelector(".dt-action-buttons");
  if (buttonsWrapper) {
    bindTheButton(buttonsWrapper);
  }
}