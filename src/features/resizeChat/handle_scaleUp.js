import { inject_stylesToHead } from "../../core";
import { resize_okc_messangerWindow } from "../../../dist_styles/resize_okc_messangerWindow.js";

export function handle_scaleUp() {
  inject_stylesToHead(resize_okc_messangerWindow, "resize_okc_messangerWindow");
}
