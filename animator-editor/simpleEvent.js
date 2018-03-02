
//  Simple add event.
    
    function addEventSimple(obj,evt,fn) {
    	if (obj.addEventListener)
    		obj.addEventListener(evt,fn,false);
    	else if (obj.attachEvent)
    		obj.attachEvent('on'+evt,fn);
    }
    
    function removeEventSimple(obj,evt,fn) {
    	if (obj.removeEventListener)
    		obj.removeEventListener(evt,fn,false);
    	else if (obj.detachEvent)
    		obj.detachEvent('on'+evt,fn);
    }
    
    
//  Key drag&drop object.
    keyDragDrop = {
    	keyHTML: "<a href='#' class='keyLink'></a>",
    	keySpeed: 1, // pixels per keypress event
    	initialMouseX: undefined,
    	initialMouseY: undefined,
    	startX: undefined,
    	startY: undefined,
    	dXKeys: undefined,
    	dYKeys: undefined,
    	draggedObject: undefined,
    	
    	initElement: function (element) {
    		if (typeof element == "string")
    			element = document.getElementById(element);
    		element.onmousedown = keyDragDrop.startDragMouse;
    		element.innerHTML += keyDragDrop.keyHTML;
    		var links = element.getElementsByTagName("a");
    		var lastLink = links[links.length-1];
    		lastLink.relatedElement = element;
    		lastLink.onclick = keyDragDrop.startDragKeys;
    	},
    	startDragMouse: function (e) {
    		keyDragDrop.startDrag(this);
    		var evt = e || window.event;
    		keyDragDrop.initialMouseX = evt.clientX;
    		keyDragDrop.initialMouseY = evt.clientY;
    		addEventSimple(document,"mousemove",keyDragDrop.dragMouse);
    		addEventSimple(document,"mouseup",keyDragDrop.releaseElement);
    		return false;
    	},
    	startDragKeys: function () {
    		keyDragDrop.startDrag(this.relatedElement);
    		keyDragDrop.dXKeys = keyDragDrop.dYKeys = 0;
    		addEventSimple(document,"keydown",keyDragDrop.dragKeys);
    		addEventSimple(document,"keypress",keyDragDrop.switchKeyEvents);
    		this.blur();
    		return false;
    	},
    	startDrag: function (obj) {
    		if (keyDragDrop.draggedObject)
    			keyDragDrop.releaseElement();
    		keyDragDrop.startX = obj.offsetLeft;
    		keyDragDrop.startY = obj.offsetTop;
    		keyDragDrop.draggedObject = obj;
    		obj.className = "dragged";
    	},
    	dragMouse: function (e) {
    		var evt = e || window.event;
    		var dX = evt.clientX - keyDragDrop.initialMouseX;
    		var dY = evt.clientY - keyDragDrop.initialMouseY;
    		keyDragDrop.setPosition(dX,dY);
    		return false;
    	},
    	dragKeys: function(e) {
    		var evt = e || window.event;
    		var key = evt.keyCode;
    		switch (key) {
    			case 37:	// left
    			case 63234:
    				keyDragDrop.dXKeys -= keyDragDrop.keySpeed;
    				break;
    			case 38:	// up
    			case 63232:
    				keyDragDrop.dYKeys -= keyDragDrop.keySpeed;
    				break;
    			case 39:	// right
    			case 63235:
    				keyDragDrop.dXKeys += keyDragDrop.keySpeed;
    				break;
    			case 40:	// down
    			case 63233:
    				keyDragDrop.dYKeys += keyDragDrop.keySpeed;
    				break;
    			case 13: 	// enter
    			case 27: 	// escape
    				keyDragDrop.releaseElement();
    				return false;
    			default:
    				return true;
    		}
    		keyDragDrop.setPosition(keyDragDrop.dXKeys,keyDragDrop.dYKeys);
    		if (evt.preventDefault)
    			evt.preventDefault();
    		return false;
    	},
    	setPosition: function (dx,dy) {
    	    if ( keyDragDrop.startX + dx > 0 && keyDragDrop.startX + dx < document.getElementById("keys-container").offsetWidth - keyDragDrop.draggedObject.offsetWidth){
    	        var x = (keyDragDrop.startX + dx) / (document.getElementById("keys-container").offsetWidth - keyDragDrop.draggedObject.offsetWidth);
    	        
    	        if (x < 0) {
                    x = 0;
                }
    	        else if (x > document.getElementById("keys-container").offsetWidth - keyDragDrop.draggedObject.offsetWidth) {
                    x = 1;
                }
                
             // Round x to second fractal digit;
                x = 100 * Math.round(x * 10000)/10000;
             
                keyDragDrop.draggedObject.style.left = x + "%";
       		}
    		//  keyDragDrop.draggedObject.style.top = keyDragDrop.startY + dy + 'px';
    	},
    	switchKeyEvents: function () {
		// for Opera and Safari 1.3
    		removeEventSimple(document,'keydown',keyDragDrop.dragKeys);
    		removeEventSimple(document,'keypress',keyDragDrop.switchKeyEvents);
    		addEventSimple(document,'keypress',keyDragDrop.dragKeys);
    	},
    	releaseElement: function() {
    		removeEventSimple(document,'mousemove',keyDragDrop.dragMouse);
    		removeEventSimple(document,'mouseup',keyDragDrop.releaseElement);
    		removeEventSimple(document,'keypress',keyDragDrop.dragKeys);
    		removeEventSimple(document,'keypress',keyDragDrop.switchKeyEvents);
    		removeEventSimple(document,'keydown',keyDragDrop.dragKeys);
    		keyDragDrop.draggedObject.className = keyDragDrop.draggedObject.className.replace(/dragged/, "keymark");
    		keyDragDrop.draggedObject = undefined;
    	}
    }
