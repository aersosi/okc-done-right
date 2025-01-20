(function(logConsole = false) {
  // 1. Remove localStorage data on init
  localStorage.removeItem("dr_isMoreData");
  localStorage.removeItem("dr_matchPercent");

  // 2. Fetch data
  const originalFetch = window.fetch;

  // 3. Await fetch & clone response
  window.fetch = async function(...args) {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();

    clonedResponse.json().then(responseData => {
      const meData = responseData?.data?.me;

      // 4. Save hasMore to localStorage
      if (meData?.likes?.pageInfo) {
        logConsole && console.log(meData.likes.pageInfo);
        logConsole && console.log(meData.likes.pageInfo.hasMore);
        localStorage.setItem("dr_isMoreData", meData.likes.pageInfo.hasMore);

      }

      // 5. save userID and matchPercent to localstore
      if (meData?.likes?.data) {
        let matchData = {};
        meData.likes.data.forEach(like => {
          matchData[like.user.id] = like.matchPercent;
        });
        logConsole && console.log(matchData);

        let existingData;
        try {
          const storedData = localStorage.getItem("dr_matchPercent");
          existingData = storedData ? JSON.parse(storedData) : {}; // Fallback to empty object
        } catch (error) {
          console.warn("Error parsing dr_matchPercent from localStorage:", error);
          existingData = {};
        }
        const updatedData = { ...existingData, ...matchData };

        localStorage.setItem("dr_matchPercent", JSON.stringify(updatedData));
      }
    }).catch((err) => {
      logConsole && console.log(err);
    });

    return response;
  };

})();
