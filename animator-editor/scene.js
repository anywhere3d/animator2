// animator editor scene.js.

    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    
    var frameCount = 0;
    var mouse = new THREE.Vector2();
    var avatar;
    var armature, armatureHelper;
    var animation;
    var poseHelper;
    var normals;
    var morphs = [];
    var skins = [];

    var documentBodySelector = document.body;
    var sceneContainerSelector = "#render-container";
//  var container = $(sceneContainerSelector)[0];

    var fontPath = "/three/r78/js/fonts/helvetiker_regular.typeface.json";

    var container = $(sceneContainerSelector)[0];
    var scene, camera, renderer, controls;
    var sceneLights, axisCustomHelper, axisOriginHelper;
    var projector, keyboard, clock;

    var scenename = "AnimatorEditor";
    scene = new THREE.Scene();
    scene.name = scenename;

    camera = createFpsCamera(50, 0.001, 10000);
    camera.position.set(0, 20, 250);
    controls = new THREE.EditorControls(camera);

    scene.add(directionalLight(0xffffff,  1000, 1000,  1000, 0.5));
    scene.add(directionalLight(0xffffff,  1000, 1000, -1000, 0.5)); 
    scene.add(directionalLight(0xffffff, -1000, 1000,  1000, 0.5)); 
    scene.add(directionalLight(0xffffff, -1000, 1000, -1000, 0.5));
    scene.add(directionalLight(0xffffff,     0,-5000,     0, 0.3));

    groundHelper = newGroundHelper(1000, 10);  
    groundHelper.visible = true;
    axisCustomHelper = newCustomAxisHelper(5200);
    axisOriginHelper = newOriginAxisHelper(1200);

//  Keyboard controls.
    keyboard = new KeyboardState();

//  Clock.
    clock = new THREE.Clock();
            
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
    });

    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
