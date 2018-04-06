function spawner(x, y, name){
	this.x = x;
	this.y = y;
	this.name = name;
}
function tile(x,y,w,h,solid,platform,img,sx,sy){

	//position and size
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	//image values
	this.imgX=x;
	this.imgY=y;
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
	this.map = mapGrids[level];

	//iterate through the array map and generate tiles
	this.populateMap = function(){
		var image = img;
		for(x=0;x<this.map[0].length;x++){
			for(y=0;y<this.map.length;y++){
				if(this.map[y][x]===1){
					//top left
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,0,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);

				}
				else if(this.map[y][x]===2){
					//top middle
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===3){
					//top right
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW*2,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===4){
					//middle left
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,0,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===5){
					//middle middle
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===6){
					//middle right
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW*2,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===7){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,image,0,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===8){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,image,this.tileW*3,this.tileH*2);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===9){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,true,image,this.tileW*3,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if (this.map[y][x] === 'e'){
					var e = new spawner(x * this.tileW, y * this.tileH, 'spawn');
					this.map[y][x] = e;
					this.spawners.push(e);
				}
				else if (this.map[y][x] === 's'){
					var s = new spawner(x * this.tileW, y * this.tileH, 'start');
					this.map[y][x] = this.spawners.push(s);
				}
				else if (this.map[y][x] === 'f'){
					var f = new spawner(x * this.tileW, y * this.tileH, 'finish');
					this.map[y][x] = this.spawners.push(f);
				}
				else{
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false);
					this.map[y][x]=t;
				}
			}
		}
	}
}

var e = 'e'; // represent enemy
var s = 's'; //level start
var f = 'f'; //level finish
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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,1,2,2],
		[2,2,2,3,0,0,0,0,s,f,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,3,0,0,0,4,6,0,0,0,4,5,5],
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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,1,2,2],
		[2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,5,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,3,5,5,5,4,6,0,0,0,4,5,5],
		[5,5,6,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,5,5,0,4,5,6,0,5,5,0,0,0,0,0,0,0,1,2,2,3,0,0,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		[5,5,6,0,0,6,0,0,0,0,0,0,0,4,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	3:[],
	4:[],
	5:[]

}
//level = new level();

module.exports = level;
