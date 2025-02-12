import { inject_stylesToHead } from "../../core";
import { resize_okc_messangerWindow } from "../../../dist_styles/resize_okc_messangerWindow.js";

export function handle_scaleChatUp(dr_btn_scaleChatUp, dr_btn_scaleChatDown) {
  localStorage.setItem("dr_chatIsBig", "true");

  dr_btn_scaleChatUp.classList.add("hidden");
  dr_btn_scaleChatDown.classList.remove("hidden");

  inject_stylesToHead(resize_okc_messangerWindow, "resize_okc_messangerWindow");
}