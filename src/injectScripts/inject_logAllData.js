(function(logConsole = false, logError = false) {

  // 2. Fetch data
  const originalFetch = window.fetch;

  // 3. Await fetch & clone response
  window.fetch = async function(...args) {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();

    clonedResponse.json().then(responseData => {
      const responseDataMe = responseData?.data?.me;

      console.log(responseData);
      console.log(responseDataMe);

    }).catch((err) => {
      logError && console.error(err);
    });

    return response;
  };

})();
