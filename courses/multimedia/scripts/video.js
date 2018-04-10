// JavaScript Document

var video;
var playBtn, controlBtn, muteBtn, autoBtn, loopBtn, scaleBtn;
var buttons;



function initVideoPage() {
    
    video = document.getElementById("video");
    buttons = document.getElementById("media").getElementsByTagName("button");
    playBtn = buttons[0];
    muteBtn = buttons[1];
    controlBtn = buttons[2];
    autoBtn = buttons[3];
    loopBtn = buttons[4];
    scaleBtn = buttons[5];
        
    readSettings();
    
    if (!video.autoplay)
        video.pause();
    if (video.controls)
        disableButtons();
    
    checkBtnState(playBtn, video.autoplay);
    checkBtnState(muteBtn, video.muted)
    checkBtnState(controlBtn, video.controls);
    checkBtnState(autoBtn, video.autoplay);
    checkBtnState(loopBtn, video.loop);
    
    addListener(playBtn, "click", playVideo);
    addListener(muteBtn, "click", muteSound);
    addListener(controlBtn, "click", hideControls);
    addListener(autoBtn, "click", switchAutoplay);
    addListener(loopBtn, "click", switchLoop);
    addListener(scaleBtn, "click", resizeVideo);
    
}
addListener(window, "load", initVideoPage);
addListener(window, "unload", saveVideoCookie);



function checkBtnState(btn, state) {
    
    if (state)
        btn.className = "active";
    else btn.className = "inactive";
    
}



function switchState(btn, state) {
    
    if (state) {
        btn.className = "inactive";
        return false;
    }
    btn.className = "active";
    return true;
    
}



function switchBtnClass(btn) {
    
    if (btn.className == "inactive")
        btn.className = "active";
    else btn.className = "inactive";
    
}



function playVideo() {
    
    switchState(playBtn, !video.paused);
    if (video.paused)
        video.play();
    else video.pause();
    
}



function muteSound() {
    
    video.muted = switchState(this, video.muted);
    
}



function hideControls() {
    
    video.controls = switchState(this, video.controls);
    disableButtons();
    
}



function switchAutoplay() {
    
    video.autoplay = switchState(this, video.autoplay);
    
}



function switchLoop() {
    
    video.loop = switchState(this, video.loop);
    
}



function disableButtons() {
    
    playBtn.disabled = muteBtn.disabled = video.controls;
    if (!video.controls) {
        checkBtnState(playBtn, !video.paused);
        checkBtnState(muteBtn, video.muted);
    }
    
}



function resizeVideo() {
    
    if (video.height == 1080) {
        video.height = 360;
        video.width = 640;
    }
    
    else if (video.height == 360) {
        video.height = 480;
        video.width = 854;
    }
    
    else if (video.height == 480) {
        video.height = 576;
        video.width = 1024;
    }
    
    else if (video.height == 576) {
        video.height = 720;
        video.width = 1280;
    }
    
    else if (video.height == 720) {
        video.height = 900;
        video.width = 1600;
    }
    
    else {
        video.height = 1080;
        video.width = 1920;
    }
    
}



function saveVideoCookie() {
    
    var cookieValue = video.muted + "#" + video.controls + "#" + video.autoplay + "#" + video.loop + "#" + video.height + "#" + video.width;
    setCookie("video", cookieValue);
    
}



function readSettings() {    
    
	var cookieValue = getCookie("video");
	if (cookieValue != null) {
		var cookieArr = cookieValue.split("#");
        video.muted = StrToBool(cookieArr[0]);
        video.controls = StrToBool(cookieArr[1]);
        video.autoplay = StrToBool(cookieArr[2]);
        video.loop = StrToBool(cookieArr[3]);
        video.height = cookieArr[4];
        video.width = cookieArr[5];
	}
    
}



function StrToBool(str) {
    
    if (str == "true")
        return true;
    return false;

}