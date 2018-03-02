
    var exportDataBtnSelector = "#export-data";
    $(exportDataBtnSelector).on("click", function(){
        saveJSONtoFile( exportAnimationDataAsJSON() );
    });
    var exportPoseBtnSelector = "#export-pose";
    $(exportPoseBtnSelector).on("click", function(){
        saveJSONtoFile( exportAnimationPoseAsJSON() );
    });

    function exportAnimationDataAsJSON(){
        console.log("Exporting animation data as JSON.");
        ensureLooping();
        ensureKeysIndexing();
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        var jsonExport;
        if (animationDataKeyExist) {
            var dataExport = {"name":"", "fps":0, "length":0, "hierarchy":[]}
            dataExport.name = animation.data.name;
            dataExport.fps = animation.data.fps;
            dataExport.length = animation.data.length;
            
            for (var i in animation.data.hierarchy){
                var keysExport = {keys:[]}
                for (var j in animation.data.hierarchy[i].keys){
                    var key = {"pos":[], "rot":[], "scl":[], "time":0};
                    key.pos = animation.data.hierarchy[i].keys[j].pos;
                    key.rot = animation.data.hierarchy[i].keys[j].rot.toArray();
                    key.scl = animation.data.hierarchy[i].keys[j].scl;
                    key.time = animation.data.hierarchy[i].keys[j].time;
                    keysExport.keys.push(key);
                }
                dataExport.hierarchy.push(keysExport);
            }
            console.log(dataExport);
        //
            jsonExport = JSON.stringify(dataExport);
            console.log(jsonExport);
        //
            alert("Animation data exported succesfully.");
        }
        else {
            var a = "Current animation data key does not exists.";
            var b = "You can not export animation data.";
            console.log(a, b, "\n" + jsonExport, "returned.");
            alert(a + "\n" + b);
        }
        return jsonExport;
    }
    
    function exportAnimationPoseAsJSON(){
        console.log("Exporting animation key Pose as JSON.");
        var poseExport = [];
        for (var i in animation.hierarchy) {
        //  Create a new animation data key with current time bones values.
        //  var poseKey = {"index":0, "pos":[], "rot":[], "scl":[], "time":0};
            var poseKey = {"pos":[], "rot":[], "scl":[]};
        //  Get bones values at current time from animation.hierarchy.
            poseKey.pos = animation.hierarchy[i].position.toArray();
            poseKey.rot = (animation.hierarchy[i].quaternion).toArray();
            poseKey.scl = animation.hierarchy[i].scale.toArray();
            poseExport.push(poseKey);
        }
        poseExport = JSON.stringify(poseExport);
        console.log(poseExport);
        alert("Animation pose exported succesfully.");
        return poseExport;
    }
    
    function exportAnimationExistedKeyPoseAsJSON(keyIdx){
        console.log("Exporting animation existed key Pose as JSON.");
        // ensureLooping();
        ensureKeysIndexing();
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
            var poseExport = [];
            for (var i in animation.data.hierarchy){
            //  poseExport.push(animation.data.hierarchy[i].keys[currentAnimationKeyIndex])
                var poseKey = {"pos":[], "rot":[], "scl":[]};
            //  Get bones values at current time from animation.data.hierarchy.
                poseKey.pos = animation.data.hierarchy[i].keys[keyIdx].pos;
                poseKey.rot = animation.data.hierarchy[i].keys[keyIdx].rot.toArray();
                poseKey.scl = animation.data.hierarchy[i].keys[keyIdx].scl;
                poseExport.push(poseKey);
            }
            poseExport = JSON.stringify(poseExport);
            console.log(poseExport);
            return poseExport;
        }
        else if (!animationDataKeyExist) {
            console.log("Current animation data key does not exists.", "You can not export animation pose keys.");
            return undefined;
        }
    }
    
    
    function saveJSONtoFile(jsonData){
        if (jsonData){
            var blob = new Blob([jsonData], {type: "application/json"});
            var url  = URL.createObjectURL(blob);
            var a = document.createElement("a");
            
            a.download = "exported json.js";
            a.href = url;
            a.onclick = destroyClickedElement;
            a.style.display = "none";
            document.body.appendChild(a);
            a.click();
        }
    }
    
    
    function destroyClickedElement(event) {
    	document.body.removeChild(event.target);
    }
