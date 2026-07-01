function showAchievement(title,text){

  document.getElementById("achievementTitle").innerHTML = title;
  document.getElementById("achievementText").innerHTML = text;

  document
  .getElementById("achievement")
  .classList.remove("hidden");

  if(typeof confetti === "function"){
    confetti({
      particleCount: 180,
      spread: 120
    });
  }

  setTimeout(()=>{
    document
    .getElementById("achievement")
    .classList.add("hidden");
  },5000);
}


function checkAchievements(count){

  if(count === 5){
    showAchievement(
      "🥉 Erste Begegnung",
      "5 Scans geschafft!"
    );
  }

  if(count === 25){
    showAchievement(
      "🥈 Festival-Freund",
      "25 Menschen waren hier!"
    );
  }

  if(count === 100){
    showAchievement(
      "🥇 QR-Legende",
      "100 Scans!"
    );
  }

}
