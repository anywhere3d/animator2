
    var loadSkinnedBtnSelector = "#load-skinned-button";
    var loadSkinnedInputSelector = "#load-skinned";

    $(loadSkinnedBtnSelector).on("click", function(){ $(loadSkinnedInputSelector)[0].click(); });
    $(loadSkinnedInputSelector).on("change", function(e){ loadJsonSkinnedAnimatedMesh(e); });

    var loadPoseBtnSelector = "#load-pose-button";
    var loadPoseInputSelector = "#load-pose";
    
    $(loadPoseBtnSelector).on("click", function(){ $(loadPoseInputSelector)[0].click(); });
    $(loadPoseInputSelector).on("change", function(e){ importAnimationPoseKeyFromJSON(e); });

    var loadDataBtnSelector = "#load-data-button";
    var loadDataInputSelector = "#load-data";
    
    $(loadDataBtnSelector).on("click", function(){ $(loadDataInputSelector)[0].click(); });
    $(loadDataInputSelector).on("change", function(e){ importAnimationDataFromJSON(e); });


    function importAnimationDataFromJSON(event){
    //  var inputfile = document.getElementById("load-data"); ???????
        if (event.target.files.length == 0) return false;
        console.log("Importing animation data object from JSON file.");

    //  JSON TEXT CONTENTS READER.
        var reader = new FileReader();
        
    //  FileList object.
        var file = event.target.files[0];
        var filename = file.name;
        var extension = filename.split( '.' ).pop().toLowerCase();
        var name = filename.split( '.' )[0];
        
    //  Read json file as a text string.
        reader.readAsText(file);
        
    //  When reading competed...
        var contents, dataObject;
        reader.onloadend = function( event ){
            contents = event.target.result;
            dataObject = JSON.parse( contents );
			console.log("animation dataObject:", dataObject);
			
        //  Replace the animation.
            THREE.AnimationHandler.animations = [];
            animation = new THREE.Animation( avatar, dataObject );
            animation.currentTime = 0;
            durOutput.value = animation.data.length;
            animtimerSlider.max = animation.data.length;
            timescaleSlider.value = 0;
            nameAnimField.value = animation.data.name;
        //  animation.isPlaying = true;
            animation.play(0);
            playButton.innerHTML = "Play";
        //
            console.log("Animation created:", animation);
            
            displayKeymarks(); // IMPORTANT //
        };
    }
    
    function importAnimationPoseKeyFromJSON(event){
    //  var inputfile = document.getElementById("load-pose"); ?????????
        if (event.target.files.length == 0) return false;
        console.log("Importing animation pose keys from JSON file.");

    //  JSON TEXT CONTENTS READER.
        var reader = new FileReader();
        
    //  FileList object.
        var file = event.target.files[0];
        var filename = file.name;
		var extension = filename.split( '.' ).pop().toLowerCase();
		var name = filename.split( '.' )[0];
		
		console.log("file:", file);
		console.log("filename:", filename);
		console.log("extension:", extension);
		console.log("name:", name);
        
//      1. First we read json file as text.

    //  Read json file as a text string.
        reader.readAsText(file);
        
    //  When reading competed...
        reader.onloadend = function(event){
            //console.log(event.target.result);
            var contents = event.target.result;
        //  Pose Json data for pose animation collection input.
            var PoseJsonData = event.target.result;
            //console.log("contents:", contents);
            console.log("json contents readed as text string.");
            
//      2. Then we parse json string as json data with JSON parser.
        //  Parse json contents string as json data.
            var poseArray = JSON.parse( contents );
            console.log("json contents parsed as poseArray:", poseArray);

			bcaFrameKeyIndexesArray( animtimerSlider.value );
			if (animationDataKeyExist){
			//  Replace key if exist.
                for (var i in poseArray){
                    animation.data.hierarchy[i].keys[currentAnimationKeyIndex].pos = poseArray[i].pos;
                    animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.fromArray(poseArray[i].rot);
                    animation.data.hierarchy[i].keys[currentAnimationKeyIndex].scl = poseArray[i].scl;
                }
                console.log("Animation pose key", currentAnimationKeyIndex, "replaced at", animtimerSlider.value, "sec.", animation.data.hierarchy);
			}
			else if (!animationDataKeyExist) {
			//  Insert key if not exists.
                var b = bcaAnimationDataIndexKeys[0];
                var c = bcaAnimationDataIndexKeys[1];
                var a = bcaAnimationDataIndexKeys[2];
                if ( b &&  a ) { idx = b; spl = a; }          // splice to next key index.
                else if (!b &&  a) { idx = 0; spl = a; }      // splice to next key index.
                else if ( b && !a) { idx = b; spl = b + 1; }  // push to end of keys array.
                else if (!b && !a) { idx = 0; spl = 0; }      // keys array is empty. unshift to beginning of keys array.
                
                for (var i in animation.data.hierarchy){
                    var newKey = {"index":spl, "pos":[], "rot":new THREE.Quaternion(), "scl":[], "time":Number(animtimerSlider.value)};
                    newKey.pos = poseArray[i].pos;
                    newKey.rot.fromArray(poseArray[i].rot);
                    newKey.scl = poseArray[i].scl;
                //  Add new key in animation data hierarchy keys array.
                    if (spl < animation.data.hierarchy[i].keys.length) 
                        animation.data.hierarchy[i].keys.splice(spl, 0, newKey);      // add new key before the after key.
                    else animation.data.hierarchy[i].keys.push(newKey);               // add new key at end of keys array.
                //  Ensure keys indexing.
                    for (var j in animation.data.hierarchy[i].keys){
                        animation.data.hierarchy[i].keys[j].index = Number(j);
                    }
                }
                console.log("New animation data key imported at", animtimerSlider.value, "sec.", animation.data.hierarchy);
            }

            ensureLooping();
            ensureKeysIndexing();
            bcaFrameKeyIndexesArray( animtimerSlider.value );
            console.log("Animation pose key completed.");
            
            animation.isPlaying = true;
            timescaleSlider.value = 0;
            animation.play( animation.currentTime );
            playButton.innerHTML = "Play";
            
        //  Update bca indexes to get the new currentAnimationKeyIndex.
            bcaFrameKeyIndexesArray( animtimerSlider.value );
            
        //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
            newCurrentBoneSelected();

            displayKeymarks(); // IMPORTANT //

        };
    }
