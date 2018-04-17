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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function collisionChecker(){
	

	//collision detection
	this.check = function(ob1, ob2){
		if(ob1.x + ob1.width > ob2.x && ob1.x < ob2.x + ob2.width &&
			ob1.y + ob1.height > ob2.y && ob1.y < ob2.y + ob2.height){
		return true;
		}
	},
	this.checkHoles = function(ob1, ob2){
		//var space = {x:ob1.x+ob1.velocityX,y:ob1.y+ob1.height,width:ob1.width,height:ob1.height}
		if(this.check(ob1, ob2)){
			return true;
		}

	},
	this.checkMovement = function(ob1, ob2){
		var collisionObjects = ob2;
		
		for(var i = 0; i < collisionObjects.length; i++){

			objectChecking = collisionObjects[i];
			//check for collisions above

			if(this.check(ob1.bbu, objectChecking) && objectChecking.solid){
				ob1.canMoveUp = false;
				// this.y=objectChecking.y+objectChecking.height;
				// this.imgY=objectChecking.y+objectChecking.height;
				break;
			}else{
				ob1.canMoveUp = true;
			}
		}
		for(var i = 0; i < collisionObjects.length; i++){
			objectChecking = collisionObjects[i];
			//check for collisions below

			if(this.check(ob1.bbd, objectChecking) && objectChecking.solid){
				ob1.canMoveDown = false;
				//this.y=objectChecking.y-this.height+1;
				//this.imgY=objectChecking.y-this.height+1;
				break;
			}else if(this.check(ob1.bbd, objectChecking) && objectChecking.platform && ob1.bbd.y - ob1.velocityY < objectChecking.y){
				ob1.canMoveDown = false;
				break;
			}else{
				ob1.canMoveDown = true;
			}
		}

		for(var i = 0; i < collisionObjects.length; i++){
			objectChecking = collisionObjects[i];
			if(this.check(ob1.bbl, objectChecking) && objectChecking.solid){
				ob1.canMoveLeft = false;
				break;
			}else{
				ob1.canMoveLeft = true;
			}
		}
		for(var i = 0; i < collisionObjects.length; i++){
			objectChecking = collisionObjects[i];
			if(this.check(ob1.bbr, objectChecking) && objectChecking.solid){
				ob1.canMoveRight = false;
				break;
			}else{
				ob1.canMoveRight = true;
			}
		}
	}
}


module.exports = collisionChecker;


