(function() {
  function waitForElement(selector, callback) {
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        console.log("Element found:", element);
        clearInterval(interval);
        callback(element);
      }
    }, 100);
  }

  waitForElement(".profile-userdropdown-toggler", (modalButton) => {
    const clickEvent = new Event("click", { bubbles: true });

    // Simulate a click to open the modal dialog.
    modalButton.dispatchEvent(clickEvent);

    // Wait for the modal to appear in the DOM.
    const baseModal = document.getElementById("BaseModal");
    if (!baseModal) {
      console.error("Base modal not found.");
      return;
    }

    // Look for the "BLOCK" button inside the modal and click it.
    const blockButton = Array.from(baseModal.querySelectorAll("button"))
      .find(button => button.innerText.includes("BLOCK"));

    if (!blockButton) {
      console.error("Block button not found in the modal.");
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
        window.close();
      }
    }, 100);

    // Timeout to avoid infinite intervals in case of an error.
    setTimeout(() => {
      clearInterval(closeConfirmationModal);
    }, 5000);
  });

})();