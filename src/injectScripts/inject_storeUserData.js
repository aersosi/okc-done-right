(function(logConsole = false, logError = false) {
  // 1. Remove localStorage data on init
  localStorage.removeItem("dr_isMoreData");
  localStorage.removeItem("dr_allUserData");

  // 2. Fetch data
  const originalFetch = window.fetch;

  // 3. Await fetch & clone response
  window.fetch = async function(...args) {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();

    clonedResponse.json().then(responseData => {
      const responseDataMe = responseData?.data?.me;

      // 4. Save hasMore to localStorage
      if (responseDataMe?.likes?.pageInfo) {
        logConsole && console.log(responseDataMe.likes.pageInfo);
        logConsole && console.log(responseDataMe.likes.pageInfo.hasMore);
        localStorage.setItem("dr_isMoreData", responseDataMe.likes.pageInfo.hasMore);
      }

      // 5. save userID and matchPercent to localstore
      if (responseDataMe?.likes?.data) {
        let userData = {};

        responseDataMe.likes.data.forEach((like) => {
          userData[like.user.id] = [like.user.username, like.user.age, like.matchPercent, like.senderMessageTime];
        });
        logConsole && console.log(userData);

        let existingData;
        try {
          const storedData = localStorage.getItem("dr_allUserData");
          existingData = storedData ? JSON.parse(storedData) : {}; // Fallback to empty object
        } catch (error) {
          logError && console.error("Error parsing dr_allUserData from localStorage:", error);
          existingData = {};
        }
        const updatedData = { ...existingData, ...userData };

        localStorage.setItem("dr_allUserData", JSON.stringify(updatedData));
      }
    }).catch((err) => {
      logError && console.error(err);
    });

    return response;
  };

})();
