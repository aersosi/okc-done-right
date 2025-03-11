export function update_btn_unhideAll(hiddenUsers) {
  const hiddenUsersCount = Object.entries(hiddenUsers).length;
  const btn_unhideAll = document.getElementById("btn_unhideAll");

  if (hiddenUsersCount >= 5) {
    btn_unhideAll.classList.remove("hidden");
  } else {
    btn_unhideAll.classList.add("hidden");
  }
}