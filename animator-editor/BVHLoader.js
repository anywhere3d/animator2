
    var loadBvhBtnSelector = "#load-bvh-button";
    var loadBvhInputSelector = "#load-bvh";

    var bvhClipAnimation;
    var bvhAnimation;
    var bvhMesh;
    var bvhSkeletonHelper;

    $(loadBvhBtnSelector).on("click", function(){ $(loadBvhInputSelector).click(); });
    $(loadBvhInputSelector).on("change", function(e){
    //  bvh loader.
        if (e.target.files.length == 0 ) return;

		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onload = function(e) { 
    //  parse file.
            var lines = e.target.result.split(/[\r\n]+/g);

		//  import BVH file
			var root = BVHImport.readBvh(lines);
			console.log("root:", root);

			bvhClipAnimation = BVHImport.toTHREE(root);
			console.log("bvhClipAnimation:", bvhClipAnimation);

        //  Cleanup cilp animation skeletor from ENDSITE bones. //  VERY IMPORTANT  //
            bvhClipAnimation.skeleton.bones.forEach(function(item, index){
                if (item.name == "ENDSITE") { bvhClipAnimation.skeleton.bones.splice(index, 1); }
            });
            console.log("skeleton.bones:", bvhClipAnimation.skeleton.bones);
            var bonesNames = []; 
            bvhClipAnimation.skeleton.bones.forEach(function(item, index){
                bonesNames.push(item.name);
            }); console.log("bones names:", bonesNames);

		//  create a minimal empty geometry to hold the Bones
            var geometry = new THREE.Geometry();

            var material = new THREE.MeshStandardMaterial({ skinning: true, });
            bvhMesh = new THREE.SkinnedMesh(geometry, material);

		//  bind skeleton.
            bvhMesh.add(bvhClipAnimation.skeleton.bones[0]);
            bvhMesh.bind(bvhClipAnimation.skeleton);

        //  Skeleton helper.
			bvhSkeletonHelper = new THREE.SkeletonHelper(bvhMesh);
			bvhSkeletonHelper.material.linewidth = 1;
			bvhSkeletonHelper.visible = true;
			
			scene.add(bvhSkeletonHelper);
			scene.add(bvhMesh);

        //  Create hierarchy animation.
        //  THREE.AnimationHandler.animations = [];

            var animationData = {"name":null, "fps":null, "length":null, "hierarchy":[]};
            animationData.name = bvhClipAnimation.clip.name;
            animationData.fps = 25;
            animationData.length = bvhClipAnimation.clip.duration;

            var p = -1; var i = 0; hierarchykeys( root ); // IMPORTANT //

            bvhAnimation = new THREE.Animation( bvhMesh, animationData );
            console.log("animation:", bvhAnimation);
            bvhAnimation.play(0);

            function hierarchykeys( object ){
            // callback: function(item, index){};
            // Find any children of an object and object itself.
                if ( object ){
                //  Object itself.
                    callback( object );
                //  Object children.
                    if ( object.children ) {
                        object.children.forEach( function( item, index ){
                            hierarchykeys( item ); 
                        });
                    }
                }

                function callback(object){
                    if ( object.type == "ENDSITE" ) return;
                    switch( object.name ){
                        case "Hips":
                            p = -1; break;
                        case "LHipJoint":
                        case "RHipJoint":
                        case "LowerBack":
                            p = 0; break;
                        case "LeftShoulder":
                        case "RightShoulder":
                        case "Neck":
                            p = 13; break;
                        case "LeftFingerBase":
                        case "LThumb":
                            p = 20; break;
                        case "RightFingerBase":
                        case "RThumb":
                            p = 27; break;
                        default:
                            p = i - 1;
                    }
                    console.log(i.toString(), "parent:", p, "children:", object.children.length, "bone:", object.name);
                    animationData.hierarchy.push({keys:boneKeys(object), parent:p}); i++;
                }
            }

        //  BVH to legacy animation. // IMPORTANT // This works correct. // DO NOT TOUCH IT. //
            function boneKeys(object){
                var keys = [];
                for (var j = 0; j < object.frames.length; j++) {
                    
                    var key = {"pos":[], "rot":[], "scl":[1,1,1], "time":0};
                    
                    key.pos.push( object.frames[j].position.x + object.offset.x );
                    key.pos.push( object.frames[j].position.y + object.offset.y  );
                    key.pos.push( object.frames[j].position.x + object.offset.z  );
                    
                    key.rot.push( object.frames[j].rotation.x );
                    key.rot.push( object.frames[j].rotation.y );
                    key.rot.push( object.frames[j].rotation.z );
                    key.rot.push( object.frames[j].rotation.w );

                    key.time = object.frames[j].time;
                    
                    keys.push(key);
                    
                }
                
                return keys;
                
            }

            function newSkeletonHelper(mesh){
            //  Create the skeleton helper debug visualization
        		var helper = new THREE.SkeletonHelper(mesh);
        		helper.material.linewidth = 1;
        		helper.name = "BVH_ARMATURE";
        		helper.visible = true;
        		return helper;
            }
        
            function showhideHelper(helper){
                helper.visible = !helper.visible;
            }

        };

		reader.readAsText(file);

	});
