document.addEventListener("DOMContentLoaded", () => {

const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const spinButton = document.getElementById("spin");
const winnerOverlay = document.getElementById("winnerOverlay");
const winnerText = document.getElementById("winnerText");

const tasks = [
    "Bier",
    "Kuss",
    "Oberteil Tausch",
    "Getränk ausgeben",
    "Nummer geben",
    "Arsch-TÜV",
    "Tanzen",
    "Was du möchtest😳"
];


const colors = [
    "#ff595e",
    "#ffca3a",
    "#8ac926",
    "#1982c4",
    "#6a4c93",
    "#ff924c",
    "#52b788",
    "#e63946"
];


const size = 320;

canvas.width = size;
canvas.height = size;

const center = size / 2;
const radius = size / 2;


let rotation = 0;
let spinning = false;
let currentWinner = null;


function drawWheel(){

    ctx.clearRect(0,0,size,size);


    const segmentAngle = (Math.PI * 2) / tasks.length;


    for(let i = 0; i < tasks.length; i++){


        const startAngle = rotation + i * segmentAngle;
        const endAngle = startAngle + segmentAngle;


        ctx.beginPath();

        ctx.moveTo(center,center);

        ctx.arc(
            center,
            center,
            radius,
            startAngle,
            endAngle
        );

        ctx.closePath();


        ctx.fillStyle = colors[i];

        ctx.fill();


        ctx.save();


        ctx.translate(center,center);

        ctx.rotate(
            startAngle + segmentAngle / 2
        );


        ctx.textAlign = "right";

        ctx.fillStyle = "white";

        ctx.font = "bold 15px Arial";


        ctx.fillText(
            tasks[i],
            radius - 15,
            5
        );


        ctx.restore();

    }


    // Mittelkreis

    ctx.beginPath();

    ctx.arc(
        center,
        center,
        35,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(0,0,0,.25)";

    ctx.fill();

}


drawWheel();

// ===============================
// Dreh-Animation
// ===============================

function spinWheel(){

    if(spinning) return;


    spinning = true;

    winnerOverlay.classList.remove("show");

    currentWinner = null;


    const extraSpins = 
        Math.floor(Math.random() * 5) + 5;


    const targetRotation =
        rotation +
        extraSpins * Math.PI * 2 +
        Math.random() * Math.PI * 2;


    const startRotation = rotation;

    const duration = 4500;

    const startTime = performance.now();



    function animate(time){


        const elapsed = time - startTime;

        let progress = elapsed / duration;


        if(progress > 1){
            progress = 1;
        }


        // weiches Abbremsen

        const ease =
            1 - Math.pow(1 - progress, 4);



        rotation =
            startRotation +
            (targetRotation - startRotation)
            * ease;



        drawWheel();



        if(progress < 1){

            requestAnimationFrame(animate);

        }else{


            rotation =
                rotation % (Math.PI * 2);


            spinning = false;


            selectWinner();


        }

    }


    requestAnimationFrame(animate);

}





// ===============================
// Gewinner bestimmen
// ===============================


function selectWinner(){


    const segmentAngle =
        (Math.PI * 2) / tasks.length;



    // Pfeil steht oben
    const pointerAngle =
        -Math.PI / 2;



    let normalized =
        pointerAngle - rotation;



    normalized =
        (normalized + Math.PI * 2)
        % (Math.PI * 2);



    const index =
        Math.floor(
            normalized / segmentAngle
        );



    currentWinner =
        tasks[index];



    showWinner(currentWinner);



    launchConfetti();

}





// ===============================
// Gewinner anzeigen
// ===============================


function showWinner(text){


    winnerText.innerHTML =
        text;


    winnerOverlay.classList.add(
        "show"
    );


}

// ===============================
// Konfetti-Effekt
// ===============================


function launchConfetti(){


    const pieces = 80;


    for(let i = 0; i < pieces; i++){


        const confetti =
            document.createElement("div");


        confetti.style.position = "fixed";

        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.top = "-20px";


        confetti.style.width = "10px";

        confetti.style.height = "10px";


        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];


        confetti.style.borderRadius =
            "3px";


        confetti.style.zIndex = "9999";

        confetti.style.pointerEvents =
            "none";



        document.body.appendChild(
            confetti
        );



        const fall =
            800 +
            Math.random() * 1200;



        confetti.animate(

            [
                {
                    transform:
                    "translateY(0) rotate(0deg)",
                    opacity:1
                },

                {
                    transform:
                    `translateY(${window.innerHeight + 100}px)
                     rotate(${Math.random()*720}deg)`,
                    opacity:0
                }

            ],

            {
                duration: fall,
                easing:"cubic-bezier(.2,.8,.3,1)"
            }

        );



        setTimeout(()=>{

            confetti.remove();

        }, fall);

    }

}





// ===============================
// Button aktivieren
// ===============================


spinButton.addEventListener(
    "click",
    spinWheel
);





// ===============================
// Tastatur-Steuerung
// Leertaste = drehen
// ===============================


document.addEventListener(
    "keydown",
    e => {

        if(e.code === "Space"){

            spinWheel();

        }

    }
);





// Start-Zeichnung sicherstellen

drawWheel();

// ===============================
// Extra: Dreh-Ticks + Sound
// ===============================


let lastTick = -1;


function tickSound(){

    const audio =
        new AudioContext();


    const oscillator =
        audio.createOscillator();


    const gain =
        audio.createGain();



    oscillator.type = "square";

    oscillator.frequency.value = 180;


    gain.gain.value = 0.03;


    oscillator.connect(gain);

    gain.connect(
        audio.destination
    );


    oscillator.start();


    oscillator.stop(
        audio.currentTime + 0.05
    );

}





function checkTick(){

    const segmentAngle =
        (Math.PI * 2) / tasks.length;


    const current =
        Math.floor(
            rotation / segmentAngle
        );



    if(current !== lastTick){

        lastTick = current;

        tickSound();

    }

}



// alte Animation erweitern
// ersetzt nicht den Code,
// sondern ergänzt ihn


const oldDrawWheel = drawWheel;

drawWheel = function(){

    oldDrawWheel();

    if(spinning){

        checkTick();

    }

};





// ===============================
// Glow-Effekt beim Gewinner
// ===============================


winnerText.addEventListener(
    "animationend",
    () => {

        winnerText.style.transform =
            "scale(1)";

    }
);





// ===============================
// Aufgaben leicht ändern
// Einfach hier bearbeiten
// ===============================


console.log(
    "🎡 Glücksrad bereit!",
    tasks
);
});
