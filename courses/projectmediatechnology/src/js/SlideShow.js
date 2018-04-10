// JavaScript Document
// Author: Group 10

var SlideShow = {   // Start Static Class: SlideShow
    
    // Class Variables
    bigImageElem: undefined,
    arrowLeftElem: undefined,
    arrowRightElem: undefined,
    
    imgNr: 0,
    imgTotal: 15,
    imgList: [],
    imgPath: "src/img/slide_show/",
    imgExt: ".jpg",
    timer: undefined,
    timerDuration: 20000,
    linkedActivitiesList: [],
    linkedActivity: null,
    
    
    
    // Class Methods
    init: function() {   // Start Method: init
        
        SlideShow.initActivitiesLink();
        
        SlideShow.bigImageElem = document.getElementById("bigImage");
        SlideShow.arrowLeftElem = document.getElementById("arrowLeft");
        SlideShow.arrowRightElem = document.getElementById("arrowRight");
        
        SlideShow.getImages();
        SlideShow.setImage(SlideShow.imgList[0]);
        
        Event.add(SlideShow.arrowLeftElem, "click", SlideShow.previousImage);
        Event.add(SlideShow.arrowRightElem, "click", SlideShow.nextImage);
        
        //setTimeout(SlideShow.setBigImageEvent, 3000);
        
    }, // End Method: init
    
    initActivitiesLink: function() {   // Start Method: initActivitiesLink
        
        SlideShow.linkedActivitiesList.push(57);                    // Img 0
        SlideShow.linkedActivitiesList.push(1102);                  // Img 1
        SlideShow.linkedActivitiesList.push(1066);                  // Img 2
        SlideShow.linkedActivitiesList.push(1101);                  // Img 3
        SlideShow.linkedActivitiesList.push(64);                    // Img 4
        SlideShow.linkedActivitiesList.push(180);                   // Img 5
        SlideShow.linkedActivitiesList.push(1047);                  // Img 6
        SlideShow.linkedActivitiesList.push(305);                   // Img 7
        SlideShow.linkedActivitiesList.push(295);                   // Img 8
        SlideShow.linkedActivitiesList.push(314);                   // Img 9
        SlideShow.linkedActivitiesList.push(1045);                  // Img 10
        SlideShow.linkedActivitiesList.push(1065);                  // Img 11
        SlideShow.linkedActivitiesList.push(1100);                  // Img 12
        SlideShow.linkedActivitiesList.push(1048);                  // Img 13
        SlideShow.linkedActivitiesList.push(58);                    // Img 14
        
    }, // End Method: initActivitiesLink
    
    playAnimation: function(elem, anim) {   // Start Method: playAnimation
        
        elem.classList.remove("fadeIn");
        void elem.offsetWidth;
        elem.classList.add(anim);
        
    }, // End Method: playAnimation
    
    setImage: function(path) {   // Start Method: setImage
        
        SlideShow.bigImageElem.style.backgroundImage = "url('" + path.getFilePath() + "')";
        SlideShow.playAnimation(SlideShow.bigImageElem, "fadeIn");
        SlideShow.timer = setTimeout(SlideShow.nextImage, SlideShow.timerDuration);
        SlideShow.setBigImageEvent();
        
    }, // End Method: setImage
    
    setBigImageEvent: function() {   // Start Method: setBigImageEvent
        
        var activity = null;
        
        if (SlideShow.imgList[SlideShow.imgNr].getLinkedId() !== null)
            activity = Payload.getActivityById(SlideShow.imgList[SlideShow.imgNr].getLinkedId());
        
        if (SlideShow.linkedActivity !== null)
                Event.remove(SlideShow.bigImageElem, "click", SlideShow.linkedActivity.clickReadMoreBtn);
        
        if (activity !== null) {
            SlideShow.linkedActivity = activity;
            Event.add(SlideShow.bigImageElem, "click", SlideShow.linkedActivity.clickReadMoreBtn);
        }
        
    }, // End Method: setBigImageEvent
    
    getImages: function() {   // Start Method: getImages
        
        for (var i=0; i<SlideShow.imgTotal; i++)
            SlideShow.imgList.push(new BigImage(SlideShow.imgPath + i + SlideShow.imgExt, SlideShow.linkedActivitiesList[i]));
        
        SlideShow.randomizeImages(SlideShow.imgList);
        
    }, // End Method: getImages
    
    randomizeImages: function(a) {   // Start Method: randomizeImages
        
        for (var i = a.length; i; i--) {
            var j = Math.floor(Math.random() * i);
            var x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
        
    }, // End Method: randomizeImages
    
    nextImage: function() {   // Start Method: nextImage
        
        clearTimeout(SlideShow.timer);
        SlideShow.imgNr++;
        if (SlideShow.imgNr >= SlideShow.imgTotal)
            SlideShow.imgNr = 0;
        SlideShow.setImage(SlideShow.imgList[SlideShow.imgNr]);
        
    }, // End Method: nextImage
    
    previousImage: function() {   // Start Method: previousImage
        
        clearTimeout(SlideShow.timer);
        SlideShow.imgNr--;
        if (SlideShow.imgNr < 0)
            SlideShow.imgNr = SlideShow.imgTotal-1;
        SlideShow.setImage(SlideShow.imgList[SlideShow.imgNr]);
        
    }, // End Method: previousImage
    
}; // End Static Class: SlideShow



Event.add(window, "load", SlideShow.init);						    // Active function init when the page is loaded