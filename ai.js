
function ai(){
	this.init = function(col,target){
		this.collisionChecker = col;
		this.target = target;
	},
	this.aiDo = function(obj,colObj){
		var object = obj;
		var collisionObjects = colObj;
		var aoe = {x:object.x-object.width/2,y:object.y+object.height,width:object.width/2,height:object.width/2};
		var aoeObs = [];
		object.canJump=true;

		if(this.target.x<obj.x){
			object.velocityX -= object.acceleration;
		}
		else if(this.target.x>obj.x){
			object.velocityX += object.acceleration;			
		}
		for(var i =0;i<collisionObjects.length;i++){
			if(this.collisionChecker.check(aoe,collisionObjects[i])){
				aoeObs.push(collisionObjects[i]);
			}
		}
		if(aoeObs.length<1){
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
