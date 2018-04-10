var box;

function init() {
	
	box = document.getElementById("box");
	document.addEventListener("mousemove", onMouseMove);
	box.addEventListener("click", onClick);
	
}

function onMouseMove(event) {
	
	box.style.left = event.pageX - (box.offsetWidth / 2) + "px";
	box.style.top = event.pageY - (box.offsetHeight / 2) + "px";
	
}

function onClick(event) {
	
	box.style.width = box.offsetWidth + 1 + "px";
	box.style.height = box.offsetHeight + 1 + "px";
	
}

window.onload = init;