// SceneHelpers.js

function directionalLight(hexcolor, x, y, z, intensity){
    var light = new THREE.DirectionalLight( hexcolor );
    light.position.set( x, y, z );
    light.intensity = intensity;
    return light;
}

function convertingFromBufferGeometry( object ){
    debugMode && console.log("converting from buffer geometry:", object);
    if( object.children ) {
        for( child in object.children ) {
            var t = Date.now();
            object.children[child].geometry = new THREE.Geometry().fromBufferGeometry( object.children[child].geometry );
		    debugMode && console.log(child, object.children[child].name, "time:", Date.now() - t, "msec.");
        }
    }
}
/*
function creatingSelectedEdgesHelpers( object ){
    debugMode && console.log("creating selected edges helpers:", object);
    if( object.children ) {
        for( child in object.children ) {
            object.children[child].add( new THREE.EdgesHelper( object.children[child], 0x00ff00, 1 ) );
		    debugMode && console.log(child, object.children[child].name);
        }
    }
}
*/

function createFpsCamera(fov, near, far){
    var camera = new THREE.PerspectiveCamera( fov, window.innerWidth / window.innerHeight, near, far );
    camera.position.set( 0, 11, -113 );
    camera.rotation.set( 0, 0, 0 );
    camera.name = "FPS_CAMERA" ;
    return camera;
}

function newFpsCameraControls( camera ){
    var controls = new THREE.FirstPersonControls( camera );
    controls.movementSpeed = 30;
    controls.lookSpeed = 0.05;
    controls.noFly = true;
    controls.autoForward = false;
    controls.lookVertical = false;
    controls.enabled = true;
    return controls;
}

function newDirectionalLight(hexcolor, x, y, z, intensity){
    var light = new THREE.DirectionalLight( hexcolor );
    light.position.set( x, y, z );
    light.intensity = intensity;
    scene.add( light );
    return light;
}

function newDirectionalLightsGroup(hexcolor, x, y, z, intensity){
    var group = new THREE.Group();
    scene.add(group);
    light0 = directionalLight(hexcolor, x, y, z, intensity);
    light1 = directionalLight(hexcolor, x, y, -z, intensity);
    light2 = directionalLight(hexcolor, -x, y, -z, intensity);
    light3 = directionalLight(hexcolor, -x, y, z, intensity);
    light4 = directionalLight(hexcolor, 0, -y, 0, intensity);
    group.add( light0, light1, light2, light3, light4 );
    return [light0, light1, light2, light3, light4];
    function directionalLight(hexcolor, x, y, z, intensity){
        var light = new THREE.DirectionalLight( hexcolor );
        light.position.set( x, y, z );
        light.intensity = intensity;
        return light;
    }
}

function newGroundHelper(xz, step){
    if (!xz) xz = 1000;
    if (!step) step = 10;
    var grid = new THREE.GridHelper( xz, step, 0x444444, 0x444444 );
    grid.name = "GRID"
    grid.position.y = 0;
    scene.add( grid );
    return grid;
}

function newSkeletonHelper(target){
    var helper = new THREE.SkeletonHelper(target);
    helper.material.linewidth = 5;
    helper.name = "ARMATURE_HELPER";
    helper.visible = true;
    return helper;
}

function newSkybox( cubemap ) {
    scene.background = new THREE.CubeTexture( cubemap );
    scene.background.needsUpdate = true;
}

function createSkydome( path ){
    var loader = new THREE.TextureLoader();
    var skydomeGmt = new THREE.SphereGeometry( 2000, 64, 32 );
    var skydomeTxr = loader.load( path );
    var skydomeMtl = new THREE.MeshBasicMaterial({
        map: skydomeTxr,
        side: THREE.DoubleSide
    });
    var skydome = new THREE.Mesh( skydomeGmt, skydomeMtl );
    skydome.scale.y = 0.5;
    skydome.name = "SKYDOME";
    scene.add(skydome);
    return skydome;
}

function newCustomAxisHelper( distance ){
    var group = new THREE.Group();
    scene.add(group);

//  Lines.
    var geometryAxisXpos = new THREE.Geometry();
    var geometryAxisXneg = new THREE.Geometry();
    var geometryAxisYpos = new THREE.Geometry();
    var geometryAxisYneg = new THREE.Geometry();
    var geometryAxisZpos = new THREE.Geometry();
    var geometryAxisZneg = new THREE.Geometry();

    var materialAxisXpos = new THREE.LineBasicMaterial( {color: 0xff0000} );
    var materialAxisXneg = new THREE.LineBasicMaterial( {color: 0xff0000} );
    var materialAxisYpos = new THREE.LineBasicMaterial( {color: 0x00ff00} );
    var materialAxisYneg = new THREE.LineBasicMaterial( {color: 0x00ff00} );
    var materialAxisZpos = new THREE.LineBasicMaterial( {color: 0x0000ff} );
    var materialAxisZneg = new THREE.LineBasicMaterial( {color: 0x0000ff} );

    geometryAxisXpos.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( distance, 0, 0 ) );
    geometryAxisXneg.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3(-distance, 0, 0 ) );
    geometryAxisYpos.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, distance, 0 ) );
    geometryAxisYneg.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0,-distance, 0 ) );
    geometryAxisZpos.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, distance ) );
    geometryAxisZneg.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0,-distance ) );

    var lineAxisXpos = new THREE.Line( geometryAxisXpos, materialAxisXpos );
    var lineAxisXneg = new THREE.Line( geometryAxisXneg, materialAxisXneg );
    var lineAxisYpos = new THREE.Line( geometryAxisYpos, materialAxisYpos );
    var lineAxisYneg = new THREE.Line( geometryAxisYneg, materialAxisYneg );
    var lineAxisZpos = new THREE.Line( geometryAxisZpos, materialAxisZpos );
    var lineAxisZneg = new THREE.Line( geometryAxisZneg, materialAxisZneg );

    group.add( lineAxisXpos );
    group.add( lineAxisXneg );
