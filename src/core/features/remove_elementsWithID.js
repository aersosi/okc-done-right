export function remove_elementsWithID(idArrary, logConsole = false) {
  idArrary.forEach(id => {
    const element = document.getElementById(id);
    logConsole && !element && console.warn(`Element with ID "${id}" not found.`);

    element && element.remove();
  })
}