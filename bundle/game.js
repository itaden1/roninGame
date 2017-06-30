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
function startGame(){
	game = new game();
	game.start();
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDZiNGRlZjkyNzhiNWEyZmVhZjgiLCJ3ZWJwYWNrOi8vLy4iLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFdBQVc7QUFDbEQ7QUFDQTtBQUNBLDJCOzs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsVUFBVSxhQUFhO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsdURBQXVEO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSx3Q0FBd0M7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDZiNGRlZjkyNzhiNWEyZmVhZjgiLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH07XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IDA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLlxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKGxldmVsdjAyLmpzKTtcclxucmVxdWlyZShmcHNtZXRyZS5qcyk7XHJcbnJlcXVpcmUoa2V5cy5qcyk7XHJcbnJlcXVpcmUoY29tcG9uZW50cy5qcyk7XHJcblxyXG5mdW5jdGlvbiBnYW1lQXJlYSgpe1xyXG5cdHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXHJcblx0dGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy50aWxlVyA9IDY0O1xyXG5cdFx0dGhpcy50aWxlSCA9IDY0O1xyXG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSAxMjgwO1xyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gNzIwO1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMuY2FudmFzLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xyXG5cdH0sXHJcblxyXG5cdHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbWVyYSh4LHkpe1xyXG5cdHRoaXMueD14LFxyXG5cdHRoaXMueT15LFxyXG5cdHRoaXMud2lkdGg9MTI4MCxcclxuXHR0aGlzLmhlaWdodD03MjAsXHJcblxyXG5cdC8vVXBkYXRlIHRoZSBjYW1lcmFzIHBvc2l0aW9uXHJcblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbihkdCxmb2N1cyl7XHJcblx0XHRcclxuXHRcdHZhciBtYXAgPSBnYW1lLmxldmVsTWFwO1xyXG5cdFx0Ly9mb2N1cyB0aGUgY2FtZXJhIG9uIHRoZSBwbGF5ZXJcclxuXHRcdGlmKGZvY3VzLng+dGhpcy53aWR0aC8yJiZmb2N1cy54PG1hcC5tYXBbMF0ubGVuZ3RoKm1hcC50aWxlSC10aGlzLndpZHRoLzIpe1xyXG5cdFx0XHR0aGlzLng9Zm9jdXMueC10aGlzLndpZHRoLzI7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKGZvY3VzLnk8bWFwLm1hcC5sZW5ndGgqbWFwLnRpbGVIKXtcclxuXHRcdFx0dGhpcy55PWZvY3VzLnktdGhpcy5oZWlnaHQvMztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vUmVuZGVyIHRoZSBnYW1lIHdpdGggbGlzdCBvZiBvYmplY3RzIHRvIHJlbmRlclxyXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24oYXJyKXtcclxuXHRcdFxyXG5cdFx0Zm9yKGk9MDtpPGFyci5sZW5ndGg7aSsrKXtcclxuXHRcdFx0dmFyIGl0ZW09YXJyW2ldO1xyXG5cclxuXHRcdFx0Ly9DaGVjayBpZiB0aGUgb2JqZWN0IGlzIGluIHZpZXdcclxuXHRcdFx0aWYoY2hlY2tDb2xsaXNpb24odGhpcyxpdGVtKSl7XHJcblx0XHRcdFx0dmFyIGN0eCA9IGdhbWUuZ2FtZUFyZWEuY29udGV4dDtcclxuXHRcdFx0XHR2YXIgaW1nID0gaXRlbS5pbWc7XHJcblx0XHRcdFx0dmFyIHN4ID0gaXRlbS5pbWdTcmNYO1xyXG5cdFx0XHRcdHZhciBzeSA9IGl0ZW0uaW1nU3JjWTtcclxuXHRcdFx0XHR2YXIgc3cgPSBpdGVtLmltZ1dpZHRoO1xyXG5cdFx0XHRcdHZhciBzaCA9IGl0ZW0uaW1nSGVpZ2h0O1xyXG5cdFx0XHRcdHZhciBkeCA9IGl0ZW0uaW1nWC10aGlzLng7XHJcblx0XHRcdFx0dmFyIGR5ID0gaXRlbS5pbWdZLXRoaXMueTtcclxuXHRcdFx0XHR2YXIgZHcgPSBpdGVtLmltZ1dpZHRoO1xyXG5cdFx0XHRcdHZhciBkaCA9IGl0ZW0uaW1nSGVpZ2h0O1xyXG5cclxuXHRcdFx0XHQvL2RyYXcgdG8gdGhlIGNhbnZhc1xyXG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoaW1nLHN4LHN5LHN3LHNoLGR4LGR5LGR3LGRoKTtcclxuXHRcdFx0XHQvL2N0eC5maWxsU3R5bGUgPSBpdGVtLmNvbDtcclxuXHRcdFx0XHQvL2N0eC5maWxsUmVjdChpdGVtLngtdGhpcy54LCBpdGVtLnktdGhpcy55LCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XHJcblx0XHRcdFx0Ly8gaWYoaXRlbS5pbWcpe2N0eC5kcmF3SW1hZ2UoaW1nLHN4LHN5LHN3LHNoLGR4LGR5LGR3LGRoKTt9XHJcblx0XHRcdFx0Ly8gZWxzZXtjb25zb2xlLmxvZygnbm8gaW1nJyk7fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG4vL2Z1bmN0aW9uIHRvIGZpbmQgZGVsdGEgdGltZVxyXG5mdW5jdGlvbiB0aW1lU3RhbXAoKXtcclxuXHRyZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdhbWUoKXtcclxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvL2xvYWQga2V5IGNvbXBvbmVudHMgXHJcblx0XHR0aGlzLmZwc01ldGVyID0gbmV3IEZQU01ldGVyKHsgZGVjaW1hbHM6IDAsIGdyYXBoOiB0cnVlLCB0aGVtZTogJ2RhcmsnLCBsZWZ0OiAnNXB4JyB9KTtcclxuXHRcdHRoaXMuZ2FtZUFyZWEgPSBuZXcgZ2FtZUFyZWEoKTtcclxuXHRcdHRoaXMuY2FtZXJhID0gbmV3IGNhbWVyYSgwLDApO1xyXG5cdFx0dGhpcy5jb250cm9sbGVyID0gbmV3IGtleUlucHV0Q29udHJvbGxlcigpO1xyXG5cdFx0dGhpcy5jb250cm9sbGVyLmFkZExpc3RlbmVycygpO1xyXG5cdFx0dGhpcy5sZXZlbE1hcCA9IG5ldyBsZXZlbCgxKTtcclxuXHJcblx0XHQvL2xvYWQgaW1hZ2VzXHJcblx0XHR0aGlzLnRpbGVzID0gbmV3IEltYWdlKCk7XHJcblx0XHR0aGlzLnBsYXllckltZyA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0dGhpcy50aWxlcy5zcmMgPSdpbWcvdGlsZXMucG5nJztcclxuXHRcdHRoaXMucGxheWVySW1nLnNyYyA9ICdpbWcvd2F0ZXJjb2xvci5wbmcnO1xyXG5cclxuXHRcdC8vaW5pdGlhbGlzZSBjb21wb25lbnRzXHJcblx0XHR0aGlzLmdhbWVBcmVhLnN0YXJ0KCk7XHJcblx0XHR0aGlzLnBsYXllciA9IG5ldyBjb21wb25lbnQoNjQsMTI4LFwicmVkXCIsMCwzOTAsJ3BsYXllcicsdGhpcy5wbGF5ZXJJbWcpO1xyXG5cdFx0dGhpcy5sZXZlbE1hcC5wb3B1bGF0ZU1hcCgpO1xyXG5cclxuXHRcdC8vaW5pdGlhdGUgZGVsdGEgdGltZVxyXG5cdFx0dGhpcy5ub3cgPSB0aW1lU3RhbXAoKTtcclxuXHRcdHRoaXMuZHQgPSB0aW1lU3RhbXAoKTtcclxuXHRcdHRoaXMubGFzdCA9IHRpbWVTdGFtcCgpO1xyXG5cclxuXHRcdC8vc3RhcnQgdGhlIGdhbWUgbG9vcFxyXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZ2FtZUxvb3AuYmluZCh0aGlzKSk7XHRcclxuXHR9LFxyXG5cclxuXHR0aGlzLmNoZWNrS2V5cyA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0aWYodGhpcy5jb250cm9sbGVyLmtleURvd24uRCl7XHJcblx0XHRcdHRoaXMucGxheWVyLnZlbG9jaXR5WCs9dGhpcy5wbGF5ZXIuYWNjZWxlcmF0aW9uO1xyXG5cdFx0XHR9XHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5BKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYLT10aGlzLnBsYXllci5hY2NlbGVyYXRpb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5TUEFDRSl7XHJcblx0XHRcdHRoaXMucGxheWVyLmp1bXAodGhpcy5kdCk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIuY2FuSnVtcD10cnVlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHRoaXMuZ2FtZUxvb3AgPSBmdW5jdGlvbigpe1xyXG5cdFx0XHJcblx0XHR0aGlzLmZwc01ldGVyLnRpY2tTdGFydCgpO1xyXG5cdFx0XHJcblx0XHQvL3VwZGF0ZSBkZWx0YSB0aW1lXHJcblx0XHR0aGlzLm5vdyA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5kdCA9IE1hdGgubWluKDEsKHRoaXMubm93IC0gdGhpcy5sYXN0KSAvIDEwMDApO1xyXG5cdFx0dGhpcy5nYW1lQXJlYS5jbGVhcigpO1xyXG5cdFx0dGhpcy5jaGVja0tleXMoKTtcclxuXHJcblx0XHQvL3VwZGF0ZSB0aGUgcGxheWVyIGFuZCBjYW1lcmEgcG9zaXRpb25cclxuXHRcdHRoaXMucGxheWVyLnVwZGF0ZSh0aGlzLmR0KTtcclxuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZSh0aGlzLmR0LHRoaXMucGxheWVyKTtcclxuXHJcblx0XHQvL2xpc3Qgb2Ygb2JqZWN0cyB0byBiZSByZW5kZXJlZFxyXG5cdFx0dmFyIHJlbmRlckxpc3Q9W107XHJcblx0XHRmb3IoaT0wO2k8dGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRyZW5kZXJMaXN0LnB1c2godGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzW2ldKVxyXG5cdFx0fVxyXG5cdFx0cmVuZGVyTGlzdC5wdXNoKHRoaXMucGxheWVyKTtcclxuXHJcblx0XHQvL1JlbmRlclxyXG5cdFx0dGhpcy5jYW1lcmEucmVuZGVyKHJlbmRlckxpc3QpO1xyXG5cdFx0dGhpcy5mcHNNZXRlci50aWNrKCk7XHJcblxyXG5cdFx0Ly9zdGFydCB0aGUgbmV4dCBsb29wXHJcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcC5iaW5kKHRoaXMpKTtcdFxyXG5cdH1cclxufVxyXG5cclxuXHJcbi8vY29sbGlzaW9uIGRldGVjdGlvblxyXG5mdW5jdGlvbiBjaGVja0NvbGxpc2lvbihvYjEsb2IyKXtcclxuXHRpZihvYjEueCtvYjEud2lkdGg+b2IyLnggJiYgb2IxLng8b2IyLngrb2IyLndpZHRoICYmXHJcblx0XHRvYjEueStvYjEuaGVpZ2h0Pm9iMi55ICYmIG9iMS55PG9iMi55K29iMi5oZWlnaHQpXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLy9TdGFydCB0aGUgZ2FtZSEhXHJcbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpe1xyXG5cdGdhbWUgPSBuZXcgZ2FtZSgpO1xyXG5cdGdhbWUuc3RhcnQoKTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==