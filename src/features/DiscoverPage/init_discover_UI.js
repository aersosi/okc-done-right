import { clickBlockBtn } from "./click_blockBtn.js";

export function init_discover_UI() {
  const bindTheButton = (buttonsWrapper) => {
    const blockButtonExists = document.getElementById("user-script-block") !== null;

    if (blockButtonExists) {
      return false;
    }

    const blockButton = document.createElement("button");

    const buttonClasses = "dt-action-button block";
    blockButton.classList.add(...buttonClasses.split(" "));
    blockButton.innerHTML = "<span class=\"dt-action-buttons-button-text\" aria-hidden=\"true\">BLOCK</span>";
    blockButton.setAttribute("id", "user-script-block");

    buttonsWrapper.append(blockButton);

    blockButton.addEventListener("click", (event) => clickBlockBtn(event));
  };

  const buttonsWrapper = document.querySelector(".dt-action-buttons");
  if (buttonsWrapper) {
    bindTheButton(buttonsWrapper);
  }
}