export function remove_ElementsOnLoad(idArrary) {
  idArrary.forEach(id => {
    const element = document.getElementById(id);
    !element && console.warn(`Element with ID "${id}" not found.`);

    element && element.remove();
  })
}