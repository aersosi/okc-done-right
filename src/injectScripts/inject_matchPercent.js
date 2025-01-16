(function(logConsole = false) {
  // Save the original fetch function
  const originalFetch = window.fetch;

  // Override the fetch function
  window.fetch = async function(...args) {
    const response = await originalFetch(...args);
    const clonedResponse = response.clone();

    function init_Elm(parentElementID, elementName, elementClasses, elementText) {
      const parent = document.getElementById(parentElementID);
      if (parent) {
        const element = document.createElement(elementName);
        element.classList.add.apply(element.classList, elementClasses.split(" "));
        element.textContent = elementText;
        parent.appendChild(element);
      }
    }

    clonedResponse.json().then(function(responseData) {
      const meData = responseData && responseData.data && responseData.data.me;

      if (meData && meData.likes && meData.likes.data) {

        const firstParentInterval = setInterval(function() {
          const firstParent = document.getElementById(meData.likes.data[0].user.id);

          if (firstParent) {
            meData.likes.data.forEach(function(like) {
              init_Elm(like.user.id, "div", "dr_OKC_matchPercent", like.matchPercent + "%");
            });
            clearInterval(firstParentInterval);
          }

        }, 200);

        setTimeout(() => {
          clearInterval(firstParentInterval);
        }, 5000);

      } else if (logConsole) {
        console.warn("No likes data available.");
      }
    }).catch(function(err) {
      if (logConsole) console.warn("Could not parse response body:", err);
    });

    return response;
  };
})();