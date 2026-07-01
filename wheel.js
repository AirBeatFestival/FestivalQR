const tasks = [
"🍺 Hol dir ein Bier",
"🕺 10 Sekunden tanzen",
"🙌 Gib jemandem ein High Five",
"📸 Mach ein Festivalfoto",
"😎 Finde den Besitzer des QR-Codes",
"😂 Bring jemanden zum Lachen"
];


const wheelButton =
document.getElementById("wheel");


const wheelResult =
document.getElementById("wheelResult");


if(wheelButton){

wheelButton.onclick = ()=>{

const random =
tasks[Math.floor(Math.random()*tasks.length)];


wheelResult.innerHTML =
"🎰 Aufgabe:<br><br>"+random;

};

}
