

    var keysContainerSelector = "#keys-container";
    var timeContainerSelector = "#time-container";
    var sliderTimerSelector = "#slider-timer";
    var outputTimerSelector = "#output-timer";
    var animationPlayBtnSelector = "#animation-play";
    var animationAddKeyBtnSelector = "#animation-add";
    var animationRemoveKeySelector = "#animation-remove";
    var statusMsgrSelector = "#status-msgr";

    var slidertimer      = $(sliderTimerSelector)[0];
    var timeContainer  = $(timeContainerSelector)[0];
    var keyscontainer  = $(keysContainerSelector)[0];
    var animtimerSlider  = $(sliderTimerSelector)[0];
    var animtimerOutput  = $(outputTimerSelector)[0];
    var playButton  = $(animationPlayBtnSelector)[0];
    var addKey    = $(animationAddKeyBtnSelector)[0];
    var removeKey = $(animationRemoveKeySelector)[0];
    var statusMsgr = $(statusMsgrSelector)[0];

//  <!-- onmousedown="staticSliderPressed('timer', true);" onmouseup="staticSliderPressed('timer', false);" -->
    $(sliderTimerSelector).on("mousedown", function(){ staticSliderPressed("timer", true);  });
    $(sliderTimerSelector).on("mouseup",   function(){ staticSliderPressed("timer", false); });
//  <!-- onclick="playAnimation(avatar);" -->
    $(animationPlayBtnSelector).on("click",   function(){ playAnimation(avatar); });
//  <!-- onclick="insertNewAnimateDataTimeFrameKey();" -->
    $(animationAddKeyBtnSelector).on("click",   function(){ insertNewAnimateDataTimeFrameKey(); });
//  <!-- onclick="deleteCurrentAnimationDataKey();" -->
    $(animationRemoveKeySelector).on("click",   function(){ deleteCurrentAnimationDataKey(); });
