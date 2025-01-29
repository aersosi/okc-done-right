export function clickBlockBtn(event, logError = false) {
  event.preventDefault();
  const clickEvent = new Event("click", { bubbles: true });

  // Locate the modal icon.
  const modalIcon = document.querySelector("[class*='i-ellipsis']");
  if (!modalIcon) {
    logError && console.error("Modal icon not found.");
    return;
  }

  const modalButton = modalIcon.closest("button");
  if (!modalButton) {
    logError && console.error("Modal button not found.");
    return;
  }

  // Simulate a click to open the modal dialog.
  modalButton.dispatchEvent(clickEvent);

  // Wait for the modal to appear in the DOM.
  const baseModal = document.getElementById("BaseModal");
  if (!baseModal) {
    logError && console.error("Base modal not found.");
    return;
  }

  // Look for the "BLOCK" button inside the modal and click it.
  const blockButton = Array.from(baseModal.querySelectorAll("button"))
    .find(button => button.innerText.includes("BLOCK"));

  if (!blockButton) {
    logError && console.error("Block button not found in the modal.");
    return;
  }

  blockButton.dispatchEvent(clickEvent);

  // Wait for the confirmation modal to appear and close it.
  const closeConfirmationModal = setInterval(() => {
    const closeButton = baseModal.querySelector(
      "button[aria-label='Close block confirmation modal']"
    );

    if (closeButton) {
      clearInterval(closeConfirmationModal);
      closeButton.dispatchEvent(clickEvent);
      console.debug("Successfully blocked the user.");
    }
  }, 100);

  // Timeout to avoid infinite intervals in case of an error.
  setTimeout(() => {
    clearInterval(closeConfirmationModal);
  }, 5000);

}