import {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  onSnapshot
} from "./firebase.js";

import { randomSaying } from "./sayings.js";


// Elemente holen

const messageBox =
document.getElementById("message");

const sayingBox =
document.getElementById("random");

const scanBox =
document.getElementById("scans");

const beerBox =
document.getElementById("beers");

const laughBox =
document.getElementById("laughs");

const highfiveBox =
document.getElementById("highfives");

const danceBox =
document.getElementById("dances");


// Firebase Orte

const statsRef =
doc(db,"festival","stats");

const configRef =
doc(db,"festival","config");


// Scan erhöhen

async function addScan(){

const snap =
await getDoc(statsRef);


if(!snap.exists()){

await setDoc(
statsRef,
{
scans:1,
beers:0,
laughs:0,
highfives:0,
dances:0
});

}
else{

await updateDoc(
statsRef,
{
scans:increment(1)
});

}

}


addScan();
console.log("App gestartet");

// Nachricht live laden

onSnapshot(
configRef,
(data)=>{

if(data.exists()){

messageBox.innerHTML =
data.data().message;

}

});


// Statistik live laden

onSnapshot(
statsRef,
(data)=>{

if(!data.exists()) return;


const s=data.data();


scanBox.innerHTML =
"👀 Scans: "+s.scans;


beerBox.innerHTML =
"💋 Küsse: "+s.beers;


laughBox.innerHTML =
"🍆💦: "+s.laughs;


highfiveBox.innerHTML =
"🙌 Wiedersehen: "+s.highfives;


danceBox.innerHTML =
"💃 Tänze: "+s.dances;



// Erfolge

checkAchievements(s.scans);


// Easter Egg

if(
s.scans == 100 ||
s.scans == 500 ||
s.scans == 1000
){

alert(
"🎉 Glückwunsch! Scan Nummer "+s.scans
);

}

});



// Zufallsspruch

sayingBox.innerHTML =
randomSaying();


// Buttons

async function addStat(name){

await updateDoc(
statsRef,
{
[name]:increment(1)
});

}


document
.getElementById("beer")
.onclick =
()=>addStat("beers");


document
.getElementById("laugh")
.onclick =
()=>addStat("laughs");


document
.getElementById("highfive")
.onclick =
()=>addStat("highfives");


document
.getElementById("dance")
.onclick =
()=>addStat("dances");
