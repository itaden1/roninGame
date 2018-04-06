var collisionChecker = require('./collisionChecker.js');
var component = require('./components.js');
var level = require('./level.js');
var keyInputController = require('./keys.js');
var camera = require('./camera.js');
var gameArea = require('./canvas.js');
var ai = require('./ai.js');


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
		this.controller = new keyInputController();
		this.controller.addListeners();
		

		//load images
		this.tiles = new Image();
		this.playerImg = new Image();
		this.enemyImg = new Image();
		this.background = new Image();
		this.tiles.src ='img/tiles.png';
		this.background.src = 'img/mountain.jpg';
		this.playerImg.src = 'img/watercolor.png';
		this.enemyImg.src = 'img/samurai.png';

		this.levelMap = new level(1,this.tiles);

		//initialise components
		this.gameArea.start();
		this.levelMap.populateMap();
		this.collisionObjects = [];
		this.spawners = [];
		this.levelFinish;
		this.levelStart;

		for(var i=0;i<this.levelMap.collisionObjects.length;i++){
			this.collisionObjects.push(this.levelMap.collisionObjects[i]);
		}
		for(var s = 0;s < this.levelMap.spawners.length; s++){
			if (this.levelMap.spawners[s].name === 'spawn'){
				this.spawners.push(this.levelMap.spawners[s]);
			}
			if (this.levelMap.spawners[s].name === 'start'){
				console.log('found start');
				this.levelStart = this.levelMap.spawners[s];
			}
			if (this.levelMap.spawners[s].name === 'finish'){
				console.log('found finish');
				this.levelFinish = this.levelMap.spawners[s];
			}
		}
		console.log(this.levelFinish);
		
		// spawn the player character
		var y = this.levelStart.y - 64;
		var x = this.levelStart.x;
		this.player = new component(64,128,"red",x,y,'player',this.playerImg);
		this.spawnEnemies();
		
		//initiate delta time
		this.now = timeStamp();
		this.dt = timeStamp();
		this.last = timeStamp();
		
		//make the camera
		this.camera = new camera(0,0,this.collisionChecker,this.gameArea);
		
		//start the game loop
		requestAnimationFrame(this.gameLoop.bind(this));	
	},
		
	this.spawnEnemies = function(){
		//find spawn points and create the enemy
		this.enemies = [];
		for (var s = 0; s < this.spawners.length; s++){
			if (this.spawners[s].name === 'spawn'){
				var startx = this.spawners[s].x;
				var starty = this.spawners[s].y - 64;
				var enemy = new component(64,128,"blue",startx,starty,'enemy',this.enemyImg);
				enemy.ai = new ai();
				enemy.ai.init(this.collisionChecker,this.player);
				this.enemies.push(enemy);
				this.collisionObjects.push(enemy);
			}
		}
	}

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
		this.collisionObjects = []
		for(var i=0;i<this.levelMap.collisionObjects.length;i++){
			this.collisionObjects.push(this.levelMap.collisionObjects[i]);
		}
		
		var y = this.levelStart.y - 64;
		var x = this.levelStart.x;
		this.player = new component(64,128,"red",x,y,'player',this.playerImg);

		this.player.velocityX = 0;
		this.player.velocityY = 0;
		this.player.x = x;
		this.player.y = y;
		this.player.imgX = x;
		this.player.imgY = y;
		this.camera.x = 0;
		this.camera.y = 0;
		this.camera.update(this.dt,this.player,this.levelMap.map);
		
		this.enemies = []
		this.spawnEnemies();
		
		var self = this;
		window.requestAnimationFrame(function(){
			self.gameLoop();
		});
	},
	this.gameLoop = function(){
		var dead = false;
		this.fpsMeter.tickStart();
		
		//update delta time
		this.now = timeStamp();
		this.dt = Math.min(1,(this.now - this.last) / 1000);
		this.gameArea.clear();
		
		//list of objects to be rendered
		var renderList=[];

		this.checkKeys();

		//do collision checking
		for(var i = 0; i < this.collisionObjects.length; i++){
			this.collisionChecker.checkMovement(this.player,this.collisionObjects)
		}
		
		if (this.collisionChecker.check(this.player,this.levelFinish)){
			console.log('you win!');
		}
		
		for(var i = 0; i < this.enemies.length; i++){
			if(this.collisionChecker.check(this.player,this.enemies[i])){
				dead = true;
				console.log('death');
				
			}	
		}

		//enemy actions
		for(var i=0;i<this.enemies.length;i++){
			var enemy = this.enemies[i];
			
			//remove enemy from collision objects so it doesnt colide with itself
			var ind = this.collisionObjects.indexOf(enemy);
			this.collisionObjects.splice(ind, 1);
			
			enemy.update(this.dt);
			enemy.ai.aiDo(enemy,this.collisionObjects);
			this.collisionChecker.checkMovement(enemy,this.collisionObjects)
			
			//Add enemy back to object list
			this.collisionObjects.push(enemy);
			renderList.push(enemy);
		}
		//update the player, and camera position
		this.player.update(this.dt);
		this.camera.update(this.dt,this.player,this.levelMap.map);

		for(i=0;i<this.levelMap.collisionObjects.length;i++){
			renderList.push(this.levelMap.collisionObjects[i])
		}
		renderList.push(this.player);
	
		//Render
		this.camera.render(renderList,this.background);
		this.fpsMeter.tick();
		
		//if the player is dead restart game
		if(this.player.y>this.levelMap.map.length*64){
			dead = true;
			console.log('death');
		}
		if(dead){
			this.restart();
		}
		else{
		//start the next loop
			var self = this;
			window.requestAnimationFrame(function(){
				self.gameLoop();
			});
		}
	}
}

module.exports = game;
