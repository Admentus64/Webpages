// JavaScript Document



// ---------- Functions ----------
function addListener(obj, type, fn) {   // Add an event handler
	
	// obj is element, type is event and fn is function
	if (obj.addEventListener)
		obj.addEventListener(type, fn, false);
	else obj.attachEvent("on" + type, fn);
	
} // End addListener


function removeListener(obj, type, fn) {   // Remove an eventhandler
	
	if (obj.removeEventListener)
		obj.removeEventListener(type, fn, false);
	else obj.detachEvent("on" + type, fn);
	
} // End removeListener
