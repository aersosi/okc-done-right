import { init_iconButton, toggle_elementClass, waitFor_element } from "../../core/index.js";
import { handle_scaleUp } from "./handle_scaleUp.js";
import { handle_scaleDown } from "./handle_scaleDown.js";

const LS_KEY = "dr_resizeChat";

// Liest den Zustand aus dem localStorage; setzt einen Default, falls noch nicht vorhanden.
function getResizeChatState(logConsole = true, logError = true) {
  const storedValue = localStorage.getItem(LS_KEY);
  if (storedValue === null) {
    localStorage.setItem(LS_KEY, JSON.stringify(false));
    return false;
  }
  try {
    const value = JSON.parse(storedValue);
    logConsole && console.log("resizeChatValue:", value);
    return value;
  } catch (error) {
    logError && console.error("Error parsing localStorage value for dr_resizeChat:", error);
    return false;
  }
}

// Holt den Wrapper oder erstellt ihn, falls er nicht existiert.
function getOrCreateWrapper(profileLink) {
  let wrapper = document.getElementById("dr_UI_resizeChat_wrapper");
  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.id = "dr_UI_resizeChat_wrapper";
    profileLink.after(wrapper);
  }
  return wrapper;
}

export async function init_resizeChat(logConsole = true, logError = true) {
  const resizeChatValue = getResizeChatState();

  // Warte, bis das Messenger-Element verfügbar ist
  const elementAvailable = await waitFor_element(".messenger-main-window-user-row");
  if (!elementAvailable) {
    logError && console.error("Error: '.messenger-main-window-user-row' timeout.");
    return;
  }

  const messengerRow = document.querySelector(".messenger-main-window-user-row");
  if (!messengerRow) {
    logError && console.error("Error: Messenger row not found.");
    return;
  }
  logConsole && console.log("Element available: .messenger-main-window-user-row");

  // Hole das erste Kindelement (den Profil-Link)
  const profileLink = messengerRow.firstElementChild;
  if (!profileLink) {
    logError && console.error("Error: Profile link not found in messenger row.");
    return;
  }

  // Wrapper für die Buttons holen oder erstellen
  getOrCreateWrapper(profileLink);

  // Klick-Handler als separate Funktionen definieren
  const onScaleUpClick = () => {
    handle_scaleUp(LS_KEY, true);
    // Buttons umschalten (können je nach Design angepasst werden)
    toggle_elementClass("dr_UI_resizeChat_scaleUp", "hidden");
    toggle_elementClass("dr_UI_resizeChat_scaleDown", "hidden");
  };

  const onScaleDownClick = () => {
    handle_scaleDown(LS_KEY, false);
    toggle_elementClass("dr_UI_resizeChat_scaleDown", "hidden");
    toggle_elementClass("dr_UI_resizeChat_scaleUp", "hidden");
  };

  // Initialisiere die Buttons nur, wenn sie noch nicht im DOM vorhanden sind
  if (!document.getElementById("dr_UI_resizeChat_scaleUp")) {
    init_iconButton("#dr_UI_resizeChat_wrapper", "dr_icon_chevron_up", "dr_UI_resizeChat_scaleUp", onScaleUpClick);
  }
  if (!document.getElementById("dr_UI_resizeChat_scaleDown")) {
    init_iconButton("#dr_UI_resizeChat_wrapper", "hidden dr_icon_chevron_down", "dr_UI_resizeChat_scaleDown", onScaleDownClick);
  }

  // Setze die Skalierung beim Laden anhand des gespeicherten Zustands
  if (resizeChatValue) {
    // Wenn true, Chat vergrößern und Buttons entsprechend anpassen
    toggle_elementClass("dr_UI_resizeChat_scaleDown", "hidden");
    toggle_elementClass("dr_UI_resizeChat_scaleUp", "hidden");
    handle_scaleUp(LS_KEY, true);
  } else {
    handle_scaleDown(LS_KEY, false);
  }
}
