export function init_firstMessage(className, firstMessage) {
  if (firstMessage == null) {
    return null;
  }

  // calculate how long ago you send the message to this user
  const dateThen = new Date(firstMessage);
  const dateNow = new Date();
  const diffDays = Math.floor( (dateNow - dateThen)/ (1000 * 60 * 60 * 24));

  const element = document.createElement("div");
  element.classList.add(className);
  if(diffDays >= 14) element.classList.add("twoWeeksAgo"); // if messaged send long ago, back bg color
  element.setAttribute("title", `Messaged ${diffDays} days ago`);
  return element;
}
