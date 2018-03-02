
//  Current slider and bone.
    currentSliderStatus = false;            // boolean
    currentSpeed = 1;                       // number slider value
    currentSlider = undefined;              // slider element
    currentOutput = undefined;              // output element
    currentBoneIndex = undefined;           // number for animation.hierarchy[currentBoneIndex]
    currentBone = undefined;                // object animation.hierarchy[currentBoneIndex]
    currentDataBone = undefined;            // object animation.data.hierarchy[currentBoneIndex]
    currentAnimationKeyIndex = undefined;   // number for animation.data.hierarchy[currentBoneIndex].keys[currentAnimationKeyIndex]
    currentAnimationKeyObject = undefined;  // object animation.data.hierarchy[currentBoneIndex].keys[currentAnimationKeyIndex]
    currentFrameTime = undefined;           // number Number( document.getElementById("slider-timer").value )
    animationDataKeyExist = false;          // boolean
    bcaAnimationDataIndexKeys = [undefined, undefined, undefined];

//  Define an empty script for random pose generator button.
    function currentCrazyPosesScript(){};   // script for random pose generator.
//  How it is works: When we change avatar from Animator-Avatars menu, we parse also the assocciated random poses function in currentCrazyPosesScript function.
//  When we click the Random Pose button we call the currentCrazyPosesScript() function that is the assocciated random poses function for the selected avatar.
//  Do not forget that it is important to parse the assocciated random pose avatar function in menu Animator-Avatars-[the selected avatar] menu item.


//  keyframes.js

    var currentkeymark;
    var currentkeytime;
    var currentkeyindex;
    var keymarksArray = [];


    function insertNewAnimateDataTimeFrameKey(){
        
    //  Pause the animation.
        $(timescaleSlider).val(0);  
        
    //  Check first if animation key exists. If not, create it. Then set currentAnimationKeyIndex again.
        bcaFrameKeyIndexesArray( $(animtimerSlider).val() );
        var b = bcaAnimationDataIndexKeys[0];
        var c = bcaAnimationDataIndexKeys[1];
        var a = bcaAnimationDataIndexKeys[2];
        
    //  Calculate the index position to insert the new animation data key.
        if (!animationDataKeyExist){
            var idx, spl;
            if ( b &&  a ) { idx = b; spl = a; }          // splice to next key index.
            else if (!b &&  a) { idx = 0; spl = a; }      // splice to next key index.
            else if ( b && !a) { idx = b; spl = b + 1; }  // push to end of keys array.
            else if (!b && !a) { idx = 0; spl = 0; }      // keys array is empty. unshift to beginning of keys array.

            for (var i in animation.data.hierarchy){
            
            //  Create a new animation data key with current time bones values at animation.data.hierarchy[i].keys[idx].
                var newKey = {
                    "index":spl, "pos":[], "rot":new THREE.Quaternion(), 
                    "scl":[], "time":Number( $(animtimerSlider).val() )
                };
                
            //  Get bones values at current time from animation.hierarchy.
                newKey.pos = animation.hierarchy[i].position.toArray();
                newKey.rot.copy(animation.hierarchy[i].quaternion);
                newKey.scl = animation.hierarchy[i].scale.toArray();
                
            //  Add new key in animation data hierarchy keys array.
                if (spl < animation.data.hierarchy[i].keys.length) {
                    animation.data.hierarchy[i].keys.splice(spl, 0, newKey);      // add new key before the after key.
                } else {
                    animation.data.hierarchy[i].keys.push(newKey);                // add new key at end of keys array.
                }

            //  Ensure keys indexing.
                for (var j in animation.data.hierarchy[i].keys){
                    animation.data.hierarchy[i].keys[j].index = Number(j);
                }
            }
            console.log("New animation data key added at", $(animtimerSlider).val(), "sec.", animation.data.hierarchy[0]);
            
            ensureKeysIndexing();
        }
        
    //  Update bca indexes to get the new currentAnimationKeyIndex.
        bcaFrameKeyIndexesArray( $(animtimerSlider).val() );
        
    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
    //  currentDataBone = animation.data.hierarchy[currentBoneIndex];
        newCurrentBoneSelected();
        
        
    //  Sort animation data keys by time.
        for (var i in animation.data.hierarchy){
            animation.data.hierarchy[i].keys.sort(function(a,b){return parseFloat(a.time) - parseFloat(b.time);})
        }
        
    //  Delete existed keyframes handlers.
        $(".keymark").remove();  //  $(keysContainerSelector).html("");
        
    //  Create new indexed keyframes handlers.
        for (var i in animation.data.hierarchy[0].keys){
            newTimeKeyMarker(i);
        }
        
    }


