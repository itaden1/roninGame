
function ai(){
	this.init = function(col,target){
		this.collisionChecker = col;
		this.target = target;
	},
	this.aiDo = function(obj,colObj){
		var object = obj;
		var collisionObjects = colObj;
		var aoeSteps = [];
		var aoeHoles = [];
		object.canJump=true;
		var attackRange = false;

		if(this.target.x<obj.x-object.width){
			object.velocityX -= object.acceleration;
			//aoe to check holes
			var aoe1 = {x:object.x-object.width/2,y:object.y+object.height,width:object.width/2,height:object.width/2};
			//aoe to check steps
			var aoe2 = {x:object.x-object.width/2,y:object.y+object.height/2,width:object.width/2,height:object.width/2};
			for(var i =0;i<collisionObjects.length;i++){
				if(this.collisionChecker.check(aoe1,collisionObjects[i])){
					aoeHoles.push(collisionObjects[i]);
				}
				if(this.collisionChecker.check(aoe2,collisionObjects[i])){
					aoeSteps.push(collisionObjects[i]);	
				}
			}
		}
		else if(this.target.x>obj.x+object.width*2){
			object.velocityX += object.acceleration;
			//aoe check for holes
			var aoe1 = {x:object.x+object.width/2,y:object.y+object.height,width:object.width/2,height:object.width/2};
			//aoe check for steps
			var aoe2 = {x:object.x+object.width*2,y:object.y+object.height/2,width:object.width/2,height:object.width/2};
			for(var i =0;i<collisionObjects.length;i++){
				if(this.collisionChecker.check(aoe1,collisionObjects[i])){
					aoeHoles.push(collisionObjects[i]);
				}
				if(this.collisionChecker.check(aoe2,collisionObjects[i])){
					aoeSteps.push(collisionObjects[i]);	
				}
			}
		}else{
			attackRange = true;
		}
		if(aoeHoles.length<1&&!attackRange){
			//jump over the hole
			object.jump();
		}
		if(aoeSteps.length>=1&&!attackRange){
			//jump over the step
			object.jump();
		}
		//for(var i=0;i<aoeObs.length;i++){
		//	if(this.collisionChecker.checkHoles(object,aoeObs[i])){
		//		object.jump();
		//		break;
		//	}
		//}			
	}
}
	

module.exports = ai;