//  group.add( lineAxisYpos );
//  group.add( lineAxisYneg );
    group.add( lineAxisZpos );
    group.add( lineAxisZneg );
    group.name = "AXES"
    return group;
}

function newOriginAxisHelper( distance ){
    var group = new THREE.Group();
    var promise = new Promise( function(resolve, reject){
        var loader = new THREE.FontLoader();
        loader.load( fontPath, function ( response ) {
            var font = response;
        //  var group = new THREE.Group();
            scene.add(group);
        //  Font Material
            var materialFace = new THREE.MeshBasicMaterial( { color: 0xffffff } );
            var materialSide = new THREE.MeshBasicMaterial( { color: 0x888888 } );
            var materialArray = [ materialFace, materialSide ];
            var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        //  Text Styles.
            h0 = { size: 40, height: 2,   curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1}
            h1 = { size: 20, height: 1,   curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
            h2 = { size: 10, height: 1,   curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
            h3 = { size: 5,  height: 0.5, curveSegments: 10, font: font, weight: "normal", style: "normal", bevelThickness: 1, bevelSize: 2, bevelEnabled: false, material: 0, extrudeMaterial: 1 }
        //  "+x"
            var text = "+x";
            var textGeometry = new THREE.TextGeometry( text, h1 );
            var textMesh = new THREE.Mesh(textGeometry, textMaterial );
            textGeometry.computeBoundingBox();
            var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.scale.set( 2, 2, 5); 
            textMesh.geometry.center();
            textMesh.position.set( distance, 20, 0 );
            textMesh.rotation.x = 0;
            textMesh.rotation.y = -Math.PI * 0.5;
            textMesh.rotation.z = 0;
            group.add(textMesh);
        //  "-x"
            var text = "-x";
            var textGeometry = new THREE.TextGeometry( text, h1 );
            var textMesh = new THREE.Mesh(textGeometry, textMaterial );
            textGeometry.computeBoundingBox();
            var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.scale.set( 2, 2, 5); 
            textMesh.geometry.center();
            textMesh.position.set( -distance, 20, 0 );
            textMesh.rotation.x = 0;
            textMesh.rotation.y = Math.PI * 0.5;
            textMesh.rotation.z = 0;
            group.add(textMesh); 
        //  "+z"
            var text = "+z";
            var textGeometry = new THREE.TextGeometry( text, h1 );
            var textMesh = new THREE.Mesh(textGeometry, textMaterial );
            textGeometry.computeBoundingBox();
            var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.scale.set( 2, 2, 5); 
            textMesh.geometry.center();
            textMesh.position.set( 0, 20, distance );
            textMesh.rotation.x = 0;
            textMesh.rotation.y = -Math.PI;
            textMesh.rotation.z = 0;
            group.add(textMesh); 
        //  "-z"
            var text = "-z";
            var textGeometry = new THREE.TextGeometry( text, h1 );
            var textMesh = new THREE.Mesh(textGeometry, textMaterial );
            textGeometry.computeBoundingBox();
            var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.scale.set( 2, 2, 5); 
            textMesh.geometry.center();
            textMesh.position.set( 0, 20, -distance );
            textMesh.rotation.x = 0;
            textMesh.rotation.y = 0;
            textMesh.rotation.z = 0;
            group.add(textMesh); 
        //  "+y"
            var text = "+y";
            var textGeometry = new THREE.TextGeometry( text, h1 );
            var textMesh = new THREE.Mesh(textGeometry, textMaterial );
            textGeometry.computeBoundingBox();
            var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.scale.set( 2, 2, 5); 
            textMesh.geometry.center();
            textMesh.position.set( 0, distance, 0 );
            textMesh.rotation.x = Math.PI * 0.5;
            textMesh.rotation.y = 0;
            textMesh.rotation.z = 0;
            group.add(textMesh); 
        //  "-y"
            var text = "-y";
            var textGeometry = new THREE.TextGeometry( text, h1 );
            var textMesh = new THREE.Mesh(textGeometry, textMaterial );
            textGeometry.computeBoundingBox();
            var textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
            textMesh.scale.set( 2, 2, 5); 
            textMesh.geometry.center();
            textMesh.position.set( 0, -distance, 0 );
            textMesh.rotation.x = -Math.PI * 0.5;
            textMesh.rotation.y = 0;
            textMesh.rotation.z = 0;
            group.add(textMesh); 
            group.name = "ORIGINS";
        //  return group;
            resolve(group);
        });
    });

    promise;
    return group;
}
