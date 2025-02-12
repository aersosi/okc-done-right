(function(logConsole = false, logError = false, prefix = "pickData_") {

  let fileIndex = 1; // Counter for file numbering
  const originalFetch = window.fetch;

  window.fetch = async function(...args) {
    return originalFetch(...args).then(async (response) => {
      const clonedResponse = response.clone();

      try {
        const responseData = await clonedResponse.json();
        const jsonString = JSON.stringify(responseData, null, 2);
        const blob = new Blob(["const " + prefix + " = " + jsonString + ";"], { type: "application/javascript" });

        const fileName = prefix + fileIndex++ + ".js";

        // Create a download link and trigger download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        logConsole && console.log("Saved: " + fileName);
      } catch (err) {
        logError && console.error(err);
      }

      return response;
    });
  };

})();
