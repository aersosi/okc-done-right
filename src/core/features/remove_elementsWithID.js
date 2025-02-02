export function remove_elementsWithID(idArrary, logConsole = false, logError = false) {
  idArrary.forEach(id => {
    const element = document.getElementById(id);

    if (!element) {
      logError && console.error(`Element with ID "${id}" not found.`);
      return;
    }

    element.remove();
  });
}