export function handle_emptyRows() {
  // Select all elements with the class "userrow-bucket-row"
  const bucketRows = document.querySelectorAll(".userrow-bucket-row");

  bucketRows.forEach(row => {
    // Select all children of the current row
    const children = row.children;

    // Check if all children have the class "not-online"
    const allNotOnline = Array.from(children).every(child => child.classList.contains("not-online"));

    // Add the "hidden" class if all children have the class "not-online"
    if (allNotOnline) {
      row.classList.add("hidden");
    } else {
      row.classList.remove("hidden");
    }
  });
}