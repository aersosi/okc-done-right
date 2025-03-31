(function(logConsole = false, logError = false) {

  // Save original fetch function
  const originalFetch = window.fetch;
  window.

  // Override the fetch function
  window.fetch = async function(input, init) {
    try {
      // Capture the request URL and body
      const url = typeof input === 'string' ? input : input.url;
      const body = init && init.body ? init.body : null;

      // If it's a GraphQL query, check the URL or body for 'operationName'
      if (url.includes('/graphql') && body) {
        const requestBody = JSON.parse(body); // Assuming the body is a JSON string
        const operationName = requestBody.operationName || 'Unknown Operation';
        // console.log('Operation Name:', operationName);

        if (operationName === "WebConversationThread") {
          // Send the request and capture the response
          const response = await originalFetch(input, init);
          const clonedResponse = response.clone();

          // Parse response JSON
          const jsonData = await clonedResponse.json();
          console.log("Intercepted Response Data:", jsonData);

          return response; // Return the original response
        }

      }
    } catch (error) {
      if (logError) console.error('Fetch Intercept Error:', error);
    }

    // Proceed with the original fetch request
    return originalFetch(input, init);
  };

})(true, true); // Enable logging
