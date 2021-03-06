var collisionChecker = require('./collisionChecker.js');
var gameArea = require('./canvas.js');

function camera(x, y, c, canvas){
	this.x = x,
	this.y = y,
	this.width = 1280,
	this.height = 720,
	
	this.gameArea = canvas;
	this.collisionChecker = new collisionChecker();
	
	//Update the cameras position
	this.update = function(dt, focus, map){
		//focus the camera on the player
		if(focus.x > 4 * 64 && focus.x < map[0].length * 64 - this.width + 4 * 64){
			this.x = focus.x - 4 * 64;
		}
		

		if(this.y + this.height < map.length * 64){
			this.y = focus.y - this.height / 2;
		}
	}

	//Render the game with list of objects to render
	this.render = function(arr, background){
		var ctx = this.gameArea.context;
		
		//draw background
		ctx.drawImage(background, 0, 0);


		for(var i = 0; i < arr.length; i++){
			var item = arr[i];
			
			//Check if the object is in view
			if(this.collisionChecker.check(this, item)){
				var img = item.img;
				var sx = item.imgSrcX;
				var sy = item.imgSrcY;
				var sw = item.imgWidth;
				var sh = item.imgHeight;
				var dx = item.imgX - this.x;
				var dy = item.imgY - this.y;
				var dw = item.imgWidth;
				var dh = item.imgHeight;

				//draw to the canvas
				if(item.img){
					ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
				}
				else{
					ctx.fillStyle = item.col;
					ctx.fillRect(item.x - this.x, item.y - this.y,item.width, item.height);
				}

				//uncomment the belowto see bounding boxes
				//ctx.fillStyle = item.col;
				//ctx.fillRect(item.x-this.x, item.y-this.y, item.width, item.height);
				//if(item.img){ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);}
				//else{console.log('no img');}
			}
		}
	}
}
module.exports = camera;
