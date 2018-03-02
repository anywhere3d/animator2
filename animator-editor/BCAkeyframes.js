
    var animationsHandler = THREE.AnimationHandler.animations;   //  array


//  Before, Current, After (bca) Frame Key Indexes Array.
    function bcaFrameKeyIndexesArray(t){
    //  Check if frame (t) already exist in animationData.
        var keyExists = false;
        var keyBefore, keyIndex, keyAfter;
        var keysArray = (animation) ? animation.data.hierarchy[0].keys : [];
    //  var t = Number(animtimerSlider.value);
        if (keysArray.length > 0){
            for (var j in keysArray){
                if (keysArray[j].time < Number(t)){
                
                    keyBefore = Number(j);
                    
                } else if (keysArray[j].time == Number(t)){
                
                    keyIndex = Number(j);
                    keyExists = true;
                    
                } else if (keysArray[j].time > Number(t)){
                
                    keyAfter = Number(j);
                    break;
                    
                } else {
                
                    var a = "DEBUG_ERROR_CAUTCH:"
                    var b = "currentFrameKeyExists():"
                    var c = "if (keysArray.length > 0)..."
                    debugMode && console.log( a, b, c );
                }
            }
        }
        
    //  Update.
        animationDataKeyExist = keyExists;
        bcaAnimationDataIndexKeys = [keyBefore, keyIndex, keyAfter];
        currentAnimationKeyIndex = keyIndex;

    //  debugMode && console.log("bca keys:", bcaAnimationDataIndexKeys);
        return bcaAnimationDataIndexKeys;
    }


//  animation-play.js

//  When you press a save button you can sent this animationData object to server database.
//  Play Button handles the timeSpeed of animation.
//  Animation is always in play mode. Never stopping.
    
    function playAnimation(theAvatar){
    
        if (playButton.innerHTML == "Play"){
            ensureLooping();
            ensureKeysIndexing();
            timescaleSlider.value = currentSpeed;
            timescaleOutput.value = currentSpeed;
            animation.play(animation.currentTime);
            animtimerSlider.value = animation.currentTime;
            playButton.innerHTML = "Pause";
            $(statusMsgrSelector).text("Playing...");
            $(statusMsgrSelector)[0].style.display = "block";
            console.log("Animation is playing.");
        }
        
        else if (playButton.innerHTML == "Pause"){
            timescaleSlider.value = 0;
            timescaleOutput.value = currentSpeed;
            animtimerSlider.value = animation.currentTime;
            playButton.innerHTML = "Play";
            console.log("animation.data:", animation.data);
            $(statusMsgrSelector).text("Paused");
            $(statusMsgrSelector)[0].style.display = "block";
            console.log("Animation paused.");
        }
    }

        
    function ensureLooping(){
        var lastkeyExists = false;
        var z = animation.data.hierarchy[0].keys.length - 1;
        var t = animation.data.length;

        if (animation.data.hierarchy[0].keys[z].time == t) {
            lastkeyExists = true;
        }

        for (var i in animation.data.hierarchy){
            var posloop = animation.data.hierarchy[i].keys[0].pos;
            var rotloop = animation.data.hierarchy[i].keys[0].rot;
            var sclloop = animation.data.hierarchy[i].keys[0].scl;
            var loopKeyData = {"index":z, "pos":posloop, "rot":rotloop, "scl":sclloop, "time":t};
        //  console.log("loopKeyData:", loopKeyData);

            if (lastkeyExists) {
            
                var removedItems = 1;
                animation.data.hierarchy[i].keys.splice(z, removedItems, loopKeyData);
                
            } else {

               var removedItems = 0;
               loopKeyData.index = animation.data.hierarchy[0].keys.length;   // index correction.
               animation.data.hierarchy[i].keys.push(loopKeyData);
            }

        }
        console.log("Ensure Looping completed.");
    }

    function ensureKeysIndexing(){
        for (var i in animation.data.hierarchy){
            for (var j in animation.data.hierarchy[i].keys){
                animation.data.hierarchy[i].keys[j].index = Number(j);
            }
        }
        console.log("Ensure Keys Indexing completed.");
    }
