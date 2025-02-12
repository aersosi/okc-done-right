// inject_modifyData.js
(function(logConsole = false, logError = false) {

  // 1. Store the original fetch function
  const originalFetch = window.fetch;

  // Config Premiums
  const premiumConfig = {
    ALIST_BASIC: true,
    ALIST_PREMIUM: true,
    ADFREE: true,
    VIEW_VOTES: true,
    INCOGNITO_BUNDLE: true,
    READ_RECEIPTS: true,
    SEE_PUBLIC_QUESTIONS: true,
    INTROS: true,
    UNLIMITED_REWINDS: true
  };

  window.fetch = async function(...args) {
    try {
      const response = await originalFetch(...args);
      const clonedResponse = response.clone();
      const contentType = clonedResponse.headers.get('content-type');

      // Nur JSON-Antworten verarbeiten
      if (!contentType?.includes('application/json')) {
        return response;
      }

      const jsonData = await clonedResponse.json();
      let superlikeCount = jsonData?.data?.me?.superlikeTokenCount;
      const premiums = jsonData?.data?.me?.premiums;
      const stackMatch = jsonData?.data?.me?.stack?.data;

      // console.log(stackMatch)

      if(superlikeCount) {
        superlikeCount = 9999;
      }

      // Overwrite premiums
      if (premiums) {
        Object.keys(premiumConfig).forEach(key => {
          if (premiumConfig[key]) { // Nur wenn der Wert im Config true ist
            premiums[key] = true;
          }
        });
      }

      // Overwrite stackMatch
      if (stackMatch && Array.isArray(stackMatch)) {
        stackMatch.forEach(item => {
          if (item?.match) {
            item.targetLikesSender = true;
            item.match.targetLikes = true;
            item.match.targetVote = "LIKE";
            item.match.targetMessageTime = 1733324295680;

            item.match.senderLikes = true;
            item.match.senderPassed = false;
            item.match.senderVote = null;
          }
        });
      }

      if (logConsole) {
        // console.log("Modified superlikes:", superlikeCount)
        // console.log("Modified premiums:", premiums);
        // console.log("Modified stackMatch:", stackMatch)
        // console.log("Full response:", jsonData);
      }

      // Header and Body update
      const newBody = JSON.stringify(jsonData);
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Content-Length', newBody.length);

      return new Response(newBody, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    } catch (err) {
      logError && console.error("Fetch error:", err);
      return originalFetch(...args);
    }
  };
})(true, true); // Logging aktiviert