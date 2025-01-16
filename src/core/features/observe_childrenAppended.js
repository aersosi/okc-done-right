export function observe_childrenAppended(targetClass, observer, callbackFunction) {
  const container = document.querySelector(targetClass);
  if (!container) return;

  if (observer) observer.disconnect();

  observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        callbackFunction();
        break;
      }
    }
  });

  observer.observe(container, { childList: true });
}