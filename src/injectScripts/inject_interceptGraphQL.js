(function(logConsole = false, logConfig = false, logData = false) {
  // Save the original fetch function
  const originalFetch = window.fetch;

  // Override the fetch function
  window.fetch = async function(...args) {
    const [resource, config] = args;

    // Check if the request is to the desired GraphQL endpoint

    // /graphql?operationName=userrowsOutgoingLikes
    if (resource.includes("/graphql")) {
      logConfig && console.log("Intercepted GraphQL API call to:", resource);

      if (config && logConfig) {
        console.log("Request Config:", config);

        // If the request has a body (like a GraphQL query), log it
        if (config.body) {
          try {
            const parsedBody = JSON.parse(config.body);
            console.log("GraphQL Query/Operation:", parsedBody);
          } catch (e) {
            console.warn("Could not parse request body:", config.body);
          }
        }
      }
    }

    // Call the original fetch function and return its result
    const response = await originalFetch(...args);

    // Clone the response so we can read it without interfering with the app
    const clonedResponse = response.clone();
    clonedResponse.json().then((data) => {
      logData && console.log("GraphQL Response Data:", data);
      if (data) {
        localStorage.setItem(
          "ae_OKC_data",
          JSON.stringify(data)
        );
      }


    }).catch((err) => {
      logConsole && console.warn("Could not parse response body:", err);
    });
    return response;
  };
})();