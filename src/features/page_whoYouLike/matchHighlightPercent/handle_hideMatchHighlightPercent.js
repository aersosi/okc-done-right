import { inject_stylesToHead } from "../../../core";
import { dr_hideMatchHighlightPercent } from "../../../../dist_styles/dr_hideMatchHighlightPercent.js";

export function handle_hideMatchHighlightPercent() {
  inject_stylesToHead(dr_hideMatchHighlightPercent, "dr_hideMatchHighlightPercent");
}