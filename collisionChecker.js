function collisionChecker(){
	

	//collision detection
	this.check = function(ob1,ob2){
		if(ob1.x+ob1.width>ob2.x && ob1.x<ob2.x+ob2.width &&
			ob1.y+ob1.height>ob2.y && ob1.y<ob2.y+ob2.height){
		return true;
		}
	},
	this.checkHoles = function(ob1,ob2){
		//var space = {x:ob1.x+ob1.velocityX,y:ob1.y+ob1.height,width:ob1.width,height:ob1.height}
		if(this.check(ob1,ob2)){
			return true;
		}

	},
	this.checkMovement = function(ob1,ob2){
		var collisionObjects = ob2;
		
		for(i=0;i<collisionObjects.length;i++){

			objectChecking = collisionObjects[i];
			//check for collisions above

			if(this.check(ob1.bbu,objectChecking)&&objectChecking.solid){
				ob1.canMoveUp = false;
				// this.y=objectChecking.y+objectChecking.height;
				// this.imgY=objectChecking.y+objectChecking.height;
				break;
			}else{
				ob1.canMoveUp = true;
			}
		}
		for(i=0;i<collisionObjects.length;i++){
			objectChecking = collisionObjects[i];
			//check for collisions below

			if(this.check(ob1.bbd,objectChecking)&&objectChecking.solid){
				ob1.canMoveDown = false;
				//this.y=objectChecking.y-this.height+1;
				//this.imgY=objectChecking.y-this.height+1;
				break;
			}else if(this.check(ob1.bbd,objectChecking)&&objectChecking.platform&&ob1.bbd.y-ob1.velocityY*dt<objectChecking.y){
				ob1.canMoveDown = false;
				break;
			}else{
				ob1.canMoveDown = true;
			}
		}

		for(i=0;i<collisionObjects.length;i++){
			objectChecking = collisionObjects[i];
			if(this.check(ob1.bbl,objectChecking)&&objectChecking.solid){
				ob1.canMoveLeft = false;
				break;
			}else{
				ob1.canMoveLeft = true;
			}
		}
		for(i=0;i<collisionObjects.length;i++){
			objectChecking = collisionObjects[i];
			if(this.check(ob1.bbr,objectChecking)&&objectChecking.solid){
				ob1.canMoveRight = false;
				break;
			}else{
				ob1.canMoveRight = true;
			}
		}

	
	}
}


module.exports = collisionChecker;
