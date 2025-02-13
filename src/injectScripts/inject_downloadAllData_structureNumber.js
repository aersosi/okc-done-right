(function(prefix = "_newData_", downloadTimeout = 5000, logConsole = false, logError = false) {
  let fileIndex = 1;
  const originalFetch = window.fetch;
  let pendingDownloads = []; // Zwischenspeicher für JSON-Daten
  let timeoutId = null;

  function getStructureNumber(data) {
    let depth = 0,
      totalKeys = 0,
      arrayLengths = 0,
      primitiveCount = 0;

    function analyze(obj, level) {
      if (level > depth) depth = level;

      if (Array.isArray(obj)) {
        arrayLengths += obj.length;
        for (let i = 0; i < obj.length; i++) {
          analyze(obj[i], level + 1);
        }
      } else if (obj !== null && typeof obj === "object") {
        const keys = Object.keys(obj);
        totalKeys += keys.length;
        for (let i = 0; i < keys.length; i++) {
          analyze(obj[keys[i]], level + 1);
        }
      } else {
        primitiveCount++;
      }
    }

    analyze(data, 1);
    return depth * 1_000_000 + totalKeys * 10_000 + arrayLengths * 100 + primitiveCount;
  }

  function triggerDownloadQueue() {
    if (pendingDownloads.length === 0) return;

    let delay = 0;
    pendingDownloads.forEach(({ jsonData, structureNumber, fileIndex }, i) => {
      setTimeout(() => {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob(
          ["const " + prefix + structureNumber + " = " + jsonString + ";"],
          { type: "application/javascript" }
        );
        const fileName = structureNumber + prefix + fileIndex + ".js";

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        logConsole && console.log("Saved:", fileName);
      }, delay);

      delay += 250; // 250ms Verzögerung pro Datei
    });

    pendingDownloads = []; // Nach dem Download die Liste leeren
  }

  window.fetch = async function(...args) {
    return originalFetch(...args).then(async (response) => {
      if (!response.ok) {
        logError && console.error("Fetch failed:", response.status, response.statusText);
        return response;
      }

      try {
        const clonedResponse = response.clone();
        const responseText = await clonedResponse.text();

        if (!responseText.trim()) {
          console.error("Leere Antwort erhalten.");
        }

        let responseData;
        try {
          responseData = JSON.parse(responseText);
        } catch (jsonError) {
          console.error("Antwort ist kein gültiges JSON: " + responseText.substring(0, 100));

        }

        const structureNumber = getStructureNumber(responseData);

        // JSON-Daten zwischenspeichern
        pendingDownloads.push({ jsonData: responseData, structureNumber, fileIndex });
        fileIndex++; // Index wird nur erhöht, wenn die Datei gespeichert wird

        // Falls schon ein Timer läuft, abbrechen und neu starten
        if (timeoutId) clearTimeout(timeoutId);

        // Nach 5 Sekunden Inaktivität alle gesammelten Daten herunterladen
        timeoutId = setTimeout(triggerDownloadQueue, downloadTimeout);
      } catch (err) {
        logError && console.error("Fehler beim Parsen der Antwort:", err.message);
      }

      return response;
    });
  };
})();
