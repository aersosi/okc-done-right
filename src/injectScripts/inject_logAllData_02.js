(function(logConsole = true, logError = true) {
  const originalFetch = window.fetch;
  let counter = 1; // Counter for file numbering

  window.fetch = async function(...args) {
    try {
      const response = await originalFetch(...args);
      const clonedResponse = response.clone();

      // Log Headers
      // for (let [key, value] of clonedResponse.headers.entries()) {
      //   console.log("Response Headers:", key + ": " + value);
      // }

      // Log JSON-Body und Struktur
      clonedResponse.json().then(responseData => {
        // const structureNumber = getStructureNumber(responseData);
        console.log("Response JSON:",counter++, responseData);
        // console.log("Structure Number:", structureNumber);
      }).catch(err => {
        logError && console.error("Fehler beim Parsen des JSON:", err);
      });

      return response;
    } catch (error) {
      logError && console.error("Fehler beim Fetch:", error);
      throw error;
    }
  };

})();