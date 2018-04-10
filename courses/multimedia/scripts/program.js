// JavaScript Document

var picsElems, largePicElem, msgElem;
var picsInfo, addInfo;
var largePicVersion;



function initProgramPage() {
    
    picsElems = document.getElementById("pics").getElementsByTagName("img");
    largePicElem = document.getElementById("largePict");
    msgElem = document.getElementById("message");
    setDefaultMsg();
    picInfo = [], largePicVersion = [];
    addPicInfo();
    
    for (var i=0; i<picsElems.length; i++) {
        pushLargeImg(picsElems[i]);
        addListener(picsElems[i], "dragstart", stop);
        addListener(picsElems[i], "dragover", stop);
        addListener(picsElems[i], "drop", stop);
        addListener(picsElems[i], "click", checkPic);    
    }
    
}
addListener(window, "load", initProgramPage);



function pushLargeImg(img) {
    
    var temp = img.src;
    temp = temp.slice(0, img.src.length-4);
    temp += "Large.jpg";
    largePicVersion.push(temp);
    
}



function checkPic() {
    
    for (var i=0; i<picsElems.length; i++) {
        if (this != picsElems[i] && picsElems[i].className == "activeImg")
            picsElems[i].className = "inactiveImg";
        else if (this == picsElems[i] && picsElems[i].className != "activeImg") {
            largePicElem.className = "largeImg";
            largePicElem.src = largePicVersion[i];
            this.className = "activeImg";
            msgElem.innerHTML = picInfo[i];
        }
        else if (this == picsElems[i] && picsElems[i].className == "activeImg") {
            largePicElem.className = "disabled";
            largePicElem.src = "pics/empty.png";
            this.className = "inactiveImg";
            setDefaultMsg();
        }
    }

}



function setDefaultMsg() {
    
    addInfo = "Gärna tryck på en bild för att hitta information om programmet. <br>";
    addInfo += "<br> Campus Bild: Lär mer om universiteten och varför att välja programmet"
    addInfo += "<br> Ipad Bild: Innehåller kontaktuppgifter för att söka programmet."
    addInfo += "<br> Java Kod Bild: Lär mer om vilka kurser programmet innehåller."
    addInfo += "<br> Online Företag Bild: Lär mer om vad programmet kommer håller fokus på."
    msgElem.innerHTML = addInfo;
    
}



function addPicInfo() {
    
    addInfo = "--- Interaktiva Medier och Webbteknogier --- <br>";
    addInfo += "Här på Linnéuniversitetet bjuder vi på flera studier. <br> Men särskilt de som söker medier erbjuder vi ett komplett program inför detta. <br>";
    addInfo += "<br> --- Gärna var med på --- <br>";
    addInfo += "Vi erbjuder er att delta i Interaktiva medier och webbteknologier. <br>";
    addInfo += "Det är allt om den digitala världen, även internet och smartphones. <br>";
    addInfo += "Syftet i programmet ligger på att tillverka kontent för den digita världen istället för att använda. <br>";
    addInfo += "Tänker du på att ändra den digitala världen?";
    picInfo.push(addInfo);
    
    addInfo = "--- Kontakta oss --- <br>";
    addInfo += "Ser vår webbsidan för mer införmation inför anmälningen i hösten 2016. <br>";
    addInfo += "Kontakta oss online eller besök oss på kampusområdet. <br>";
    addInfo += "<br> --- Webbsida --- <br> www.lnu.se/utbildning/ program/NGIMW <br>";
    addInfo += "<br> --- Campus --- <br> Hus D, rum 2267E";
    picInfo.push(addInfo);
    
    addInfo = "--- Kurser vi erbjuder --- <br>";
    addInfo += "Digitala medier, Studier i medieteknik i, Webbteknik (år 1) <br>";
    addInfo += "Ekonomi och juridik för webbutvecklare (år 1) <br>";
    addInfo += "Interaktionsdesign, Projektkurs (år 1 och 2) <br>";
    addInfo += "Projekthantering och entréprenörskap (år 2) <br>";
    addInfo += "Vetenskaplig metod i medieteknik, Förskningsutmaningar i medieteknik (år 3) <br>";
    addInfo += "Exempelvis Praktik i en organisation eller företag (år 3) <br>";
    addInfo += "Examensarbete på kandidatnivå i medieteknik (år 3) <br>";
    addInfo += "<br> --- Exklusiv vid inriktning: Interaktiva medier  --- <br>"
    addInfo += "Digital grafik (år 2) <br>"
    addInfo += "Video (år 2 och 3) <br>";
    addInfo += "<br> --- Exklusiv vid inriktning: Webbteknologier  --- <br>"
    addInfo += "Databasdesign, Webbteknik (år 2) <br>";
    picInfo.push(addInfo);
    
    addInfo = "--- Lär dig flera möjligheter --- <br>"
    addInfo += "Att studera inom multimedia ger dig möjligheten att jobba på flera möjliga sorters tekniker. Tänk på bilder, webbsidor, filmer, musik och mer.";
    addInfo += "<br> <br> --- Välj din inriktning --- <br>"
    addInfo += "Programmet bjuder på två olika inriktningar att studera på: Interaktiva medier eller Webbteknologier.";
    addInfo += "<br> <br> --- Prova på företag --- <br>";
    addInfo += "I ditt tredje år bjuder vi på möjligheter att förbättra dina kunskaper genom att prova på en organisation eller företag i IT- eller mediebranschen på tio veckor.";
    addInfo += "<br> <br> --- Var direkt med --- <br>"
    addInfo += "Programmet fokuserar på de nödvändiga teoretiska och praktiska grunder i ämnet medieteknik. Kurser som matematik och lågspråk programmering är då inte nödvändiga.";
    picInfo.push(addInfo);
    
}

function stop() { return false; }