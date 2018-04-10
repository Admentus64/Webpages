// JavaScript Document// JavaScript Document

var coursesElems, msgElem;
var courseInfo, addInfo;



function initCoursesPage() {
    
    coursesElems = document.getElementById("courses").getElementsByTagName("button");
    msgElem = document.getElementById("message");
    courseInfo = [];
    addCourseInfo();
    setDefaultMsg();
    
    for (var i=0; i<coursesElems.length; i++)
        addListener(coursesElems[i], "click", checkCourse);    
    
}
addListener(window, "load", initCoursesPage);



function checkCourse() {
    
    for (var i=0; i<coursesElems.length; i++) {
        if (this != coursesElems[i] && coursesElems[i].className == "active")
            coursesElems[i].className = "inactive";
        else if (this == coursesElems[i] && coursesElems[i].className != "active") {
            this.className = "active";
            msgElem.innerHTML = courseInfo[i];
        }
        else if (this == coursesElems[i] && coursesElems[i].className == "active") {
            this.className = "inactive";
            setDefaultMsg();
        }
    }

}



function setDefaultMsg() {
    
    addInfo = "Gärna tryck på en knapp för att hitta information om en kurs.";
    msgElem.innerHTML = addInfo;
    
}



function addCourseInfo() {
    
    // Year 1
    addInfo = "--- Studier i medieteknik --- <br>";
    addInfo += "<br> Beteckning: G1N <br> Poäng: 7,5 hp <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 1: Gemensamt för båda inriktningar <br>";
    addInfo += "Kursen introducerar medieteknik och ger studenten de grundläggande kunskaper, verktyg, färdigheter och förhållningssätt som krävs för vidare studier i ämnet.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Digitala medier --- <br>";
    addInfo += "<br> Beteckning: G1N <br> Poäng: 7,5 hp <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 1: Gemensamt för båda inriktningar <br>";
    addInfo += "Kommunikation och produktion med bild, ljud och text i multimediala tillämpningar.";
    courseInfo.push(addInfo);
    
    
    addInfo = "--- Webbteknik --- <br>";
    addInfo += "<br> Beteckning: G1N (Webbteknik 1) och G1F (Webbteknik 2-6) <br> Poäng: 7,5 hp varje kurs <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 1: Gemensamt för båda inriktningar <br>";
    addInfo += "Webbteknik 1: Kommunikation och produktion med bild, ljud och text i multimediala tillämpningar. <br>"
    addInfo += "Webbteknik 2: Scriptprogrammering på klientsidan för dynamiska och interaktiva webbsidor. <br>";
    addInfo += "Webbteknik 3: Teknik och metoder för informationshantering på webbsidor. <br>";
    addInfo += "<br> År 2: Webbteknologier <br>"
    addInfo += "Webbteknik 4: Serverbaserat scriptspråk och databashantering för uppbyggnad av dynamiska webbapplikationer. <br>";
    addInfo += "Webbteknik 5: Bibliotek och hjälpmedel för webbutveckling. <br>";
    addInfo += "Webbteknik 6: Utveckling av databasdrivna webbapplikationer.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Interaktionsdesign --- <br>";
    addInfo += "<br> Beteckning: G1F <br> Poäng: 7,5 hp varje kurs <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 1: Gemensamt för båda inriktningar <br>";
    addInfo += "Interaktionsdesign 1: Grundläggande interaktionsdesign med fokus på användbarhet, design och utveckling av grafiska webbgränssnitt, prototyper samt användartestning. <br>";
    addInfo += "<br> År 2: Behandlas för båda inriktningar <br>";
    addInfo += "Interaktionsdesign 2: Fokus på användarens mål, behov, begränsningar och interaktionsmöjligheter med webbplatser. <br>";
    addInfo += "Interaktionsdesign 3: En praktiskt inriktad kurs där studenten utvecklar och testar program som ställer höga krav på visuell design, interaktionsdesign och användarupplevelse.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Ekonomi och juridik för webbutvecklare --- <br>";
    addInfo += "<br> Beteckning: G1N <br> Poäng: 7,5 hp <br>";
    addInfo += "<br> År 1: Gemensamt för båda inriktningar <br>";
    addInfo += "Praktiska ekonomiska och juridiska förutsättningar för att arbeta i branschen.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Projektkurs --- <br>";
    addInfo += "<br> Beteckning: G1F <br> Poäng: 7,5 hp varje kurs <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 1: Gemensamt för båda inriktningar <br>";
    addInfo += "Projektkurs 1: Utveckling av en webbplats baserad på principer om informationsarkitekur och användarcentrerad design. <br>";
    addInfo += "<br> År 2: Interaktiva medier <br>";
    addInfo += "Projektkurs 2: Introduktion till området speldesign. Tidigare förvärvade kunskaper inom produktion av digitala medier, användargränssnitt och interaktionsdesign omsätts i ett spelutvecklingsprojekt. <br>";
    addInfo += "<br> År 2: Webbteknologier <br>";
    addInfo += "Projektkurs 2: Introduktion till området speldesign. Tidigare förvärvade kunskaper inom webbteknik och interaktionsdesign omsätts i ett spelutvecklingsprojekt.";
    courseInfo.push(addInfo);
    
    // Year 2
    addInfo = "--- Digital grafik --- <br>";
    addInfo += "<br> Beteckning: G1F <br> Poäng: 7,5 hp varje kurs <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 2: Interaktiva medier <br>";
    addInfo += "Digital grafik 1: Introduktion till den grafiska bildens uppbyggnad och produktion av bitmapoch vektorbaserad grafik för grafiska användargränssnitt. <br>";
    addInfo += "Digital grafik 2: Introduktion till 3D-modellering och animering.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Video --- <br>"
    addInfo += "<br> Beteckning: G1F <br> Poäng: 7,5 hp varje kurs <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 2: Interaktiva medier <br>";
    addInfo += "Video 1: Översikt och kunskap om modern videoproduktion och distribution. Huvudsakligt fokus på teknik och grundläggande dramaturgi. <br>";
    addInfo += "<br> År 3: Interaktiva medier <br>";
    addInfo += "Video 2: Fördjupning inom teknik och berättande samt fokus på genomförande av videoproduktioner efter kundens behov.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Databasdesign --- <br>";
    addInfo += "<br> Poäng: 7,5 hp <br>";
    addInfo += "<br> År 2: Webbteknologier <br>";
    addInfo += "Teknik och metoder för design av databaser för webbaserade tillämpningar.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Projekthantering och entréprenörskap --- <br>";
    addInfo += "<br> Poäng: 7,5 hp <br>";
    addInfo += "<br> År 2: Behandlas för badå inriktningar <br>";
    addInfo += "Projekthantering och entreprenörskap med fokus på projektorganisering, projektledning och projektstyrning samt planering, uppföljning och utvärdering av affärsplaner.";
    courseInfo.push(addInfo);
    
    // Year 3
    addInfo = "--- Vetenskaplig metod i medieteknik --- <br>";
    addInfo += "<br> Beteckning: G2F <br> Poäng: 7,5 hp <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 3: Behandlas för badå inriktningar <br>";
    addInfo += "Vetenskapsteori och ämnesrelaterad metodik.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Förskningsutmaningar i medieteknik --- <br>";
    addInfo += "<br> Beteckning: G2F <br> Poäng: 7,5 hp <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 3: Behandlas för badå inriktningar <br>";
    addInfo += "Fördjupning inom ett eller flera aktuella problem eller områden inom vald inriktning i ämnet.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Exempelvis Praktik --- <br>";
    addInfo += "<br> Beteckning: G2F <br> Poäng: 15 hp <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 3: Behandlas för badå inriktningar <br>";
    addInfo += "Genomförande av en tioveckors praktik i en organisation eller ett företag i ITeller mediebranschen.";
    courseInfo.push(addInfo);
    
    addInfo = "--- Examensarbete på kandidatnivå i medieteknik --- <br>";
    addInfo += "<br> Beteckning: G2F <br> Poäng: 15 hp <br> Huvudområdet i medieteknik <br>";
    addInfo += "<br> År 3: Behandlas för badå inriktningar <br>";
    addInfo += "Studenten skall författa, presentera och försvara ett vetenskapligt arbete.";
    courseInfo.push(addInfo);
    
}