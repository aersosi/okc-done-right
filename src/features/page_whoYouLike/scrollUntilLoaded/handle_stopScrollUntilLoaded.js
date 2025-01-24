import { set_matchPercentToUserCards } from "../set_matchPercent_toUserCards.js";

export function handle_stopScrollUntilLoaded(gloabalIntervals, intervaID, logConsole = false) {
  logConsole && console.log(intervaID);

  if (gloabalIntervals[intervaID]) {
    clearInterval(gloabalIntervals[intervaID]); // Clear the interval
    delete gloabalIntervals[intervaID]; // Remove from storage
    logConsole && console.log("Scrolling interrupted.");
    setTimeout(() => {
      set_matchPercentToUserCards()
    }, 1000);
  } else {
    logConsole && console.log(`No active interval found for ${intervaID}.`);
  }
}