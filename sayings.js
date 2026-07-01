const sayings = [

"🍺 Wer das liest, schuldet mir ein Bier.",
"🕺 Tanz, als würde niemand zuschauen.",
"😂 Glückwunsch, du hast den geheimen QR gefunden.",
"🎧 Bass ist wichtiger als Schlaf.",
"🙌 High Five für dich!",
"🌈 Du bist jetzt Teil des Festivals.",
"🍻 Dieser Scan zählt als Begrüßung.",
"🚀 Du hast gerade einen coolen QR-Code gefunden.",
"😎 Bleib wild.",
"🎉 Heute zählt nur gute Laune.",
"🪩 Noch eine Runde tanzen?",
"🍕 Festivalkalorien zählen nicht.",
"🌙 Morgen fragen wir uns, warum wir so müde sind.",
"🔥 Der Bass hat dich hergelockt.",
"📱 Du darfst diesen QR-Code deinen Freunden zeigen.",

];

export function randomSaying(){

const index =
Math.floor(Math.random()*sayings.length);

return sayings[index];

}
