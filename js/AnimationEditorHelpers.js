
//  AnimationEditorHelpers.js

    function initSlider(slider, min, max, step){
        slider.min = min;
        slider.max = max;
        slider.step = step;
    }

    function outputUpdate(selector, value) { 
        $(selector).val( value ); 
    }

    function newCurrentBoneSelected(){ 
        getCurrentBone();           
        initBonesAdjustValues();
    }

    function getCurrentBone(){
    //  var bonesDroplist = document.getElementById("droplist-bones");
        currentBoneIndex = bonesDroplist.selectedIndex;                      // number  //  We can put this line in update().
        currentBone = animation.hierarchy[currentBoneIndex];                 // object  //  We can put this line in update().
        currentDataBone = animation.data.hierarchy[currentBoneIndex];        // object  //  We can put this line in update().
        $(boneLabelSelectedNameSelector).text( currentBone.name );
    }

    function initBonesAdjustValues(){
    
    //  INITIALAZE POSITION OUTPUT VALUES.
        $(posOutputX).val( currentBone.position.x.toFixed(0) );   // string
        $(posOutputY).val( currentBone.position.y.toFixed(0) );   // string
        $(posOutputZ).val( currentBone.position.z.toFixed(0) );   // string
        
    //  INITIALAZE ROTATION OUTPUT VALUES.
        var xrad = currentBone.rotation._x;                       // number rad
        var yrad = currentBone.rotation._y;                       // number rad
        var zrad = currentBone.rotation._z;                       // number rad
    //  Always return first rotation y because of quaternion.
        $(rotOutputY).val( THREE.Math.radToDeg(yrad).toFixed(0) );  // string degrees
        $(rotOutputX).val( THREE.Math.radToDeg(xrad).toFixed(0) );  // string degrees
        $(rotOutputZ).val( THREE.Math.radToDeg(zrad).toFixed(0) );  // string degrees
    //  Always return first rotation y because of quaternion.
        $(rotSliderY).val( Number( $(rotOutputY).val() ) );           // number degrees
        $(rotSliderX).val( Number( $(rotOutputX).val() ) );           // number degrees
        $(rotSliderZ).val( Number( $(rotOutputZ).val() ) );           // number degrees
        
    //  INITIALAZE SCALE OUTPUT VALUES.
        sx = currentBone.scale.x * 100;      // number
        sy = currentBone.scale.y * 100;      // number
        sz = currentBone.scale.z * 100;      // number
        $(sclOutputX).val( sx.toFixed(1) );    // string
        $(sclOutputY).val( sy.toFixed(1) );    // string
        $(sclOutputZ).val( sz.toFixed(1) );    // string
        $(sclUniformOutput).val( $(sclOutputY).val() );
    //
    //  document.getElementById("animator-container-controls").style.display = "block";
    }

    function staticSliderPressed(identifier, status){ 
    //  debugMode && console.log("staticSliderPressed:", status);
        currentSlider = $( "#slider-" + identifier )[0];
        currentOutput = $( "#output-" + identifier )[0];
        currentSliderStatus = status;
    }

    function dynamicSliderPressed(identifier, status, restore){ 
    //  debugMode && console.log("dynamicSliderPressed:", status);
        currentSlider = $( "#slider-" + identifier )[0];
        currentOutput = $( "#output-" + identifier )[0];
        currentSliderStatus = status;
        currentSlider.value = restore;
    }
