import { inject_stylesToHead } from "../../core";
import { resize_okc_messangerWindow } from "../../../dist_styles/resize_okc_messangerWindow.js";

export function handle_scaleUp(LS_KEY, resizeChatValue, logConsole = false) {
  localStorage.setItem(LS_KEY, JSON.stringify(resizeChatValue));
  logConsole && console.log("passed value", resizeChatValue);
  logConsole && console.log("localstorage", JSON.parse(localStorage.getItem(LS_KEY)));
  inject_stylesToHead(resize_okc_messangerWindow, "resize_okc_messangerWindow");
}