//  Keyframe Handler.

    function newTimeKeyMarker(k){
    //  var v = Number(document.getElementById("slider-timer").value);
        var v = animation.data.hierarchy[0].keys[k].time;
        var m = Number( animtimerSlider.max );
/*
        var keymark = document.createElement("DIV");
    //  keymark.style.border = "1px solid #ff0";
        keymark.class = "keymark";
        keymark.style.position = "absolute";
        keymark.style.backgroundColor = "#ff0";
        keymark.style.cursor = "pointer";
        keymark.style.color = "#000";
        keymark.style.fontSize = "14px";
        keymark.style.fontWeight = "bold";
    //  keymark.style.minWidth = "1px";
        keymark.style.width = "auto";
        keymark.style.height = "16px";
        keymark.style.top = "10px";
*/
        var keymark = $( [ '<div class="keymark"',
            'style="position:absolute; top:10px; width:auto; height:auto; background-color:#ff0; cursor:pointer; color:#000; font-size14px; font-weight:bold; z-index:1001 !important;">',
            '</div>'
        ].join(" ") );
        
        debugMode && console.log("keymark:", keymark);

        keymark.text( animation.data.hierarchy[0].keys[k].index.toString() );
        var offset = ( 100 * v / m );  var half = ( keymark[0].offsetWidth / 2 );
        keymark[0].style.left = offset.toFixed(2) + "%";
        debugMode && console.log("keymark style left:", keymark[0].style.left, "half:", half);

        keymark.on("mousedown", onkeymarkMouseDown);
        keymark.on("mouseenter", function(){ this.style.backgroundColor = this.style.borderColor = "#0f0"; });
        keymark.on("mouseleave", function(){ this.style.backgroundColor = this.style.borderColor = "#ff0"; });
        
    //  Drag & Drop.
        keyDragDrop.initElement(keymark[0]);
    //  Add to document.
        $(keyscontainer).append(keymark);
/*        
    //  Keymark info.
        var keyinfo = document.createElement("DIV");
        keyinfo.style.position = "absolute";
    //  keyinfo.style.border = "1px solid #fff";
        keyinfo.style.color = "#fff";
        keyinfo.style.fontSize = "12px";
        keyinfo.style.fontWeight = "bold";
        keyinfo.style.top = "-25px";
        keyinfo.style.display = "block";
        keyinfo.style.left = "-100%";                
*/
        var keyinfo = $( [ '<div',
            'style="position:absolute; top:-25px; left:-100%; color:#fff; font-size12px; font-weight:bold; display:block">',
            '</div>'
        ].join(" ") );        

        keyinfo.text( animation.data.hierarchy[0].keys[k].time.toFixed(2) );
        keymark.append(keyinfo);
        
        console.log("New animation key marker created at", keyinfo.innerHTML, "sec.");
        return [keymark[0], keyinfo[0]];
    }

    function onkeymarkMouseDown(){ 
        this.style.backgroundColor = "#f00";
        currentkeymark = this;
        currentkeytime = this.children[1];
    //  Find corresponding Frame key before you add listeners.
        for (var i=0; i < keyscontainer.children.length; i++){
            if (this == keyscontainer.children[i]){
                currentkeyindex = i;
                break;
            }
        }
        console.log("currentkeyindex:", currentkeyindex);
        
        //document.addEventListener("mousemove", onkeymarkMouseMove, false);
        $(this).on("mousemove", function(){ onkeymarkMouseMove(); });
        //document.addEventListener("mouseup", onkeymarkMouseUp, false);
        $(document).on("mouseup", onkeymarkMouseUp);
        
        var t = (currentkeymark.offsetLeft / keyscontainer.offsetWidth) * ( slidertimer.max );
        if (t > Number(slidertimer.max)) {
            t = Number(slidertimer.max);
        }
        t = Number(t.toFixed(2));
        currentkeytime.innerHTML = t;
    }

    function onkeymarkMouseMove(){
        //currentkeytime.innerHTML = currentkeytime.parentElement.style.left;
        var t = (currentkeytime.parentElement.offsetLeft / keyscontainer.offsetWidth) * ( slidertimer.max );
        if (t > Number(slidertimer.max)) {
            t = Number(slidertimer.max);
        }
        t = Number(t.toFixed(2));
        currentkeytime.innerHTML = t;
    }
    
    function onkeymarkMouseUp(){
    //  Update animation.data.hierarchy[i].keys[currentkeyindex].time.
        var t = Number( $(currentkeytime).text() );
        console.log("currentkeytime:", t);
        for (var i in animation.data.hierarchy){
            animation.data.hierarchy[i].keys[currentkeyindex].time = t;
        //  Sort animation keys by time.
            animation.data.hierarchy[i].keys.sort( function(a,b){
                return parseFloat(a.time) - parseFloat(b.time);
            })
        }
    //  Ensure keys index.
        ensureKeysIndexing();
    //  Remove event listeners.
        var keymarks = keyscontainer.children;
        debugMode && console.log("keymarks:", keymarks);
        for (var i in keymarks){
            console.log("keymarks[" + i + "]:", keymarks[i]);
            var keymark = keymarks[i];
            debugMode && console.log("keymark:", keymark);
            if (keymark == keymarks.length) {
                console.log("keymark == keymarks.length:", keymark == keymarks.length);
                break;
            }
            $(keymark).off("mousedown");
            $(keymark).off("mousemove");
            $(document).off("mouseup", onkeymarkMouseUp);
        }
        debugMode && console.log("==end of loop==");
        
    //  Delete existed keyframes handlers.
        $(keyscontainer).html(""); // BE CAREFULL: DO NOT USE HERE $(".keymark").remove();

        
    //  Create new indexed keyframes handlers.
        for (var i in animation.data.hierarchy[0].keys){
            newTimeKeyMarker(i);
        }
    //  Initialize current key variables.
        currentkeymark = null;
        currentkeytime = null;
        currentkeyindex = null;
    }
    

    function displayKeymarks(){
    //  Sort animation data keys by time.
        for (var i in animation.data.hierarchy){
            animation.data.hierarchy[i].keys.sort(function(a,b){return parseFloat(a.time) - parseFloat(b.time);})
        }

    //  Delete existed keyframes handlers.
        $(".keymark").remove(); //  $(keysContainerSelector).html("");

    //  Create new indexed keyframes handlers.
        for (var i in animation.data.hierarchy[0].keys){
            newTimeKeyMarker(i);
        }
    }

    function removeKeymarks(){
    //  Delete existed keyframes handlers.
        $(".keymark").remove(); //  $(keysContainerSelector).html("");
    }
