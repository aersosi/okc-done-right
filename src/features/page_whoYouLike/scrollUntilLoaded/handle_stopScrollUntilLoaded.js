export function handle_stopScrollUntilLoaded(gloabalIntervals, intervaID, logConsole = false) {
  logConsole && console.log(intervaID);

  if (gloabalIntervals[intervaID]) {
    clearInterval(gloabalIntervals[intervaID]); // Clear the scrolling interval
    delete gloabalIntervals[intervaID]; // Remove from storage
    logConsole && console.log("Scrolling interrupted.");
  } else {
    logConsole && console.log(`No active interval found for ${intervaID}.`);
  }
}