var collisionChecker = require('./collisionChecker.js');
var gameArea = require('./canvas.js');

function camera(x,y,c,canvas){
	this.x=x,
	this.y=y,
	this.width=1280,
	this.height=720,
	
	this.gameArea = canvas;
	this.collisionChecker = new collisionChecker();
	//Update the cameras position
	this.update = function(dt,focus,map){
		var map = map;
		//focus the camera on the player
		if(focus.x>4*64){
			console.log('stuff');
			this.x=focus.x-4*64;
		}
		
		//if(){
		//	console.log('stuff2');
		//	this.y=focus.y-this.height/3;
		//}
			//this.x=focus.x-this.width/2;
			this.y=focus.y-this.height/3;
	}

	//Render the game with list of objects to render
	this.render = function(arr){
		for(i=0;i<arr.length;i++){
			var item=arr[i];
			
			//Check if the object is in view
			if(this.collisionChecker.check(this,item)){
				var ctx = this.gameArea.context;
				var img = item.img;
				var sx = item.imgSrcX;
				var sy = item.imgSrcY;
				var sw = item.imgWidth;
				var sh = item.imgHeight;
				var dx = item.imgX-this.x;
				var dy = item.imgY-this.y;
				var dw = item.imgWidth;
				var dh = item.imgHeight;

				//draw to the canvas
				ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
				//ctx.fillStyle = item.col;
				//ctx.fillRect(item.x-this.x, item.y-this.y, item.width, item.height);
				// if(item.img){ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);}
				// else{console.log('no img');}
			}
		}
	}
}
module.exports = camera;
