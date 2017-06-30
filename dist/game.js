/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 0;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());

function gameArea(){
	this.canvas = document.createElement('canvas'),
	this.start = function() {
		this.tileW = 64;
		this.tileH = 64;
		this.canvas.width = 1280;
		this.canvas.height = 720;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},

	this.clear = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function camera(x,y){
	this.x=x,
	this.y=y,
	this.width=1280,
	this.height=720,

	//Update the cameras position
	this.update = function(dt,focus){
		
		var map = game.levelMap;
		//focus the camera on the player
		if(focus.x>this.width/2&&focus.x<map.map[0].length*map.tileH-this.width/2){
			this.x=focus.x-this.width/2;
		}
		
		if(focus.y<map.map.length*map.tileH){
			this.y=focus.y-this.height/3;
		}
	}

	//Render the game with list of objects to render
	this.render = function(arr){
		
		for(i=0;i<arr.length;i++){
			var item=arr[i];

			//Check if the object is in view
			if(checkCollision(this,item)){
				var ctx = game.gameArea.context;
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

//function to find delta time
function timeStamp(){
	return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


function game(){
	this.start = function(){

		//load key components 
		this.fpsMeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });
		this.gameArea = new gameArea();
		this.camera = new camera(0,0);
		this.controller = new keyInputController();
		this.controller.addListeners();
		this.levelMap = new level(1);

		//load images
		this.tiles = new Image();
		this.playerImg = new Image();
		this.tiles.src ='img/tiles.png';
		this.playerImg.src = 'img/watercolor.png';

		//initialise components
		this.gameArea.start();
		this.player = new component(64,128,"red",0,390,'player',this.playerImg);
		this.levelMap.populateMap();

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

	this.gameLoop = function(){
		
		this.fpsMeter.tickStart();
		
		//update delta time
		this.now = timeStamp();
		this.dt = Math.min(1,(this.now - this.last) / 1000);
		this.gameArea.clear();
		this.checkKeys();

		//update the player and camera position
		this.player.update(this.dt);
		this.camera.update(this.dt,this.player);

		//list of objects to be rendered
		var renderList=[];
		for(i=0;i<this.levelMap.collisionObjects.length;i++){
			renderList.push(this.levelMap.collisionObjects[i])
		}
		renderList.push(this.player);

		//Render
		this.camera.render(renderList);
		this.fpsMeter.tick();

		//start the next loop
		requestAnimationFrame(this.gameLoop.bind(this));	
	}
}


//collision detection
function checkCollision(ob1,ob2){
	if(ob1.x+ob1.width>ob2.x && ob1.x<ob2.x+ob2.width &&
		ob1.y+ob1.height>ob2.y && ob1.y<ob2.y+ob2.height)
	{
		return true;
	}
}


//Start the game!!
(function startGame(){
	game = new game();
	game.start();
})


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjJkYTJkOGEzYWU3ODMwY2MxZWYiLCJ3ZWJwYWNrOi8vLy4iLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBLDJCOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBVSxhQUFhO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsdURBQXVEO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSx3Q0FBd0M7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MmRhMmQ4YTNhZTc4MzBjYzFlZiIsImZ1bmN0aW9uIHdlYnBhY2tFbXB0eUNvbnRleHQocmVxKSB7XG5cdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xufVxud2VicGFja0VtcHR5Q29udGV4dC5rZXlzID0gZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfTtcbndlYnBhY2tFbXB0eUNvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tFbXB0eUNvbnRleHQ7XG53ZWJwYWNrRW1wdHlDb250ZXh0LmlkID0gMDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUobGV2ZWx2MDIuanMpO1xyXG5yZXF1aXJlKGZwc21ldHJlLmpzKTtcclxucmVxdWlyZShrZXlzLmpzKTtcclxucmVxdWlyZShjb21wb25lbnRzLmpzKTtcclxuXHJcbmZ1bmN0aW9uIGdhbWVBcmVhKCl7XHJcblx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcclxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnRpbGVXID0gNjQ7XHJcblx0XHR0aGlzLnRpbGVIID0gNjQ7XHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IDEyODA7XHJcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSA3MjA7XHJcblx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy5jYW52YXMsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XHJcblx0fSxcclxuXHJcblx0dGhpcy5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY2FtZXJhKHgseSl7XHJcblx0dGhpcy54PXgsXHJcblx0dGhpcy55PXksXHJcblx0dGhpcy53aWR0aD0xMjgwLFxyXG5cdHRoaXMuaGVpZ2h0PTcyMCxcclxuXHJcblx0Ly9VcGRhdGUgdGhlIGNhbWVyYXMgcG9zaXRpb25cclxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0LGZvY3VzKXtcclxuXHRcdFxyXG5cdFx0dmFyIG1hcCA9IGdhbWUubGV2ZWxNYXA7XHJcblx0XHQvL2ZvY3VzIHRoZSBjYW1lcmEgb24gdGhlIHBsYXllclxyXG5cdFx0aWYoZm9jdXMueD50aGlzLndpZHRoLzImJmZvY3VzLng8bWFwLm1hcFswXS5sZW5ndGgqbWFwLnRpbGVILXRoaXMud2lkdGgvMil7XHJcblx0XHRcdHRoaXMueD1mb2N1cy54LXRoaXMud2lkdGgvMjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoZm9jdXMueTxtYXAubWFwLmxlbmd0aCptYXAudGlsZUgpe1xyXG5cdFx0XHR0aGlzLnk9Zm9jdXMueS10aGlzLmhlaWdodC8zO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly9SZW5kZXIgdGhlIGdhbWUgd2l0aCBsaXN0IG9mIG9iamVjdHMgdG8gcmVuZGVyXHJcblx0dGhpcy5yZW5kZXIgPSBmdW5jdGlvbihhcnIpe1xyXG5cdFx0XHJcblx0XHRmb3IoaT0wO2k8YXJyLmxlbmd0aDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbT1hcnJbaV07XHJcblxyXG5cdFx0XHQvL0NoZWNrIGlmIHRoZSBvYmplY3QgaXMgaW4gdmlld1xyXG5cdFx0XHRpZihjaGVja0NvbGxpc2lvbih0aGlzLGl0ZW0pKXtcclxuXHRcdFx0XHR2YXIgY3R4ID0gZ2FtZS5nYW1lQXJlYS5jb250ZXh0O1xyXG5cdFx0XHRcdHZhciBpbWcgPSBpdGVtLmltZztcclxuXHRcdFx0XHR2YXIgc3ggPSBpdGVtLmltZ1NyY1g7XHJcblx0XHRcdFx0dmFyIHN5ID0gaXRlbS5pbWdTcmNZO1xyXG5cdFx0XHRcdHZhciBzdyA9IGl0ZW0uaW1nV2lkdGg7XHJcblx0XHRcdFx0dmFyIHNoID0gaXRlbS5pbWdIZWlnaHQ7XHJcblx0XHRcdFx0dmFyIGR4ID0gaXRlbS5pbWdYLXRoaXMueDtcclxuXHRcdFx0XHR2YXIgZHkgPSBpdGVtLmltZ1ktdGhpcy55O1xyXG5cdFx0XHRcdHZhciBkdyA9IGl0ZW0uaW1nV2lkdGg7XHJcblx0XHRcdFx0dmFyIGRoID0gaXRlbS5pbWdIZWlnaHQ7XHJcblxyXG5cdFx0XHRcdC8vZHJhdyB0byB0aGUgY2FudmFzXHJcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWcsc3gsc3ksc3csc2gsZHgsZHksZHcsZGgpO1xyXG5cdFx0XHRcdC8vY3R4LmZpbGxTdHlsZSA9IGl0ZW0uY29sO1xyXG5cdFx0XHRcdC8vY3R4LmZpbGxSZWN0KGl0ZW0ueC10aGlzLngsIGl0ZW0ueS10aGlzLnksIGl0ZW0ud2lkdGgsIGl0ZW0uaGVpZ2h0KTtcclxuXHRcdFx0XHQvLyBpZihpdGVtLmltZyl7Y3R4LmRyYXdJbWFnZShpbWcsc3gsc3ksc3csc2gsZHgsZHksZHcsZGgpO31cclxuXHRcdFx0XHQvLyBlbHNle2NvbnNvbGUubG9nKCdubyBpbWcnKTt9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8vZnVuY3Rpb24gdG8gZmluZCBkZWx0YSB0aW1lXHJcbmZ1bmN0aW9uIHRpbWVTdGFtcCgpe1xyXG5cdHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2UgJiYgd2luZG93LnBlcmZvcm1hbmNlLm5vdyA/IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZ2FtZSgpe1xyXG5cdHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpe1xyXG5cclxuXHRcdC8vbG9hZCBrZXkgY29tcG9uZW50cyBcclxuXHRcdHRoaXMuZnBzTWV0ZXIgPSBuZXcgRlBTTWV0ZXIoeyBkZWNpbWFsczogMCwgZ3JhcGg6IHRydWUsIHRoZW1lOiAnZGFyaycsIGxlZnQ6ICc1cHgnIH0pO1xyXG5cdFx0dGhpcy5nYW1lQXJlYSA9IG5ldyBnYW1lQXJlYSgpO1xyXG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgY2FtZXJhKDAsMCk7XHJcblx0XHR0aGlzLmNvbnRyb2xsZXIgPSBuZXcga2V5SW5wdXRDb250cm9sbGVyKCk7XHJcblx0XHR0aGlzLmNvbnRyb2xsZXIuYWRkTGlzdGVuZXJzKCk7XHJcblx0XHR0aGlzLmxldmVsTWFwID0gbmV3IGxldmVsKDEpO1xyXG5cclxuXHRcdC8vbG9hZCBpbWFnZXNcclxuXHRcdHRoaXMudGlsZXMgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdHRoaXMucGxheWVySW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHR0aGlzLnRpbGVzLnNyYyA9J2ltZy90aWxlcy5wbmcnO1xyXG5cdFx0dGhpcy5wbGF5ZXJJbWcuc3JjID0gJ2ltZy93YXRlcmNvbG9yLnBuZyc7XHJcblxyXG5cdFx0Ly9pbml0aWFsaXNlIGNvbXBvbmVudHNcclxuXHRcdHRoaXMuZ2FtZUFyZWEuc3RhcnQoKTtcclxuXHRcdHRoaXMucGxheWVyID0gbmV3IGNvbXBvbmVudCg2NCwxMjgsXCJyZWRcIiwwLDM5MCwncGxheWVyJyx0aGlzLnBsYXllckltZyk7XHJcblx0XHR0aGlzLmxldmVsTWFwLnBvcHVsYXRlTWFwKCk7XHJcblxyXG5cdFx0Ly9pbml0aWF0ZSBkZWx0YSB0aW1lXHJcblx0XHR0aGlzLm5vdyA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5kdCA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5sYXN0ID0gdGltZVN0YW1wKCk7XHJcblxyXG5cdFx0Ly9zdGFydCB0aGUgZ2FtZSBsb29wXHJcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcC5iaW5kKHRoaXMpKTtcdFxyXG5cdH0sXHJcblxyXG5cdHRoaXMuY2hlY2tLZXlzID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5EKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYKz10aGlzLnBsYXllci5hY2NlbGVyYXRpb247XHJcblx0XHRcdH1cclxuXHRcdGlmKHRoaXMuY29udHJvbGxlci5rZXlEb3duLkEpe1xyXG5cdFx0XHR0aGlzLnBsYXllci52ZWxvY2l0eVgtPXRoaXMucGxheWVyLmFjY2VsZXJhdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuY29udHJvbGxlci5rZXlEb3duLlNQQUNFKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIuanVtcCh0aGlzLmR0KTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnBsYXllci5jYW5KdW1wPXRydWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dGhpcy5nYW1lTG9vcCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcclxuXHRcdHRoaXMuZnBzTWV0ZXIudGlja1N0YXJ0KCk7XHJcblx0XHRcclxuXHRcdC8vdXBkYXRlIGRlbHRhIHRpbWVcclxuXHRcdHRoaXMubm93ID0gdGltZVN0YW1wKCk7XHJcblx0XHR0aGlzLmR0ID0gTWF0aC5taW4oMSwodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcblx0XHR0aGlzLmdhbWVBcmVhLmNsZWFyKCk7XHJcblx0XHR0aGlzLmNoZWNrS2V5cygpO1xyXG5cclxuXHRcdC8vdXBkYXRlIHRoZSBwbGF5ZXIgYW5kIGNhbWVyYSBwb3NpdGlvblxyXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKHRoaXMuZHQpO1xyXG5cdFx0dGhpcy5jYW1lcmEudXBkYXRlKHRoaXMuZHQsdGhpcy5wbGF5ZXIpO1xyXG5cclxuXHRcdC8vbGlzdCBvZiBvYmplY3RzIHRvIGJlIHJlbmRlcmVkXHJcblx0XHR2YXIgcmVuZGVyTGlzdD1bXTtcclxuXHRcdGZvcihpPTA7aTx0aGlzLmxldmVsTWFwLmNvbGxpc2lvbk9iamVjdHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdHJlbmRlckxpc3QucHVzaCh0aGlzLmxldmVsTWFwLmNvbGxpc2lvbk9iamVjdHNbaV0pXHJcblx0XHR9XHJcblx0XHRyZW5kZXJMaXN0LnB1c2godGhpcy5wbGF5ZXIpO1xyXG5cclxuXHRcdC8vUmVuZGVyXHJcblx0XHR0aGlzLmNhbWVyYS5yZW5kZXIocmVuZGVyTGlzdCk7XHJcblx0XHR0aGlzLmZwc01ldGVyLnRpY2soKTtcclxuXHJcblx0XHQvL3N0YXJ0IHRoZSBuZXh0IGxvb3BcclxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVMb29wLmJpbmQodGhpcykpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxuLy9jb2xsaXNpb24gZGV0ZWN0aW9uXHJcbmZ1bmN0aW9uIGNoZWNrQ29sbGlzaW9uKG9iMSxvYjIpe1xyXG5cdGlmKG9iMS54K29iMS53aWR0aD5vYjIueCAmJiBvYjEueDxvYjIueCtvYjIud2lkdGggJiZcclxuXHRcdG9iMS55K29iMS5oZWlnaHQ+b2IyLnkgJiYgb2IxLnk8b2IyLnkrb2IyLmhlaWdodClcclxuXHR7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vL1N0YXJ0IHRoZSBnYW1lISFcclxuKGZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xyXG5cdGdhbWUgPSBuZXcgZ2FtZSgpO1xyXG5cdGdhbWUuc3RhcnQoKTtcclxufSlcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=