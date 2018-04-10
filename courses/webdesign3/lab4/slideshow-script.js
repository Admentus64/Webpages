// JavaScript Document

// Globala variabler
var imgUrls;		// Array med url:er för valda bilder
var imgCaptions;	// Array med bildtexter till valda bilder
var ssImgElem;		// Referens till img-element för bildspelet
var ssCaptionElem;	// Referens till element för bildtext
var currentImgIx;	// Index för aktuell bild
var timerRef;		// Referens till timern för bildspelet
var autoBtnElem;	// Referns till knappen för att starta/stoppa automatisk bildvisning

// Initiera globala variabler och ändelsehanterare
function init() {
	var yes;	// Svar från confirm (true om OK, annars false)
	addListener(document.getElementById("newBtn"),"click",function() {location.href = "index.htm";});
	if (!localStorage.imgUrls) {
		yes = confirm("Du måste först välja bilder som ska visas.\nVill du gå till sidan för att välja bilder?");
		if (yes) location.href = "index.htm";
		return;
	}
	ssImgElem = document.getElementById("slideshowImg").getElementsByTagName("img")[0];
	ssCaptionElem = document.getElementById("slideshowImg").getElementsByTagName("p")[0];
	getStyle();
	addListener(document.getElementById("prevBtn"),"click",prevImage);
	addListener(document.getElementById("nextBtn"),"click",nextImage);
	autoBtnElem = document.getElementById("autoBtn");
	addListener(autoBtnElem,"click",autoShow);
	imgUrls = localStorage.imgUrls.split("#.#");
	imgCaptions = localStorage.imgCaptions.split("#.#");
	ssImgElem.src = imgUrls[0]; // Visa första bilden
	ssCaptionElem.innerHTML = imgCaptions[0];
	currentImgIx = 0;
	timerRef = null;
} // End init
addListener(window,"load",init);

function getStyle() {
	if (localStorage.bgColor) document.body.style.backgroundColor = localStorage.bgColor;
	if (localStorage.txColor) ssCaptionElem.style.color = localStorage.txColor;
	if (localStorage.txStyle) {
		ssCaptionElem.style.fontWeight = "normal";
		ssCaptionElem.style.fontStyle = "normal";
		switch (localStorage.txStyle) {
			case "bold":   ssCaptionElem.style.fontWeight = "bold"; break;
			case "italic": ssCaptionElem.style.fontStyle = "italic"; break;
		}
	}
	if (localStorage.frame) ssImgElem.style.borderWidth = localStorage.frame + "px";
} // End getStyle

// Visaa föregående bild
function prevImage() {
	if (currentImgIx > 0) {
		currentImgIx--;
		ssImgElem.src = imgUrls[currentImgIx];
		ssCaptionElem.innerHTML = imgCaptions[currentImgIx];
	}
} // End prevImage

// Visa nästa bild
function nextImage() {
	if (currentImgIx < imgUrls.length - 1) {
		currentImgIx++;
		ssImgElem.src = imgUrls[currentImgIx];
		ssCaptionElem.innerHTML = imgCaptions[currentImgIx];
	}
} // End nextImage

// Automatisk bildvisning
function autoShow() {
	if (currentImgIx < imgUrls.length - 1) currentImgIx++;
	else currentImgIx = 0;
	ssImgElem.src = imgUrls[currentImgIx];
	ssCaptionElem.innerHTML = imgCaptions[currentImgIx];
	timerRef = setTimeout(autoShow,3000);
	removeListener(autoBtnElem,"click",autoShow);
	addListener(autoBtnElem,"click",stopShow);
	autoBtnElem.style.backgroundColor = "green";
} // End autoShow

// Stoppa automatisk bildvisning
function stopShow() {
	clearTimeout(timerRef);
	removeListener(autoBtnElem,"click",stopShow);
	addListener(autoBtnElem,"click",autoShow);
	autoBtnElem.style.backgroundColor = "white";
} // End stopShow
