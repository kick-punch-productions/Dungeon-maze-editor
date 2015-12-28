var c = document.getElementById("map");
var ctx = c.getContext("2d");
var mouseDown = 0;
var floor = [[]];
floor.shift();
var wall = [[]];
wall.shift();
var dungeon = [];
var width = 20; var height = 20;

function setWidth() {
  var w = document.getElementById("setWidth").value;
	width = w;
	c.width = width * 10;
	init();
}
function setHeight() {
  var h = document.getElementById("setHeight").value;
	height = h;
	c.height = height * 10;
	init();
}
function setDungeon() {
	for (var m = 0; m < width; m++) {
		dungeon[m] = [];
		for (var n = 0; n < height; n++) {
			wall.push([m, n]);
			dungeon[m][n] = 1;
		}
	}
}
function rectangleWall (t, j) {
			ctx.strokeStyle = '#000000';
			ctx.strokeRect(t*10+0.5,j*10+0.5,9,9);
			ctx.strokeStyle = '#c0c0c0';
			ctx.strokeRect(t*10+0.5,j*10+0.5,8,8);
			ctx.fillStyle = "#393939";
			ctx.fillRect(t*10+1,j*10+1,8,8);
}
function init() {
	setDungeon();
	for (var t = 0; t < width; t += 1) {
		for (var j = 0; j < height; j += 1) {
			rectangleWall (t, j);
		}
	}
}
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
function draw(e) {
	document.body.onmousedown = function() { 
		++mouseDown;
	}
	document.body.onmouseup = function() {
		--mouseDown;
	}
	if (mouseDown) {
		var pos = getMousePos(c, e);
		posx = Math.floor(pos.x/10);
		posy = Math.floor(pos.y/10);
		if (posx >= 0 && posy >= 0 && posx < width && posy < height) {
			if (e.shiftKey) {
				if (!isItemInArray(wall, [posx,posy])){
					wall.push([posx,posy]);
					dungeon[posx][posy] = 1;
					floor = removeItemInArray(floor, [posx,posy]);
					rectangleWall (posx,posy);
				}
			} else {
				if (!isItemInArray(floor, [posx,posy])){
					floor.push([posx,posy]);
					dungeon[posx][posy] = 0;
					wall = removeItemInArray(wall, [posx,posy]);
					ctx.fillStyle = "#A53E3E";
					ctx.fillRect(posx*10,posy*10,10,10);
					ctx.fillStyle = "#2f0f0f";
					ctx.fillRect(posx*10+4,posy*10+4,2,2);
				}
			}
		}
	}
}
function isItemInArray(array, item) {  // Thank you, user654628.
	for (var i = 0; i < array.length; i++) {
		if (array[i][0] == item[0] && array[i][1] == item[1]) {
			return true;
		}
	}
	return false;
}
function removeItemInArray(array, item) {
	for (var i = 0; i < array.length; i++) {
		if (array[i][0] == item[0] && array[i][1] == item[1]) {
			array.splice(i, 1);
		}
	}
	return array;
}
function getFloor() {
	console.log('floor');
	for (var i = 0; i < floor.length; i++) {
		console.log(floor[i][0]+' '+floor[i][1]);
	}
}
function getWall() {
	console.log('wall');
	for (var i = 0; i < wall.length; i++) {
		console.log(wall[i][0]+' '+wall[i][1]);
	}
}
function getDungeon() {
	console.log('dungeon');
	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			console.log(i+' '+j+' '+dungeon[i][j]);
		}
	}
}
init();
window.addEventListener('mousemove', draw, false);
window.addEventListener('mousedown', draw, false);
