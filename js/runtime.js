
//  Initialize play options.
    loopCheckbox.checked = true;
    playManual.checked = false;
    hiddenHelpers.checked = false;

    var frameCount = 0;
    var mouse = new THREE.Vector2();
    var avatar;
    var armature, armatureHelper;
    var animation;
    var poseHelper;
    var normals;
    var morphs = [];
    var skins = [];

    var sceneContainerSelector = "#render-container";
    var animatorContainer = $(sceneContainerSelector)[0];
    var fontPath = "/animator-editor/three/r78/js/fonts/helvetiker_regular.typeface.json";
    var meshPath = "/animator-editor/js/HF_MannySkeletonLayer-AvatarsBodyKitv04-v0.1.js"

    var container = $(sceneContainerSelector)[0];
    var scene, camera, renderer, controls;
    var sceneLights, axisCustomHelper, axisOriginHelper;
    var projector, keyboard, clock;


    $.when(

        importSnippet("select-bone.html", boneHolderSelector),
        importSnippet("position-controls.html", positionHolderSelector),
        importSnippet("rotation-controls.html", rotationHolderSelector),
        importSnippet("scale-controls.html", scaleHolderSelector),
        importSnippet("animation-options.html", optionsHolderSelector),
        
    ).then( function(){
    
        init();
        animate();

    });

    function init(){

    //  Scene.
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( 0x000000, 0.0001 );

    //  Camera.
        near = 1; 
        far = 100000;
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, near, far );
        camera.position.set( -1.5, 18, 55 );
        camera.rotation.set( -0.043, -0.035, -0.002 );
        camera.name = "CAMERA" ;

    //  Scene lights.
        light0 = newDirectionalLight(0xffffff, 1000, 1000, 1000, 0.5);
        light1 = newDirectionalLight(0xffffff, 1000, 1000, -1000, 0.5);
        light2 = newDirectionalLight(0xffffff, -1000, 1000, -1000, 0.5);
        light3 = newDirectionalLight(0xffffff, -1000, 1000, 1000, 0.5);
        light4 = newDirectionalLight(0xffffff, 0, -1000, 0, 0.5);
        scene.add(light0, light1, light2, light3, light4);

    //  Controls.
        controls = new THREE.EditorControls(camera);
        controls.center.y = 15;
        camera.lookAt( controls.center );

    //  Projector.
    	projector = new THREE.Projector();

    //  Ground Helper.
        groundHelper = newGroundHelper(100, 2);
        scene.add(groundHelper);

	//  Skydome.
        var loader = new THREE.TextureLoader();
		skydome = new THREE.Mesh(
			new THREE.SphereGeometry( far * 0.1, 15, 15 ),
			new THREE.MeshBasicMaterial({
				map: loader.load( "/skydomes/skydome.jpg" ),
				color: 0xffffff,
				side: THREE.DoubleSide
			})
		);
		skydome.rotation.y = Math.PI;
		skydome.scale.set(-1, 2, 1);
		scene.add( skydome );
		
    //  Axis Helper.
        axisCustomHelper = newCustomAxisHelper(120);
        axisOriginHelper = newOriginAxisHelper(1000);

    //  Floor.
    //  var material = new THREE.MeshLambertMaterial( { color:0x8888ff, side:THREE.DoubleSide } );
    //  floorPlain = new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 1, 1 ), material );
    //  floorPlain.position.set( 0, 0, 0 );
    //  floorPlain.rotation.set( -Math.PI/2, 0, 0 );
    //  scene.add( floorPlain );

    //  Keyboard controls.
        keyboard = new KeyboardState();

    //  Clock.
        clock = new THREE.Clock();

    //  Renderer.
        renderer = new THREE.WebGLRenderer({ 
            antialias:true, 
            preserveDrawingBuffer:true // (for taking canvas png snapshots)
        });
        renderer.autoClear = true;
        renderer.shadowMapEnabled = true;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight ); 
		animatorContainer.appendChild( renderer.domElement );
        
    //  Manny The Skeleton Rigged Mesh.
        loadSkinnedAnimatedMesh( meshPath, 1 );
        
    //  Animator Inits.
        initAnimatorAdjustValues();
        
    //  Timeliner Inits.
        initTimeLiner();


    }

    function initAnimatorAdjustValues() {
    //  INITIALAZE DURATION OUTPUT VALUE.
        var duration = Number(animtimerSlider.max);
        durOutput.value = duration;
    }

    function initTimeLiner() {
    
    //  Timeliner.
        timeContainer.innerHTML = "";
            
    //  Settings.
        var duration = Number(animtimerSlider.max);  //  var duration = 3; // (sec).
        var defaultTimeScale = Math.floor(timeContainer.offsetWidth / duration); // (pixels).
    
    //  Dimensions.
        var markerTrackHeight = 20;
        var width = animtimerSlider.offsetWidth; // duration * defaultTimeScale;
        var height = 50;
        var timeScale = defaultTimeScale; // number of pixels to 1 second.
    
    //  Utilities.
        function proxy_ctx(ctx) {
    	//  Creates a proxy 2d context wrapper which 
    	//  allows the fluent / chaining API.
        	var wrapper = {};
        
        	function proxy_function(c) {
        		return function() {
    			//  Warning: this doesn't return value of function call
        			ctx[c].apply(ctx, arguments);
        			return wrapper;
        		};
        	}
        
        	function proxy_property(c) {
        		return function(v) {
        			ctx[c] = v;
        			return wrapper;
        		};
        	}
        
        	wrapper.run = function(args) {
        		args(wrapper);
        		return wrapper;
        	};
            
        	for (var c in ctx) {
    		//  if (!ctx.hasOwnProperty(c)) continue;
    		//  console.log(c, typeof(ctx[c]), ctx.hasOwnProperty(c));
    		//  string, number, boolean, function, object
        
        		var type = typeof(ctx[c]);
        		switch(type) {
        			case "object":
        				break;
        			case "function":
        				wrapper[c] = proxy_function(c);
        				break;
        			default:
        				wrapper[c] = proxy_property(c);
        				break;
        		}
        	}
        
        	return wrapper;
        }
    
    //  View Panel.
        var frame_start = 0; // this is the current scroll position.
        
    //  This class contains the view for the right main section of timeliner
        var tickMark1;
        var tickMark2;
        var tickMark3;
            
    //  Subdivison LOD
    //  timeScale refers to number of pixels per unit
    //  Eg. 1 inch - 60s, 1 inch - 60fps, 1 inch - 6 mins.    
        function time_scaled() {

        	var subDivision = 60;
        
        	tickMark1 = Math.round( (timeScale / subDivision) * 100 ) / 100;
        	tickMark2 = 2 * tickMark1;
        	tickMark3 = 10 * tickMark1;
        
        }
        
        time_scaled();

    //  Timeline Panel.
        var dpr = window.devicePixelRatio;
        var canvas = document.createElement("canvas");
        canvas.width = width; // * dpr;
        canvas.height = height; // * dpr;
        timeContainer.appendChild(canvas);
        
        var ctx = canvas.getContext("2d");
    	var ctx_wrap = proxy_ctx(ctx);
        
        var currentTime; // measured in seconds.
	//  Technically it could be in frames or have it in string format (0:00:00:1-60).
	
    	var LEFT_GUTTER = 0;
    	var i, x, y, il, j;
        	
    //	function paint() {
    
        //  Background.
            ctx.fillStyle = "#ffffff";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    		ctx.save();
    		ctx.scale(dpr, dpr);
            
            ctx.lineWidth = 2; // options: | 0.5 | 1 | 2 |
            
            var units = Math.round(timeScale / tickMark1);
    		var offsetUnits = (frame_start * timeScale) % units;
    		var count = Math.ceil( width / units );
  
        //  timeScale = pixels to 1 second (40)
		//  tickMark1 = marks per second (marks / s)
		//  units = pixels to every mark (40)
            var t =  Math.floor(units * 100 / timeScale);
            //debugMode && console.log("t:", t);
            
        //  1.Labels only.
    		for (i = 0; i < count + 1; i++) {
    			x = i * units + LEFT_GUTTER - offsetUnits;
                
    			ctx.fillStyle = "#535353";
    			ctx.textAlign = "center";
                
    			var ti = ( t * i / 100 ).toFixed(2).replace(/\./g, ":");
    			//debugMode && console.log("t" + i + ":", ti);
                
    			ctx.fillText(ti, x, 50);
    		}
    
    		units = Math.round( timeScale / tickMark2 );
    		count =  Math.round( (width - LEFT_GUTTER + offsetUnits) / units );

        //  2.Marker lines - main.
    		for (i = 0; i < count + 1; i++) {
    			ctx.strokeStyle = "#b8b8b8";
    			ctx.beginPath();
    			x = i * units + LEFT_GUTTER - offsetUnits;
    			ctx.moveTo(x, markerTrackHeight + 14);
    			ctx.lineTo(x, markerTrackHeight - 16);
    			ctx.stroke();
    		}
    
    		var mul = tickMark3 / tickMark2;
    		units = Math.round( timeScale / tickMark3 );
    		count =  Math.round( (width - LEFT_GUTTER + offsetUnits) / units );

        //  3.Small ticks.
            for (i = 0; i < count + 1; i++) {
            	if (i % mul === 0) continue;
            	ctx.strokeStyle = "#b8b8b8";
            	ctx.beginPath();
            	x = i * units + LEFT_GUTTER - offsetUnits;
            	ctx.moveTo(x, markerTrackHeight + 5);
            	ctx.lineTo(x, markerTrackHeight - 10);
            	ctx.stroke();
            }
        
    //  }
        
    //  paint();
    }

    function animate(){
        requestAnimationFrame( animate );
        update();
        render();
    }

    function render(){

        renderer.render( scene, camera );
    }

    function update() {

        var delta = clock.getDelta();
        var time = clock.getElapsedTime();

        keyboard.update( delta );

    //  Current Slider.

        if (currentSliderStatus){
            debugMode && console.log (currentSliderStatus);
        //  Animator Timer slider.
            if (currentSlider == animtimerSlider) {
                currentOutput.value = currentSlider.value;
                var t = Number(animtimerSlider.value);
                
                if (animation) {
                    timescaleSlider.value = 0;
                    timescaleOutput.value = currentSpeed;
                    playButton.innerHTML = "Play";
                    animation.play(t);
                }
                else if (!animation) {
                //  Find the nearest lower frame-time in animationData.
                    var keysArray = animationData.hierarchy[0].keys;
                    if (keysArray.length > 0){
                        for (var i in keysArray){
                            if ( keysArray[i].time <= t) var keyIdx = Number(i);
                        }
                    //  console.log(keyIdx, "i:", i);
                    //  Adjust bones dimensions to nearest time-frame.
                        for (var j in animationData.hierarchy){
                            var avatarBone = avatar.skeleton.bones[j];
                            var animateKey = animationData.hierarchy[j].keys[keyIdx];
                            avatarBone.position.fromArray(animateKey.pos);
                            avatarBone.quaternion.fromArray(animateKey.rot);
                            avatarBone.scale.fromArray(animateKey.scl);
                        }
                    }
                }
                reverseSubmitPositionValue();
                reverseSubmitStaticRotationValue();
                reverseSubmitScaleValue();
            }

        //  Animation Adjust sliders.
            if (currentSlider == posSliderX || currentSlider == posSliderY || currentSlider == posSliderZ ||
                currentSlider == rotSliderX || currentSlider == rotSliderY || currentSlider == rotSliderZ ||
                currentSlider == sclSliderX || currentSlider == sclSliderY || currentSlider == sclSliderZ ){
                
                    submitNewPositionValue();
                    submitStaticRotationValue();
                    submitNewScaleValue();
            }

        //  Animation Adjust Uniform Scale slider.
            if (currentSlider == sclUniformSlider) {
                submitUniformScaleValue();
            }
            
        //  Animation duration slider.
            if (currentSlider == durSlider) {
                submitNewDurationValue();
                initTimeLiner(); 
            }
            
        } else {
            reverseSubmitPositionValue();
            reverseSubmitStaticRotationValue();
            reverseSubmitScaleValue();
        }
    
    //  Current animation.

        if (animation) {

        //  Pause.
            if ( Number(timescaleSlider.value) == 0 ) {
                $(playButton).text("Play");
                groundHelper.visible = true;
                axisCustomHelper.visible = true;
            }

        //  Play.
            if ( Number(timescaleSlider.value) > 0 ) {
                $(playButton).text("Pause");
                if (hiddenHelpers.checked) {
                    groundHelper.visible = false;
                    axisCustomHelper.visible = false;
                }
            }

        //  Play only at mouse down.
            if ( !loopCheckbox.checked ){
                if (animation.currentTime > animation.data.length){
                    timescaleSlider.value = 0;
                    timescaleOutput.value = currentSpeed;
                    animtimerSlider.value = 0;
                    animtimerOutput.value = 0;
                    animation.currentTime = 0;
                    $(playButton).text("Play");
                    animation.play(0);
                }
            }

            if (animation.isPlaying){
                animation.loop = loopCheckbox.checked;
                animation.fps = Number(fpsSlider.value);
                animation.timeScale = Number(timescaleSlider.value);
                animtimerSlider.value = animation.currentTime;
                animtimerOutput.value = animtimerSlider.value;
            }

        }

    //  Current time scale.
        if (timescaleSlider.value > 0) currentSpeed = Number(timescaleSlider.value);

    
        bcaFrameKeyIndexesArray( animtimerSlider.value );

        if (!!armatureHelper) armatureHelper.update();
        if (!!bvhSkeletonHelper) bvhSkeletonHelper.update();
            
    //  Animations updates.
        THREE.AnimationHandler.update( delta ); 

    }
