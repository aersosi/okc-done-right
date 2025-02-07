import { remove_elementsWithID } from "../../core";

export function handle_scaleDown(LS_KEY, resizeChatValue, logConsole = false) {
  localStorage.setItem(LS_KEY, JSON.stringify(resizeChatValue));
  logConsole && console.log("passed value", resizeChatValue);
  logConsole && console.log("localstorage", JSON.parse(localStorage.getItem(LS_KEY)));
  remove_elementsWithID(["resize_okc_messangerWindow"]);
}