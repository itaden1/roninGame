function component(width, height, color, x, y, name,img){
	
	//setbasic values
	this.name = name;
	this.col = color;

	//map position of character
	this.x = x;
	this.y = y;

	//set size
	this.width = width;
	this.height = height;
	
	//image to be used, image size and image location in relation to object location 
	this.img = img;
	this.imgX = this.x-this.width/4;
	this.imgY = this.y;
	this.imgSrcX = 0;
	this.imgSrcY = 0;
	this.imgWidth = width*2;
	this.imgHeight = height;
	
	//physics
	this.canJump = true;
	this.velocityX = 0;
	this.velocityY = 0;
	this.maxSpeed = 5;
	this.gravity = 0.3;
	this.friction = 0.8;
	this.acceleration = 1.5;

	//bounding boxes for collision detection, color value is for testing purposes
	this.bbu = {col:'yellow',x:this.x,y:this.y,width:this.width,height:this.height/2}
	this.bbd = {col:'blue',x:this.x,y:this.y+(this.height/2),width:this.width, height:this.height/2}
	this.bbl = {col:'orange',x:this.x-3,y:this.y+10,width:this.width/2-3,height:this.height-20 }
	this.bbr = {col:'brown',x:this.x+(this.width/2),y:this.y+10,width:this.width/2+3,height:this.height-20}

	//booleans to check before moving the character
	this.canMoveUp = false;
	this.canMoveDown = false;
	this.canMoveRight = false;
	this.canMoveLeft = false;
	this.action = 'default';

	this.jump = function(dt){
		var collisionObjects = game.levelMap.collisionObjects;
		for(i=0;i<collisionObjects.length;i++){
			if(checkCollision(this,collisionObjects[i])&&this.canJump){
				this.velocityY=-7;
				this.canJump = false;
			}
		}
	}

	this.update = function(dt){
		this.velocityX *= this.friction * dt;
		if(this.canMoveLeft){
			this.velocityX-=this.acceleration*dt;
		}else if(this.velocityX<0){
			this.velocityX=0;
		}

		if(this.canMoveRight){
			this.velocityX+=this.acceleration*dt;
		}else if(this.velocityX>0){
			this.velocityX=0;
		}

		if(this.canMoveDown){
			this.velocityY += this.gravity * dt;

		}else if(!this.canMoveDown&&this.velocityY>0){
			this.velocityY = 0;
		}

		if(!this.canMoveUp&&this.velocityY<0){
			this.velocityY=0;
		}

		this.x += this.velocityX * dt;
		this.imgX += this.velocityX * dt;
		this.y += this.velocityY * dt;
		this.imgY += this.velocityY * dt;

		this.bbu = {col:'yellow',x:this.x,y:this.y+this.velocityY*dt,width:this.width,height:this.height/4}
		this.bbd = {col:'blue',x:this.x,y:this.y+(this.height-2)+this.velocityY*dt,width:this.width, height:2}
		this.bbl = {col:'orange',x:this.x+this.velocityX*dt-1,y:this.y+3,width:this.width/2-3,height:this.height-6 }
		this.bbr = {col:'brown',x:this.x+(this.width/2-1)+1+this.velocityX*dt,y:this.y+3,width:this.width/2+3,height:this.height-6}
	}
}

module.exports = component;
