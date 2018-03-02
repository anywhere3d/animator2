
    function deepCopy(obj) {
        if (Object.prototype.toString.call(obj) === "[object Array]") {
            var out = [], i = 0, len = obj.length;
            for ( ; i < len; i++ ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        if (typeof obj === "object") {
            var out = {}, i;
            for ( i in obj ) {
                out[i] = arguments.callee(obj[i]);
            }
            return out;
        }
        return obj;
    }

        
    function avatarRestPose(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
    
        if (animationDataKeyExist) {
        //  Copy pose from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].pos = deepCopy( theAvatar.userData.restPose[i].pos );
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.fromArray( theAvatar.userData.restPose[i].rot );
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].scl = deepCopy( theAvatar.userData.restPose[i].scl );
            }
            
        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );

            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key reseted to rest pose.");
            
        } else {
        
            console.log("Current animation data key does not exists.", "You can not reset to rest pose.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();
    }
    

    function bonesResetPosition(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
        //  Reset bones position values from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].pos = deepCopy( theAvatar.userData.restPose[i].pos );
            }

        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime )

            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key positions reseted.");
        
        } else {
        
            console.log("Current animation data key does not exists.", "You can not reset bones position.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();
    }
    
    function bonesResetQuaternion(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
        //  Reset bones position values from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.fromArray( theAvatar.userData.restPose[i].rot );
            }
        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );
        //
            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key rotations reseted.");
        }
        else if (!animationDataKeyExist){
            console.log("Current animation data key does not exists.", "You can not reset bones rotation.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();
    }

    function bonesResetScale(theAvatar){
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
        //  Reset bones position values from user data.
            for (var i in theAvatar.userData.restPose){
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].scl = deepCopy( theAvatar.userData.restPose[i].scl );
            }

        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );

            theAvatar.visible = true;
            armatureHelper.visible = false;
            console.log("Animation data key scales reseted.");
            
        } else {
        
            console.log("Current animation data key does not exists.", "You can not reset bones scale.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();
    }

    //  TODO: TO FIX deletePoseHierarchyKey() function.

    function deleteCurrentAnimationDataKey(){

        if ( !animationDataKeyExist ){
            console.error("Current animation data key does not exists.", "Delete of animation pose key canceled."); return;
        }

        if (animation.data.hierarchy[0].keys.length < 3) { 
            console.error("Delete of animation pose key not allowed.", "Keyframe minimum length limit."); return; 
        }

    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if ( animationDataKeyExist ){
            for (var i in animation.data.hierarchy){
                var removedItems = 1;
                animation.data.hierarchy[i].keys.splice( currentAnimationKeyIndex, removedItems );
            }
            console.log("Current animation data key deleted.");
        //
            ensureLooping();
            ensureKeysIndexing();
            
        //  Update current animation index key.
            bcaFrameKeyIndexesArray( animtimerSlider.value );
            
        //  Play the frame.
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );
            
        }
        
    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();  
        
        displayKeymarks(); // IMPORTANT //
        
    }

//  Sort keys by time.

    function changeFrameKeyTimeDebuger(k, t){
        for (var i in animation.data.hierarchy){
            animation.data.hierarchy[i].keys[k].time = t;
        }
    }
    
    function sortAnimationDataKeysByTime(){
        for (var i in animation.data.hierarchy){
        //  Sort animation data keys by time.
            animation.data.hierarchy[i].keys.sort( function(a,b){return parseFloat(a.time) - parseFloat(b.time);} );
        //  Ensure animation data keys indexing.
            for (var j in animation.data.hierarchy[i].keys){
                animation.data.hierarchy[i].keys[j].index = Number(j);
            }
        }
        console.log("Sorting Animation Data Keys by time with internal Ensure Keys Indexing completed.");
    }