/***/ }),
/* 1 */
/***/ (function(module, exports) {


function ai(){
	this.init = function(col,target){
		this.collisionChecker = col;
		this.target = target;
		this.attackDistance = 700;
	},
	this.aiDo = function(obj, colObj){
		var object = obj;
		var collisionObjects = colObj;
		var aoeSteps = [];
		var aoeHoles = [];
		object.canJump = true;
		var attackRange = false;

		if(this.target.x < obj.x - object.width && obj.x - this.target.x < this.attackDistance){
			object.velocityX -= object.acceleration;

			//aoe to check holes
			var aoe1 = {
				x: object.x - object.width / 2,
				y: object.y + object.height,
				width: object.width / 2,
				height: object.width / 2
			};

			//aoe to check steps
			var aoe2 = {
				x: object.x - object.width / 2,
				y: object.y + object.height / 2,
				width: object.width / 2,
				height: object.width / 2
			};
			for(var i = 0;i < collisionObjects.length; i++){
				if(this.collisionChecker.check(aoe1, collisionObjects[i])){
					aoeHoles.push(collisionObjects[i]);
				}
				if(this.collisionChecker.check(aoe2, collisionObjects[i])){
					aoeSteps.push(collisionObjects[i]);	
				}
			}
		}
		else if(this.target.x > obj.x && object.x - this.target.x > 0 - this.attackDistance){
			object.velocityX += object.acceleration;
			//aoe check for holes
			var aoe1 = {
				x: object.x + object.width / 2,
				y: object.y + object.height, 
				width: object.width / 2,
				height: object.width / 2
			};

			//aoe check for steps
			var aoe2 = {
				x: object.x + object.width * 2,
				y: object.y + object.height / 2,
				width: object.width / 2,
				height: object.width / 2
			};
			for(var i = 0; i < collisionObjects.length; i++){
				if(this.collisionChecker.check(aoe1, collisionObjects[i])){
					aoeHoles.push(collisionObjects[i]);
				}
				if(this.collisionChecker.check(aoe2, collisionObjects[i])){
					aoeSteps.push(collisionObjects[i]);	
				}
			}
		}else{
			attackRange = true;
		}
		if(aoeHoles.length < 1 && !attackRange){
			//jump over the hole
			object.jump();
		}
		if(aoeSteps.length >= 1 && !attackRange){
			//jump over the step
			object.jump();
		}
	}
}
	

module.exports = ai;


/***/ }),
/* 2 */
/***/ (function(module, exports) {


function gameArea(){
	this.canvas = document.createElement('canvas'),
	this.start = function() {
		this.tileW = 64;
		this.tileH = 64;
		this.canvas.width = 1280;
		this.canvas.height = 720;
		this.context = this.canvas.getContext('2d');
		//var gameArea = document.getElementById('game');
		var mochtml = "<div><h1>hi</h1></div>"
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},

	this.clear = function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

module.exports = gameArea;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
var game = __webpack_require__(5);

//Start the game!!
var game = new game();
game.start();


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*! FPSMeter 0.3.1 - 9th May 2013 | https://github.com/Darsain/fpsmeter */
(function(m,j){function s(a,e){for(var g in e)try{a.style[g]=e[g]}catch(j){}return a}function H(a){return null==a?String(a):"object"===typeof a||"function"===typeof a?Object.prototype.toString.call(a).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof a}function R(a,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(a);for(var g=0,j=e.length;g<j;g++)if(e[g]===a)return g;return-1}function I(){var a=arguments,e;for(e in a[1])if(a[1].hasOwnProperty(e))switch(H(a[1][e])){case "object":a[0][e]=
I({},a[0][e],a[1][e]);break;case "array":a[0][e]=a[1][e].slice(0);break;default:a[0][e]=a[1][e]}return 2<a.length?I.apply(null,[a[0]].concat(Array.prototype.slice.call(a,2))):a[0]}function N(a){a=Math.round(255*a).toString(16);return 1===a.length?"0"+a:a}function S(a,e,g,j){if(a.addEventListener)a[j?"removeEventListener":"addEventListener"](e,g,!1);else if(a.attachEvent)a[j?"detachEvent":"attachEvent"]("on"+e,g)}function D(a,e){function g(a,b,d,c){return y[0|a][Math.round(Math.min((b-d)/(c-d)*J,J))]}
function r(){f.legend.fps!==q&&(f.legend.fps=q,f.legend[T]=q?"FPS":"ms");K=q?b.fps:b.duration;f.count[T]=999<K?"999+":K.toFixed(99<K?0:d.decimals)}function m(){z=A();L<z-d.threshold&&(b.fps-=b.fps/Math.max(1,60*d.smoothing/d.interval),b.duration=1E3/b.fps);for(c=d.history;c--;)E[c]=0===c?b.fps:E[c-1],F[c]=0===c?b.duration:F[c-1];r();if(d.heat){if(w.length)for(c=w.length;c--;)w[c].el.style[h[w[c].name].heatOn]=q?g(h[w[c].name].heatmap,b.fps,0,d.maxFps):g(h[w[c].name].heatmap,b.duration,d.threshold,
0);if(f.graph&&h.column.heatOn)for(c=u.length;c--;)u[c].style[h.column.heatOn]=q?g(h.column.heatmap,E[c],0,d.maxFps):g(h.column.heatmap,F[c],d.threshold,0)}if(f.graph)for(p=0;p<d.history;p++)u[p].style.height=(q?E[p]?Math.round(O/d.maxFps*Math.min(E[p],d.maxFps)):0:F[p]?Math.round(O/d.threshold*Math.min(F[p],d.threshold)):0)+"px"}function k(){20>d.interval?(x=M(k),m()):(x=setTimeout(k,d.interval),P=M(m))}function G(a){a=a||window.event;a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=
!1,a.cancelBubble=!0);b.toggle()}function U(){d.toggleOn&&S(f.container,d.toggleOn,G,1);a.removeChild(f.container)}function V(){f.container&&U();h=D.theme[d.theme];y=h.compiledHeatmaps||[];if(!y.length&&h.heatmaps.length){for(p=0;p<h.heatmaps.length;p++){y[p]=[];for(c=0;c<=J;c++){var b=y[p],e=c,g;g=0.33/J*c;var j=h.heatmaps[p].saturation,m=h.heatmaps[p].lightness,n=void 0,k=void 0,l=void 0,t=l=void 0,v=n=k=void 0,v=void 0,l=0.5>=m?m*(1+j):m+j-m*j;0===l?g="#000":(t=2*m-l,k=(l-t)/l,g*=6,n=Math.floor(g),
v=g-n,v*=l*k,0===n||6===n?(n=l,k=t+v,l=t):1===n?(n=l-v,k=l,l=t):2===n?(n=t,k=l,l=t+v):3===n?(n=t,k=l-v):4===n?(n=t+v,k=t):(n=l,k=t,l-=v),g="#"+N(n)+N(k)+N(l));b[e]=g}}h.compiledHeatmaps=y}f.container=s(document.createElement("div"),h.container);f.count=f.container.appendChild(s(document.createElement("div"),h.count));f.legend=f.container.appendChild(s(document.createElement("div"),h.legend));f.graph=d.graph?f.container.appendChild(s(document.createElement("div"),h.graph)):0;w.length=0;for(var q in f)f[q]&&
h[q].heatOn&&w.push({name:q,el:f[q]});u.length=0;if(f.graph){f.graph.style.width=d.history*h.column.width+(d.history-1)*h.column.spacing+"px";for(c=0;c<d.history;c++)u[c]=f.graph.appendChild(s(document.createElement("div"),h.column)),u[c].style.position="absolute",u[c].style.bottom=0,u[c].style.right=c*h.column.width+c*h.column.spacing+"px",u[c].style.width=h.column.width+"px",u[c].style.height="0px"}s(f.container,d);r();a.appendChild(f.container);f.graph&&(O=f.graph.clientHeight);d.toggleOn&&("click"===
d.toggleOn&&(f.container.style.cursor="pointer"),S(f.container,d.toggleOn,G))}"object"===H(a)&&a.nodeType===j&&(e=a,a=document.body);a||(a=document.body);var b=this,d=I({},D.defaults,e||{}),f={},u=[],h,y,J=100,w=[],W=0,B=d.threshold,Q=0,L=A()-B,z,E=[],F=[],x,P,q="fps"===d.show,O,K,c,p;b.options=d;b.fps=0;b.duration=0;b.isPaused=0;b.tickStart=function(){Q=A()};b.tick=function(){z=A();W=z-L;B+=(W-B)/d.smoothing;b.fps=1E3/B;b.duration=Q<L?B:z-Q;L=z};b.pause=function(){x&&(b.isPaused=1,clearTimeout(x),
C(x),C(P),x=P=0);return b};b.resume=function(){x||(b.isPaused=0,k());return b};b.set=function(a,c){d[a]=c;q="fps"===d.show;-1!==R(a,X)&&V();-1!==R(a,Y)&&s(f.container,d);return b};b.showDuration=function(){b.set("show","ms");return b};b.showFps=function(){b.set("show","fps");return b};b.toggle=function(){b.set("show",q?"ms":"fps");return b};b.hide=function(){b.pause();f.container.style.display="none";return b};b.show=function(){b.resume();f.container.style.display="block";return b};b.destroy=function(){b.pause();
U();b.tick=b.tickStart=function(){}};V();k()}var A,r=m.performance;A=r&&(r.now||r.webkitNow)?r[r.now?"now":"webkitNow"].bind(r):function(){return+new Date};for(var C=m.cancelAnimationFrame||m.cancelRequestAnimationFrame,M=m.requestAnimationFrame,r=["moz","webkit","o"],G=0,k=0,Z=r.length;k<Z&&!C;++k)M=(C=m[r[k]+"CancelAnimationFrame"]||m[r[k]+"CancelRequestAnimationFrame"])&&m[r[k]+"RequestAnimationFrame"];C||(M=function(a){var e=A(),g=Math.max(0,16-(e-G));G=e+g;return m.setTimeout(function(){a(e+
g)},g)},C=function(a){clearTimeout(a)});var T="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I;window.FPSMeter=D;D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var X=["toggleOn","theme","heat","graph","history"],Y="position zIndex left top right bottom margin".split(" ")})(window);(function(m,j){j.theme={};var s=j.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",
textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};j.theme.dark=j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}});j.theme.light=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.5}],
container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}});j.theme.colorful=j.extend({},s,{heatmaps:[{saturation:0.5,lightness:0.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}});j.theme.transparent=
j.extend({},s,{heatmaps:[{saturation:0.8,lightness:0.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:0.5}})})(window,FPSMeter);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var collisionChecker = __webpack_require__(0);
var component = __webpack_require__(6);
var level = __webpack_require__(7);
var keyInputController = __webpack_require__(8);
var camera = __webpack_require__(9);
var gameArea = __webpack_require__(2);
var ai = __webpack_require__(1);


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
		
		this.levelNum = 2;
		this.levelMap = new level(this.levelNum, this.tiles);

		//initialise components
		this.gameArea.start();
		this.levelMap.populateMap();
		this.collisionObjects = [];
		this.spawners = [];
		this.levelFinish;
		this.levelStart;

		for(var i = 0; i < this.levelMap.collisionObjects.length; i++){
			this.collisionObjects.push(this.levelMap.collisionObjects[i]);
		}
		for(var s = 0;s < this.levelMap.spawners.length; s++){
			if (this.levelMap.spawners[s].name === 'spawn'){
				this.spawners.push(this.levelMap.spawners[s]);
			}
			if (this.levelMap.spawners[s].name === 'start'){
				this.levelStart = this.levelMap.spawners[s];
			}
			if (this.levelMap.spawners[s].name === 'finish'){
				this.levelFinish = this.levelMap.spawners[s];
			}
		}
		
		// spawn the player character
		var y = this.levelStart.y - 64;
		var x = this.levelStart.x;
		this.player = new component(64, 128, "red", x, y, 'player', this.playerImg);
		this.spawnEnemies();
		
		//initiate delta time
		this.now = timeStamp();
		this.dt = timeStamp();
		this.last = timeStamp();
		
		//make the camera
		var camX = 0;
		var camY = 0;
		this.camera = new camera(camX, camY, this.collisionChecker, this.gameArea);
		this.camera.update(1,this.player,this.levelMap.map);
		
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
				var enemy = new component(64, 128, "blue", startx, starty, 'enemy', this.enemyImg);
				enemy.ai = new ai();
				enemy.ai.init(this.collisionChecker, this.player);
				this.enemies.push(enemy);
				this.collisionObjects.push(enemy);
			}
		}
	}

	this.checkKeys = function(){

		if(this.controller.keyDown.D){
			this.player.velocityX += this.player.acceleration;
			}
		if(this.controller.keyDown.A){
			this.player.velocityX -= this.player.acceleration;
			}

		if(this.controller.keyDown.SPACE){
			this.player.jump(this.dt);
		}else{
			this.player.canJump = true;
		}
	},

	this.restart = function(){

		this.levelMap = new level(this.levelNum, this.tiles);
		this.levelMap.populateMap();
		this.collisionObjects = [];
		this.spawners = [];

		for(var i = 0; i < this.levelMap.collisionObjects.length; i++){
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
		
		var y = this.levelStart.y - 64;
		var x = this.levelStart.x;
		this.player = new component(64, 128, "red", x, y, 'player', this.playerImg);

		this.player.velocityX = 0;
		this.player.velocityY = 0;
		this.player.x = x;
		this.player.y = y;
		this.player.imgX = x;
		this.player.imgY = y;
		var camX = 0;
		var camY = 0;
		this.camera = new camera(camX, camY, this.collisionChecker, this.gameArea);
		
		this.enemies = []
		this.spawnEnemies();
		
		var self = this;
		window.requestAnimationFrame(function(){
			self.gameLoop();
		});
	},
	this.gameLoop = function(){
		var dead = false;
		var win = false;
		this.fpsMeter.tickStart();
		
		//update delta time
		this.now = timeStamp();
		this.dt = Math.min(1, (this.now - this.last) / 1000);
		this.gameArea.clear();
		
		//list of objects to be rendered
		var renderList=[];

		this.checkKeys();

		//do collision checking
		for(var i = 0; i < this.collisionObjects.length; i++){
			this.collisionChecker.checkMovement(this.player, this.collisionObjects)
		}
		
		if (this.collisionChecker.check(this.player, this.levelFinish)){
			console.log('you win!');
			win = true;
			this.levelNum ++;
			if (this.levelNum > 3){
				this.levelNum = 1;
			}

		}
		
		for(var i = 0; i < this.enemies.length; i++){
			if(this.collisionChecker.check(this.player, this.enemies[i])){
				dead = true;
				console.log('death');
				
			}	
		}

		//enemy actions
		for(var i = 0; i < this.enemies.length; i++){
			var enemy = this.enemies[i];
			
			//remove enemy from collision objects so it doesnt colide with itself
			var ind = this.collisionObjects.indexOf(enemy);
			this.collisionObjects.splice(ind, 1);
			
			enemy.update(this.dt);
			enemy.ai.aiDo(enemy, this.collisionObjects);
			this.collisionChecker.checkMovement(enemy, this.collisionObjects)
			
			//Add enemy back to object list
			this.collisionObjects.push(enemy);
			renderList.push(enemy);
		}

		//update the player, and camera position
		this.player.update(this.dt);
		this.camera.update(this.dt, this.player, this.levelMap.map);

		for(var i = 0; i < this.levelMap.collisionObjects.length; i++){
			renderList.push(this.levelMap.collisionObjects[i])
		}
		renderList.push(this.player);
	
		//Render
		this.camera.render(renderList, this.background);
		this.fpsMeter.tick();
		
		//if the player is dead restart game
		if(this.player.y > this.levelMap.map.length * 64){
			dead = true;
			console.log('death');
		}
		if(dead || win){
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var ai = __webpack_require__(1);

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
	this.bbu = {
		col: 'yellow',
		x: this.x,
		y: this.y,
		width: this.width,
		height: this.height / 2
	};
	this.bbd = {
		col: 'blue',
		x: this.x,
		y: this.y + (this.height / 2),
		width: this.width,
		height: this.height / 2
	};
	this.bbl = {
		col: 'orange',
		x: this.x - 3,
		y: this.y + 10,
		width: this.width / 2 - 3,
		height: this.height - 20
	};
	this.bbr = {
		col: 'brown',
		x: this.x + (this.width / 2),
		y: this.y + 10,
		width: this.width / 2 + 3,
		height: this.height - 20
	};
	
	this.solid = true;
	//booleans to check before moving the character
	this.canMoveUp = false;
	this.canMoveDown = false;
	this.canMoveRight = false;
	this.canMoveLeft = false;
}
// using prototypes for component functions to avoid replication
// Jump function
component.prototype.jump = function(dt){
	if(!this.canMoveDown && this.canJump){
		this.velocityY = -7;
		this.canJump = false;
	}		
}

// Update function
component.prototype.update = function(dt){
	this.velocityX *= this.friction * dt;

	if(this.canMoveLeft){
		this.velocityX -= this.acceleration * dt;
	}else if(this.velocityX < 0){
		this.velocityX = 0;
	}

	if(this.canMoveRight){
		this.velocityX += this.acceleration * dt;
	}else if(this.velocityX > 0){
		this.velocityX = 0;
	}

	if(this.canMoveDown){
		this.velocityY += this.gravity * dt;

	}else if(!this.canMoveDown && this.velocityY > 0){
		this.velocityY = 0;
	}

	if(!this.canMoveUp && this.velocityY < 0){
		this.velocityY = 0;
	}
		
	this.x += this.velocityX * dt;
	this.imgX += this.velocityX * dt;
	this.y += this.velocityY * dt;
	this.imgY += this.velocityY * dt;
		
	//bounding boxxes used for collision detection
	this.bbu = {
		col: 'yellow',
		x: this.x,
		y: this.y + this.velocityY * dt,
		width: this.width,
		height:this.height / 4
	};
	this.bbd = {
		col: 'blue',
		x: this.x,
		y: this.y + (this.height - 2) + this.velocityY * dt,
		width: this.width,
		height: 2
	};
	this.bbl = {
		col: 'orange',
		x: this.x + this.velocityX * dt - 1,
		y: this.y + 3,
		width: this.width / 2 - 3,
		height: this.height - 6
	};
	this.bbr = {
		col: 'brown',
		x: this.x + (this.width / 2 - 1) + 1 + this.velocityX * dt,
		y: this.y + 3,
		width: this.width / 2 + 3,
		height: this.height - 6
	};
}

module.exports = component;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

function spawner(x, y, name){
	this.x = x;
	this.y = y;
	this.width = 64;
	this.height = 128;
	this.name = name;
}
function tile(x, y, w, h, solid, platform, img, sx, sy){

	//position and size
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	//image values
	this.imgX = x;
	this.imgY = y;
	this.imgWidth = 64;
	this.imgHeight = 64;
	this.col='green';
	this.img = img;
	this.imgSrcX = sx;
	this.imgSrcY = sy;

	//type of tile
	this.solid = solid;
	this.platform = platform;

}

function level(level,img){

	this.tileW = 64;
	this.tileH = 64;

	this.collisionObjects = [];
	this.spawners = [];
	this.image = img;
	this.mapGrid = mapGrids[level];
	this.map = Array(this.mapGrid.length).fill(Array(this.mapGrid[0].length).fill(0));

	//iterate through the array map and generate tiles
	this.populateMap = function(){
		var image = this.image;
		console.log('width = ' + this.map[0].length + ', height = ' + this.map.length);
		for(var y = 0; y < this.mapGrid.length; y++){
			for(var x = 0; x < this.mapGrid[y].length; x++){
				if(this.mapGrid[y][x] === 1){
					//top left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, 0, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);

				}
				else if(this.mapGrid[y][x] === 2){
					//top middle
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 3){
					//top right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 2, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 4){
					//middle left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, 0, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 5){
					//middle middle
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 6){
					//middle right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 2, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 7){
					//Bottom left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, 0, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 8){
					//Bottom mid
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 9){
					//Bottom right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 2, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'q'){
					//single left
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 3, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'w'){
					//single middle
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, true, false, image, this.tileW * 4, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'r'){
					//single right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 3, 0);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 't'){
					//single right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 3, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'y'){
					//single right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 4, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'u'){
					//back right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, true, image, this.tileW * 5, this.tileH);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if(this.mapGrid[y][x] === 'i'){
					//back right
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false, false, image, this.tileW * 4, this.tileH * 2);
					this.map[y][x] = t;
					this.collisionObjects.push(t);
				}
				else if (this.mapGrid[y][x] === 'e'){
					var e = new spawner(x * this.tileW, y * this.tileH, 'spawn');
					this.map[y][x] = e;
					this.spawners.push(e);
				}
				else if (this.mapGrid[y][x] === 's'){
					var s = new spawner(x * this.tileW, y * this.tileH, 'start');
					this.map[y][x] = this.spawners.push(s);
				}
				else if (this.mapGrid[y][x] === 'f'){
					var f = new spawner(x * this.tileW, y * this.tileH, 'finish');
					this.map[y][x] = this.spawners.push(f);
				}
				else{
					var t = new tile(x * this.tileW, y * this.tileH, this.tileW, this.tileH, false);
					this.map[y][x] = t;
				}
			}
		}
	}
}

var e = 'e'; // represent enemy
var s = 's'; //level start
var f = 'f'; //level finish
// 0 - 9 represent main blocks
// alt blocks
var q = 'q';
var w = 'w';
var r = 'r'

//background blocks
var t = 't';
var y = 'y';
var u = 'u';
var i = 'i';

var mapGrids = {
	//arrays representing the level layout
	1:[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,f],
		[s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,1,2,2],
		[2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,3,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,0,1,3,0,0,1,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,0,1,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,0,4,6,0,0,4,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,0,4,6,0,0,4,5,5,5,5,5,2,2,2,3,0,0,0,0,1,2,2,3,0,0,1,5,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	2:[
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,t,y,u,0,0,0,t,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,t,2,3,0,0,0,0,0,i,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,7,8,u,0,0,0,0,i,0,0,0,0,0,0,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,t,y,y,u,0,0,0,0,0,0,0,4,5,3,0,0,0,0,0,t,y,u,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,f],
		[0,s,0,0,0,0,0,0,0,0,0,0,0,0,i,i,0,0,0,0,1,2,u,0,4,5,6,0,0,0,0,0,0,y,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,1,2,2],
		[2,2,3,0,0,0,0,0,0,0,0,0,0,0,i,i,0,0,0,1,2,5,0,0,4,6,6,0,0,0,0,0,y,i,0,0,0,0,0,0,0,1,2,2,2,2,2,3,5,5,5,4,6,0,0,0,4,5,5],
		[5,5,6,0,0,0,0,0,0,0,0,0,t,2,2,3,0,0,1,5,8,5,0,0,4,5,6,0,0,0,0,1,2,2,u,0,0,1,0,0,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,2,2,2,2,u,0,0,0,0,0,5,5,5,u,0,4,5,5,8,0,0,4,5,5,6,0,0,0,4,5,5,0,0,0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		[5,5,5,5,5,5,6,0,0,0,0,0,0,4,5,8,0,0,7,8,8,8,0,0,4,8,8,6,0,0,0,4,8,5,0,0,0,7,5,5,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	3:[	
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[5,8,8,8,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,f],
		[6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,1,2,2],
		[7,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,5,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,3,5,5,5,4,6,0,0,0,4,5,5],
		[5,5,6,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,5,5,0,4,5,6,0,5,5,0,0,0,0,0,0,0,1,2,2,3,0,0,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		[5,5,6,0,0,6,0,0,0,0,0,0,0,4,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	4:[],
	5:[]

}
//level = new level();

module.exports = level;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

function keyInputController(){
	this.addListeners = function(){
		document.addEventListener('keydown', function(ev){
			return this.keyHandler(ev, ev.keyCode, true); }.bind(this), false);
		document.addEventListener('keyup', function(ev){
			return this.keyHandler(ev, ev.keyCode, false); }.bind(this), false);
	},
	this.removeListeners = function(){
		console.log('removinglisteners');
		document.removeEventListener('keydown', function(ev){
			return this.keyHandler(ev, ev.keyCode, true); }.bind(this), false);
		document.removeEventListener('keyup', function(ev){
			return this.keyHandler(ev, ev.keyCode, false); }.bind(this), false);
		},
	//object to hold pressed keys
	this.keyDown = {},

	this.keyHandler = function(ev, key, pressed){

		//translation dictionary
		var KEY = {
			32: 'SPACE',
			87: 'W',
			68: 'D',
			65: 'A',
			83: 'S'
		}

		var keyPressed = ev.keyCode;
		ev.preventDefault();

		//translate key code to string using translate dictionary
		var keyTranslate = KEY[keyPressed];

		if(pressed){
			this.keyDown[keyTranslate] = true;
		}

		if(pressed===false){
			this.keyDown[keyTranslate] = false;
		}
	}
}
//var keys = new keyInputController();
module.exports = keyInputController;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var collisionChecker = __webpack_require__(0);
var gameArea = __webpack_require__(2);

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
				ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

				//uncomment the belowto see bounding boxes
				//ctx.fillStyle = item.col;
				//ctx.fillRect(item.x-this.x, item.y-this.y, item.width, item.height);
				// if(item.img){ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);}
				// else{console.log('no img');}
			}
		}
	}
}
module.exports = camera;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDY2MjEzNGM4NDUzMjAzYmRhNjEiLCJ3ZWJwYWNrOi8vLy4vY29sbGlzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9haS5qcyIsIndlYnBhY2s6Ly8vLi9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9mcHNtZXRyZS5qcyIsIndlYnBhY2s6Ly8vLi9nYW1lLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4va2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9jYW1lcmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBOztBQUVBLGdCQUFnQiw2QkFBNkI7O0FBRTdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkJBQTZCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtB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RUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMvSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHlCQUF5QjtBQUN6QyxpQkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaLFlBQVk7QUFDWixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUNwUEE7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQSxpREFBaUQsRUFBRTtBQUNuRCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQSxpREFBaUQsRUFBRTtBQUNuRCxHQUFHO0FBQ0g7QUFDQSxrQkFBa0I7O0FBRWxCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQSxnQkFBZ0IsZ0JBQWdCO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA2NjIxMzRjODQ1MzIwM2JkYTYxIiwiZnVuY3Rpb24gY29sbGlzaW9uQ2hlY2tlcigpe1xyXG5cdFxyXG5cclxuXHQvL2NvbGxpc2lvbiBkZXRlY3Rpb25cclxuXHR0aGlzLmNoZWNrID0gZnVuY3Rpb24ob2IxLCBvYjIpe1xyXG5cdFx0aWYob2IxLnggKyBvYjEud2lkdGggPiBvYjIueCAmJiBvYjEueCA8IG9iMi54ICsgb2IyLndpZHRoICYmXHJcblx0XHRcdG9iMS55ICsgb2IxLmhlaWdodCA+IG9iMi55ICYmIG9iMS55IDwgb2IyLnkgKyBvYjIuaGVpZ2h0KXtcclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0dGhpcy5jaGVja0hvbGVzID0gZnVuY3Rpb24ob2IxLCBvYjIpe1xyXG5cdFx0Ly92YXIgc3BhY2UgPSB7eDpvYjEueCtvYjEudmVsb2NpdHlYLHk6b2IxLnkrb2IxLmhlaWdodCx3aWR0aDpvYjEud2lkdGgsaGVpZ2h0Om9iMS5oZWlnaHR9XHJcblx0XHRpZih0aGlzLmNoZWNrKG9iMSwgb2IyKSl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cdHRoaXMuY2hlY2tNb3ZlbWVudCA9IGZ1bmN0aW9uKG9iMSwgb2IyKXtcclxuXHRcdHZhciBjb2xsaXNpb25PYmplY3RzID0gb2IyO1xyXG5cdFx0XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7IGkrKyl7XHJcblxyXG5cdFx0XHRvYmplY3RDaGVja2luZyA9IGNvbGxpc2lvbk9iamVjdHNbaV07XHJcblx0XHRcdC8vY2hlY2sgZm9yIGNvbGxpc2lvbnMgYWJvdmVcclxuXHJcblx0XHRcdGlmKHRoaXMuY2hlY2sob2IxLmJidSwgb2JqZWN0Q2hlY2tpbmcpICYmIG9iamVjdENoZWNraW5nLnNvbGlkKXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZVVwID0gZmFsc2U7XHJcblx0XHRcdFx0Ly8gdGhpcy55PW9iamVjdENoZWNraW5nLnkrb2JqZWN0Q2hlY2tpbmcuaGVpZ2h0O1xyXG5cdFx0XHRcdC8vIHRoaXMuaW1nWT1vYmplY3RDaGVja2luZy55K29iamVjdENoZWNraW5nLmhlaWdodDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVVcCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBjb2xsaXNpb25PYmplY3RzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0b2JqZWN0Q2hlY2tpbmcgPSBjb2xsaXNpb25PYmplY3RzW2ldO1xyXG5cdFx0XHQvL2NoZWNrIGZvciBjb2xsaXNpb25zIGJlbG93XHJcblxyXG5cdFx0XHRpZih0aGlzLmNoZWNrKG9iMS5iYmQsIG9iamVjdENoZWNraW5nKSAmJiBvYmplY3RDaGVja2luZy5zb2xpZCl7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcblx0XHRcdFx0Ly90aGlzLnk9b2JqZWN0Q2hlY2tpbmcueS10aGlzLmhlaWdodCsxO1xyXG5cdFx0XHRcdC8vdGhpcy5pbWdZPW9iamVjdENoZWNraW5nLnktdGhpcy5oZWlnaHQrMTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2UgaWYodGhpcy5jaGVjayhvYjEuYmJkLCBvYmplY3RDaGVja2luZykgJiYgb2JqZWN0Q2hlY2tpbmcucGxhdGZvcm0gJiYgb2IxLmJiZC55IC0gb2IxLnZlbG9jaXR5WSA8IG9iamVjdENoZWNraW5nLnkpe1xyXG5cdFx0XHRcdG9iMS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZURvd24gPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRvYmplY3RDaGVja2luZyA9IGNvbGxpc2lvbk9iamVjdHNbaV07XHJcblx0XHRcdGlmKHRoaXMuY2hlY2sob2IxLmJibCwgb2JqZWN0Q2hlY2tpbmcpICYmIG9iamVjdENoZWNraW5nLnNvbGlkKXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVMZWZ0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRvYmplY3RDaGVja2luZyA9IGNvbGxpc2lvbk9iamVjdHNbaV07XHJcblx0XHRcdGlmKHRoaXMuY2hlY2sob2IxLmJiciwgb2JqZWN0Q2hlY2tpbmcpICYmIG9iamVjdENoZWNraW5nLnNvbGlkKXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZVJpZ2h0ID0gZmFsc2U7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdG9iMS5jYW5Nb3ZlUmlnaHQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb2xsaXNpb25DaGVja2VyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbGxpc2lvbkNoZWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbmZ1bmN0aW9uIGFpKCl7XHJcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oY29sLHRhcmdldCl7XHJcblx0XHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIgPSBjb2w7XHJcblx0XHR0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdHRoaXMuYXR0YWNrRGlzdGFuY2UgPSA3MDA7XHJcblx0fSxcclxuXHR0aGlzLmFpRG8gPSBmdW5jdGlvbihvYmosIGNvbE9iail7XHJcblx0XHR2YXIgb2JqZWN0ID0gb2JqO1xyXG5cdFx0dmFyIGNvbGxpc2lvbk9iamVjdHMgPSBjb2xPYmo7XHJcblx0XHR2YXIgYW9lU3RlcHMgPSBbXTtcclxuXHRcdHZhciBhb2VIb2xlcyA9IFtdO1xyXG5cdFx0b2JqZWN0LmNhbkp1bXAgPSB0cnVlO1xyXG5cdFx0dmFyIGF0dGFja1JhbmdlID0gZmFsc2U7XHJcblxyXG5cdFx0aWYodGhpcy50YXJnZXQueCA8IG9iai54IC0gb2JqZWN0LndpZHRoICYmIG9iai54IC0gdGhpcy50YXJnZXQueCA8IHRoaXMuYXR0YWNrRGlzdGFuY2Upe1xyXG5cdFx0XHRvYmplY3QudmVsb2NpdHlYIC09IG9iamVjdC5hY2NlbGVyYXRpb247XHJcblxyXG5cdFx0XHQvL2FvZSB0byBjaGVjayBob2xlc1xyXG5cdFx0XHR2YXIgYW9lMSA9IHtcclxuXHRcdFx0XHR4OiBvYmplY3QueCAtIG9iamVjdC53aWR0aCAvIDIsXHJcblx0XHRcdFx0eTogb2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0LFxyXG5cdFx0XHRcdHdpZHRoOiBvYmplY3Qud2lkdGggLyAyLFxyXG5cdFx0XHRcdGhlaWdodDogb2JqZWN0LndpZHRoIC8gMlxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Ly9hb2UgdG8gY2hlY2sgc3RlcHNcclxuXHRcdFx0dmFyIGFvZTIgPSB7XHJcblx0XHRcdFx0eDogb2JqZWN0LnggLSBvYmplY3Qud2lkdGggLyAyLFxyXG5cdFx0XHRcdHk6IG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCAvIDIsXHJcblx0XHRcdFx0d2lkdGg6IG9iamVjdC53aWR0aCAvIDIsXHJcblx0XHRcdFx0aGVpZ2h0OiBvYmplY3Qud2lkdGggLyAyXHJcblx0XHRcdH07XHJcblx0XHRcdGZvcih2YXIgaSA9IDA7aSA8IGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGlmKHRoaXMuY29sbGlzaW9uQ2hlY2tlci5jaGVjayhhb2UxLCBjb2xsaXNpb25PYmplY3RzW2ldKSl7XHJcblx0XHRcdFx0XHRhb2VIb2xlcy5wdXNoKGNvbGxpc2lvbk9iamVjdHNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2soYW9lMiwgY29sbGlzaW9uT2JqZWN0c1tpXSkpe1xyXG5cdFx0XHRcdFx0YW9lU3RlcHMucHVzaChjb2xsaXNpb25PYmplY3RzW2ldKTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0aGlzLnRhcmdldC54ID4gb2JqLnggJiYgb2JqZWN0LnggLSB0aGlzLnRhcmdldC54ID4gMCAtIHRoaXMuYXR0YWNrRGlzdGFuY2Upe1xyXG5cdFx0XHRvYmplY3QudmVsb2NpdHlYICs9IG9iamVjdC5hY2NlbGVyYXRpb247XHJcblx0XHRcdC8vYW9lIGNoZWNrIGZvciBob2xlc1xyXG5cdFx0XHR2YXIgYW9lMSA9IHtcclxuXHRcdFx0XHR4OiBvYmplY3QueCArIG9iamVjdC53aWR0aCAvIDIsXHJcblx0XHRcdFx0eTogb2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0LCBcclxuXHRcdFx0XHR3aWR0aDogb2JqZWN0LndpZHRoIC8gMixcclxuXHRcdFx0XHRoZWlnaHQ6IG9iamVjdC53aWR0aCAvIDJcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vYW9lIGNoZWNrIGZvciBzdGVwc1xyXG5cdFx0XHR2YXIgYW9lMiA9IHtcclxuXHRcdFx0XHR4OiBvYmplY3QueCArIG9iamVjdC53aWR0aCAqIDIsXHJcblx0XHRcdFx0eTogb2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0IC8gMixcclxuXHRcdFx0XHR3aWR0aDogb2JqZWN0LndpZHRoIC8gMixcclxuXHRcdFx0XHRoZWlnaHQ6IG9iamVjdC53aWR0aCAvIDJcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRcdGlmKHRoaXMuY29sbGlzaW9uQ2hlY2tlci5jaGVjayhhb2UxLCBjb2xsaXNpb25PYmplY3RzW2ldKSl7XHJcblx0XHRcdFx0XHRhb2VIb2xlcy5wdXNoKGNvbGxpc2lvbk9iamVjdHNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2soYW9lMiwgY29sbGlzaW9uT2JqZWN0c1tpXSkpe1xyXG5cdFx0XHRcdFx0YW9lU3RlcHMucHVzaChjb2xsaXNpb25PYmplY3RzW2ldKTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGF0dGFja1JhbmdlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGlmKGFvZUhvbGVzLmxlbmd0aCA8IDEgJiYgIWF0dGFja1JhbmdlKXtcclxuXHRcdFx0Ly9qdW1wIG92ZXIgdGhlIGhvbGVcclxuXHRcdFx0b2JqZWN0Lmp1bXAoKTtcclxuXHRcdH1cclxuXHRcdGlmKGFvZVN0ZXBzLmxlbmd0aCA+PSAxICYmICFhdHRhY2tSYW5nZSl7XHJcblx0XHRcdC8vanVtcCBvdmVyIHRoZSBzdGVwXHJcblx0XHRcdG9iamVjdC5qdW1wKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblx0XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FpLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG5mdW5jdGlvbiBnYW1lQXJlYSgpe1xyXG5cdHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXHJcblx0dGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy50aWxlVyA9IDY0O1xyXG5cdFx0dGhpcy50aWxlSCA9IDY0O1xyXG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSAxMjgwO1xyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gNzIwO1xyXG5cdFx0dGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdC8vdmFyIGdhbWVBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcclxuXHRcdHZhciBtb2NodG1sID0gXCI8ZGl2PjxoMT5oaTwvaDE+PC9kaXY+XCJcclxuXHRcdGRvY3VtZW50LmJvZHkuaW5zZXJ0QmVmb3JlKHRoaXMuY2FudmFzLCBkb2N1bWVudC5ib2R5LmNoaWxkTm9kZXNbMF0pO1xyXG5cdH0sXHJcblxyXG5cdHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdFx0dGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2FtZUFyZWE7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2FudmFzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vZnBzbWV0cmUuanMnKTtcclxudmFyIGdhbWUgPSByZXF1aXJlKCcuL2dhbWUuanMnKTtcclxuXHJcbi8vU3RhcnQgdGhlIGdhbWUhIVxyXG52YXIgZ2FtZSA9IG5ldyBnYW1lKCk7XHJcbmdhbWUuc3RhcnQoKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qISBGUFNNZXRlciAwLjMuMSAtIDl0aCBNYXkgMjAxMyB8IGh0dHBzOi8vZ2l0aHViLmNvbS9EYXJzYWluL2Zwc21ldGVyICovXHJcbihmdW5jdGlvbihtLGope2Z1bmN0aW9uIHMoYSxlKXtmb3IodmFyIGcgaW4gZSl0cnl7YS5zdHlsZVtnXT1lW2ddfWNhdGNoKGope31yZXR1cm4gYX1mdW5jdGlvbiBIKGEpe3JldHVybiBudWxsPT1hP1N0cmluZyhhKTpcIm9iamVjdFwiPT09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09PXR5cGVvZiBhP09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKXx8XCJvYmplY3RcIjp0eXBlb2YgYX1mdW5jdGlvbiBSKGEsZSl7aWYoXCJhcnJheVwiIT09SChlKSlyZXR1cm4tMTtpZihlLmluZGV4T2YpcmV0dXJuIGUuaW5kZXhPZihhKTtmb3IodmFyIGc9MCxqPWUubGVuZ3RoO2c8ajtnKyspaWYoZVtnXT09PWEpcmV0dXJuIGc7cmV0dXJuLTF9ZnVuY3Rpb24gSSgpe3ZhciBhPWFyZ3VtZW50cyxlO2ZvcihlIGluIGFbMV0paWYoYVsxXS5oYXNPd25Qcm9wZXJ0eShlKSlzd2l0Y2goSChhWzFdW2VdKSl7Y2FzZSBcIm9iamVjdFwiOmFbMF1bZV09XHJcbkkoe30sYVswXVtlXSxhWzFdW2VdKTticmVhaztjYXNlIFwiYXJyYXlcIjphWzBdW2VdPWFbMV1bZV0uc2xpY2UoMCk7YnJlYWs7ZGVmYXVsdDphWzBdW2VdPWFbMV1bZV19cmV0dXJuIDI8YS5sZW5ndGg/SS5hcHBseShudWxsLFthWzBdXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYSwyKSkpOmFbMF19ZnVuY3Rpb24gTihhKXthPU1hdGgucm91bmQoMjU1KmEpLnRvU3RyaW5nKDE2KTtyZXR1cm4gMT09PWEubGVuZ3RoP1wiMFwiK2E6YX1mdW5jdGlvbiBTKGEsZSxnLGope2lmKGEuYWRkRXZlbnRMaXN0ZW5lcilhW2o/XCJyZW1vdmVFdmVudExpc3RlbmVyXCI6XCJhZGRFdmVudExpc3RlbmVyXCJdKGUsZywhMSk7ZWxzZSBpZihhLmF0dGFjaEV2ZW50KWFbaj9cImRldGFjaEV2ZW50XCI6XCJhdHRhY2hFdmVudFwiXShcIm9uXCIrZSxnKX1mdW5jdGlvbiBEKGEsZSl7ZnVuY3Rpb24gZyhhLGIsZCxjKXtyZXR1cm4geVswfGFdW01hdGgucm91bmQoTWF0aC5taW4oKGItZCkvKGMtZCkqSixKKSldfVxyXG5mdW5jdGlvbiByKCl7Zi5sZWdlbmQuZnBzIT09cSYmKGYubGVnZW5kLmZwcz1xLGYubGVnZW5kW1RdPXE/XCJGUFNcIjpcIm1zXCIpO0s9cT9iLmZwczpiLmR1cmF0aW9uO2YuY291bnRbVF09OTk5PEs/XCI5OTkrXCI6Sy50b0ZpeGVkKDk5PEs/MDpkLmRlY2ltYWxzKX1mdW5jdGlvbiBtKCl7ej1BKCk7TDx6LWQudGhyZXNob2xkJiYoYi5mcHMtPWIuZnBzL01hdGgubWF4KDEsNjAqZC5zbW9vdGhpbmcvZC5pbnRlcnZhbCksYi5kdXJhdGlvbj0xRTMvYi5mcHMpO2ZvcihjPWQuaGlzdG9yeTtjLS07KUVbY109MD09PWM/Yi5mcHM6RVtjLTFdLEZbY109MD09PWM/Yi5kdXJhdGlvbjpGW2MtMV07cigpO2lmKGQuaGVhdCl7aWYody5sZW5ndGgpZm9yKGM9dy5sZW5ndGg7Yy0tOyl3W2NdLmVsLnN0eWxlW2hbd1tjXS5uYW1lXS5oZWF0T25dPXE/ZyhoW3dbY10ubmFtZV0uaGVhdG1hcCxiLmZwcywwLGQubWF4RnBzKTpnKGhbd1tjXS5uYW1lXS5oZWF0bWFwLGIuZHVyYXRpb24sZC50aHJlc2hvbGQsXHJcbjApO2lmKGYuZ3JhcGgmJmguY29sdW1uLmhlYXRPbilmb3IoYz11Lmxlbmd0aDtjLS07KXVbY10uc3R5bGVbaC5jb2x1bW4uaGVhdE9uXT1xP2coaC5jb2x1bW4uaGVhdG1hcCxFW2NdLDAsZC5tYXhGcHMpOmcoaC5jb2x1bW4uaGVhdG1hcCxGW2NdLGQudGhyZXNob2xkLDApfWlmKGYuZ3JhcGgpZm9yKHA9MDtwPGQuaGlzdG9yeTtwKyspdVtwXS5zdHlsZS5oZWlnaHQ9KHE/RVtwXT9NYXRoLnJvdW5kKE8vZC5tYXhGcHMqTWF0aC5taW4oRVtwXSxkLm1heEZwcykpOjA6RltwXT9NYXRoLnJvdW5kKE8vZC50aHJlc2hvbGQqTWF0aC5taW4oRltwXSxkLnRocmVzaG9sZCkpOjApK1wicHhcIn1mdW5jdGlvbiBrKCl7MjA+ZC5pbnRlcnZhbD8oeD1NKGspLG0oKSk6KHg9c2V0VGltZW91dChrLGQuaW50ZXJ2YWwpLFA9TShtKSl9ZnVuY3Rpb24gRyhhKXthPWF8fHdpbmRvdy5ldmVudDthLnByZXZlbnREZWZhdWx0PyhhLnByZXZlbnREZWZhdWx0KCksYS5zdG9wUHJvcGFnYXRpb24oKSk6KGEucmV0dXJuVmFsdWU9XHJcbiExLGEuY2FuY2VsQnViYmxlPSEwKTtiLnRvZ2dsZSgpfWZ1bmN0aW9uIFUoKXtkLnRvZ2dsZU9uJiZTKGYuY29udGFpbmVyLGQudG9nZ2xlT24sRywxKTthLnJlbW92ZUNoaWxkKGYuY29udGFpbmVyKX1mdW5jdGlvbiBWKCl7Zi5jb250YWluZXImJlUoKTtoPUQudGhlbWVbZC50aGVtZV07eT1oLmNvbXBpbGVkSGVhdG1hcHN8fFtdO2lmKCF5Lmxlbmd0aCYmaC5oZWF0bWFwcy5sZW5ndGgpe2ZvcihwPTA7cDxoLmhlYXRtYXBzLmxlbmd0aDtwKyspe3lbcF09W107Zm9yKGM9MDtjPD1KO2MrKyl7dmFyIGI9eVtwXSxlPWMsZztnPTAuMzMvSipjO3ZhciBqPWguaGVhdG1hcHNbcF0uc2F0dXJhdGlvbixtPWguaGVhdG1hcHNbcF0ubGlnaHRuZXNzLG49dm9pZCAwLGs9dm9pZCAwLGw9dm9pZCAwLHQ9bD12b2lkIDAsdj1uPWs9dm9pZCAwLHY9dm9pZCAwLGw9MC41Pj1tP20qKDEraik6bStqLW0qajswPT09bD9nPVwiIzAwMFwiOih0PTIqbS1sLGs9KGwtdCkvbCxnKj02LG49TWF0aC5mbG9vcihnKSxcclxudj1nLW4sdio9bCprLDA9PT1ufHw2PT09bj8obj1sLGs9dCt2LGw9dCk6MT09PW4/KG49bC12LGs9bCxsPXQpOjI9PT1uPyhuPXQsaz1sLGw9dCt2KTozPT09bj8obj10LGs9bC12KTo0PT09bj8obj10K3Ysaz10KToobj1sLGs9dCxsLT12KSxnPVwiI1wiK04obikrTihrKStOKGwpKTtiW2VdPWd9fWguY29tcGlsZWRIZWF0bWFwcz15fWYuY29udGFpbmVyPXMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmNvbnRhaW5lcik7Zi5jb3VudD1mLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaC5jb3VudCkpO2YubGVnZW5kPWYuY29udGFpbmVyLmFwcGVuZENoaWxkKHMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmxlZ2VuZCkpO2YuZ3JhcGg9ZC5ncmFwaD9mLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaC5ncmFwaCkpOjA7dy5sZW5ndGg9MDtmb3IodmFyIHEgaW4gZilmW3FdJiZcclxuaFtxXS5oZWF0T24mJncucHVzaCh7bmFtZTpxLGVsOmZbcV19KTt1Lmxlbmd0aD0wO2lmKGYuZ3JhcGgpe2YuZ3JhcGguc3R5bGUud2lkdGg9ZC5oaXN0b3J5KmguY29sdW1uLndpZHRoKyhkLmhpc3RvcnktMSkqaC5jb2x1bW4uc3BhY2luZytcInB4XCI7Zm9yKGM9MDtjPGQuaGlzdG9yeTtjKyspdVtjXT1mLmdyYXBoLmFwcGVuZENoaWxkKHMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmNvbHVtbikpLHVbY10uc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLHVbY10uc3R5bGUuYm90dG9tPTAsdVtjXS5zdHlsZS5yaWdodD1jKmguY29sdW1uLndpZHRoK2MqaC5jb2x1bW4uc3BhY2luZytcInB4XCIsdVtjXS5zdHlsZS53aWR0aD1oLmNvbHVtbi53aWR0aCtcInB4XCIsdVtjXS5zdHlsZS5oZWlnaHQ9XCIwcHhcIn1zKGYuY29udGFpbmVyLGQpO3IoKTthLmFwcGVuZENoaWxkKGYuY29udGFpbmVyKTtmLmdyYXBoJiYoTz1mLmdyYXBoLmNsaWVudEhlaWdodCk7ZC50b2dnbGVPbiYmKFwiY2xpY2tcIj09PVxyXG5kLnRvZ2dsZU9uJiYoZi5jb250YWluZXIuc3R5bGUuY3Vyc29yPVwicG9pbnRlclwiKSxTKGYuY29udGFpbmVyLGQudG9nZ2xlT24sRykpfVwib2JqZWN0XCI9PT1IKGEpJiZhLm5vZGVUeXBlPT09aiYmKGU9YSxhPWRvY3VtZW50LmJvZHkpO2F8fChhPWRvY3VtZW50LmJvZHkpO3ZhciBiPXRoaXMsZD1JKHt9LEQuZGVmYXVsdHMsZXx8e30pLGY9e30sdT1bXSxoLHksSj0xMDAsdz1bXSxXPTAsQj1kLnRocmVzaG9sZCxRPTAsTD1BKCktQix6LEU9W10sRj1bXSx4LFAscT1cImZwc1wiPT09ZC5zaG93LE8sSyxjLHA7Yi5vcHRpb25zPWQ7Yi5mcHM9MDtiLmR1cmF0aW9uPTA7Yi5pc1BhdXNlZD0wO2IudGlja1N0YXJ0PWZ1bmN0aW9uKCl7UT1BKCl9O2IudGljaz1mdW5jdGlvbigpe3o9QSgpO1c9ei1MO0IrPShXLUIpL2Quc21vb3RoaW5nO2IuZnBzPTFFMy9CO2IuZHVyYXRpb249UTxMP0I6ei1RO0w9en07Yi5wYXVzZT1mdW5jdGlvbigpe3gmJihiLmlzUGF1c2VkPTEsY2xlYXJUaW1lb3V0KHgpLFxyXG5DKHgpLEMoUCkseD1QPTApO3JldHVybiBifTtiLnJlc3VtZT1mdW5jdGlvbigpe3h8fChiLmlzUGF1c2VkPTAsaygpKTtyZXR1cm4gYn07Yi5zZXQ9ZnVuY3Rpb24oYSxjKXtkW2FdPWM7cT1cImZwc1wiPT09ZC5zaG93Oy0xIT09UihhLFgpJiZWKCk7LTEhPT1SKGEsWSkmJnMoZi5jb250YWluZXIsZCk7cmV0dXJuIGJ9O2Iuc2hvd0R1cmF0aW9uPWZ1bmN0aW9uKCl7Yi5zZXQoXCJzaG93XCIsXCJtc1wiKTtyZXR1cm4gYn07Yi5zaG93RnBzPWZ1bmN0aW9uKCl7Yi5zZXQoXCJzaG93XCIsXCJmcHNcIik7cmV0dXJuIGJ9O2IudG9nZ2xlPWZ1bmN0aW9uKCl7Yi5zZXQoXCJzaG93XCIscT9cIm1zXCI6XCJmcHNcIik7cmV0dXJuIGJ9O2IuaGlkZT1mdW5jdGlvbigpe2IucGF1c2UoKTtmLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3JldHVybiBifTtiLnNob3c9ZnVuY3Rpb24oKXtiLnJlc3VtZSgpO2YuY29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiO3JldHVybiBifTtiLmRlc3Ryb3k9ZnVuY3Rpb24oKXtiLnBhdXNlKCk7XHJcblUoKTtiLnRpY2s9Yi50aWNrU3RhcnQ9ZnVuY3Rpb24oKXt9fTtWKCk7aygpfXZhciBBLHI9bS5wZXJmb3JtYW5jZTtBPXImJihyLm5vd3x8ci53ZWJraXROb3cpP3Jbci5ub3c/XCJub3dcIjpcIndlYmtpdE5vd1wiXS5iaW5kKHIpOmZ1bmN0aW9uKCl7cmV0dXJuK25ldyBEYXRlfTtmb3IodmFyIEM9bS5jYW5jZWxBbmltYXRpb25GcmFtZXx8bS5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsTT1tLnJlcXVlc3RBbmltYXRpb25GcmFtZSxyPVtcIm1velwiLFwid2Via2l0XCIsXCJvXCJdLEc9MCxrPTAsWj1yLmxlbmd0aDtrPFomJiFDOysraylNPShDPW1bcltrXStcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdfHxtW3Jba10rXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl0pJiZtW3Jba10rXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07Q3x8KE09ZnVuY3Rpb24oYSl7dmFyIGU9QSgpLGc9TWF0aC5tYXgoMCwxNi0oZS1HKSk7Rz1lK2c7cmV0dXJuIG0uc2V0VGltZW91dChmdW5jdGlvbigpe2EoZStcclxuZyl9LGcpfSxDPWZ1bmN0aW9uKGEpe2NsZWFyVGltZW91dChhKX0pO3ZhciBUPVwic3RyaW5nXCI9PT1IKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikudGV4dENvbnRlbnQpP1widGV4dENvbnRlbnRcIjpcImlubmVyVGV4dFwiO0QuZXh0ZW5kPUk7d2luZG93LkZQU01ldGVyPUQ7RC5kZWZhdWx0cz17aW50ZXJ2YWw6MTAwLHNtb290aGluZzoxMCxzaG93OlwiZnBzXCIsdG9nZ2xlT246XCJjbGlja1wiLGRlY2ltYWxzOjEsbWF4RnBzOjYwLHRocmVzaG9sZDoxMDAscG9zaXRpb246XCJhYnNvbHV0ZVwiLHpJbmRleDoxMCxsZWZ0OlwiNXB4XCIsdG9wOlwiNXB4XCIscmlnaHQ6XCJhdXRvXCIsYm90dG9tOlwiYXV0b1wiLG1hcmdpbjpcIjAgMCAwIDBcIix0aGVtZTpcImRhcmtcIixoZWF0OjAsZ3JhcGg6MCxoaXN0b3J5OjIwfTt2YXIgWD1bXCJ0b2dnbGVPblwiLFwidGhlbWVcIixcImhlYXRcIixcImdyYXBoXCIsXCJoaXN0b3J5XCJdLFk9XCJwb3NpdGlvbiB6SW5kZXggbGVmdCB0b3AgcmlnaHQgYm90dG9tIG1hcmdpblwiLnNwbGl0KFwiIFwiKX0pKHdpbmRvdyk7KGZ1bmN0aW9uKG0sail7ai50aGVtZT17fTt2YXIgcz1qLnRoZW1lLmJhc2U9e2hlYXRtYXBzOltdLGNvbnRhaW5lcjp7aGVhdE9uOm51bGwsaGVhdG1hcDpudWxsLHBhZGRpbmc6XCI1cHhcIixtaW5XaWR0aDpcIjk1cHhcIixoZWlnaHQ6XCIzMHB4XCIsbGluZUhlaWdodDpcIjMwcHhcIix0ZXh0QWxpZ246XCJyaWdodFwiLHRleHRTaGFkb3c6XCJub25lXCJ9LGNvdW50OntoZWF0T246bnVsbCxoZWF0bWFwOm51bGwscG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDowLHJpZ2h0OjAscGFkZGluZzpcIjVweCAxMHB4XCIsaGVpZ2h0OlwiMzBweFwiLGZvbnRTaXplOlwiMjRweFwiLGZvbnRGYW1pbHk6XCJDb25zb2xhcywgQW5kYWxlIE1vbm8sIG1vbm9zcGFjZVwiLHpJbmRleDoyfSxsZWdlbmQ6e2hlYXRPbjpudWxsLGhlYXRtYXA6bnVsbCxwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOjAsbGVmdDowLHBhZGRpbmc6XCI1cHggMTBweFwiLGhlaWdodDpcIjMwcHhcIixmb250U2l6ZTpcIjEycHhcIixsaW5lSGVpZ2h0OlwiMzJweFwiLGZvbnRGYW1pbHk6XCJzYW5zLXNlcmlmXCIsXHJcbnRleHRBbGlnbjpcImxlZnRcIix6SW5kZXg6Mn0sZ3JhcGg6e2hlYXRPbjpudWxsLGhlYXRtYXA6bnVsbCxwb3NpdGlvbjpcInJlbGF0aXZlXCIsYm94U2l6aW5nOlwicGFkZGluZy1ib3hcIixNb3pCb3hTaXppbmc6XCJwYWRkaW5nLWJveFwiLGhlaWdodDpcIjEwMCVcIix6SW5kZXg6MX0sY29sdW1uOnt3aWR0aDo0LHNwYWNpbmc6MSxoZWF0T246bnVsbCxoZWF0bWFwOm51bGx9fTtqLnRoZW1lLmRhcms9ai5leHRlbmQoe30scyx7aGVhdG1hcHM6W3tzYXR1cmF0aW9uOjAuOCxsaWdodG5lc3M6MC44fV0sY29udGFpbmVyOntiYWNrZ3JvdW5kOlwiIzIyMlwiLGNvbG9yOlwiI2ZmZlwiLGJvcmRlcjpcIjFweCBzb2xpZCAjMWExYTFhXCIsdGV4dFNoYWRvdzpcIjFweCAxcHggMCAjMjIyXCJ9LGNvdW50OntoZWF0T246XCJjb2xvclwifSxjb2x1bW46e2JhY2tncm91bmQ6XCIjM2YzZjNmXCJ9fSk7ai50aGVtZS5saWdodD1qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC41LGxpZ2h0bmVzczowLjV9XSxcclxuY29udGFpbmVyOntjb2xvcjpcIiM2NjZcIixiYWNrZ3JvdW5kOlwiI2ZmZlwiLHRleHRTaGFkb3c6XCIxcHggMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSksIC0xcHggLTFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpXCIsYm94U2hhZG93OlwiMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpXCJ9LGNvdW50OntoZWF0T246XCJjb2xvclwifSxjb2x1bW46e2JhY2tncm91bmQ6XCIjZWFlYWVhXCJ9fSk7ai50aGVtZS5jb2xvcmZ1bD1qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC41LGxpZ2h0bmVzczowLjZ9XSxjb250YWluZXI6e2hlYXRPbjpcImJhY2tncm91bmRDb2xvclwiLGJhY2tncm91bmQ6XCIjODg4XCIsY29sb3I6XCIjZmZmXCIsdGV4dFNoYWRvdzpcIjFweCAxcHggMCByZ2JhKDAsMCwwLC4yKVwiLGJveFNoYWRvdzpcIjAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKVwifSxjb2x1bW46e2JhY2tncm91bmQ6XCIjNzc3XCIsYmFja2dyb3VuZENvbG9yOlwicmdiYSgwLDAsMCwuMilcIn19KTtqLnRoZW1lLnRyYW5zcGFyZW50PVxyXG5qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC44LGxpZ2h0bmVzczowLjV9XSxjb250YWluZXI6e3BhZGRpbmc6MCxjb2xvcjpcIiNmZmZcIix0ZXh0U2hhZG93OlwiMXB4IDFweCAwIHJnYmEoMCwwLDAsLjUpXCJ9LGNvdW50OntwYWRkaW5nOlwiMCA1cHhcIixoZWlnaHQ6XCI0MHB4XCIsbGluZUhlaWdodDpcIjQwcHhcIn0sbGVnZW5kOntwYWRkaW5nOlwiMCA1cHhcIixoZWlnaHQ6XCI0MHB4XCIsbGluZUhlaWdodDpcIjQycHhcIn0sZ3JhcGg6e2hlaWdodDpcIjQwcHhcIn0sY29sdW1uOnt3aWR0aDo1LGJhY2tncm91bmQ6XCIjOTk5XCIsaGVhdE9uOlwiYmFja2dyb3VuZENvbG9yXCIsb3BhY2l0eTowLjV9fSl9KSh3aW5kb3csRlBTTWV0ZXIpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zwc21ldHJlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb2xsaXNpb25DaGVja2VyID0gcmVxdWlyZSgnLi9jb2xsaXNpb25DaGVja2VyLmpzJyk7XHJcbnZhciBjb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMuanMnKTtcclxudmFyIGxldmVsID0gcmVxdWlyZSgnLi9sZXZlbC5qcycpO1xyXG52YXIga2V5SW5wdXRDb250cm9sbGVyID0gcmVxdWlyZSgnLi9rZXlzLmpzJyk7XHJcbnZhciBjYW1lcmEgPSByZXF1aXJlKCcuL2NhbWVyYS5qcycpO1xyXG52YXIgZ2FtZUFyZWEgPSByZXF1aXJlKCcuL2NhbnZhcy5qcycpO1xyXG52YXIgYWkgPSByZXF1aXJlKCcuL2FpLmpzJyk7XHJcblxyXG5cclxuLy9mdW5jdGlvbiB0byBmaW5kIGRlbHRhIHRpbWVcclxuZnVuY3Rpb24gdGltZVN0YW1wKCl7XHJcblx0cmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID8gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnYW1lKCl7XHJcblx0dGhpcy5zdGFydCA9IGZ1bmN0aW9uKCl7XHJcblx0XHQvL2xvYWQga2V5IGNvbXBvbmVudHMgXHJcblx0XHR0aGlzLmZwc01ldGVyID0gbmV3IEZQU01ldGVyKHsgZGVjaW1hbHM6IDAsIGdyYXBoOiB0cnVlLCB0aGVtZTogJ2RhcmsnLCBsZWZ0OiAnNXB4JyB9KTtcclxuXHRcdFxyXG5cdFx0Ly9sb2FkIGNvbGxpc2lvbiBjaGVja2VyXHJcblx0XHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIgPSBuZXcgY29sbGlzaW9uQ2hlY2tlcigpO1xyXG5cclxuXHRcdHRoaXMuZ2FtZUFyZWEgPSBuZXcgZ2FtZUFyZWEoKTtcclxuXHRcdHRoaXMuY29udHJvbGxlciA9IG5ldyBrZXlJbnB1dENvbnRyb2xsZXIoKTtcclxuXHRcdHRoaXMuY29udHJvbGxlci5hZGRMaXN0ZW5lcnMoKTtcclxuXHRcdFxyXG5cclxuXHRcdC8vbG9hZCBpbWFnZXNcclxuXHRcdHRoaXMudGlsZXMgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdHRoaXMucGxheWVySW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHR0aGlzLmVuZW15SW1nID0gbmV3IEltYWdlKCk7XHJcblx0XHR0aGlzLmJhY2tncm91bmQgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdHRoaXMudGlsZXMuc3JjID0naW1nL3RpbGVzLnBuZyc7XHJcblx0XHR0aGlzLmJhY2tncm91bmQuc3JjID0gJ2ltZy9tb3VudGFpbi5qcGcnO1xyXG5cdFx0dGhpcy5wbGF5ZXJJbWcuc3JjID0gJ2ltZy93YXRlcmNvbG9yLnBuZyc7XHJcblx0XHR0aGlzLmVuZW15SW1nLnNyYyA9ICdpbWcvc2FtdXJhaS5wbmcnO1xyXG5cdFx0XHJcblx0XHR0aGlzLmxldmVsTnVtID0gMjtcclxuXHRcdHRoaXMubGV2ZWxNYXAgPSBuZXcgbGV2ZWwodGhpcy5sZXZlbE51bSwgdGhpcy50aWxlcyk7XHJcblxyXG5cdFx0Ly9pbml0aWFsaXNlIGNvbXBvbmVudHNcclxuXHRcdHRoaXMuZ2FtZUFyZWEuc3RhcnQoKTtcclxuXHRcdHRoaXMubGV2ZWxNYXAucG9wdWxhdGVNYXAoKTtcclxuXHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cyA9IFtdO1xyXG5cdFx0dGhpcy5zcGF3bmVycyA9IFtdO1xyXG5cdFx0dGhpcy5sZXZlbEZpbmlzaDtcclxuXHRcdHRoaXMubGV2ZWxTdGFydDtcclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzW2ldKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgcyA9IDA7cyA8IHRoaXMubGV2ZWxNYXAuc3Bhd25lcnMubGVuZ3RoOyBzKyspe1xyXG5cdFx0XHRpZiAodGhpcy5sZXZlbE1hcC5zcGF3bmVyc1tzXS5uYW1lID09PSAnc3Bhd24nKXtcclxuXHRcdFx0XHR0aGlzLnNwYXduZXJzLnB1c2godGhpcy5sZXZlbE1hcC5zcGF3bmVyc1tzXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMubGV2ZWxNYXAuc3Bhd25lcnNbc10ubmFtZSA9PT0gJ3N0YXJ0Jyl7XHJcblx0XHRcdFx0dGhpcy5sZXZlbFN0YXJ0ID0gdGhpcy5sZXZlbE1hcC5zcGF3bmVyc1tzXTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5sZXZlbE1hcC5zcGF3bmVyc1tzXS5uYW1lID09PSAnZmluaXNoJyl7XHJcblx0XHRcdFx0dGhpcy5sZXZlbEZpbmlzaCA9IHRoaXMubGV2ZWxNYXAuc3Bhd25lcnNbc107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Ly8gc3Bhd24gdGhlIHBsYXllciBjaGFyYWN0ZXJcclxuXHRcdHZhciB5ID0gdGhpcy5sZXZlbFN0YXJ0LnkgLSA2NDtcclxuXHRcdHZhciB4ID0gdGhpcy5sZXZlbFN0YXJ0Lng7XHJcblx0XHR0aGlzLnBsYXllciA9IG5ldyBjb21wb25lbnQoNjQsIDEyOCwgXCJyZWRcIiwgeCwgeSwgJ3BsYXllcicsIHRoaXMucGxheWVySW1nKTtcclxuXHRcdHRoaXMuc3Bhd25FbmVtaWVzKCk7XHJcblx0XHRcclxuXHRcdC8vaW5pdGlhdGUgZGVsdGEgdGltZVxyXG5cdFx0dGhpcy5ub3cgPSB0aW1lU3RhbXAoKTtcclxuXHRcdHRoaXMuZHQgPSB0aW1lU3RhbXAoKTtcclxuXHRcdHRoaXMubGFzdCA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0XHJcblx0XHQvL21ha2UgdGhlIGNhbWVyYVxyXG5cdFx0dmFyIGNhbVggPSAwO1xyXG5cdFx0dmFyIGNhbVkgPSAwO1xyXG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgY2FtZXJhKGNhbVgsIGNhbVksIHRoaXMuY29sbGlzaW9uQ2hlY2tlciwgdGhpcy5nYW1lQXJlYSk7XHJcblx0XHR0aGlzLmNhbWVyYS51cGRhdGUoMSx0aGlzLnBsYXllcix0aGlzLmxldmVsTWFwLm1hcCk7XHJcblx0XHRcclxuXHRcdC8vc3RhcnQgdGhlIGdhbWUgbG9vcFxyXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZ2FtZUxvb3AuYmluZCh0aGlzKSk7XHRcclxuXHR9LFxyXG5cdFx0XHJcblx0dGhpcy5zcGF3bkVuZW1pZXMgPSBmdW5jdGlvbigpe1xyXG5cdFx0Ly9maW5kIHNwYXduIHBvaW50cyBhbmQgY3JlYXRlIHRoZSBlbmVteVxyXG5cdFx0dGhpcy5lbmVtaWVzID0gW107XHJcblx0XHRmb3IgKHZhciBzID0gMDsgcyA8IHRoaXMuc3Bhd25lcnMubGVuZ3RoOyBzKyspe1xyXG5cdFx0XHRpZiAodGhpcy5zcGF3bmVyc1tzXS5uYW1lID09PSAnc3Bhd24nKXtcclxuXHRcdFx0XHR2YXIgc3RhcnR4ID0gdGhpcy5zcGF3bmVyc1tzXS54O1xyXG5cdFx0XHRcdHZhciBzdGFydHkgPSB0aGlzLnNwYXduZXJzW3NdLnkgLSA2NDtcclxuXHRcdFx0XHR2YXIgZW5lbXkgPSBuZXcgY29tcG9uZW50KDY0LCAxMjgsIFwiYmx1ZVwiLCBzdGFydHgsIHN0YXJ0eSwgJ2VuZW15JywgdGhpcy5lbmVteUltZyk7XHJcblx0XHRcdFx0ZW5lbXkuYWkgPSBuZXcgYWkoKTtcclxuXHRcdFx0XHRlbmVteS5haS5pbml0KHRoaXMuY29sbGlzaW9uQ2hlY2tlciwgdGhpcy5wbGF5ZXIpO1xyXG5cdFx0XHRcdHRoaXMuZW5lbWllcy5wdXNoKGVuZW15KTtcclxuXHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaChlbmVteSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRoaXMuY2hlY2tLZXlzID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5EKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYICs9IHRoaXMucGxheWVyLmFjY2VsZXJhdGlvbjtcclxuXHRcdFx0fVxyXG5cdFx0aWYodGhpcy5jb250cm9sbGVyLmtleURvd24uQSl7XHJcblx0XHRcdHRoaXMucGxheWVyLnZlbG9jaXR5WCAtPSB0aGlzLnBsYXllci5hY2NlbGVyYXRpb247XHJcblx0XHRcdH1cclxuXHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5TUEFDRSl7XHJcblx0XHRcdHRoaXMucGxheWVyLmp1bXAodGhpcy5kdCk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIuY2FuSnVtcCA9IHRydWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dGhpcy5yZXN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHR0aGlzLmxldmVsTWFwID0gbmV3IGxldmVsKHRoaXMubGV2ZWxOdW0sIHRoaXMudGlsZXMpO1xyXG5cdFx0dGhpcy5sZXZlbE1hcC5wb3B1bGF0ZU1hcCgpO1xyXG5cdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzID0gW107XHJcblx0XHR0aGlzLnNwYXduZXJzID0gW107XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0c1tpXSk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIHMgPSAwO3MgPCB0aGlzLmxldmVsTWFwLnNwYXduZXJzLmxlbmd0aDsgcysrKXtcclxuXHRcdFx0aWYgKHRoaXMubGV2ZWxNYXAuc3Bhd25lcnNbc10ubmFtZSA9PT0gJ3NwYXduJyl7XHJcblx0XHRcdFx0dGhpcy5zcGF3bmVycy5wdXNoKHRoaXMubGV2ZWxNYXAuc3Bhd25lcnNbc10pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmxldmVsTWFwLnNwYXduZXJzW3NdLm5hbWUgPT09ICdzdGFydCcpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmb3VuZCBzdGFydCcpO1xyXG5cdFx0XHRcdHRoaXMubGV2ZWxTdGFydCA9IHRoaXMubGV2ZWxNYXAuc3Bhd25lcnNbc107XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMubGV2ZWxNYXAuc3Bhd25lcnNbc10ubmFtZSA9PT0gJ2ZpbmlzaCcpe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmb3VuZCBmaW5pc2gnKTtcclxuXHRcdFx0XHR0aGlzLmxldmVsRmluaXNoID0gdGhpcy5sZXZlbE1hcC5zcGF3bmVyc1tzXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR2YXIgeSA9IHRoaXMubGV2ZWxTdGFydC55IC0gNjQ7XHJcblx0XHR2YXIgeCA9IHRoaXMubGV2ZWxTdGFydC54O1xyXG5cdFx0dGhpcy5wbGF5ZXIgPSBuZXcgY29tcG9uZW50KDY0LCAxMjgsIFwicmVkXCIsIHgsIHksICdwbGF5ZXInLCB0aGlzLnBsYXllckltZyk7XHJcblxyXG5cdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYID0gMDtcclxuXHRcdHRoaXMucGxheWVyLnZlbG9jaXR5WSA9IDA7XHJcblx0XHR0aGlzLnBsYXllci54ID0geDtcclxuXHRcdHRoaXMucGxheWVyLnkgPSB5O1xyXG5cdFx0dGhpcy5wbGF5ZXIuaW1nWCA9IHg7XHJcblx0XHR0aGlzLnBsYXllci5pbWdZID0geTtcclxuXHRcdHZhciBjYW1YID0gMDtcclxuXHRcdHZhciBjYW1ZID0gMDtcclxuXHRcdHRoaXMuY2FtZXJhID0gbmV3IGNhbWVyYShjYW1YLCBjYW1ZLCB0aGlzLmNvbGxpc2lvbkNoZWNrZXIsIHRoaXMuZ2FtZUFyZWEpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmVuZW1pZXMgPSBbXVxyXG5cdFx0dGhpcy5zcGF3bkVuZW1pZXMoKTtcclxuXHRcdFxyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe1xyXG5cdFx0XHRzZWxmLmdhbWVMb29wKCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHRoaXMuZ2FtZUxvb3AgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRlYWQgPSBmYWxzZTtcclxuXHRcdHZhciB3aW4gPSBmYWxzZTtcclxuXHRcdHRoaXMuZnBzTWV0ZXIudGlja1N0YXJ0KCk7XHJcblx0XHRcclxuXHRcdC8vdXBkYXRlIGRlbHRhIHRpbWVcclxuXHRcdHRoaXMubm93ID0gdGltZVN0YW1wKCk7XHJcblx0XHR0aGlzLmR0ID0gTWF0aC5taW4oMSwgKHRoaXMubm93IC0gdGhpcy5sYXN0KSAvIDEwMDApO1xyXG5cdFx0dGhpcy5nYW1lQXJlYS5jbGVhcigpO1xyXG5cdFx0XHJcblx0XHQvL2xpc3Qgb2Ygb2JqZWN0cyB0byBiZSByZW5kZXJlZFxyXG5cdFx0dmFyIHJlbmRlckxpc3Q9W107XHJcblxyXG5cdFx0dGhpcy5jaGVja0tleXMoKTtcclxuXHJcblx0XHQvL2RvIGNvbGxpc2lvbiBjaGVja2luZ1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMuY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHRoaXMuY29sbGlzaW9uQ2hlY2tlci5jaGVja01vdmVtZW50KHRoaXMucGxheWVyLCB0aGlzLmNvbGxpc2lvbk9iamVjdHMpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmICh0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2sodGhpcy5wbGF5ZXIsIHRoaXMubGV2ZWxGaW5pc2gpKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3lvdSB3aW4hJyk7XHJcblx0XHRcdHdpbiA9IHRydWU7XHJcblx0XHRcdHRoaXMubGV2ZWxOdW0gKys7XHJcblx0XHRcdGlmICh0aGlzLmxldmVsTnVtID4gMyl7XHJcblx0XHRcdFx0dGhpcy5sZXZlbE51bSA9IDE7XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmVuZW1pZXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2sodGhpcy5wbGF5ZXIsIHRoaXMuZW5lbWllc1tpXSkpe1xyXG5cdFx0XHRcdGRlYWQgPSB0cnVlO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdkZWF0aCcpO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHRcclxuXHRcdH1cclxuXHJcblx0XHQvL2VuZW15IGFjdGlvbnNcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmVuZW1pZXMubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHR2YXIgZW5lbXkgPSB0aGlzLmVuZW1pZXNbaV07XHJcblx0XHRcdFxyXG5cdFx0XHQvL3JlbW92ZSBlbmVteSBmcm9tIGNvbGxpc2lvbiBvYmplY3RzIHNvIGl0IGRvZXNudCBjb2xpZGUgd2l0aCBpdHNlbGZcclxuXHRcdFx0dmFyIGluZCA9IHRoaXMuY29sbGlzaW9uT2JqZWN0cy5pbmRleE9mKGVuZW15KTtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnNwbGljZShpbmQsIDEpO1xyXG5cdFx0XHRcclxuXHRcdFx0ZW5lbXkudXBkYXRlKHRoaXMuZHQpO1xyXG5cdFx0XHRlbmVteS5haS5haURvKGVuZW15LCB0aGlzLmNvbGxpc2lvbk9iamVjdHMpO1xyXG5cdFx0XHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2tNb3ZlbWVudChlbmVteSwgdGhpcy5jb2xsaXNpb25PYmplY3RzKVxyXG5cdFx0XHRcclxuXHRcdFx0Ly9BZGQgZW5lbXkgYmFjayB0byBvYmplY3QgbGlzdFxyXG5cdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaChlbmVteSk7XHJcblx0XHRcdHJlbmRlckxpc3QucHVzaChlbmVteSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly91cGRhdGUgdGhlIHBsYXllciwgYW5kIGNhbWVyYSBwb3NpdGlvblxyXG5cdFx0dGhpcy5wbGF5ZXIudXBkYXRlKHRoaXMuZHQpO1xyXG5cdFx0dGhpcy5jYW1lcmEudXBkYXRlKHRoaXMuZHQsIHRoaXMucGxheWVyLCB0aGlzLmxldmVsTWFwLm1hcCk7XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7IGkrKyl7XHJcblx0XHRcdHJlbmRlckxpc3QucHVzaCh0aGlzLmxldmVsTWFwLmNvbGxpc2lvbk9iamVjdHNbaV0pXHJcblx0XHR9XHJcblx0XHRyZW5kZXJMaXN0LnB1c2godGhpcy5wbGF5ZXIpO1xyXG5cdFxyXG5cdFx0Ly9SZW5kZXJcclxuXHRcdHRoaXMuY2FtZXJhLnJlbmRlcihyZW5kZXJMaXN0LCB0aGlzLmJhY2tncm91bmQpO1xyXG5cdFx0dGhpcy5mcHNNZXRlci50aWNrKCk7XHJcblx0XHRcclxuXHRcdC8vaWYgdGhlIHBsYXllciBpcyBkZWFkIHJlc3RhcnQgZ2FtZVxyXG5cdFx0aWYodGhpcy5wbGF5ZXIueSA+IHRoaXMubGV2ZWxNYXAubWFwLmxlbmd0aCAqIDY0KXtcclxuXHRcdFx0ZGVhZCA9IHRydWU7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdkZWF0aCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYoZGVhZCB8fCB3aW4pe1xyXG5cdFx0XHR0aGlzLnJlc3RhcnQoKTtcclxuXHRcdH1cclxuXHRcdGVsc2V7XHJcblx0XHQvL3N0YXJ0IHRoZSBuZXh0IGxvb3BcclxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0c2VsZi5nYW1lTG9vcCgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2FtZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9nYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhaSA9IHJlcXVpcmUoJy4vYWkuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNvbXBvbmVudCh3aWR0aCwgaGVpZ2h0LCBjb2xvciwgeCwgeSwgbmFtZSxpbWcpe1xyXG5cdFxyXG5cdC8vc2V0YmFzaWMgdmFsdWVzXHJcblx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHR0aGlzLmNvbCA9IGNvbG9yO1xyXG5cclxuXHQvL21hcCBwb3NpdGlvbiBvZiBjaGFyYWN0ZXJcclxuXHR0aGlzLnggPSB4O1xyXG5cdHRoaXMueSA9IHk7XHJcblxyXG5cdC8vc2V0IHNpemVcclxuXHR0aGlzLndpZHRoID0gd2lkdGg7XHJcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHJcblx0Ly9pbWFnZSB0byBiZSB1c2VkLCBpbWFnZSBzaXplIGFuZCBpbWFnZSBsb2NhdGlvbiBpbiByZWxhdGlvbiB0byBvYmplY3QgbG9jYXRpb24gXHJcblx0dGhpcy5pbWcgPSBpbWc7XHJcblx0dGhpcy5pbWdYID0gdGhpcy54LXRoaXMud2lkdGgvNDtcclxuXHR0aGlzLmltZ1kgPSB0aGlzLnk7XHJcblx0dGhpcy5pbWdTcmNYID0gMDtcclxuXHR0aGlzLmltZ1NyY1kgPSAwO1xyXG5cdHRoaXMuaW1nV2lkdGggPSB3aWR0aCoyO1xyXG5cdHRoaXMuaW1nSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFxyXG5cdC8vcGh5c2ljc1xyXG5cdHRoaXMuY2FuSnVtcCA9IHRydWU7XHJcblx0dGhpcy52ZWxvY2l0eVggPSAwO1xyXG5cdHRoaXMudmVsb2NpdHlZID0gMDtcclxuXHR0aGlzLm1heFNwZWVkID0gNTtcclxuXHR0aGlzLmdyYXZpdHkgPSAwLjM7XHJcblx0dGhpcy5mcmljdGlvbiA9IDAuODtcclxuXHR0aGlzLmFjY2VsZXJhdGlvbiA9IDEuNTtcclxuXHJcblx0Ly9ib3VuZGluZyBib3hlcyBmb3IgY29sbGlzaW9uIGRldGVjdGlvbiwgY29sb3IgdmFsdWUgaXMgZm9yIHRlc3RpbmcgcHVycG9zZXNcclxuXHR0aGlzLmJidSA9IHtcclxuXHRcdGNvbDogJ3llbGxvdycsXHJcblx0XHR4OiB0aGlzLngsXHJcblx0XHR5OiB0aGlzLnksXHJcblx0XHR3aWR0aDogdGhpcy53aWR0aCxcclxuXHRcdGhlaWdodDogdGhpcy5oZWlnaHQgLyAyXHJcblx0fTtcclxuXHR0aGlzLmJiZCA9IHtcclxuXHRcdGNvbDogJ2JsdWUnLFxyXG5cdFx0eDogdGhpcy54LFxyXG5cdFx0eTogdGhpcy55ICsgKHRoaXMuaGVpZ2h0IC8gMiksXHJcblx0XHR3aWR0aDogdGhpcy53aWR0aCxcclxuXHRcdGhlaWdodDogdGhpcy5oZWlnaHQgLyAyXHJcblx0fTtcclxuXHR0aGlzLmJibCA9IHtcclxuXHRcdGNvbDogJ29yYW5nZScsXHJcblx0XHR4OiB0aGlzLnggLSAzLFxyXG5cdFx0eTogdGhpcy55ICsgMTAsXHJcblx0XHR3aWR0aDogdGhpcy53aWR0aCAvIDIgLSAzLFxyXG5cdFx0aGVpZ2h0OiB0aGlzLmhlaWdodCAtIDIwXHJcblx0fTtcclxuXHR0aGlzLmJiciA9IHtcclxuXHRcdGNvbDogJ2Jyb3duJyxcclxuXHRcdHg6IHRoaXMueCArICh0aGlzLndpZHRoIC8gMiksXHJcblx0XHR5OiB0aGlzLnkgKyAxMCxcclxuXHRcdHdpZHRoOiB0aGlzLndpZHRoIC8gMiArIDMsXHJcblx0XHRoZWlnaHQ6IHRoaXMuaGVpZ2h0IC0gMjBcclxuXHR9O1xyXG5cdFxyXG5cdHRoaXMuc29saWQgPSB0cnVlO1xyXG5cdC8vYm9vbGVhbnMgdG8gY2hlY2sgYmVmb3JlIG1vdmluZyB0aGUgY2hhcmFjdGVyXHJcblx0dGhpcy5jYW5Nb3ZlVXAgPSBmYWxzZTtcclxuXHR0aGlzLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcblx0dGhpcy5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuXHR0aGlzLmNhbk1vdmVMZWZ0ID0gZmFsc2U7XHJcbn1cclxuLy8gdXNpbmcgcHJvdG90eXBlcyBmb3IgY29tcG9uZW50IGZ1bmN0aW9ucyB0byBhdm9pZCByZXBsaWNhdGlvblxyXG4vLyBKdW1wIGZ1bmN0aW9uXHJcbmNvbXBvbmVudC5wcm90b3R5cGUuanVtcCA9IGZ1bmN0aW9uKGR0KXtcclxuXHRpZighdGhpcy5jYW5Nb3ZlRG93biAmJiB0aGlzLmNhbkp1bXApe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVkgPSAtNztcclxuXHRcdHRoaXMuY2FuSnVtcCA9IGZhbHNlO1xyXG5cdH1cdFx0XHJcbn1cclxuXHJcbi8vIFVwZGF0ZSBmdW5jdGlvblxyXG5jb21wb25lbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0KXtcclxuXHR0aGlzLnZlbG9jaXR5WCAqPSB0aGlzLmZyaWN0aW9uICogZHQ7XHJcblxyXG5cdGlmKHRoaXMuY2FuTW92ZUxlZnQpe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVggLT0gdGhpcy5hY2NlbGVyYXRpb24gKiBkdDtcclxuXHR9ZWxzZSBpZih0aGlzLnZlbG9jaXR5WCA8IDApe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVggPSAwO1xyXG5cdH1cclxuXHJcblx0aWYodGhpcy5jYW5Nb3ZlUmlnaHQpe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVggKz0gdGhpcy5hY2NlbGVyYXRpb24gKiBkdDtcclxuXHR9ZWxzZSBpZih0aGlzLnZlbG9jaXR5WCA+IDApe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVggPSAwO1xyXG5cdH1cclxuXHJcblx0aWYodGhpcy5jYW5Nb3ZlRG93bil7XHJcblx0XHR0aGlzLnZlbG9jaXR5WSArPSB0aGlzLmdyYXZpdHkgKiBkdDtcclxuXHJcblx0fWVsc2UgaWYoIXRoaXMuY2FuTW92ZURvd24gJiYgdGhpcy52ZWxvY2l0eVkgPiAwKXtcclxuXHRcdHRoaXMudmVsb2NpdHlZID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKCF0aGlzLmNhbk1vdmVVcCAmJiB0aGlzLnZlbG9jaXR5WSA8IDApe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVkgPSAwO1xyXG5cdH1cclxuXHRcdFxyXG5cdHRoaXMueCArPSB0aGlzLnZlbG9jaXR5WCAqIGR0O1xyXG5cdHRoaXMuaW1nWCArPSB0aGlzLnZlbG9jaXR5WCAqIGR0O1xyXG5cdHRoaXMueSArPSB0aGlzLnZlbG9jaXR5WSAqIGR0O1xyXG5cdHRoaXMuaW1nWSArPSB0aGlzLnZlbG9jaXR5WSAqIGR0O1xyXG5cdFx0XHJcblx0Ly9ib3VuZGluZyBib3h4ZXMgdXNlZCBmb3IgY29sbGlzaW9uIGRldGVjdGlvblxyXG5cdHRoaXMuYmJ1ID0ge1xyXG5cdFx0Y29sOiAneWVsbG93JyxcclxuXHRcdHg6IHRoaXMueCxcclxuXHRcdHk6IHRoaXMueSArIHRoaXMudmVsb2NpdHlZICogZHQsXHJcblx0XHR3aWR0aDogdGhpcy53aWR0aCxcclxuXHRcdGhlaWdodDp0aGlzLmhlaWdodCAvIDRcclxuXHR9O1xyXG5cdHRoaXMuYmJkID0ge1xyXG5cdFx0Y29sOiAnYmx1ZScsXHJcblx0XHR4OiB0aGlzLngsXHJcblx0XHR5OiB0aGlzLnkgKyAodGhpcy5oZWlnaHQgLSAyKSArIHRoaXMudmVsb2NpdHlZICogZHQsXHJcblx0XHR3aWR0aDogdGhpcy53aWR0aCxcclxuXHRcdGhlaWdodDogMlxyXG5cdH07XHJcblx0dGhpcy5iYmwgPSB7XHJcblx0XHRjb2w6ICdvcmFuZ2UnLFxyXG5cdFx0eDogdGhpcy54ICsgdGhpcy52ZWxvY2l0eVggKiBkdCAtIDEsXHJcblx0XHR5OiB0aGlzLnkgKyAzLFxyXG5cdFx0d2lkdGg6IHRoaXMud2lkdGggLyAyIC0gMyxcclxuXHRcdGhlaWdodDogdGhpcy5oZWlnaHQgLSA2XHJcblx0fTtcclxuXHR0aGlzLmJiciA9IHtcclxuXHRcdGNvbDogJ2Jyb3duJyxcclxuXHRcdHg6IHRoaXMueCArICh0aGlzLndpZHRoIC8gMiAtIDEpICsgMSArIHRoaXMudmVsb2NpdHlYICogZHQsXHJcblx0XHR5OiB0aGlzLnkgKyAzLFxyXG5cdFx0d2lkdGg6IHRoaXMud2lkdGggLyAyICsgMyxcclxuXHRcdGhlaWdodDogdGhpcy5oZWlnaHQgLSA2XHJcblx0fTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb21wb25lbnQ7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBzcGF3bmVyKHgsIHksIG5hbWUpe1xyXG5cdHRoaXMueCA9IHg7XHJcblx0dGhpcy55ID0geTtcclxuXHR0aGlzLndpZHRoID0gNjQ7XHJcblx0dGhpcy5oZWlnaHQgPSAxMjg7XHJcblx0dGhpcy5uYW1lID0gbmFtZTtcclxufVxyXG5mdW5jdGlvbiB0aWxlKHgsIHksIHcsIGgsIHNvbGlkLCBwbGF0Zm9ybSwgaW1nLCBzeCwgc3kpe1xyXG5cclxuXHQvL3Bvc2l0aW9uIGFuZCBzaXplXHJcblx0dGhpcy54ID0geDtcclxuXHR0aGlzLnkgPSB5O1xyXG5cdHRoaXMud2lkdGggPSB3O1xyXG5cdHRoaXMuaGVpZ2h0ID0gaDtcclxuXHJcblx0Ly9pbWFnZSB2YWx1ZXNcclxuXHR0aGlzLmltZ1ggPSB4O1xyXG5cdHRoaXMuaW1nWSA9IHk7XHJcblx0dGhpcy5pbWdXaWR0aCA9IDY0O1xyXG5cdHRoaXMuaW1nSGVpZ2h0ID0gNjQ7XHJcblx0dGhpcy5jb2w9J2dyZWVuJztcclxuXHR0aGlzLmltZyA9IGltZztcclxuXHR0aGlzLmltZ1NyY1ggPSBzeDtcclxuXHR0aGlzLmltZ1NyY1kgPSBzeTtcclxuXHJcblx0Ly90eXBlIG9mIHRpbGVcclxuXHR0aGlzLnNvbGlkID0gc29saWQ7XHJcblx0dGhpcy5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbGV2ZWwobGV2ZWwsaW1nKXtcclxuXHJcblx0dGhpcy50aWxlVyA9IDY0O1xyXG5cdHRoaXMudGlsZUggPSA2NDtcclxuXHJcblx0dGhpcy5jb2xsaXNpb25PYmplY3RzID0gW107XHJcblx0dGhpcy5zcGF3bmVycyA9IFtdO1xyXG5cdHRoaXMuaW1hZ2UgPSBpbWc7XHJcblx0dGhpcy5tYXBHcmlkID0gbWFwR3JpZHNbbGV2ZWxdO1xyXG5cdHRoaXMubWFwID0gQXJyYXkodGhpcy5tYXBHcmlkLmxlbmd0aCkuZmlsbChBcnJheSh0aGlzLm1hcEdyaWRbMF0ubGVuZ3RoKS5maWxsKDApKTtcclxuXHJcblx0Ly9pdGVyYXRlIHRocm91Z2ggdGhlIGFycmF5IG1hcCBhbmQgZ2VuZXJhdGUgdGlsZXNcclxuXHR0aGlzLnBvcHVsYXRlTWFwID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBpbWFnZSA9IHRoaXMuaW1hZ2U7XHJcblx0XHRjb25zb2xlLmxvZygnd2lkdGggPSAnICsgdGhpcy5tYXBbMF0ubGVuZ3RoICsgJywgaGVpZ2h0ID0gJyArIHRoaXMubWFwLmxlbmd0aCk7XHJcblx0XHRmb3IodmFyIHkgPSAwOyB5IDwgdGhpcy5tYXBHcmlkLmxlbmd0aDsgeSsrKXtcclxuXHRcdFx0Zm9yKHZhciB4ID0gMDsgeCA8IHRoaXMubWFwR3JpZFt5XS5sZW5ndGg7IHgrKyl7XHJcblx0XHRcdFx0aWYodGhpcy5tYXBHcmlkW3ldW3hdID09PSAxKXtcclxuXHRcdFx0XHRcdC8vdG9wIGxlZnRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCB0cnVlLCBmYWxzZSwgaW1hZ2UsIDAsIDApO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gMil7XHJcblx0XHRcdFx0XHQvL3RvcCBtaWRkbGVcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCB0cnVlLCBmYWxzZSwgaW1hZ2UsIHRoaXMudGlsZVcsIDApO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBHcmlkW3ldW3hdID09PSAzKXtcclxuXHRcdFx0XHRcdC8vdG9wIHJpZ2h0XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHggKiB0aGlzLnRpbGVXLCB5ICogdGhpcy50aWxlSCwgdGhpcy50aWxlVywgdGhpcy50aWxlSCwgdHJ1ZSwgZmFsc2UsIGltYWdlLCB0aGlzLnRpbGVXICogMiwgMCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XSA9IHQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcEdyaWRbeV1beF0gPT09IDQpe1xyXG5cdFx0XHRcdFx0Ly9taWRkbGUgbGVmdFxyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4ICogdGhpcy50aWxlVywgeSAqIHRoaXMudGlsZUgsIHRoaXMudGlsZVcsIHRoaXMudGlsZUgsIHRydWUsIGZhbHNlLCBpbWFnZSwgMCwgdGhpcy50aWxlSCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XSA9IHQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcEdyaWRbeV1beF0gPT09IDUpe1xyXG5cdFx0XHRcdFx0Ly9taWRkbGUgbWlkZGxlXHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHggKiB0aGlzLnRpbGVXLCB5ICogdGhpcy50aWxlSCwgdGhpcy50aWxlVywgdGhpcy50aWxlSCwgdHJ1ZSwgZmFsc2UsIGltYWdlLCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVIKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gdDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gNil7XHJcblx0XHRcdFx0XHQvL21pZGRsZSByaWdodFxyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4ICogdGhpcy50aWxlVywgeSAqIHRoaXMudGlsZUgsIHRoaXMudGlsZVcsIHRoaXMudGlsZUgsIHRydWUsIGZhbHNlLCBpbWFnZSwgdGhpcy50aWxlVyAqIDIsIHRoaXMudGlsZUgpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBHcmlkW3ldW3hdID09PSA3KXtcclxuXHRcdFx0XHRcdC8vQm90dG9tIGxlZnRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCB0cnVlLCBmYWxzZSwgaW1hZ2UsIDAsIHRoaXMudGlsZUggKiAyKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gdDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gOCl7XHJcblx0XHRcdFx0XHQvL0JvdHRvbSBtaWRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCB0cnVlLCBmYWxzZSwgaW1hZ2UsIHRoaXMudGlsZVcsIHRoaXMudGlsZUggKiAyKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gdDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gOSl7XHJcblx0XHRcdFx0XHQvL0JvdHRvbSByaWdodFxyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4ICogdGhpcy50aWxlVywgeSAqIHRoaXMudGlsZUgsIHRoaXMudGlsZVcsIHRoaXMudGlsZUgsIHRydWUsIGZhbHNlLCBpbWFnZSwgdGhpcy50aWxlVyAqIDIsIHRoaXMudGlsZUggKiAyKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gdDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gJ3EnKXtcclxuXHRcdFx0XHRcdC8vc2luZ2xlIGxlZnRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCB0cnVlLCBmYWxzZSwgaW1hZ2UsIHRoaXMudGlsZVcgKiAzLCAwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gdDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gJ3cnKXtcclxuXHRcdFx0XHRcdC8vc2luZ2xlIG1pZGRsZVxyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4ICogdGhpcy50aWxlVywgeSAqIHRoaXMudGlsZUgsIHRoaXMudGlsZVcsIHRoaXMudGlsZUgsIHRydWUsIGZhbHNlLCBpbWFnZSwgdGhpcy50aWxlVyAqIDQsIDApO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBHcmlkW3ldW3hdID09PSAncicpe1xyXG5cdFx0XHRcdFx0Ly9zaW5nbGUgcmlnaHRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCBmYWxzZSwgdHJ1ZSwgaW1hZ2UsIHRoaXMudGlsZVcgKiAzLCAwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gdDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gJ3QnKXtcclxuXHRcdFx0XHRcdC8vc2luZ2xlIHJpZ2h0XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHggKiB0aGlzLnRpbGVXLCB5ICogdGhpcy50aWxlSCwgdGhpcy50aWxlVywgdGhpcy50aWxlSCwgZmFsc2UsIHRydWUsIGltYWdlLCB0aGlzLnRpbGVXICogMywgdGhpcy50aWxlSCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XSA9IHQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcEdyaWRbeV1beF0gPT09ICd5Jyl7XHJcblx0XHRcdFx0XHQvL3NpbmdsZSByaWdodFxyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4ICogdGhpcy50aWxlVywgeSAqIHRoaXMudGlsZUgsIHRoaXMudGlsZVcsIHRoaXMudGlsZUgsIGZhbHNlLCB0cnVlLCBpbWFnZSwgdGhpcy50aWxlVyAqIDQsIHRoaXMudGlsZUgpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBHcmlkW3ldW3hdID09PSAndScpe1xyXG5cdFx0XHRcdFx0Ly9iYWNrIHJpZ2h0XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHggKiB0aGlzLnRpbGVXLCB5ICogdGhpcy50aWxlSCwgdGhpcy50aWxlVywgdGhpcy50aWxlSCwgZmFsc2UsIHRydWUsIGltYWdlLCB0aGlzLnRpbGVXICogNSwgdGhpcy50aWxlSCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XSA9IHQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcEdyaWRbeV1beF0gPT09ICdpJyl7XHJcblx0XHRcdFx0XHQvL2JhY2sgcmlnaHRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCBmYWxzZSwgZmFsc2UsIGltYWdlLCB0aGlzLnRpbGVXICogNCwgdGhpcy50aWxlSCAqIDIpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gJ2UnKXtcclxuXHRcdFx0XHRcdHZhciBlID0gbmV3IHNwYXduZXIoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCAnc3Bhd24nKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdID0gZTtcclxuXHRcdFx0XHRcdHRoaXMuc3Bhd25lcnMucHVzaChlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZiAodGhpcy5tYXBHcmlkW3ldW3hdID09PSAncycpe1xyXG5cdFx0XHRcdFx0dmFyIHMgPSBuZXcgc3Bhd25lcih4ICogdGhpcy50aWxlVywgeSAqIHRoaXMudGlsZUgsICdzdGFydCcpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF0gPSB0aGlzLnNwYXduZXJzLnB1c2gocyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYgKHRoaXMubWFwR3JpZFt5XVt4XSA9PT0gJ2YnKXtcclxuXHRcdFx0XHRcdHZhciBmID0gbmV3IHNwYXduZXIoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCAnZmluaXNoJyk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XSA9IHRoaXMuc3Bhd25lcnMucHVzaChmKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZXtcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCAqIHRoaXMudGlsZVcsIHkgKiB0aGlzLnRpbGVILCB0aGlzLnRpbGVXLCB0aGlzLnRpbGVILCBmYWxzZSk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XSA9IHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG52YXIgZSA9ICdlJzsgLy8gcmVwcmVzZW50IGVuZW15XHJcbnZhciBzID0gJ3MnOyAvL2xldmVsIHN0YXJ0XHJcbnZhciBmID0gJ2YnOyAvL2xldmVsIGZpbmlzaFxyXG4vLyAwIC0gOSByZXByZXNlbnQgbWFpbiBibG9ja3NcclxuLy8gYWx0IGJsb2Nrc1xyXG52YXIgcSA9ICdxJztcclxudmFyIHcgPSAndyc7XHJcbnZhciByID0gJ3InXHJcblxyXG4vL2JhY2tncm91bmQgYmxvY2tzXHJcbnZhciB0ID0gJ3QnO1xyXG52YXIgeSA9ICd5JztcclxudmFyIHUgPSAndSc7XHJcbnZhciBpID0gJ2knO1xyXG5cclxudmFyIG1hcEdyaWRzID0ge1xyXG5cdC8vYXJyYXlzIHJlcHJlc2VudGluZyB0aGUgbGV2ZWwgbGF5b3V0XHJcblx0MTpbXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLGZdLFxyXG5cdFx0W3MsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMywwLDAsMCwxLDIsMl0sXHJcblx0XHRbMiwyLDIsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyLDIsMiwyLDMsMCwwLDAsNCw2LDAsMCwwLDQsNSw1XSxcclxuXHRcdFs1LDUsNSw2LDAsMCwwLDAsMSwzLDAsMCwxLDIsMiwyLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwyLDMsMCwwLDAsMSw1LDUsNSw1LDUsNiwwLDAsMCw0LDYsMCwwLDAsNCw1LDVdLFxyXG5cdFx0WzUsNSw1LDYsMCwwLDAsMCw0LDYsMCwwLDQsNSw1LDUsNSwzLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsNSw1LDUsNiwwLDAsMCw0LDUsNSw1LDUsNSw2LDAsMCwwLDQsNiwwLDAsMCw0LDUsNV0sXHJcblx0XHRbNSw1LDUsNiwwLDAsMCwwLDQsNiwwLDAsNCw1LDUsNSw1LDUsMiwyLDIsMywwLDAsMCwwLDEsMiwyLDMsMCwwLDEsNSw1LDUsNSw2LDAsMCwwLDQsNSw1LDUsNSw1LDYsMCwwLDAsNCw2LDAsMCwwLDQsNSw1XVxyXG5cdF0sXHJcblx0MjpbXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLHQseSx1LDAsMCwwLHQsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLHQsMiwzLDAsMCwwLDAsMCxpLDAsMCwwLDAsMCwwLDAsMCwwLDEsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCw3LDgsdSwwLDAsMCwwLGksMCwwLDAsMCwwLDAsMCwwLDAsNCw2LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLHQseSx5LHUsMCwwLDAsMCwwLDAsMCw0LDUsMywwLDAsMCwwLDAsdCx5LHUsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLGZdLFxyXG5cdFx0WzAscywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCxpLGksMCwwLDAsMCwxLDIsdSwwLDQsNSw2LDAsMCwwLDAsMCwwLHksMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMyw1LDUsNSwxLDIsMl0sXHJcblx0XHRbMiwyLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLGksaSwwLDAsMCwxLDIsNSwwLDAsNCw2LDYsMCwwLDAsMCwwLHksaSwwLDAsMCwwLDAsMCwwLDEsMiwyLDIsMiwyLDMsNSw1LDUsNCw2LDAsMCwwLDQsNSw1XSxcclxuXHRcdFs1LDUsNiwwLDAsMCwwLDAsMCwwLDAsMCx0LDIsMiwzLDAsMCwxLDUsOCw1LDAsMCw0LDUsNiwwLDAsMCwwLDEsMiwyLHUsMCwwLDEsMCwwLDUsNCw1LDUsNSw1LDUsNiwwLDAsMCw0LDYsMCwwLDAsNCw1LDVdLFxyXG5cdFx0WzUsNSw1LDIsMiwyLDIsdSwwLDAsMCwwLDAsNSw1LDUsdSwwLDQsNSw1LDgsMCwwLDQsNSw1LDYsMCwwLDAsNCw1LDUsMCwwLDAsNCw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNV0sXHJcblx0XHRbNSw1LDUsNSw1LDUsNiwwLDAsMCwwLDAsMCw0LDUsOCwwLDAsNyw4LDgsOCwwLDAsNCw4LDgsNiwwLDAsMCw0LDgsNSwwLDAsMCw3LDUsNSw1LDQsNSw1LDUsNSw1LDYsMCwwLDAsNCw2LDAsMCwwLDQsNSw1XVxyXG5cdF0sXHJcblx0MzpbXHRcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCxzLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFsyLDIsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbNSw4LDgsOCwzLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFs2LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzYsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsZl0sXHJcblx0XHRbNiwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwzLDUsNSw1LDEsMiwyXSxcclxuXHRcdFs3LDIsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwyLDIsNSw1LDYsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyLDIsMiwyLDIsMyw1LDUsNSw0LDYsMCwwLDAsNCw1LDVdLFxyXG5cdFx0WzUsNSw2LDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwyLDMsMCwwLDUsNSwwLDQsNSw2LDAsNSw1LDAsMCwwLDAsMCwwLDAsMSwyLDIsMywwLDAsNSw0LDUsNSw1LDUsNSw2LDAsMCwwLDQsNiwwLDAsMCw0LDUsNV0sXHJcblx0XHRbNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1XSxcclxuXHRcdFs1LDUsNiwwLDAsNiwwLDAsMCwwLDAsMCwwLDQsNSw2LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCw0LDUsNSw1LDYsMCwwLDAsNCw1LDUsNSw1LDUsNiwwLDAsMCw0LDYsMCwwLDAsNCw1LDVdXHJcblx0XSxcclxuXHQ0OltdLFxyXG5cdDU6W11cclxuXHJcbn1cclxuLy9sZXZlbCA9IG5ldyBsZXZlbCgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBsZXZlbDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZXZlbC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBrZXlJbnB1dENvbnRyb2xsZXIoKXtcclxuXHR0aGlzLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXYpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5rZXlIYW5kbGVyKGV2LCBldi5rZXlDb2RlLCB0cnVlKTsgfS5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0cmV0dXJuIHRoaXMua2V5SGFuZGxlcihldiwgZXYua2V5Q29kZSwgZmFsc2UpOyB9LmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHR9LFxyXG5cdHRoaXMucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnNvbGUubG9nKCdyZW1vdmluZ2xpc3RlbmVycycpO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0cmV0dXJuIHRoaXMua2V5SGFuZGxlcihldiwgZXYua2V5Q29kZSwgdHJ1ZSk7IH0uYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldil7XHJcblx0XHRcdHJldHVybiB0aGlzLmtleUhhbmRsZXIoZXYsIGV2LmtleUNvZGUsIGZhbHNlKTsgfS5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblx0XHR9LFxyXG5cdC8vb2JqZWN0IHRvIGhvbGQgcHJlc3NlZCBrZXlzXHJcblx0dGhpcy5rZXlEb3duID0ge30sXHJcblxyXG5cdHRoaXMua2V5SGFuZGxlciA9IGZ1bmN0aW9uKGV2LCBrZXksIHByZXNzZWQpe1xyXG5cclxuXHRcdC8vdHJhbnNsYXRpb24gZGljdGlvbmFyeVxyXG5cdFx0dmFyIEtFWSA9IHtcclxuXHRcdFx0MzI6ICdTUEFDRScsXHJcblx0XHRcdDg3OiAnVycsXHJcblx0XHRcdDY4OiAnRCcsXHJcblx0XHRcdDY1OiAnQScsXHJcblx0XHRcdDgzOiAnUydcclxuXHRcdH1cclxuXHJcblx0XHR2YXIga2V5UHJlc3NlZCA9IGV2LmtleUNvZGU7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdC8vdHJhbnNsYXRlIGtleSBjb2RlIHRvIHN0cmluZyB1c2luZyB0cmFuc2xhdGUgZGljdGlvbmFyeVxyXG5cdFx0dmFyIGtleVRyYW5zbGF0ZSA9IEtFWVtrZXlQcmVzc2VkXTtcclxuXHJcblx0XHRpZihwcmVzc2VkKXtcclxuXHRcdFx0dGhpcy5rZXlEb3duW2tleVRyYW5zbGF0ZV0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHByZXNzZWQ9PT1mYWxzZSl7XHJcblx0XHRcdHRoaXMua2V5RG93bltrZXlUcmFuc2xhdGVdID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbi8vdmFyIGtleXMgPSBuZXcga2V5SW5wdXRDb250cm9sbGVyKCk7XHJcbm1vZHVsZS5leHBvcnRzID0ga2V5SW5wdXRDb250cm9sbGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvbGxpc2lvbkNoZWNrZXIgPSByZXF1aXJlKCcuL2NvbGxpc2lvbkNoZWNrZXIuanMnKTtcclxudmFyIGdhbWVBcmVhID0gcmVxdWlyZSgnLi9jYW52YXMuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNhbWVyYSh4LCB5LCBjLCBjYW52YXMpe1xyXG5cdHRoaXMueCA9IHgsXHJcblx0dGhpcy55ID0geSxcclxuXHR0aGlzLndpZHRoID0gMTI4MCxcclxuXHR0aGlzLmhlaWdodCA9IDcyMCxcclxuXHRcclxuXHR0aGlzLmdhbWVBcmVhID0gY2FudmFzO1xyXG5cdHRoaXMuY29sbGlzaW9uQ2hlY2tlciA9IG5ldyBjb2xsaXNpb25DaGVja2VyKCk7XHJcblx0XHJcblx0Ly9VcGRhdGUgdGhlIGNhbWVyYXMgcG9zaXRpb25cclxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKGR0LCBmb2N1cywgbWFwKXtcclxuXHRcdC8vZm9jdXMgdGhlIGNhbWVyYSBvbiB0aGUgcGxheWVyXHJcblx0XHRpZihmb2N1cy54ID4gNCAqIDY0ICYmIGZvY3VzLnggPCBtYXBbMF0ubGVuZ3RoICogNjQgLSB0aGlzLndpZHRoICsgNCAqIDY0KXtcclxuXHRcdFx0dGhpcy54ID0gZm9jdXMueCAtIDQgKiA2NDtcclxuXHRcdH1cclxuXHRcdFxyXG5cclxuXHRcdGlmKHRoaXMueSArIHRoaXMuaGVpZ2h0IDwgbWFwLmxlbmd0aCAqIDY0KXtcclxuXHRcdFx0dGhpcy55ID0gZm9jdXMueSAtIHRoaXMuaGVpZ2h0IC8gMjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8vUmVuZGVyIHRoZSBnYW1lIHdpdGggbGlzdCBvZiBvYmplY3RzIHRvIHJlbmRlclxyXG5cdHRoaXMucmVuZGVyID0gZnVuY3Rpb24oYXJyLCBiYWNrZ3JvdW5kKXtcclxuXHRcdHZhciBjdHggPSB0aGlzLmdhbWVBcmVhLmNvbnRleHQ7XHJcblx0XHRcclxuXHRcdC8vZHJhdyBiYWNrZ3JvdW5kXHJcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQsIDAsIDApO1xyXG5cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0dmFyIGl0ZW0gPSBhcnJbaV07XHJcblx0XHRcdFxyXG5cdFx0XHQvL0NoZWNrIGlmIHRoZSBvYmplY3QgaXMgaW4gdmlld1xyXG5cdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2sodGhpcywgaXRlbSkpe1xyXG5cdFx0XHRcdHZhciBpbWcgPSBpdGVtLmltZztcclxuXHRcdFx0XHR2YXIgc3ggPSBpdGVtLmltZ1NyY1g7XHJcblx0XHRcdFx0dmFyIHN5ID0gaXRlbS5pbWdTcmNZO1xyXG5cdFx0XHRcdHZhciBzdyA9IGl0ZW0uaW1nV2lkdGg7XHJcblx0XHRcdFx0dmFyIHNoID0gaXRlbS5pbWdIZWlnaHQ7XHJcblx0XHRcdFx0dmFyIGR4ID0gaXRlbS5pbWdYIC0gdGhpcy54O1xyXG5cdFx0XHRcdHZhciBkeSA9IGl0ZW0uaW1nWSAtIHRoaXMueTtcclxuXHRcdFx0XHR2YXIgZHcgPSBpdGVtLmltZ1dpZHRoO1xyXG5cdFx0XHRcdHZhciBkaCA9IGl0ZW0uaW1nSGVpZ2h0O1xyXG5cclxuXHRcdFx0XHQvL2RyYXcgdG8gdGhlIGNhbnZhc1xyXG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoaW1nLCBzeCwgc3ksIHN3LCBzaCwgZHgsIGR5LCBkdywgZGgpO1xyXG5cclxuXHRcdFx0XHQvL3VuY29tbWVudCB0aGUgYmVsb3d0byBzZWUgYm91bmRpbmcgYm94ZXNcclxuXHRcdFx0XHQvL2N0eC5maWxsU3R5bGUgPSBpdGVtLmNvbDtcclxuXHRcdFx0XHQvL2N0eC5maWxsUmVjdChpdGVtLngtdGhpcy54LCBpdGVtLnktdGhpcy55LCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XHJcblx0XHRcdFx0Ly8gaWYoaXRlbS5pbWcpe2N0eC5kcmF3SW1hZ2UoaW1nLHN4LHN5LHN3LHNoLGR4LGR5LGR3LGRoKTt9XHJcblx0XHRcdFx0Ly8gZWxzZXtjb25zb2xlLmxvZygnbm8gaW1nJyk7fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gY2FtZXJhO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NhbWVyYS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9