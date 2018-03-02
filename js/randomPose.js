
    currentCrazyPosesScript = randomPoseGeneratorForMannyTheSkeletonFemaleBodyKit3; //  randomPoseGeneratorForMannyTheSkeletonDefaultRigged;

    var crazyPoseSelector = "#crazy-pose";
    $(crazyPoseSelector).on("mousedown", function(){
    //  staticSliderPressed('timer', true);
    });
    $(crazyPoseSelector).on("mouseup", function(){
    //  staticSliderPressed('timer', false);
    });
    $(crazyPoseSelector).on("click", function(){
        currentCrazyPosesScript();
    });


    function randomAnimationDataKeyGenerator(){
    
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        if (animationDataKeyExist) {
        //  Generate random bones quaternion values.
            for (var i in animation.data.hierarchy){
                var euler = new THREE.Euler( randomRad(-180, 180), randomRad(-180, 180), randomRad(-180, 180), "XYZ" );
                var quaternion = new THREE.Quaternion();
                quaternion.setFromEuler( euler );
                animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.copy( quaternion );
            }
        }
        else if (!animationDataKeyExist){
            console.log("Current animation data key does not exists.", "You can not generate random pose key.");
        }

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();
    }

    function randomRad(min, max) { 
        return THREE.Math.degToRad(THREE.Math.randInt(min, max));
    }

    function randomPoseGeneratorForMannyTheSkeletonFemaleBodyKit3(){
        console.log("TODO: TO REPLACE THIS WITH THE BVH SKELETON VALUES.");
    }
    
    function randomPoseGeneratorForMannyTheSkeletonDefaultRigged(){
        
    //  Generate the random ik pose for every bone of MannyTheSkeletonDefaultRigged_v04.

        var ik_Base             = new THREE.Euler( randomRad( -30,  50), randomRad( -45,  45), randomRad(   0,   0), "XYZ" );
        var ik_Back             = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(   0,   0), "XYZ" );
        var ik_ScapulaRight     = new THREE.Euler( randomRad(  -8,   8), randomRad(  -2,   8), randomRad( -15,   8), "XYZ" );
        var ik_UpperArmRight    = new THREE.Euler( randomRad(-170,  80), randomRad(   0, 100), randomRad(-105,  95), "XYZ" );
        var ik_ForeArmRight     = new THREE.Euler( randomRad( -75,  95), randomRad( -10, 160), randomRad(  -1,   1), "XYZ" );
        var ik_HandRight        = new THREE.Euler( randomRad(  -1,   1), randomRad( -30,  20), randomRad( -40,  70), "XYZ" );
        var ik_FingersRight     = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(   0,  80), "XYZ" );
        var ik_Fingers1Right    = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(   0, 105), "XYZ" );
        var ik_Fingers2Right    = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(   0, 110), "XYZ" );
        var ik_ThumbRight       = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(   0,   0), "XYZ" );
        var ik_Thumb1Right      = new THREE.Euler( randomRad( -40,  65), randomRad( -60,  50), randomRad( -50,  50), "XYZ" );
        var ik_Thumb2Right      = new THREE.Euler( randomRad(   0,  90), randomRad(   0,   0), randomRad(   0,   0), "XYZ" );
        var ik_ScapulaLeft      = new THREE.Euler( randomRad(  -8,   8), randomRad(  -8,   2), randomRad(  -8,  15), "XYZ" );
        var ik_UpperArmLeft     = new THREE.Euler( randomRad(  -8,   8), randomRad(-100,   0), randomRad( -95, 105), "XYZ" );
        var ik_ForeArmLeft      = new THREE.Euler( randomRad( -75,  95), randomRad(-160,  10), randomRad(  -1,   1), "XYZ" );
        var ik_HandLeft         = new THREE.Euler( randomRad(  -1,   1), randomRad( -20,  30), randomRad( -70,  40), "XYZ" );
        var ik_FingersLeft      = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad( -80,   0), "XYZ" );
        var ik_Fingers1Left     = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(-105,   0), "XYZ" );
        var ik_Fingers2Left     = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(-110,   0), "XYZ" );
        var ik_ThumbLeft        = new THREE.Euler( randomRad(   0,   0), randomRad(   0,   0), randomRad(   0,   0), "XYZ" );
        var ik_Thumb1Left       = new THREE.Euler( randomRad( -40,  65), randomRad( -50,  60), randomRad( -50,  50), "XYZ" );
        var ik_Thumb2Left       = new THREE.Euler( randomRad(   0,  90), randomRad(   0,   0), randomRad(   0,   0), "XYZ" );
        var ik_Chest            = new THREE.Euler( randomRad(  -1,   1), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_Hip              = new THREE.Euler( randomRad(-120,  30), randomRad( -50,  50), randomRad( -12,  12), "XYZ" );
        var ik_HipLeft          = new THREE.Euler( randomRad(  -1,   1), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_ThighLeft        = new THREE.Euler( randomRad( -90,   0), randomRad( -90,  25), randomRad( -10,  45), "XYZ" );
        var ik_ShinLeft         = new THREE.Euler( randomRad(  -0, 130), randomRad( -30,  30), randomRad(  -1,   1), "XYZ" );
        var ik_FootLeft         = new THREE.Euler( randomRad( -30,  30), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_ToesLeft         = new THREE.Euler( randomRad(  -1,  45), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_HipRight         = new THREE.Euler( randomRad(  -1,   1), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_ThighRight       = new THREE.Euler( randomRad( -90,   0), randomRad( -25,  90), randomRad( -45,  10), "XYZ" );
        var ik_ShinRight        = new THREE.Euler( randomRad(  -0, 130), randomRad( -30,  30), randomRad(  -1,   1), "XYZ" );
        var ik_FootRight        = new THREE.Euler( randomRad( -30,  30), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_ToesRight        = new THREE.Euler( randomRad(  -1,  45), randomRad(  -1,   1), randomRad(  -1,   1), "XYZ" );
        var ik_Neck             = new THREE.Euler( randomRad( -15,  30), randomRad( -45,  45), randomRad( -60,  60), "XYZ" );
        var ik_Head             = new THREE.Euler( randomRad( -45,  15), randomRad( -15,  15), randomRad( -15,  15), "XYZ" );
        var ik_Jaw              = new THREE.Euler( randomRad(   0,  50), randomRad(  -3,   3), randomRad(  -4,   4), "XYZ" );
    //
        var bonesIK = [ ik_Base, ik_Back, 
            ik_ScapulaRight, ik_UpperArmRight, ik_ForeArmRight, ik_HandRight, ik_FingersRight, ik_Fingers1Right, ik_Fingers2Right, ik_ThumbRight, ik_Thumb1Right, ik_Thumb2Right,
            ik_ScapulaLeft, ik_UpperArmLeft, ik_ForeArmLeft, ik_HandLeft, ik_FingersLeft, ik_Fingers1Left, ik_Fingers2Left, ik_ThumbLeft, ik_Thumb1Left, ik_Thumb2Left,
            ik_Chest, ik_Hip, ik_HipLeft, ik_ThighLeft, ik_ShinLeft, ik_FootLeft, ik_ToesLeft, ik_HipRight, ik_ThighRight, ik_ShinRight, ik_FootRight, ik_ToesRight,
            ik_Neck, ik_Head, ik_Jaw
        ]
        
    //  Check if current animation data key exist.
        bcaFrameKeyIndexesArray( animtimerSlider.value );
        
        function setAnimationDataKeyRotationFromEuler(euler, idx){
            var quaternion = new THREE.Quaternion();
            quaternion.setFromEuler( euler );
            animation.data.hierarchy[idx].keys[currentAnimationKeyIndex].rot.copy( quaternion );
        }
        
        if (animationDataKeyExist) {
        //  Base - Body.
            if (currentBoneIndex == 0) {
                for (var i in bonesIK){
                    var quaternion = new THREE.Quaternion();
                    quaternion.setFromEuler( bonesIK[i] );
                    animation.data.hierarchy[i].keys[currentAnimationKeyIndex].rot.copy( quaternion );
                }
            }
            
        //  Back - Upperbody.
            else if (currentBoneIndex == 1){
                setAnimationDataKeyRotationFromEuler( bonesIK[1], 1 );
                setAnimationDataKeyRotationFromEuler( bonesIK[22], 22 );
                for (var i = 2; i < 12; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
                for (var i = 12; i < 22; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
                for (var i = 34; i < 37; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
                
            }
            
        //  Right upperbody limb.
            else if (currentBoneIndex == 2){
                setAnimationDataKeyRotationFromEuler( bonesIK[2], 2 );
                setAnimationDataKeyRotationFromEuler( bonesIK[3], 3 );
            }
            else if (currentBoneIndex == 3){
                for (var i = 3; i < 12; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 4){
                for (var i = 4; i < 6; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 5){
                for (var i = 5; i < 12; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 6){
                setAnimationDataKeyRotationFromEuler( bonesIK[6], 6 );
                setAnimationDataKeyRotationFromEuler( bonesIK[7], 7 );
                setAnimationDataKeyRotationFromEuler( bonesIK[8], 8 );
            }
            else if (currentBoneIndex == 7){
                setAnimationDataKeyRotationFromEuler( bonesIK[7], 7 );
            }
            else if (currentBoneIndex == 8){
                setAnimationDataKeyRotationFromEuler( bonesIK[8], 8 );
            }
            else if (currentBoneIndex == 9){
                setAnimationDataKeyRotationFromEuler( bonesIK[10], 10 );
                setAnimationDataKeyRotationFromEuler( bonesIK[11], 11 );
            }
            else if (currentBoneIndex == 10){
                setAnimationDataKeyRotationFromEuler( bonesIK[10], 10 );
            }
            else if (currentBoneIndex == 11){
                setAnimationDataKeyRotationFromEuler( bonesIK[11], 11 );
            }
            
        //  Left upperbody limb.
            else if (currentBoneIndex == 12){
                setAnimationDataKeyRotationFromEuler( bonesIK[12], 12 );
                setAnimationDataKeyRotationFromEuler( bonesIK[13], 13 );
            }
            else if (currentBoneIndex == 13){
                for (var i = 13; i < 22; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 14){
                for (var i = 14; i < 16; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 15){
                for (var i = 15; i < 22; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 16){
                setAnimationDataKeyRotationFromEuler( bonesIK[16], 16 );
                setAnimationDataKeyRotationFromEuler( bonesIK[17], 17 );
                setAnimationDataKeyRotationFromEuler( bonesIK[18], 18 );
            }
            else if (currentBoneIndex == 17){
                setAnimationDataKeyRotationFromEuler( bonesIK[17], 17 );
            }
            else if (currentBoneIndex == 18){
                setAnimationDataKeyRotationFromEuler( bonesIK[18], 18 );
            }
            else if (currentBoneIndex == 19){
                setAnimationDataKeyRotationFromEuler( bonesIK[20], 20 );
                setAnimationDataKeyRotationFromEuler( bonesIK[21], 21 );
            }
            else if (currentBoneIndex == 20){
                setAnimationDataKeyRotationFromEuler( bonesIK[20], 20 );
            }
            else if (currentBoneIndex == 21){
                setAnimationDataKeyRotationFromEuler( bonesIK[21], 21 );
            }
            
        //  Chest.
            else if (currentBoneIndex == 22){
                for (var i = 1; i < 37; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            
        //  Hip - Lowerbody body.
            else if (currentBoneIndex == 23){
                setAnimationDataKeyRotationFromEuler( bonesIK[23], 23 );
                for (var i = 25; i < 29; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
                for (var i = 30; i < 34; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            
        //  Left lowerbody limb.
            else if (currentBoneIndex == 24){
                    setAnimationDataKeyRotationFromEuler( bonesIK[25], 25 );
            }
            else if (currentBoneIndex == 25){
                for (var i = 25; i < 29; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 26){
                for (var i = 26; i < 29; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 27){
                for (var i = 27; i < 29; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 28){
                setAnimationDataKeyRotationFromEuler( bonesIK[28], 28 );
            }
            
        //  Right lowerbody limb.
            else if (currentBoneIndex == 29){
                    setAnimationDataKeyRotationFromEuler( bonesIK[30], 30 );
            }
            else if (currentBoneIndex == 30){
                for (var i = 30; i < 34; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 31){
                for (var i = 31; i < 34; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 32){
                for (var i = 32; i < 34; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 33){
                setAnimationDataKeyRotationFromEuler( bonesIK[33], 33 );
            }
            
        //  Neck, Head, Jaw.
            else if (currentBoneIndex == 34){
                for (var i = 34; i < 37; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 35){
                for (var i = 35; i < 37; i++){
                    setAnimationDataKeyRotationFromEuler( bonesIK[i], i );
                }
            }
            else if (currentBoneIndex == 36){
                    setAnimationDataKeyRotationFromEuler( bonesIK[36], 36 );
            }
            
        //  Libs.
            else {
                for (var i =  2; i <  6; i++){ setAnimationDataKeyRotationFromEuler( bonesIK[i], i ); }
                for (var i = 12; i < 16; i++){ setAnimationDataKeyRotationFromEuler( bonesIK[i], i ); }
                for (var i = 25; i < 29; i++){ setAnimationDataKeyRotationFromEuler( bonesIK[i], i ); }
                for (var i = 30; i < 34; i++){ setAnimationDataKeyRotationFromEuler( bonesIK[i], i ); }
                for (var i = 34; i < 37; i++){ setAnimationDataKeyRotationFromEuler( bonesIK[i], i ); }
            }

        }
        
        else if (!animationDataKeyExist){
            console.log("Current animation data key does not exists.", "You can not generate random pose key.");
            alert("Current animation data key does not exists. You can not generate random pose key. Add a new pose key and try again.");
        }
        
    //  bcaFrameKeyIndexesArray( animtimerSlider.value );

    //  Get currentAnimationKeyIndex and then define currentAnimationKeyObject.
        newCurrentBoneSelected();
    }
