var collisionChecker = require('./collisionChecker.js');
var component = require('./components.js');
var level = require('./level.js');
var keyInputController = require('./keys.js');
var camera = require('./camera.js');
var gameArea = require('./canvas.js');



//function to find delta time
function timeStamp(){
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


function game(){
	this.start = function(){
		//load key components 
		this.fpsMeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });
		
		//load collision checker
		this.collisionChecker = new collisionChecker();

		this.gameArea = new gameArea();
		this.camera = new camera(0,0,this.collisionChecker,this.gameArea);
		this.controller = new keyInputController();
		this.controller.addListeners();
		

		//load images
		this.tiles = new Image();
		this.playerImg = new Image();
		this.tiles.src ='img/tiles.png';
		this.playerImg.src = 'img/watercolor.png';

		this.levelMap = new level(1,this.tiles);

		//initialise components
		this.gameArea.start();
		this.levelMap.populateMap();

		//find start of level
		var x = 128;
		var y = 0;
		for(var i = 0; i < this.levelMap.map.length; i++){
			if(this.levelMap.map[i][0].solid){
				console.log(this.levelMap.map[i][0].y);
				y = this.levelMap.map[i][0].y-128;
				break;
			}
		}
		this.player = new component(64,128,"red",x,y,'player',this.playerImg);

		//initiate delta time
		this.now = timeStamp();
		this.dt = timeStamp();
		this.last = timeStamp();

		//start the game loop
		requestAnimationFrame(this.gameLoop.bind(this));	
	},

	this.checkKeys = function(){

		if(this.controller.keyDown.D){
			this.player.velocityX+=this.player.acceleration;
			}
		if(this.controller.keyDown.A){
			this.player.velocityX-=this.player.acceleration;
			}

		if(this.controller.keyDown.SPACE){
			this.player.jump(this.dt);
		}else{
			this.player.canJump=true;
		}
	},
	this.restart = function(){
		console.log('restarting');
		//find start of level
		var x = 128;
		var y = 0;
		for(var i = 0; i < this.levelMap.map.length; i++){
			if(this.levelMap.map[i][0].solid){
				y = this.levelMap.map[i][0].y-143;
				break;
			}
		}
		this.player.x = x;
		this.player.y = y;
		this.player.imgX = x;
		this.player.imgY = y;
		this.camera.x = 0;
		this.camera.y = 0;
		this.camera.update(this.dt,this.player,this.levelMap.map);
		
		var self = this;
		window.requestAnimationFrame(function(){
			self.gameLoop();
		});
	},
	this.gameLoop = function(){
		
		this.fpsMeter.tickStart();
		
		//update delta time
		this.now = timeStamp();
		this.dt = Math.min(1,(this.now - this.last) / 1000);
		this.gameArea.clear();
		this.checkKeys();

		//do collision checking
		for(var i = 0;i<this.levelMap.collisionObjects.length;i++){
			this.collisionChecker.checkMovement(this.player,this.levelMap.collisionObjects)
		}

		//update the player and camera position
		this.player.update(this.dt);
		this.camera.update(this.dt,this.player,this.levelMap.map);

		//list of objects to be rendered
		var renderList=[];
		for(i=0;i<this.levelMap.collisionObjects.length;i++){
			renderList.push(this.levelMap.collisionObjects[i])
		}
		renderList.push(this.player);
		//Render
		this.camera.render(renderList);
		this.fpsMeter.tick();
		
		//if the player is dead restart game
		if(this.player.y>this.levelMap.map.length*64){
			console.log('death');
			this.restart();
		}else{
		//start the next loop
			var self = this;
			window.requestAnimationFrame(function(){
				self.gameLoop();
			});
		}
	}
}

module.exports = game;
