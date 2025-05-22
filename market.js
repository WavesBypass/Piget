function openPack(type) {
  const overlay = document.getElementById("overlay");
  const packImage = document.getElementById("packImage");
  const tear = document.getElementById("tearEffect");
  const rewardCard = document.getElementById("rewardCard");

  // Set pack image
  packImage.src = type === "og" ? "og-pack.png" : "color-pack.png";

  // Set reward image
  rewardCard.src = type === "og" ? "coin.png" : "gem.png";

  // Show overlay and reset
  overlay.style.display = "flex";
  tear.style.display = "none";
  rewardCard.classList.remove("show-card");

  // Show pack, then tear, then card
  setTimeout(() => {
    tear.style.display = "block";

    setTimeout(() => {
      rewardCard.classList.add("show-card");

      setTimeout(() => {
        overlay.style.display = "none";
      }, 2000);
    }, 600);
  }, 400);
}
