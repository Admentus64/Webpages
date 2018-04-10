// JavaScript Document

var voiceBtn, msgElem, audio;
var timerRef, timerDur;



function initStartPage() {
    
    voiceBtn = document.getElementById("voiceBtn");
    msgElem = document.getElementById("message");
    audio = document.getElementById("audio");
    setDefaultMsg();
    
    timerDur = 26 * 1000;
    timerRef = null;
    addListener(voiceBtn, "click", playVoice);
    
}
addListener(window, "load", initStartPage);



function setDefaultMsg() {
    
    addInfo = "--- Välkommen till Linnéuniversitetet! --- <br> <br>";
    addInfo += "Här på universiteten bjuds det en mängd av olika sorter kurser och fullständiga program. <br>";
    addInfo += "Men det som vi vill sätta fokus på den här gången är programmet: Interaktiva Medier och Webbteknologier. <br>";
    addInfo += "Där finns denna webbplatsen för att kunna vissa vad programmet kan innebär. <br>";
    addInfo += "Gärna sök vidare op de olika webbsidorna för att hitta mer information. <br> <br>";
    msgElem.innerHTML = addInfo;
    
}



function playVoice() {
    
    if (this.className == "active") {
        audio.pause();
        audio.currentTime = 0;
        this.className = "inactive";
        clearTimeout(timerRef);
    }
    else {
        audio.play();
        this.className = "active";
        timerRef = setTimeout(resetVoiceBtn, timerDur);
    }

    
}



function resetVoiceBtn() {
    
    voiceBtn.className = "inactive";
    clearTimeout(timerRef);
    
}



function playAudio() {
    
    switchState(voiceBtn, !auido.paused);
    if (audio.paused)
        audio.play();
    else audio.pause();
    
}