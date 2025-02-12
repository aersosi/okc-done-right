import { remove_elementsWithID } from "../../core";

export function handle_scaleChatDown(dr_btn_scaleChatUp, dr_btn_scaleChatDown) {
  localStorage.removeItem("dr_chatIsBig");

  dr_btn_scaleChatUp.classList.remove("hidden");
  dr_btn_scaleChatDown.classList.add("hidden");

  remove_elementsWithID(["resize_okc_messangerWindow"]);
}