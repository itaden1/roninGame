function spawner(x, y, name){
	this.x = x;
	this.y = y;
	this.width = 64;
	this.height = 128;
	this.name = name;
}
function tile(x, y, w, h, solid, platform, img, sx, sy){

	//position and size
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	//image values
	this.imgX = x;
	this.imgY = y;
	this.imgWidth = 64;
	this.imgHeight = 64;
	this.col='green';
	this.img = img;
	this.imgSrcX = sx;
	this.imgSrcY = sy;

	//type of tile
	this.solid = solid;
	this.platform = platform;

}

function level(level,img){

	this.tileW = 64;
	this.tileH = 64;

	this.collisionObjects = [];
	this.spawners = [];
	this.image = img;
	this.mapGrid = mapGrids[level];
	this.map = Array(this.mapGrid.length).fill(Array(this.mapGrid[0].length).fill(0));

	//iterate through the array map and generate tiles
	this.populateMap = function(){
		var image = this.image;
		console.log('width = ' + this.map[0].length + ', height = ' + this.map.length);
		for(var y = 0; y < this.mapGrid.length; y++){
			for(var x = 0; x < this.mapGrid[y].length; x++){
				if(this.mapGrid[y][x] === 1){
					//top left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, 0, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);

				}
				else if(this.mapGrid[y][x] === 2){
					//top middle
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 3){
					//top right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 2, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 4){
					//middle left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, 0, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 5){
					//middle middle
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 6){
					//middle right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 2, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 7){
					//Bottom left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, 0, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 8){
					//Bottom mid
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 9){
					//Bottom right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 2, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'q'){
					//single left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 3, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'w'){
					//single middle
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 4, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'r'){
					//single right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 3, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 't'){
					//single right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 3, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'y'){
					//single right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 4, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'u'){
					//back right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 5, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'i'){
					//back right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 4, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'o'){
					//back double mid left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 4, this.tileH * 4);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'p'){
					//back double mid right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 5, this.tileH * 4);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'a'){
					//back diagonal top left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 3, this.tileH * 3);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'd'){
					//back double diagonal top right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 5, this.tileH * 3);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'g'){
					//back diagonal bottom left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 3, this.tileH * 4);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'h'){
					//back diagonal bottom left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 4, this.tileH * 4);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if (this.mapGrid[y][x] === 'e'){
					var e = new spawner(x * this.tileW, y * this.tileH, 'spawn');
					this.map[y][x] = e;
					this.spawners.push(e);
				}
				else if (this.mapGrid[y][x] === 's'){
					var s = new spawner(x * this.tileW, y * this.tileH, 'start');
					this.map[y][x] = this.spawners.push(s);
				}
				else if (this.mapGrid[y][x] === 'f'){
					var f = new spawner(x * this.tileW, y * this.tileH, 'finish');
					this.map[y][x] = this.spawners.push(f);
				}
				else{
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false);
					this.map[y][x] = t;
				}
			}
		}
	}
}

var e = 'e'; // represent enemy
var s = 's'; //level start
var f = 'f'; //level finish
// 0 - 9 represent main blocks
// alt blocks
var q = 'q';
var w = 'w';
var r = 'r'

//background blocks
var t = 't';
var y = 'y';
var u = 'u';
var i = 'i';
var o = 'o';
var p = 'p';
var a = 'a';
var d = 'd';
var f = 'f';
var g = 'g';

var mapGrids = {
	//arrays representing the level layout
	1:[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,f],
		[s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,1,2,2],
		[2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,3,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,0,1,3,0,0,1,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,0,1,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,0,4,6,0,0,4,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,0,4,6,0,0,4,5,5,5,5,5,2,2,2,3,0,0,0,0,1,2,2,3,0,0,1,5,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	2:[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,t,y,u,0,0,0,t,y,u,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,t,2,3,0,0,0,0,0,i,0,0,0,0,0,i,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,7,8,u,0,0,0,a,o,d,0,0,0,a,p,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,a,o,p,0,0,0,0,t,w,w,u,0,a,o,o,d,0,0,4,5,3,0,0,0,0,0,t,y,u,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,f],
		[0,s,0,0,0,0,g,p,0,0,0,0,0,0,g,o,d,a,o,o,1,2,u,0,4,5,6,0,0,0,0,0,0,y,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,1,2,2],
		[2,2,3,0,0,0,g,p,0,0,0,0,0,a,o,o,o,o,o,1,2,5,0,0,4,6,6,0,0,0,0,0,y,i,0,0,0,0,0,0,0,1,2,2,2,2,2,3,5,5,5,4,6,0,0,0,4,5,5],
		[5,5,6,0,0,a,o,p,0,0,0,0,t,2,2,3,o,o,1,5,8,5,0,0,4,5,6,0,0,0,0,1,2,2,u,0,0,1,0,0,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,2,2,2,2,u,0,0,0,0,0,5,5,5,o,o,4,5,5,8,0,0,4,5,5,6,0,0,0,4,5,5,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		[5,5,5,5,5,5,6,0,0,0,0,0,0,4,5,8,o,o,7,8,8,8,0,0,4,8,8,6,0,0,0,4,8,5,0,0,0,7,5,5,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	3:[	
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[5,8,8,8,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,f],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,1,2,2],
		[7,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,5,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,3,5,5,5,4,6,0,0,0,4,5,5],
		[5,5,6,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,5,5,0,4,5,6,0,5,5,0,0,0,0,0,0,0,1,2,2,3,0,0,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		[5,5,6,0,0,6,0,0,0,0,0,0,0,4,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	4:[],
	5:[]

}
//level = new level();

module.exports = level;
