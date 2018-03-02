
//  Helpers.js

//  More Helpers. Script loading order is important.
//  Helpers must load before main runtime scripts. 


    function generateId(n){
    	var set = ["abcdefghijklmnopqurstuvwxyz", "0123456789", "ABCDEFGHIJKLMNOPQURSTUVWXYZ"].join("");
    	var id = "";
    	for (var i = 0; i < n; i++) {
        	var p = Math.floor(Math.random() * set.length);
        	id += set[p];
        }
    	return id;
    };

    function logArguments(){
        for (var i = 0; i < arguments.length; i++){
            debugMode && console.log("arguments[" + i + "]:", arguments[i]);
        }
    }



























