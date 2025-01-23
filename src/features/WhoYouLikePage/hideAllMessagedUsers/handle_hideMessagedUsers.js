import { inject_stylesToHead } from "../../../core";
import { dr_hideMessagedUsers } from "../../../../dist_styles/dr_hideMessagedUsers.js";

export function handle_hideMessagedUsers() {
  inject_stylesToHead(dr_hideMessagedUsers, "dr_hideMessagedUsers");
}