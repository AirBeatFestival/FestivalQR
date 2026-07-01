const tasks = [
"🍺 Hol dir ein Bier",
"🕺 10 Sekunden tanzen",
"🙌 Gib jemandem ein High Five",
"📸 Mach ein Festivalfoto",
"😎 Finde den Besitzer des QR-Codes",
"😂 Bring jemanden zum Lachen"
];


const wheel =
document.getElementById("wheel");

const spin =
document.getElementById("spin");

const result =
document.getElementById("wheelResult");


spin.onclick = ()=>{

wheel.classList.add("rotate");


setTimeout(()=>{

const task =
tasks[Math.floor(Math.random()*tasks.length)];


result.innerHTML =
"🎉 Aufgabe:<br><br>"+task;


wheel.classList.remove("rotate");

},2000);

};
