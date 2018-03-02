
//  Event Listeners.

    $(window).on( "resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    
    //  controls.handleResize(); //  NOT NEED FOR EDITOR CONTROLS.
        
    //  Resize timeliner.
        initTimeLiner();

    });

	$(document).on( "mousedown", function ( event ) {
        mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
       	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        bcaFrameKeyIndexesArray( animtimerSlider.value );
    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();

        if (playManual.checked){
            timescaleSlider.value = currentSpeed;
            timescaleOutput.value = currentSpeed;
        }
    });
 
	$(document).on( "mouseup", function( event ) {
        mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
       	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        if (playManual.checked){
            timescaleSlider.value = 0;
            timescaleOutput.value = currentSpeed;
        }
    });
 
    $(document).on( 'mousemove', function( event ) {
        mouse.x =   ( event.clientX / window.innerWidth ) * 2 - 1;
       	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    });

    $(window).on( "contextmenu", function (e){
        e.preventDefault();
    });

//  Controls switch.
    $(sceneContainerSelector).on("mouseenter", function(e){
        if (!!controls) controls.enabled = true;
    });
    $(sceneContainerSelector).on("mouseleave", function(e){
        if (!!controls) controls.enabled = false;
    });
