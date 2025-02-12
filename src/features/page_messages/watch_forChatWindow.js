import { init_resizeChat } from "../resizeChat/init_resizeChat.js";

export function watch_forChatWindow(logConsole = false, logError = false) {
  const messageRows = document.querySelectorAll("[data-cy='messages.messageRow']");
  if (!messageRows) {
    logError && console.error("Message rows not found.");
    return;
  }
  messageRows.forEach(row => row.addEventListener("click", init_resizeChat));
}