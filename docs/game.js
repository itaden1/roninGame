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


/***/ }),
/* 1 */
/***/ (function(module, exports) {


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
		this.camera = new camera(0,0,this.collisionChecker,this.gameArea);
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
		this.collisionObjects = []
		for(var i=0;i<this.levelMap.collisionObjects.length;i++){
			this.collisionObjects.push(this.levelMap.collisionObjects[i]);
		}
		//find start of level
		var x = 128;
		var y = 0;
		for(var i = 0; i < this.levelMap.map.length; i++){
			if(this.levelMap.map[i][x/64].solid){
				y = this.levelMap.map[i][x/64].y-128;
				break;
			}
		}
		this.player = new component(64,128,"red",x,y,'player',this.playerImg);
		//create the enemy
		this.enemies = []
		for(var i=0;i<5;i++){
			var random = Math.floor((Math.random()*this.levelMap.map[0].length));
			var startx = random * 64;
			var starty = 0;
			for(var y=0;y<this.levelMap.map.length; y++){
				if(this.levelMap.map[y][random].solid){
					starty = this.levelMap.map[y][random].y-128;
					break;
				}
			}
			var enemy = new component(64,128,"blue",startx,starty,'enemy',this.enemyImg);
			//add ai component to the enemy
			enemy.ai = new ai();
			enemy.ai.init(this.collisionChecker,this.player);
			this.enemies.push(enemy);
			this.collisionObjects.push(enemy);
		}
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
		this.collisionObjects = []
		for(var i=0;i<this.levelMap.collisionObjects.length;i++){
			this.collisionObjects.push(this.levelMap.collisionObjects[i]);
		}
		this.enemies = []
		//find start of level
		var x = 128;
		var y = 0;
		for(var i = 0; i < this.levelMap.map.length; i++){
			if(this.levelMap.map[i][0].solid){
				y = this.levelMap.map[i][0].y-this.player.height;
				break;
			}
		}
		this.player.velocityX = 0;
		this.player.velocityY = 0;
		this.player.x = x;
		this.player.y = y;
		this.player.imgX = x;
		this.player.imgY = y;
		this.camera.x = 0;
		this.camera.y = 0;
		this.camera.update(this.dt,this.player,this.levelMap.map);
		
		for(var i=0;i<5;i++){
			var random = Math.floor((Math.random()*this.levelMap.map[0].length));
			var startx = random * 64;
			var starty = 0;
			for(var y=0;y<this.levelMap.map.length; y++){
				if(this.levelMap.map[y][random].solid){
					starty = this.levelMap.map[y][random].y-128;
					break;
				}
			}
			var enemy = new component(64,128,"blue",startx,starty,'enemy',this.enemyImg);
			//add ai component to the enemy
			enemy.ai = new ai();
			enemy.ai.init(this.collisionChecker,this.player);
			this.enemies.push(enemy);
			this.collisionObjects.push(enemy);
		}
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
		for(var i = 0;i<this.collisionObjects.length;i++){
			this.collisionChecker.checkMovement(this.player,this.collisionObjects)
		}
		for(var i = 0;i<this.enemies.length;i++){
			if(this.collisionChecker.check(this.player,this.enemies[i])){
				dead = true;
				console.log('death');
				
			}	
		}

		//enemy actions
		for(var i=0;i<this.enemies.length;i++){
			var enemy = this.enemies[i];
			var ind = this.collisionObjects.indexOf(enemy);
			this.collisionObjects.splice(ind, 1);
			enemy.update(this.dt);
			enemy.ai.aiDo(enemy,this.collisionObjects);
			this.collisionChecker.checkMovement(enemy,this.collisionObjects)
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
	this.bbu = {col:'yellow',x:this.x,y:this.y,width:this.width,height:this.height/2}
	this.bbd = {col:'blue',x:this.x,y:this.y+(this.height/2),width:this.width, height:this.height/2}
	this.bbl = {col:'orange',x:this.x-3,y:this.y+10,width:this.width/2-3,height:this.height-20 }
	this.bbr = {col:'brown',x:this.x+(this.width/2),y:this.y+10,width:this.width/2+3,height:this.height-20}
	
	this.solid = true;
	//booleans to check before moving the character
	this.canMoveUp = false;
	this.canMoveDown = false;
	this.canMoveRight = false;
	this.canMoveLeft = false;

	this.jump = function(dt){
		if(!this.canMoveDown && this.canJump){
			this.velocityY=-7;
			this.canJump = false;
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
		
		//bounding boxxes used for collision detection
		this.bbu = {col:'yellow',x:this.x,y:this.y+this.velocityY*dt,width:this.width,height:this.height/4}
		this.bbd = {col:'blue',x:this.x,y:this.y+(this.height-2)+this.velocityY*dt,width:this.width, height:2}
		this.bbl = {col:'orange',x:this.x+this.velocityX*dt-1,y:this.y+3,width:this.width/2-3,height:this.height-6 }
		this.bbr = {col:'brown',x:this.x+(this.width/2-1)+1+this.velocityX*dt,y:this.y+3,width:this.width/2+3,height:this.height-6}
	}
}

module.exports = component;


/***/ }),
/* 7 */
/***/ (function(module, exports) {


function tile(x,y,w,h,solid,platform,img,sx,sy){

	//position and size
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;

	//image values
	this.imgX=x;
	this.imgY=y;
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
	this.image = img;
	this.map = mapGrids[level];

	//iterate through the array map and generate tiles
	this.populateMap = function(){
		var image = img;
		for(x=0;x<this.map[0].length;x++){
			for(y=0;y<this.map.length;y++){
				if(this.map[y][x]===1){
					//top left
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,0,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);

				}
				else if(this.map[y][x]===2){
					//top middle
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===3){
					//top right
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW*2,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===4){
					//middle left
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,0,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===5){
					//middle middle
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===6){
					//middle right
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW*2,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===7){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,image,0,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===8){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,image,this.tileW*3,this.tileH*2);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===9){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,true,image,this.tileW*3,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);

				}else{
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false);
					this.map[y][x]=t;
				}
			}
		}
	}
}

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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,1,2,2],
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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,5,5,5,1,2,2],
		[2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,5,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,3,5,5,5,4,6,0,0,0,4,5,5],
		[5,5,6,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,5,5,0,4,5,6,0,5,5,0,0,0,0,0,0,0,1,2,2,3,0,0,5,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5],
		[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],
		[5,5,6,0,0,6,0,0,0,0,0,0,0,4,5,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,5,5,5,6,0,0,0,4,5,5,5,5,5,6,0,0,0,4,6,0,0,0,4,5,5]
	],
	3:[],
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

function camera(x,y,c,canvas){
	this.x=x,
	this.y=y,
	this.width=1280,
	this.height=720,
	
	this.gameArea = canvas;
	this.collisionChecker = new collisionChecker();

	//Update the cameras position
	this.update = function(dt,focus,map){
		var map = map;

		//focus the camera on the player
		if(focus.x>4*64 && focus.x<map[0].length*64-this.width+4*64){
			this.x = focus.x-4*64;
		}
		if(focus.y<map.length*64-this.height/2){
			this.y = focus.y-this.height/2;
		}
	}

	//Render the game with list of objects to render
	this.render = function(arr,background){
		var ctx = this.gameArea.context;
		
		//draw background
		ctx.drawImage(background,0,0);


		for(i=0;i<arr.length;i++){
			var item=arr[i];
			
			//Check if the object is in view
			if(this.collisionChecker.check(this,item)){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTVmYmQwMmJkOGZlMGEwNDE2ZmQiLCJ3ZWJwYWNrOi8vLy4vY29sbGlzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9haS5qcyIsIndlYnBhY2s6Ly8vLi9jYW52YXMuanMiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9mcHNtZXRyZS5qcyIsIndlYnBhY2s6Ly8vLi9nYW1lLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbGV2ZWwuanMiLCJ3ZWJwYWNrOi8vLy4va2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9jYW1lcmEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBOztBQUVBLFVBQVUsMEJBQTBCOztBQUVwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsVUFBVSwwQkFBMEI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7O0FDbEpBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0EsaURBQWlELEVBQUU7QUFDbkQsR0FBRztBQUNIO0FBQ0Esa0JBQWtCOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBLFVBQVUsYUFBYTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5NWZiZDAyYmQ4ZmUwYTA0MTZmZCIsImZ1bmN0aW9uIGNvbGxpc2lvbkNoZWNrZXIoKXtcclxuXHRcclxuXHJcblx0Ly9jb2xsaXNpb24gZGV0ZWN0aW9uXHJcblx0dGhpcy5jaGVjayA9IGZ1bmN0aW9uKG9iMSxvYjIpe1xyXG5cdFx0aWYob2IxLngrb2IxLndpZHRoPm9iMi54ICYmIG9iMS54PG9iMi54K29iMi53aWR0aCAmJlxyXG5cdFx0XHRvYjEueStvYjEuaGVpZ2h0Pm9iMi55ICYmIG9iMS55PG9iMi55K29iMi5oZWlnaHQpe1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0aGlzLmNoZWNrSG9sZXMgPSBmdW5jdGlvbihvYjEsb2IyKXtcclxuXHRcdC8vdmFyIHNwYWNlID0ge3g6b2IxLngrb2IxLnZlbG9jaXR5WCx5Om9iMS55K29iMS5oZWlnaHQsd2lkdGg6b2IxLndpZHRoLGhlaWdodDpvYjEuaGVpZ2h0fVxyXG5cdFx0aWYodGhpcy5jaGVjayhvYjEsb2IyKSl7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cdHRoaXMuY2hlY2tNb3ZlbWVudCA9IGZ1bmN0aW9uKG9iMSxvYjIpe1xyXG5cdFx0dmFyIGNvbGxpc2lvbk9iamVjdHMgPSBvYjI7XHJcblx0XHRcclxuXHRcdGZvcihpPTA7aTxjb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cclxuXHRcdFx0b2JqZWN0Q2hlY2tpbmcgPSBjb2xsaXNpb25PYmplY3RzW2ldO1xyXG5cdFx0XHQvL2NoZWNrIGZvciBjb2xsaXNpb25zIGFib3ZlXHJcblxyXG5cdFx0XHRpZih0aGlzLmNoZWNrKG9iMS5iYnUsb2JqZWN0Q2hlY2tpbmcpJiZvYmplY3RDaGVja2luZy5zb2xpZCl7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVVcCA9IGZhbHNlO1xyXG5cdFx0XHRcdC8vIHRoaXMueT1vYmplY3RDaGVja2luZy55K29iamVjdENoZWNraW5nLmhlaWdodDtcclxuXHRcdFx0XHQvLyB0aGlzLmltZ1k9b2JqZWN0Q2hlY2tpbmcueStvYmplY3RDaGVja2luZy5oZWlnaHQ7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdG9iMS5jYW5Nb3ZlVXAgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmb3IoaT0wO2k8Y29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0b2JqZWN0Q2hlY2tpbmcgPSBjb2xsaXNpb25PYmplY3RzW2ldO1xyXG5cdFx0XHQvL2NoZWNrIGZvciBjb2xsaXNpb25zIGJlbG93XHJcblxyXG5cdFx0XHRpZih0aGlzLmNoZWNrKG9iMS5iYmQsb2JqZWN0Q2hlY2tpbmcpJiZvYmplY3RDaGVja2luZy5zb2xpZCl7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcblx0XHRcdFx0Ly90aGlzLnk9b2JqZWN0Q2hlY2tpbmcueS10aGlzLmhlaWdodCsxO1xyXG5cdFx0XHRcdC8vdGhpcy5pbWdZPW9iamVjdENoZWNraW5nLnktdGhpcy5oZWlnaHQrMTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2UgaWYodGhpcy5jaGVjayhvYjEuYmJkLG9iamVjdENoZWNraW5nKSYmb2JqZWN0Q2hlY2tpbmcucGxhdGZvcm0mJm9iMS5iYmQueS1vYjEudmVsb2NpdHlZKmR0PG9iamVjdENoZWNraW5nLnkpe1xyXG5cdFx0XHRcdG9iMS5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZURvd24gPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKGk9MDtpPGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdG9iamVjdENoZWNraW5nID0gY29sbGlzaW9uT2JqZWN0c1tpXTtcclxuXHRcdFx0aWYodGhpcy5jaGVjayhvYjEuYmJsLG9iamVjdENoZWNraW5nKSYmb2JqZWN0Q2hlY2tpbmcuc29saWQpe1xyXG5cdFx0XHRcdG9iMS5jYW5Nb3ZlTGVmdCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZUxlZnQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmb3IoaT0wO2k8Y29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0b2JqZWN0Q2hlY2tpbmcgPSBjb2xsaXNpb25PYmplY3RzW2ldO1xyXG5cdFx0XHRpZih0aGlzLmNoZWNrKG9iMS5iYnIsb2JqZWN0Q2hlY2tpbmcpJiZvYmplY3RDaGVja2luZy5zb2xpZCl7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZVJpZ2h0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcclxuXHR9XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbGxpc2lvbkNoZWNrZXI7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29sbGlzaW9uQ2hlY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuZnVuY3Rpb24gYWkoKXtcclxuXHR0aGlzLmluaXQgPSBmdW5jdGlvbihjb2wsdGFyZ2V0KXtcclxuXHRcdHRoaXMuY29sbGlzaW9uQ2hlY2tlciA9IGNvbDtcclxuXHRcdHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdH0sXHJcblx0dGhpcy5haURvID0gZnVuY3Rpb24ob2JqLGNvbE9iail7XHJcblx0XHR2YXIgb2JqZWN0ID0gb2JqO1xyXG5cdFx0dmFyIGNvbGxpc2lvbk9iamVjdHMgPSBjb2xPYmo7XHJcblx0XHR2YXIgYW9lU3RlcHMgPSBbXTtcclxuXHRcdHZhciBhb2VIb2xlcyA9IFtdO1xyXG5cdFx0b2JqZWN0LmNhbkp1bXA9dHJ1ZTtcclxuXHRcdHZhciBhdHRhY2tSYW5nZSA9IGZhbHNlO1xyXG5cclxuXHRcdGlmKHRoaXMudGFyZ2V0Lng8b2JqLngtb2JqZWN0LndpZHRoKXtcclxuXHRcdFx0b2JqZWN0LnZlbG9jaXR5WCAtPSBvYmplY3QuYWNjZWxlcmF0aW9uO1xyXG5cdFx0XHQvL2FvZSB0byBjaGVjayBob2xlc1xyXG5cdFx0XHR2YXIgYW9lMSA9IHt4Om9iamVjdC54LW9iamVjdC53aWR0aC8yLHk6b2JqZWN0Lnkrb2JqZWN0LmhlaWdodCx3aWR0aDpvYmplY3Qud2lkdGgvMixoZWlnaHQ6b2JqZWN0LndpZHRoLzJ9O1xyXG5cdFx0XHQvL2FvZSB0byBjaGVjayBzdGVwc1xyXG5cdFx0XHR2YXIgYW9lMiA9IHt4Om9iamVjdC54LW9iamVjdC53aWR0aC8yLHk6b2JqZWN0Lnkrb2JqZWN0LmhlaWdodC8yLHdpZHRoOm9iamVjdC53aWR0aC8yLGhlaWdodDpvYmplY3Qud2lkdGgvMn07XHJcblx0XHRcdGZvcih2YXIgaSA9MDtpPGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdFx0aWYodGhpcy5jb2xsaXNpb25DaGVja2VyLmNoZWNrKGFvZTEsY29sbGlzaW9uT2JqZWN0c1tpXSkpe1xyXG5cdFx0XHRcdFx0YW9lSG9sZXMucHVzaChjb2xsaXNpb25PYmplY3RzW2ldKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYodGhpcy5jb2xsaXNpb25DaGVja2VyLmNoZWNrKGFvZTIsY29sbGlzaW9uT2JqZWN0c1tpXSkpe1xyXG5cdFx0XHRcdFx0YW9lU3RlcHMucHVzaChjb2xsaXNpb25PYmplY3RzW2ldKTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0aGlzLnRhcmdldC54Pm9iai54K29iamVjdC53aWR0aCoyKXtcclxuXHRcdFx0b2JqZWN0LnZlbG9jaXR5WCArPSBvYmplY3QuYWNjZWxlcmF0aW9uO1xyXG5cdFx0XHQvL2FvZSBjaGVjayBmb3IgaG9sZXNcclxuXHRcdFx0dmFyIGFvZTEgPSB7eDpvYmplY3QueCtvYmplY3Qud2lkdGgvMix5Om9iamVjdC55K29iamVjdC5oZWlnaHQsd2lkdGg6b2JqZWN0LndpZHRoLzIsaGVpZ2h0Om9iamVjdC53aWR0aC8yfTtcclxuXHRcdFx0Ly9hb2UgY2hlY2sgZm9yIHN0ZXBzXHJcblx0XHRcdHZhciBhb2UyID0ge3g6b2JqZWN0Lngrb2JqZWN0LndpZHRoKjIseTpvYmplY3QueStvYmplY3QuaGVpZ2h0LzIsd2lkdGg6b2JqZWN0LndpZHRoLzIsaGVpZ2h0Om9iamVjdC53aWR0aC8yfTtcclxuXHRcdFx0Zm9yKHZhciBpID0wO2k8Y29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2soYW9lMSxjb2xsaXNpb25PYmplY3RzW2ldKSl7XHJcblx0XHRcdFx0XHRhb2VIb2xlcy5wdXNoKGNvbGxpc2lvbk9iamVjdHNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2soYW9lMixjb2xsaXNpb25PYmplY3RzW2ldKSl7XHJcblx0XHRcdFx0XHRhb2VTdGVwcy5wdXNoKGNvbGxpc2lvbk9iamVjdHNbaV0pO1x0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0YXR0YWNrUmFuZ2UgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0aWYoYW9lSG9sZXMubGVuZ3RoPDEmJiFhdHRhY2tSYW5nZSl7XHJcblx0XHRcdC8vanVtcCBvdmVyIHRoZSBob2xlXHJcblx0XHRcdG9iamVjdC5qdW1wKCk7XHJcblx0XHR9XHJcblx0XHRpZihhb2VTdGVwcy5sZW5ndGg+PTEmJiFhdHRhY2tSYW5nZSl7XHJcblx0XHRcdC8vanVtcCBvdmVyIHRoZSBzdGVwXHJcblx0XHRcdG9iamVjdC5qdW1wKCk7XHJcblx0XHR9XHJcblx0XHQvL2Zvcih2YXIgaT0wO2k8YW9lT2JzLmxlbmd0aDtpKyspe1xyXG5cdFx0Ly9cdGlmKHRoaXMuY29sbGlzaW9uQ2hlY2tlci5jaGVja0hvbGVzKG9iamVjdCxhb2VPYnNbaV0pKXtcclxuXHRcdC8vXHRcdG9iamVjdC5qdW1wKCk7XHJcblx0XHQvL1x0XHRicmVhaztcclxuXHRcdC8vXHR9XHJcblx0XHQvL31cdFx0XHRcclxuXHR9XHJcbn1cclxuXHRcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYWk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYWkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbmZ1bmN0aW9uIGdhbWVBcmVhKCl7XHJcblx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcclxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR0aGlzLnRpbGVXID0gNjQ7XHJcblx0XHR0aGlzLnRpbGVIID0gNjQ7XHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IDEyODA7XHJcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSA3MjA7XHJcblx0XHR0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cdFx0Ly92YXIgZ2FtZUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZScpO1xyXG5cdFx0dmFyIG1vY2h0bWwgPSBcIjxkaXY+PGgxPmhpPC9oMT48L2Rpdj5cIlxyXG5cdFx0ZG9jdW1lbnQuYm9keS5pbnNlcnRCZWZvcmUodGhpcy5jYW52YXMsIGRvY3VtZW50LmJvZHkuY2hpbGROb2Rlc1swXSk7XHJcblx0fSxcclxuXHJcblx0dGhpcy5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0XHR0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnYW1lQXJlYTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jYW52YXMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9mcHNtZXRyZS5qcycpO1xyXG52YXIgZ2FtZSA9IHJlcXVpcmUoJy4vZ2FtZS5qcycpO1xyXG5cclxuLy9TdGFydCB0aGUgZ2FtZSEhXHJcbnZhciBnYW1lID0gbmV3IGdhbWUoKTtcclxuZ2FtZS5zdGFydCgpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohIEZQU01ldGVyIDAuMy4xIC0gOXRoIE1heSAyMDEzIHwgaHR0cHM6Ly9naXRodWIuY29tL0RhcnNhaW4vZnBzbWV0ZXIgKi9cclxuKGZ1bmN0aW9uKG0sail7ZnVuY3Rpb24gcyhhLGUpe2Zvcih2YXIgZyBpbiBlKXRyeXthLnN0eWxlW2ddPWVbZ119Y2F0Y2goail7fXJldHVybiBhfWZ1bmN0aW9uIEgoYSl7cmV0dXJuIG51bGw9PWE/U3RyaW5nKGEpOlwib2JqZWN0XCI9PT10eXBlb2YgYXx8XCJmdW5jdGlvblwiPT09dHlwZW9mIGE/T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpfHxcIm9iamVjdFwiOnR5cGVvZiBhfWZ1bmN0aW9uIFIoYSxlKXtpZihcImFycmF5XCIhPT1IKGUpKXJldHVybi0xO2lmKGUuaW5kZXhPZilyZXR1cm4gZS5pbmRleE9mKGEpO2Zvcih2YXIgZz0wLGo9ZS5sZW5ndGg7ZzxqO2crKylpZihlW2ddPT09YSlyZXR1cm4gZztyZXR1cm4tMX1mdW5jdGlvbiBJKCl7dmFyIGE9YXJndW1lbnRzLGU7Zm9yKGUgaW4gYVsxXSlpZihhWzFdLmhhc093blByb3BlcnR5KGUpKXN3aXRjaChIKGFbMV1bZV0pKXtjYXNlIFwib2JqZWN0XCI6YVswXVtlXT1cclxuSSh7fSxhWzBdW2VdLGFbMV1bZV0pO2JyZWFrO2Nhc2UgXCJhcnJheVwiOmFbMF1bZV09YVsxXVtlXS5zbGljZSgwKTticmVhaztkZWZhdWx0OmFbMF1bZV09YVsxXVtlXX1yZXR1cm4gMjxhLmxlbmd0aD9JLmFwcGx5KG51bGwsW2FbMF1dLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhLDIpKSk6YVswXX1mdW5jdGlvbiBOKGEpe2E9TWF0aC5yb3VuZCgyNTUqYSkudG9TdHJpbmcoMTYpO3JldHVybiAxPT09YS5sZW5ndGg/XCIwXCIrYTphfWZ1bmN0aW9uIFMoYSxlLGcsail7aWYoYS5hZGRFdmVudExpc3RlbmVyKWFbaj9cInJlbW92ZUV2ZW50TGlzdGVuZXJcIjpcImFkZEV2ZW50TGlzdGVuZXJcIl0oZSxnLCExKTtlbHNlIGlmKGEuYXR0YWNoRXZlbnQpYVtqP1wiZGV0YWNoRXZlbnRcIjpcImF0dGFjaEV2ZW50XCJdKFwib25cIitlLGcpfWZ1bmN0aW9uIEQoYSxlKXtmdW5jdGlvbiBnKGEsYixkLGMpe3JldHVybiB5WzB8YV1bTWF0aC5yb3VuZChNYXRoLm1pbigoYi1kKS8oYy1kKSpKLEopKV19XHJcbmZ1bmN0aW9uIHIoKXtmLmxlZ2VuZC5mcHMhPT1xJiYoZi5sZWdlbmQuZnBzPXEsZi5sZWdlbmRbVF09cT9cIkZQU1wiOlwibXNcIik7Sz1xP2IuZnBzOmIuZHVyYXRpb247Zi5jb3VudFtUXT05OTk8Sz9cIjk5OStcIjpLLnRvRml4ZWQoOTk8Sz8wOmQuZGVjaW1hbHMpfWZ1bmN0aW9uIG0oKXt6PUEoKTtMPHotZC50aHJlc2hvbGQmJihiLmZwcy09Yi5mcHMvTWF0aC5tYXgoMSw2MCpkLnNtb290aGluZy9kLmludGVydmFsKSxiLmR1cmF0aW9uPTFFMy9iLmZwcyk7Zm9yKGM9ZC5oaXN0b3J5O2MtLTspRVtjXT0wPT09Yz9iLmZwczpFW2MtMV0sRltjXT0wPT09Yz9iLmR1cmF0aW9uOkZbYy0xXTtyKCk7aWYoZC5oZWF0KXtpZih3Lmxlbmd0aClmb3IoYz13Lmxlbmd0aDtjLS07KXdbY10uZWwuc3R5bGVbaFt3W2NdLm5hbWVdLmhlYXRPbl09cT9nKGhbd1tjXS5uYW1lXS5oZWF0bWFwLGIuZnBzLDAsZC5tYXhGcHMpOmcoaFt3W2NdLm5hbWVdLmhlYXRtYXAsYi5kdXJhdGlvbixkLnRocmVzaG9sZCxcclxuMCk7aWYoZi5ncmFwaCYmaC5jb2x1bW4uaGVhdE9uKWZvcihjPXUubGVuZ3RoO2MtLTspdVtjXS5zdHlsZVtoLmNvbHVtbi5oZWF0T25dPXE/ZyhoLmNvbHVtbi5oZWF0bWFwLEVbY10sMCxkLm1heEZwcyk6ZyhoLmNvbHVtbi5oZWF0bWFwLEZbY10sZC50aHJlc2hvbGQsMCl9aWYoZi5ncmFwaClmb3IocD0wO3A8ZC5oaXN0b3J5O3ArKyl1W3BdLnN0eWxlLmhlaWdodD0ocT9FW3BdP01hdGgucm91bmQoTy9kLm1heEZwcypNYXRoLm1pbihFW3BdLGQubWF4RnBzKSk6MDpGW3BdP01hdGgucm91bmQoTy9kLnRocmVzaG9sZCpNYXRoLm1pbihGW3BdLGQudGhyZXNob2xkKSk6MCkrXCJweFwifWZ1bmN0aW9uIGsoKXsyMD5kLmludGVydmFsPyh4PU0oayksbSgpKTooeD1zZXRUaW1lb3V0KGssZC5pbnRlcnZhbCksUD1NKG0pKX1mdW5jdGlvbiBHKGEpe2E9YXx8d2luZG93LmV2ZW50O2EucHJldmVudERlZmF1bHQ/KGEucHJldmVudERlZmF1bHQoKSxhLnN0b3BQcm9wYWdhdGlvbigpKTooYS5yZXR1cm5WYWx1ZT1cclxuITEsYS5jYW5jZWxCdWJibGU9ITApO2IudG9nZ2xlKCl9ZnVuY3Rpb24gVSgpe2QudG9nZ2xlT24mJlMoZi5jb250YWluZXIsZC50b2dnbGVPbixHLDEpO2EucmVtb3ZlQ2hpbGQoZi5jb250YWluZXIpfWZ1bmN0aW9uIFYoKXtmLmNvbnRhaW5lciYmVSgpO2g9RC50aGVtZVtkLnRoZW1lXTt5PWguY29tcGlsZWRIZWF0bWFwc3x8W107aWYoIXkubGVuZ3RoJiZoLmhlYXRtYXBzLmxlbmd0aCl7Zm9yKHA9MDtwPGguaGVhdG1hcHMubGVuZ3RoO3ArKyl7eVtwXT1bXTtmb3IoYz0wO2M8PUo7YysrKXt2YXIgYj15W3BdLGU9YyxnO2c9MC4zMy9KKmM7dmFyIGo9aC5oZWF0bWFwc1twXS5zYXR1cmF0aW9uLG09aC5oZWF0bWFwc1twXS5saWdodG5lc3Msbj12b2lkIDAsaz12b2lkIDAsbD12b2lkIDAsdD1sPXZvaWQgMCx2PW49az12b2lkIDAsdj12b2lkIDAsbD0wLjU+PW0/bSooMStqKTptK2otbSpqOzA9PT1sP2c9XCIjMDAwXCI6KHQ9MiptLWwsaz0obC10KS9sLGcqPTYsbj1NYXRoLmZsb29yKGcpLFxyXG52PWctbix2Kj1sKmssMD09PW58fDY9PT1uPyhuPWwsaz10K3YsbD10KToxPT09bj8obj1sLXYsaz1sLGw9dCk6Mj09PW4/KG49dCxrPWwsbD10K3YpOjM9PT1uPyhuPXQsaz1sLXYpOjQ9PT1uPyhuPXQrdixrPXQpOihuPWwsaz10LGwtPXYpLGc9XCIjXCIrTihuKStOKGspK04obCkpO2JbZV09Z319aC5jb21waWxlZEhlYXRtYXBzPXl9Zi5jb250YWluZXI9cyhkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGguY29udGFpbmVyKTtmLmNvdW50PWYuY29udGFpbmVyLmFwcGVuZENoaWxkKHMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmNvdW50KSk7Zi5sZWdlbmQ9Zi5jb250YWluZXIuYXBwZW5kQ2hpbGQocyhkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGgubGVnZW5kKSk7Zi5ncmFwaD1kLmdyYXBoP2YuY29udGFpbmVyLmFwcGVuZENoaWxkKHMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmdyYXBoKSk6MDt3Lmxlbmd0aD0wO2Zvcih2YXIgcSBpbiBmKWZbcV0mJlxyXG5oW3FdLmhlYXRPbiYmdy5wdXNoKHtuYW1lOnEsZWw6ZltxXX0pO3UubGVuZ3RoPTA7aWYoZi5ncmFwaCl7Zi5ncmFwaC5zdHlsZS53aWR0aD1kLmhpc3RvcnkqaC5jb2x1bW4ud2lkdGgrKGQuaGlzdG9yeS0xKSpoLmNvbHVtbi5zcGFjaW5nK1wicHhcIjtmb3IoYz0wO2M8ZC5oaXN0b3J5O2MrKyl1W2NdPWYuZ3JhcGguYXBwZW5kQ2hpbGQocyhkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGguY29sdW1uKSksdVtjXS5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsdVtjXS5zdHlsZS5ib3R0b209MCx1W2NdLnN0eWxlLnJpZ2h0PWMqaC5jb2x1bW4ud2lkdGgrYypoLmNvbHVtbi5zcGFjaW5nK1wicHhcIix1W2NdLnN0eWxlLndpZHRoPWguY29sdW1uLndpZHRoK1wicHhcIix1W2NdLnN0eWxlLmhlaWdodD1cIjBweFwifXMoZi5jb250YWluZXIsZCk7cigpO2EuYXBwZW5kQ2hpbGQoZi5jb250YWluZXIpO2YuZ3JhcGgmJihPPWYuZ3JhcGguY2xpZW50SGVpZ2h0KTtkLnRvZ2dsZU9uJiYoXCJjbGlja1wiPT09XHJcbmQudG9nZ2xlT24mJihmLmNvbnRhaW5lci5zdHlsZS5jdXJzb3I9XCJwb2ludGVyXCIpLFMoZi5jb250YWluZXIsZC50b2dnbGVPbixHKSl9XCJvYmplY3RcIj09PUgoYSkmJmEubm9kZVR5cGU9PT1qJiYoZT1hLGE9ZG9jdW1lbnQuYm9keSk7YXx8KGE9ZG9jdW1lbnQuYm9keSk7dmFyIGI9dGhpcyxkPUkoe30sRC5kZWZhdWx0cyxlfHx7fSksZj17fSx1PVtdLGgseSxKPTEwMCx3PVtdLFc9MCxCPWQudGhyZXNob2xkLFE9MCxMPUEoKS1CLHosRT1bXSxGPVtdLHgsUCxxPVwiZnBzXCI9PT1kLnNob3csTyxLLGMscDtiLm9wdGlvbnM9ZDtiLmZwcz0wO2IuZHVyYXRpb249MDtiLmlzUGF1c2VkPTA7Yi50aWNrU3RhcnQ9ZnVuY3Rpb24oKXtRPUEoKX07Yi50aWNrPWZ1bmN0aW9uKCl7ej1BKCk7Vz16LUw7Qis9KFctQikvZC5zbW9vdGhpbmc7Yi5mcHM9MUUzL0I7Yi5kdXJhdGlvbj1RPEw/Qjp6LVE7TD16fTtiLnBhdXNlPWZ1bmN0aW9uKCl7eCYmKGIuaXNQYXVzZWQ9MSxjbGVhclRpbWVvdXQoeCksXHJcbkMoeCksQyhQKSx4PVA9MCk7cmV0dXJuIGJ9O2IucmVzdW1lPWZ1bmN0aW9uKCl7eHx8KGIuaXNQYXVzZWQ9MCxrKCkpO3JldHVybiBifTtiLnNldD1mdW5jdGlvbihhLGMpe2RbYV09YztxPVwiZnBzXCI9PT1kLnNob3c7LTEhPT1SKGEsWCkmJlYoKTstMSE9PVIoYSxZKSYmcyhmLmNvbnRhaW5lcixkKTtyZXR1cm4gYn07Yi5zaG93RHVyYXRpb249ZnVuY3Rpb24oKXtiLnNldChcInNob3dcIixcIm1zXCIpO3JldHVybiBifTtiLnNob3dGcHM9ZnVuY3Rpb24oKXtiLnNldChcInNob3dcIixcImZwc1wiKTtyZXR1cm4gYn07Yi50b2dnbGU9ZnVuY3Rpb24oKXtiLnNldChcInNob3dcIixxP1wibXNcIjpcImZwc1wiKTtyZXR1cm4gYn07Yi5oaWRlPWZ1bmN0aW9uKCl7Yi5wYXVzZSgpO2YuY29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7cmV0dXJuIGJ9O2Iuc2hvdz1mdW5jdGlvbigpe2IucmVzdW1lKCk7Zi5jb250YWluZXIuc3R5bGUuZGlzcGxheT1cImJsb2NrXCI7cmV0dXJuIGJ9O2IuZGVzdHJveT1mdW5jdGlvbigpe2IucGF1c2UoKTtcclxuVSgpO2IudGljaz1iLnRpY2tTdGFydD1mdW5jdGlvbigpe319O1YoKTtrKCl9dmFyIEEscj1tLnBlcmZvcm1hbmNlO0E9ciYmKHIubm93fHxyLndlYmtpdE5vdyk/cltyLm5vdz9cIm5vd1wiOlwid2Via2l0Tm93XCJdLmJpbmQocik6ZnVuY3Rpb24oKXtyZXR1cm4rbmV3IERhdGV9O2Zvcih2YXIgQz1tLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxtLmNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSxNPW0ucmVxdWVzdEFuaW1hdGlvbkZyYW1lLHI9W1wibW96XCIsXCJ3ZWJraXRcIixcIm9cIl0sRz0wLGs9MCxaPXIubGVuZ3RoO2s8WiYmIUM7KytrKU09KEM9bVtyW2tdK1wiQ2FuY2VsQW5pbWF0aW9uRnJhbWVcIl18fG1bcltrXStcIkNhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZVwiXSkmJm1bcltrXStcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtDfHwoTT1mdW5jdGlvbihhKXt2YXIgZT1BKCksZz1NYXRoLm1heCgwLDE2LShlLUcpKTtHPWUrZztyZXR1cm4gbS5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YShlK1xyXG5nKX0sZyl9LEM9ZnVuY3Rpb24oYSl7Y2xlYXJUaW1lb3V0KGEpfSk7dmFyIFQ9XCJzdHJpbmdcIj09PUgoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKS50ZXh0Q29udGVudCk/XCJ0ZXh0Q29udGVudFwiOlwiaW5uZXJUZXh0XCI7RC5leHRlbmQ9STt3aW5kb3cuRlBTTWV0ZXI9RDtELmRlZmF1bHRzPXtpbnRlcnZhbDoxMDAsc21vb3RoaW5nOjEwLHNob3c6XCJmcHNcIix0b2dnbGVPbjpcImNsaWNrXCIsZGVjaW1hbHM6MSxtYXhGcHM6NjAsdGhyZXNob2xkOjEwMCxwb3NpdGlvbjpcImFic29sdXRlXCIsekluZGV4OjEwLGxlZnQ6XCI1cHhcIix0b3A6XCI1cHhcIixyaWdodDpcImF1dG9cIixib3R0b206XCJhdXRvXCIsbWFyZ2luOlwiMCAwIDAgMFwiLHRoZW1lOlwiZGFya1wiLGhlYXQ6MCxncmFwaDowLGhpc3Rvcnk6MjB9O3ZhciBYPVtcInRvZ2dsZU9uXCIsXCJ0aGVtZVwiLFwiaGVhdFwiLFwiZ3JhcGhcIixcImhpc3RvcnlcIl0sWT1cInBvc2l0aW9uIHpJbmRleCBsZWZ0IHRvcCByaWdodCBib3R0b20gbWFyZ2luXCIuc3BsaXQoXCIgXCIpfSkod2luZG93KTsoZnVuY3Rpb24obSxqKXtqLnRoZW1lPXt9O3ZhciBzPWoudGhlbWUuYmFzZT17aGVhdG1hcHM6W10sY29udGFpbmVyOntoZWF0T246bnVsbCxoZWF0bWFwOm51bGwscGFkZGluZzpcIjVweFwiLG1pbldpZHRoOlwiOTVweFwiLGhlaWdodDpcIjMwcHhcIixsaW5lSGVpZ2h0OlwiMzBweFwiLHRleHRBbGlnbjpcInJpZ2h0XCIsdGV4dFNoYWRvdzpcIm5vbmVcIn0sY291bnQ6e2hlYXRPbjpudWxsLGhlYXRtYXA6bnVsbCxwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOjAscmlnaHQ6MCxwYWRkaW5nOlwiNXB4IDEwcHhcIixoZWlnaHQ6XCIzMHB4XCIsZm9udFNpemU6XCIyNHB4XCIsZm9udEZhbWlseTpcIkNvbnNvbGFzLCBBbmRhbGUgTW9ubywgbW9ub3NwYWNlXCIsekluZGV4OjJ9LGxlZ2VuZDp7aGVhdE9uOm51bGwsaGVhdG1hcDpudWxsLHBvc2l0aW9uOlwiYWJzb2x1dGVcIix0b3A6MCxsZWZ0OjAscGFkZGluZzpcIjVweCAxMHB4XCIsaGVpZ2h0OlwiMzBweFwiLGZvbnRTaXplOlwiMTJweFwiLGxpbmVIZWlnaHQ6XCIzMnB4XCIsZm9udEZhbWlseTpcInNhbnMtc2VyaWZcIixcclxudGV4dEFsaWduOlwibGVmdFwiLHpJbmRleDoyfSxncmFwaDp7aGVhdE9uOm51bGwsaGVhdG1hcDpudWxsLHBvc2l0aW9uOlwicmVsYXRpdmVcIixib3hTaXppbmc6XCJwYWRkaW5nLWJveFwiLE1vekJveFNpemluZzpcInBhZGRpbmctYm94XCIsaGVpZ2h0OlwiMTAwJVwiLHpJbmRleDoxfSxjb2x1bW46e3dpZHRoOjQsc3BhY2luZzoxLGhlYXRPbjpudWxsLGhlYXRtYXA6bnVsbH19O2oudGhlbWUuZGFyaz1qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC44LGxpZ2h0bmVzczowLjh9XSxjb250YWluZXI6e2JhY2tncm91bmQ6XCIjMjIyXCIsY29sb3I6XCIjZmZmXCIsYm9yZGVyOlwiMXB4IHNvbGlkICMxYTFhMWFcIix0ZXh0U2hhZG93OlwiMXB4IDFweCAwICMyMjJcIn0sY291bnQ6e2hlYXRPbjpcImNvbG9yXCJ9LGNvbHVtbjp7YmFja2dyb3VuZDpcIiMzZjNmM2ZcIn19KTtqLnRoZW1lLmxpZ2h0PWouZXh0ZW5kKHt9LHMse2hlYXRtYXBzOlt7c2F0dXJhdGlvbjowLjUsbGlnaHRuZXNzOjAuNX1dLFxyXG5jb250YWluZXI6e2NvbG9yOlwiIzY2NlwiLGJhY2tncm91bmQ6XCIjZmZmXCIsdGV4dFNoYWRvdzpcIjFweCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KSwgLTFweCAtMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSlcIixib3hTaGFkb3c6XCIwIDAgMCAxcHggcmdiYSgwLDAsMCwuMSlcIn0sY291bnQ6e2hlYXRPbjpcImNvbG9yXCJ9LGNvbHVtbjp7YmFja2dyb3VuZDpcIiNlYWVhZWFcIn19KTtqLnRoZW1lLmNvbG9yZnVsPWouZXh0ZW5kKHt9LHMse2hlYXRtYXBzOlt7c2F0dXJhdGlvbjowLjUsbGlnaHRuZXNzOjAuNn1dLGNvbnRhaW5lcjp7aGVhdE9uOlwiYmFja2dyb3VuZENvbG9yXCIsYmFja2dyb3VuZDpcIiM4ODhcIixjb2xvcjpcIiNmZmZcIix0ZXh0U2hhZG93OlwiMXB4IDFweCAwIHJnYmEoMCwwLDAsLjIpXCIsYm94U2hhZG93OlwiMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpXCJ9LGNvbHVtbjp7YmFja2dyb3VuZDpcIiM3NzdcIixiYWNrZ3JvdW5kQ29sb3I6XCJyZ2JhKDAsMCwwLC4yKVwifX0pO2oudGhlbWUudHJhbnNwYXJlbnQ9XHJcbmouZXh0ZW5kKHt9LHMse2hlYXRtYXBzOlt7c2F0dXJhdGlvbjowLjgsbGlnaHRuZXNzOjAuNX1dLGNvbnRhaW5lcjp7cGFkZGluZzowLGNvbG9yOlwiI2ZmZlwiLHRleHRTaGFkb3c6XCIxcHggMXB4IDAgcmdiYSgwLDAsMCwuNSlcIn0sY291bnQ6e3BhZGRpbmc6XCIwIDVweFwiLGhlaWdodDpcIjQwcHhcIixsaW5lSGVpZ2h0OlwiNDBweFwifSxsZWdlbmQ6e3BhZGRpbmc6XCIwIDVweFwiLGhlaWdodDpcIjQwcHhcIixsaW5lSGVpZ2h0OlwiNDJweFwifSxncmFwaDp7aGVpZ2h0OlwiNDBweFwifSxjb2x1bW46e3dpZHRoOjUsYmFja2dyb3VuZDpcIiM5OTlcIixoZWF0T246XCJiYWNrZ3JvdW5kQ29sb3JcIixvcGFjaXR5OjAuNX19KX0pKHdpbmRvdyxGUFNNZXRlcik7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZnBzbWV0cmUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvbGxpc2lvbkNoZWNrZXIgPSByZXF1aXJlKCcuL2NvbGxpc2lvbkNoZWNrZXIuanMnKTtcclxudmFyIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy5qcycpO1xyXG52YXIgbGV2ZWwgPSByZXF1aXJlKCcuL2xldmVsLmpzJyk7XHJcbnZhciBrZXlJbnB1dENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL2tleXMuanMnKTtcclxudmFyIGNhbWVyYSA9IHJlcXVpcmUoJy4vY2FtZXJhLmpzJyk7XHJcbnZhciBnYW1lQXJlYSA9IHJlcXVpcmUoJy4vY2FudmFzLmpzJyk7XHJcbnZhciBhaSA9IHJlcXVpcmUoJy4vYWkuanMnKTtcclxuXHJcblxyXG4vL2Z1bmN0aW9uIHRvIGZpbmQgZGVsdGEgdGltZVxyXG5mdW5jdGlvbiB0aW1lU3RhbXAoKXtcclxuXHRyZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdhbWUoKXtcclxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuXHRcdC8vbG9hZCBrZXkgY29tcG9uZW50cyBcclxuXHRcdHRoaXMuZnBzTWV0ZXIgPSBuZXcgRlBTTWV0ZXIoeyBkZWNpbWFsczogMCwgZ3JhcGg6IHRydWUsIHRoZW1lOiAnZGFyaycsIGxlZnQ6ICc1cHgnIH0pO1xyXG5cdFx0XHJcblx0XHQvL2xvYWQgY29sbGlzaW9uIGNoZWNrZXJcclxuXHRcdHRoaXMuY29sbGlzaW9uQ2hlY2tlciA9IG5ldyBjb2xsaXNpb25DaGVja2VyKCk7XHJcblxyXG5cdFx0dGhpcy5nYW1lQXJlYSA9IG5ldyBnYW1lQXJlYSgpO1xyXG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgY2FtZXJhKDAsMCx0aGlzLmNvbGxpc2lvbkNoZWNrZXIsdGhpcy5nYW1lQXJlYSk7XHJcblx0XHR0aGlzLmNvbnRyb2xsZXIgPSBuZXcga2V5SW5wdXRDb250cm9sbGVyKCk7XHJcblx0XHR0aGlzLmNvbnRyb2xsZXIuYWRkTGlzdGVuZXJzKCk7XHJcblx0XHRcclxuXHJcblx0XHQvL2xvYWQgaW1hZ2VzXHJcblx0XHR0aGlzLnRpbGVzID0gbmV3IEltYWdlKCk7XHJcblx0XHR0aGlzLnBsYXllckltZyA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0dGhpcy5lbmVteUltZyA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kID0gbmV3IEltYWdlKCk7XHJcblx0XHR0aGlzLnRpbGVzLnNyYyA9J2ltZy90aWxlcy5wbmcnO1xyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kLnNyYyA9ICdpbWcvbW91bnRhaW4uanBnJztcclxuXHRcdHRoaXMucGxheWVySW1nLnNyYyA9ICdpbWcvd2F0ZXJjb2xvci5wbmcnO1xyXG5cdFx0dGhpcy5lbmVteUltZy5zcmMgPSAnaW1nL3NhbXVyYWkucG5nJztcclxuXHJcblx0XHR0aGlzLmxldmVsTWFwID0gbmV3IGxldmVsKDEsdGhpcy50aWxlcyk7XHJcblxyXG5cdFx0Ly9pbml0aWFsaXNlIGNvbXBvbmVudHNcclxuXHRcdHRoaXMuZ2FtZUFyZWEuc3RhcnQoKTtcclxuXHRcdHRoaXMubGV2ZWxNYXAucG9wdWxhdGVNYXAoKTtcclxuXHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cyA9IFtdXHJcblx0XHRmb3IodmFyIGk9MDtpPHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzW2ldKTtcclxuXHRcdH1cclxuXHRcdC8vZmluZCBzdGFydCBvZiBsZXZlbFxyXG5cdFx0dmFyIHggPSAxMjg7XHJcblx0XHR2YXIgeSA9IDA7XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZXZlbE1hcC5tYXAubGVuZ3RoOyBpKyspe1xyXG5cdFx0XHRpZih0aGlzLmxldmVsTWFwLm1hcFtpXVt4LzY0XS5zb2xpZCl7XHJcblx0XHRcdFx0eSA9IHRoaXMubGV2ZWxNYXAubWFwW2ldW3gvNjRdLnktMTI4O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLnBsYXllciA9IG5ldyBjb21wb25lbnQoNjQsMTI4LFwicmVkXCIseCx5LCdwbGF5ZXInLHRoaXMucGxheWVySW1nKTtcclxuXHRcdC8vY3JlYXRlIHRoZSBlbmVteVxyXG5cdFx0dGhpcy5lbmVtaWVzID0gW11cclxuXHRcdGZvcih2YXIgaT0wO2k8NTtpKyspe1xyXG5cdFx0XHR2YXIgcmFuZG9tID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSp0aGlzLmxldmVsTWFwLm1hcFswXS5sZW5ndGgpKTtcclxuXHRcdFx0dmFyIHN0YXJ0eCA9IHJhbmRvbSAqIDY0O1xyXG5cdFx0XHR2YXIgc3RhcnR5ID0gMDtcclxuXHRcdFx0Zm9yKHZhciB5PTA7eTx0aGlzLmxldmVsTWFwLm1hcC5sZW5ndGg7IHkrKyl7XHJcblx0XHRcdFx0aWYodGhpcy5sZXZlbE1hcC5tYXBbeV1bcmFuZG9tXS5zb2xpZCl7XHJcblx0XHRcdFx0XHRzdGFydHkgPSB0aGlzLmxldmVsTWFwLm1hcFt5XVtyYW5kb21dLnktMTI4O1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBlbmVteSA9IG5ldyBjb21wb25lbnQoNjQsMTI4LFwiYmx1ZVwiLHN0YXJ0eCxzdGFydHksJ2VuZW15Jyx0aGlzLmVuZW15SW1nKTtcclxuXHRcdFx0Ly9hZGQgYWkgY29tcG9uZW50IHRvIHRoZSBlbmVteVxyXG5cdFx0XHRlbmVteS5haSA9IG5ldyBhaSgpO1xyXG5cdFx0XHRlbmVteS5haS5pbml0KHRoaXMuY29sbGlzaW9uQ2hlY2tlcix0aGlzLnBsYXllcik7XHJcblx0XHRcdHRoaXMuZW5lbWllcy5wdXNoKGVuZW15KTtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2goZW5lbXkpO1xyXG5cdFx0fVxyXG5cdFx0Ly9pbml0aWF0ZSBkZWx0YSB0aW1lXHJcblx0XHR0aGlzLm5vdyA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5kdCA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5sYXN0ID0gdGltZVN0YW1wKCk7XHJcblxyXG5cdFx0Ly9zdGFydCB0aGUgZ2FtZSBsb29wXHJcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcC5iaW5kKHRoaXMpKTtcdFxyXG5cdH0sXHJcblxyXG5cdHRoaXMuY2hlY2tLZXlzID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5EKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYKz10aGlzLnBsYXllci5hY2NlbGVyYXRpb247XHJcblx0XHRcdH1cclxuXHRcdGlmKHRoaXMuY29udHJvbGxlci5rZXlEb3duLkEpe1xyXG5cdFx0XHR0aGlzLnBsYXllci52ZWxvY2l0eVgtPXRoaXMucGxheWVyLmFjY2VsZXJhdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuY29udHJvbGxlci5rZXlEb3duLlNQQUNFKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIuanVtcCh0aGlzLmR0KTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnBsYXllci5jYW5KdW1wPXRydWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHR0aGlzLnJlc3RhcnQgPSBmdW5jdGlvbigpe1xyXG5cdFx0Y29uc29sZS5sb2coJ3Jlc3RhcnRpbmcnKTtcclxuXHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cyA9IFtdXHJcblx0XHRmb3IodmFyIGk9MDtpPHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzW2ldKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuZW5lbWllcyA9IFtdXHJcblx0XHQvL2ZpbmQgc3RhcnQgb2YgbGV2ZWxcclxuXHRcdHZhciB4ID0gMTI4O1xyXG5cdFx0dmFyIHkgPSAwO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGV2ZWxNYXAubWFwLmxlbmd0aDsgaSsrKXtcclxuXHRcdFx0aWYodGhpcy5sZXZlbE1hcC5tYXBbaV1bMF0uc29saWQpe1xyXG5cdFx0XHRcdHkgPSB0aGlzLmxldmVsTWFwLm1hcFtpXVswXS55LXRoaXMucGxheWVyLmhlaWdodDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYID0gMDtcclxuXHRcdHRoaXMucGxheWVyLnZlbG9jaXR5WSA9IDA7XHJcblx0XHR0aGlzLnBsYXllci54ID0geDtcclxuXHRcdHRoaXMucGxheWVyLnkgPSB5O1xyXG5cdFx0dGhpcy5wbGF5ZXIuaW1nWCA9IHg7XHJcblx0XHR0aGlzLnBsYXllci5pbWdZID0geTtcclxuXHRcdHRoaXMuY2FtZXJhLnggPSAwO1xyXG5cdFx0dGhpcy5jYW1lcmEueSA9IDA7XHJcblx0XHR0aGlzLmNhbWVyYS51cGRhdGUodGhpcy5kdCx0aGlzLnBsYXllcix0aGlzLmxldmVsTWFwLm1hcCk7XHJcblx0XHRcclxuXHRcdGZvcih2YXIgaT0wO2k8NTtpKyspe1xyXG5cdFx0XHR2YXIgcmFuZG9tID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSp0aGlzLmxldmVsTWFwLm1hcFswXS5sZW5ndGgpKTtcclxuXHRcdFx0dmFyIHN0YXJ0eCA9IHJhbmRvbSAqIDY0O1xyXG5cdFx0XHR2YXIgc3RhcnR5ID0gMDtcclxuXHRcdFx0Zm9yKHZhciB5PTA7eTx0aGlzLmxldmVsTWFwLm1hcC5sZW5ndGg7IHkrKyl7XHJcblx0XHRcdFx0aWYodGhpcy5sZXZlbE1hcC5tYXBbeV1bcmFuZG9tXS5zb2xpZCl7XHJcblx0XHRcdFx0XHRzdGFydHkgPSB0aGlzLmxldmVsTWFwLm1hcFt5XVtyYW5kb21dLnktMTI4O1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBlbmVteSA9IG5ldyBjb21wb25lbnQoNjQsMTI4LFwiYmx1ZVwiLHN0YXJ0eCxzdGFydHksJ2VuZW15Jyx0aGlzLmVuZW15SW1nKTtcclxuXHRcdFx0Ly9hZGQgYWkgY29tcG9uZW50IHRvIHRoZSBlbmVteVxyXG5cdFx0XHRlbmVteS5haSA9IG5ldyBhaSgpO1xyXG5cdFx0XHRlbmVteS5haS5pbml0KHRoaXMuY29sbGlzaW9uQ2hlY2tlcix0aGlzLnBsYXllcik7XHJcblx0XHRcdHRoaXMuZW5lbWllcy5wdXNoKGVuZW15KTtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2goZW5lbXkpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpe1xyXG5cdFx0XHRzZWxmLmdhbWVMb29wKCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cdHRoaXMuZ2FtZUxvb3AgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGRlYWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuZnBzTWV0ZXIudGlja1N0YXJ0KCk7XHJcblx0XHRcclxuXHRcdC8vdXBkYXRlIGRlbHRhIHRpbWVcclxuXHRcdHRoaXMubm93ID0gdGltZVN0YW1wKCk7XHJcblx0XHR0aGlzLmR0ID0gTWF0aC5taW4oMSwodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcblx0XHR0aGlzLmdhbWVBcmVhLmNsZWFyKCk7XHJcblx0XHRcclxuXHRcdC8vbGlzdCBvZiBvYmplY3RzIHRvIGJlIHJlbmRlcmVkXHJcblx0XHR2YXIgcmVuZGVyTGlzdD1bXTtcclxuXHJcblx0XHR0aGlzLmNoZWNrS2V5cygpO1xyXG5cclxuXHRcdC8vZG8gY29sbGlzaW9uIGNoZWNraW5nXHJcblx0XHRmb3IodmFyIGkgPSAwO2k8dGhpcy5jb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2tNb3ZlbWVudCh0aGlzLnBsYXllcix0aGlzLmNvbGxpc2lvbk9iamVjdHMpXHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwO2k8dGhpcy5lbmVtaWVzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2sodGhpcy5wbGF5ZXIsdGhpcy5lbmVtaWVzW2ldKSl7XHJcblx0XHRcdFx0ZGVhZCA9IHRydWU7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2RlYXRoJyk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vZW5lbXkgYWN0aW9uc1xyXG5cdFx0Zm9yKHZhciBpPTA7aTx0aGlzLmVuZW1pZXMubGVuZ3RoO2krKyl7XHJcblx0XHRcdHZhciBlbmVteSA9IHRoaXMuZW5lbWllc1tpXTtcclxuXHRcdFx0dmFyIGluZCA9IHRoaXMuY29sbGlzaW9uT2JqZWN0cy5pbmRleE9mKGVuZW15KTtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnNwbGljZShpbmQsIDEpO1xyXG5cdFx0XHRlbmVteS51cGRhdGUodGhpcy5kdCk7XHJcblx0XHRcdGVuZW15LmFpLmFpRG8oZW5lbXksdGhpcy5jb2xsaXNpb25PYmplY3RzKTtcclxuXHRcdFx0dGhpcy5jb2xsaXNpb25DaGVja2VyLmNoZWNrTW92ZW1lbnQoZW5lbXksdGhpcy5jb2xsaXNpb25PYmplY3RzKVxyXG5cdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaChlbmVteSk7XHJcblx0XHRcdHJlbmRlckxpc3QucHVzaChlbmVteSk7XHJcblx0XHR9XHJcblx0XHQvL3VwZGF0ZSB0aGUgcGxheWVyLCBhbmQgY2FtZXJhIHBvc2l0aW9uXHJcblx0XHR0aGlzLnBsYXllci51cGRhdGUodGhpcy5kdCk7XHJcblx0XHR0aGlzLmNhbWVyYS51cGRhdGUodGhpcy5kdCx0aGlzLnBsYXllcix0aGlzLmxldmVsTWFwLm1hcCk7XHJcblxyXG5cdFx0Zm9yKGk9MDtpPHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0cmVuZGVyTGlzdC5wdXNoKHRoaXMubGV2ZWxNYXAuY29sbGlzaW9uT2JqZWN0c1tpXSlcclxuXHRcdH1cclxuXHRcdHJlbmRlckxpc3QucHVzaCh0aGlzLnBsYXllcik7XHJcblx0XHJcblx0XHQvL1JlbmRlclxyXG5cdFx0dGhpcy5jYW1lcmEucmVuZGVyKHJlbmRlckxpc3QsdGhpcy5iYWNrZ3JvdW5kKTtcclxuXHRcdHRoaXMuZnBzTWV0ZXIudGljaygpO1xyXG5cdFx0XHJcblx0XHQvL2lmIHRoZSBwbGF5ZXIgaXMgZGVhZCByZXN0YXJ0IGdhbWVcclxuXHRcdGlmKHRoaXMucGxheWVyLnk+dGhpcy5sZXZlbE1hcC5tYXAubGVuZ3RoKjY0KXtcclxuXHRcdFx0ZGVhZCA9IHRydWU7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdkZWF0aCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYoZGVhZCl7XHJcblx0XHRcdHRoaXMucmVzdGFydCgpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZXtcclxuXHRcdC8vc3RhcnQgdGhlIG5leHQgbG9vcFxyXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRzZWxmLmdhbWVMb29wKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnYW1lO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2dhbWUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFpID0gcmVxdWlyZSgnLi9haS5qcycpO1xyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50KHdpZHRoLCBoZWlnaHQsIGNvbG9yLCB4LCB5LCBuYW1lLGltZyl7XHJcblx0XHJcblx0Ly9zZXRiYXNpYyB2YWx1ZXNcclxuXHR0aGlzLm5hbWUgPSBuYW1lO1xyXG5cdHRoaXMuY29sID0gY29sb3I7XHJcblxyXG5cdC8vbWFwIHBvc2l0aW9uIG9mIGNoYXJhY3RlclxyXG5cdHRoaXMueCA9IHg7XHJcblx0dGhpcy55ID0geTtcclxuXHJcblx0Ly9zZXQgc2l6ZVxyXG5cdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHR0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHRcclxuXHQvL2ltYWdlIHRvIGJlIHVzZWQsIGltYWdlIHNpemUgYW5kIGltYWdlIGxvY2F0aW9uIGluIHJlbGF0aW9uIHRvIG9iamVjdCBsb2NhdGlvbiBcclxuXHR0aGlzLmltZyA9IGltZztcclxuXHR0aGlzLmltZ1ggPSB0aGlzLngtdGhpcy53aWR0aC80O1xyXG5cdHRoaXMuaW1nWSA9IHRoaXMueTtcclxuXHR0aGlzLmltZ1NyY1ggPSAwO1xyXG5cdHRoaXMuaW1nU3JjWSA9IDA7XHJcblx0dGhpcy5pbWdXaWR0aCA9IHdpZHRoKjI7XHJcblx0dGhpcy5pbWdIZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHJcblx0Ly9waHlzaWNzXHJcblx0dGhpcy5jYW5KdW1wID0gdHJ1ZTtcclxuXHR0aGlzLnZlbG9jaXR5WCA9IDA7XHJcblx0dGhpcy52ZWxvY2l0eVkgPSAwO1xyXG5cdHRoaXMubWF4U3BlZWQgPSA1O1xyXG5cdHRoaXMuZ3Jhdml0eSA9IDAuMztcclxuXHR0aGlzLmZyaWN0aW9uID0gMC44O1xyXG5cdHRoaXMuYWNjZWxlcmF0aW9uID0gMS41O1xyXG5cclxuXHQvL2JvdW5kaW5nIGJveGVzIGZvciBjb2xsaXNpb24gZGV0ZWN0aW9uLCBjb2xvciB2YWx1ZSBpcyBmb3IgdGVzdGluZyBwdXJwb3Nlc1xyXG5cdHRoaXMuYmJ1ID0ge2NvbDoneWVsbG93Jyx4OnRoaXMueCx5OnRoaXMueSx3aWR0aDp0aGlzLndpZHRoLGhlaWdodDp0aGlzLmhlaWdodC8yfVxyXG5cdHRoaXMuYmJkID0ge2NvbDonYmx1ZScseDp0aGlzLngseTp0aGlzLnkrKHRoaXMuaGVpZ2h0LzIpLHdpZHRoOnRoaXMud2lkdGgsIGhlaWdodDp0aGlzLmhlaWdodC8yfVxyXG5cdHRoaXMuYmJsID0ge2NvbDonb3JhbmdlJyx4OnRoaXMueC0zLHk6dGhpcy55KzEwLHdpZHRoOnRoaXMud2lkdGgvMi0zLGhlaWdodDp0aGlzLmhlaWdodC0yMCB9XHJcblx0dGhpcy5iYnIgPSB7Y29sOidicm93bicseDp0aGlzLngrKHRoaXMud2lkdGgvMikseTp0aGlzLnkrMTAsd2lkdGg6dGhpcy53aWR0aC8yKzMsaGVpZ2h0OnRoaXMuaGVpZ2h0LTIwfVxyXG5cdFxyXG5cdHRoaXMuc29saWQgPSB0cnVlO1xyXG5cdC8vYm9vbGVhbnMgdG8gY2hlY2sgYmVmb3JlIG1vdmluZyB0aGUgY2hhcmFjdGVyXHJcblx0dGhpcy5jYW5Nb3ZlVXAgPSBmYWxzZTtcclxuXHR0aGlzLmNhbk1vdmVEb3duID0gZmFsc2U7XHJcblx0dGhpcy5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuXHR0aGlzLmNhbk1vdmVMZWZ0ID0gZmFsc2U7XHJcblxyXG5cdHRoaXMuanVtcCA9IGZ1bmN0aW9uKGR0KXtcclxuXHRcdGlmKCF0aGlzLmNhbk1vdmVEb3duICYmIHRoaXMuY2FuSnVtcCl7XHJcblx0XHRcdHRoaXMudmVsb2NpdHlZPS03O1xyXG5cdFx0XHR0aGlzLmNhbkp1bXAgPSBmYWxzZTtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oZHQpe1xyXG5cdFx0dGhpcy52ZWxvY2l0eVggKj0gdGhpcy5mcmljdGlvbiAqIGR0O1xyXG5cclxuXHRcdGlmKHRoaXMuY2FuTW92ZUxlZnQpe1xyXG5cdFx0XHR0aGlzLnZlbG9jaXR5WC09dGhpcy5hY2NlbGVyYXRpb24qZHQ7XHJcblx0XHR9ZWxzZSBpZih0aGlzLnZlbG9jaXR5WDwwKXtcclxuXHRcdFx0dGhpcy52ZWxvY2l0eVg9MDtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLmNhbk1vdmVSaWdodCl7XHJcblx0XHRcdHRoaXMudmVsb2NpdHlYKz10aGlzLmFjY2VsZXJhdGlvbipkdDtcclxuXHRcdH1lbHNlIGlmKHRoaXMudmVsb2NpdHlYPjApe1xyXG5cdFx0XHR0aGlzLnZlbG9jaXR5WD0wO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuY2FuTW92ZURvd24pe1xyXG5cdFx0XHR0aGlzLnZlbG9jaXR5WSArPSB0aGlzLmdyYXZpdHkgKiBkdDtcclxuXHJcblx0XHR9ZWxzZSBpZighdGhpcy5jYW5Nb3ZlRG93biYmdGhpcy52ZWxvY2l0eVk+MCl7XHJcblx0XHRcdHRoaXMudmVsb2NpdHlZID0gMDtcclxuXHRcdH1cclxuXHJcblx0XHRpZighdGhpcy5jYW5Nb3ZlVXAmJnRoaXMudmVsb2NpdHlZPDApe1xyXG5cdFx0XHR0aGlzLnZlbG9jaXR5WT0wO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHR0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVggKiBkdDtcclxuXHRcdHRoaXMuaW1nWCArPSB0aGlzLnZlbG9jaXR5WCAqIGR0O1xyXG5cdFx0dGhpcy55ICs9IHRoaXMudmVsb2NpdHlZICogZHQ7XHJcblx0XHR0aGlzLmltZ1kgKz0gdGhpcy52ZWxvY2l0eVkgKiBkdDtcclxuXHRcdFxyXG5cdFx0Ly9ib3VuZGluZyBib3h4ZXMgdXNlZCBmb3IgY29sbGlzaW9uIGRldGVjdGlvblxyXG5cdFx0dGhpcy5iYnUgPSB7Y29sOid5ZWxsb3cnLHg6dGhpcy54LHk6dGhpcy55K3RoaXMudmVsb2NpdHlZKmR0LHdpZHRoOnRoaXMud2lkdGgsaGVpZ2h0OnRoaXMuaGVpZ2h0LzR9XHJcblx0XHR0aGlzLmJiZCA9IHtjb2w6J2JsdWUnLHg6dGhpcy54LHk6dGhpcy55Kyh0aGlzLmhlaWdodC0yKSt0aGlzLnZlbG9jaXR5WSpkdCx3aWR0aDp0aGlzLndpZHRoLCBoZWlnaHQ6Mn1cclxuXHRcdHRoaXMuYmJsID0ge2NvbDonb3JhbmdlJyx4OnRoaXMueCt0aGlzLnZlbG9jaXR5WCpkdC0xLHk6dGhpcy55KzMsd2lkdGg6dGhpcy53aWR0aC8yLTMsaGVpZ2h0OnRoaXMuaGVpZ2h0LTYgfVxyXG5cdFx0dGhpcy5iYnIgPSB7Y29sOidicm93bicseDp0aGlzLngrKHRoaXMud2lkdGgvMi0xKSsxK3RoaXMudmVsb2NpdHlYKmR0LHk6dGhpcy55KzMsd2lkdGg6dGhpcy53aWR0aC8yKzMsaGVpZ2h0OnRoaXMuaGVpZ2h0LTZ9XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBvbmVudDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlxyXG5mdW5jdGlvbiB0aWxlKHgseSx3LGgsc29saWQscGxhdGZvcm0saW1nLHN4LHN5KXtcclxuXHJcblx0Ly9wb3NpdGlvbiBhbmQgc2l6ZVxyXG5cdHRoaXMueCA9IHg7XHJcblx0dGhpcy55ID0geTtcclxuXHR0aGlzLndpZHRoID0gdztcclxuXHR0aGlzLmhlaWdodCA9IGg7XHJcblxyXG5cdC8vaW1hZ2UgdmFsdWVzXHJcblx0dGhpcy5pbWdYPXg7XHJcblx0dGhpcy5pbWdZPXk7XHJcblx0dGhpcy5pbWdXaWR0aCA9IDY0O1xyXG5cdHRoaXMuaW1nSGVpZ2h0ID0gNjQ7XHJcblx0dGhpcy5jb2w9J2dyZWVuJztcclxuXHR0aGlzLmltZyA9IGltZztcclxuXHR0aGlzLmltZ1NyY1ggPSBzeDtcclxuXHR0aGlzLmltZ1NyY1kgPSBzeTtcclxuXHJcblx0Ly90eXBlIG9mIHRpbGVcclxuXHR0aGlzLnNvbGlkID0gc29saWQ7XHJcblx0dGhpcy5wbGF0Zm9ybSA9IHBsYXRmb3JtO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gbGV2ZWwobGV2ZWwsaW1nKXtcclxuXHJcblx0dGhpcy50aWxlVyA9IDY0O1xyXG5cdHRoaXMudGlsZUggPSA2NDtcclxuXHJcblx0dGhpcy5jb2xsaXNpb25PYmplY3RzID0gW107XHJcblx0dGhpcy5pbWFnZSA9IGltZztcclxuXHR0aGlzLm1hcCA9IG1hcEdyaWRzW2xldmVsXTtcclxuXHJcblx0Ly9pdGVyYXRlIHRocm91Z2ggdGhlIGFycmF5IG1hcCBhbmQgZ2VuZXJhdGUgdGlsZXNcclxuXHR0aGlzLnBvcHVsYXRlTWFwID0gZnVuY3Rpb24oKXtcclxuXHRcdHZhciBpbWFnZSA9IGltZztcclxuXHRcdGZvcih4PTA7eDx0aGlzLm1hcFswXS5sZW5ndGg7eCsrKXtcclxuXHRcdFx0Zm9yKHk9MDt5PHRoaXMubWFwLmxlbmd0aDt5Kyspe1xyXG5cdFx0XHRcdGlmKHRoaXMubWFwW3ldW3hdPT09MSl7XHJcblx0XHRcdFx0XHQvL3RvcCBsZWZ0XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILHRydWUsZmFsc2UsaW1hZ2UsMCwwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBbeV1beF09PT0yKXtcclxuXHRcdFx0XHRcdC8vdG9wIG1pZGRsZVxyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCx0cnVlLGZhbHNlLGltYWdlLHRoaXMudGlsZVcsMCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XT10O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBbeV1beF09PT0zKXtcclxuXHRcdFx0XHRcdC8vdG9wIHJpZ2h0XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILHRydWUsZmFsc2UsaW1hZ2UsdGhpcy50aWxlVyoyLDApO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF09dDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwW3ldW3hdPT09NCl7XHJcblx0XHRcdFx0XHQvL21pZGRsZSBsZWZ0XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILHRydWUsZmFsc2UsaW1hZ2UsMCx0aGlzLnRpbGVIKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTUpe1xyXG5cdFx0XHRcdFx0Ly9taWRkbGUgbWlkZGxlXHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILHRydWUsZmFsc2UsaW1hZ2UsdGhpcy50aWxlVyx0aGlzLnRpbGVIKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTYpe1xyXG5cdFx0XHRcdFx0Ly9taWRkbGUgcmlnaHRcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCp0aGlzLnRpbGVXLHkqdGhpcy50aWxlSCx0aGlzLnRpbGVXLHRoaXMudGlsZUgsdHJ1ZSxmYWxzZSxpbWFnZSx0aGlzLnRpbGVXKjIsdGhpcy50aWxlSCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XT10O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBbeV1beF09PT03KXtcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCp0aGlzLnRpbGVXLHkqdGhpcy50aWxlSCx0aGlzLnRpbGVXLHRoaXMudGlsZUgsZmFsc2UsZmFsc2UsaW1hZ2UsMCwwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTgpe1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCxmYWxzZSxmYWxzZSxpbWFnZSx0aGlzLnRpbGVXKjMsdGhpcy50aWxlSCoyKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTkpe1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCxmYWxzZSx0cnVlLGltYWdlLHRoaXMudGlsZVcqMyx0aGlzLnRpbGVIKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILGZhbHNlKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG52YXIgbWFwR3JpZHMgPSB7XHJcblxyXG5cdC8vYXJyYXlzIHJlcHJlc2VudGluZyB0aGUgbGV2ZWwgbGF5b3V0XHJcblx0MTpbXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMywwLDAsMCwxLDIsMl0sXHJcblx0XHRbMiwyLDIsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMSwyLDIsMiwyLDMsMCwwLDAsNCw2LDAsMCwwLDQsNSw1XSxcclxuXHRcdFs1LDUsNSw2LDAsMCwwLDAsMSwzLDAsMCwxLDIsMiwyLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwyLDMsMCwwLDAsMSw1LDUsNSw1LDUsNiwwLDAsMCw0LDYsMCwwLDAsNCw1LDVdLFxyXG5cdFx0WzUsNSw1LDYsMCwwLDAsMCw0LDYsMCwwLDQsNSw1LDUsNSwzLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsNSw1LDUsNiwwLDAsMCw0LDUsNSw1LDUsNSw2LDAsMCwwLDQsNiwwLDAsMCw0LDUsNV0sXHJcblx0XHRbNSw1LDUsNiwwLDAsMCwwLDQsNiwwLDAsNCw1LDUsNSw1LDUsMiwyLDIsMywwLDAsMCwwLDEsMiwyLDMsMCwwLDEsNSw1LDUsNSw2LDAsMCwwLDQsNSw1LDUsNSw1LDYsMCwwLDAsNCw2LDAsMCwwLDQsNSw1XVxyXG5cdF0sXHJcblx0MjpbXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMyw1LDUsNSwxLDIsMl0sXHJcblx0XHRbMiwyLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDIsMiwyLDUsNSw2LDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwyLDIsMiwyLDMsNSw1LDUsNCw2LDAsMCwwLDQsNSw1XSxcclxuXHRcdFs1LDUsNiwwLDAsMCwwLDAsMCwwLDAsMCwxLDIsMiwzLDAsMCw1LDUsMCw0LDUsNiwwLDUsNSwwLDAsMCwwLDAsMCwwLDEsMiwyLDMsMCwwLDUsNCw1LDUsNSw1LDUsNiwwLDAsMCw0LDYsMCwwLDAsNCw1LDVdLFxyXG5cdFx0WzUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNSw1LDUsNV0sXHJcblx0XHRbNSw1LDYsMCwwLDYsMCwwLDAsMCwwLDAsMCw0LDUsNiwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsNCw1LDUsNSw2LDAsMCwwLDQsNSw1LDUsNSw1LDYsMCwwLDAsNCw2LDAsMCwwLDQsNSw1XVxyXG5cdF0sXHJcblx0MzpbXSxcclxuXHQ0OltdLFxyXG5cdDU6W11cclxuXHJcbn1cclxuLy9sZXZlbCA9IG5ldyBsZXZlbCgpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBsZXZlbDtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9sZXZlbC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBrZXlJbnB1dENvbnRyb2xsZXIoKXtcclxuXHR0aGlzLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZXYpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5rZXlIYW5kbGVyKGV2LCBldi5rZXlDb2RlLCB0cnVlKTsgfS5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0cmV0dXJuIHRoaXMua2V5SGFuZGxlcihldiwgZXYua2V5Q29kZSwgZmFsc2UpOyB9LmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHR9LFxyXG5cdHRoaXMucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuXHRcdGNvbnNvbGUubG9nKCdyZW1vdmluZ2xpc3RlbmVycycpO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2KXtcclxuXHRcdFx0cmV0dXJuIHRoaXMua2V5SGFuZGxlcihldiwgZXYua2V5Q29kZSwgdHJ1ZSk7IH0uYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldil7XHJcblx0XHRcdHJldHVybiB0aGlzLmtleUhhbmRsZXIoZXYsIGV2LmtleUNvZGUsIGZhbHNlKTsgfS5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblx0XHR9LFxyXG5cdC8vb2JqZWN0IHRvIGhvbGQgcHJlc3NlZCBrZXlzXHJcblx0dGhpcy5rZXlEb3duID0ge30sXHJcblxyXG5cdHRoaXMua2V5SGFuZGxlciA9IGZ1bmN0aW9uKGV2LCBrZXksIHByZXNzZWQpe1xyXG5cclxuXHRcdC8vdHJhbnNsYXRpb24gZGljdGlvbmFyeVxyXG5cdFx0dmFyIEtFWSA9IHtcclxuXHRcdFx0MzI6ICdTUEFDRScsXHJcblx0XHRcdDg3OiAnVycsXHJcblx0XHRcdDY4OiAnRCcsXHJcblx0XHRcdDY1OiAnQScsXHJcblx0XHRcdDgzOiAnUydcclxuXHRcdH1cclxuXHJcblx0XHR2YXIga2V5UHJlc3NlZCA9IGV2LmtleUNvZGU7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdC8vdHJhbnNsYXRlIGtleSBjb2RlIHRvIHN0cmluZyB1c2luZyB0cmFuc2xhdGUgZGljdGlvbmFyeVxyXG5cdFx0dmFyIGtleVRyYW5zbGF0ZSA9IEtFWVtrZXlQcmVzc2VkXTtcclxuXHJcblx0XHRpZihwcmVzc2VkKXtcclxuXHRcdFx0dGhpcy5rZXlEb3duW2tleVRyYW5zbGF0ZV0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHByZXNzZWQ9PT1mYWxzZSl7XHJcblx0XHRcdHRoaXMua2V5RG93bltrZXlUcmFuc2xhdGVdID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbi8vdmFyIGtleXMgPSBuZXcga2V5SW5wdXRDb250cm9sbGVyKCk7XHJcbm1vZHVsZS5leHBvcnRzID0ga2V5SW5wdXRDb250cm9sbGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvbGxpc2lvbkNoZWNrZXIgPSByZXF1aXJlKCcuL2NvbGxpc2lvbkNoZWNrZXIuanMnKTtcclxudmFyIGdhbWVBcmVhID0gcmVxdWlyZSgnLi9jYW52YXMuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNhbWVyYSh4LHksYyxjYW52YXMpe1xyXG5cdHRoaXMueD14LFxyXG5cdHRoaXMueT15LFxyXG5cdHRoaXMud2lkdGg9MTI4MCxcclxuXHR0aGlzLmhlaWdodD03MjAsXHJcblx0XHJcblx0dGhpcy5nYW1lQXJlYSA9IGNhbnZhcztcclxuXHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIgPSBuZXcgY29sbGlzaW9uQ2hlY2tlcigpO1xyXG5cclxuXHQvL1VwZGF0ZSB0aGUgY2FtZXJhcyBwb3NpdGlvblxyXG5cdHRoaXMudXBkYXRlID0gZnVuY3Rpb24oZHQsZm9jdXMsbWFwKXtcclxuXHRcdHZhciBtYXAgPSBtYXA7XHJcblxyXG5cdFx0Ly9mb2N1cyB0aGUgY2FtZXJhIG9uIHRoZSBwbGF5ZXJcclxuXHRcdGlmKGZvY3VzLng+NCo2NCAmJiBmb2N1cy54PG1hcFswXS5sZW5ndGgqNjQtdGhpcy53aWR0aCs0KjY0KXtcclxuXHRcdFx0dGhpcy54ID0gZm9jdXMueC00KjY0O1xyXG5cdFx0fVxyXG5cdFx0aWYoZm9jdXMueTxtYXAubGVuZ3RoKjY0LXRoaXMuaGVpZ2h0LzIpe1xyXG5cdFx0XHR0aGlzLnkgPSBmb2N1cy55LXRoaXMuaGVpZ2h0LzI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL1JlbmRlciB0aGUgZ2FtZSB3aXRoIGxpc3Qgb2Ygb2JqZWN0cyB0byByZW5kZXJcclxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKGFycixiYWNrZ3JvdW5kKXtcclxuXHRcdHZhciBjdHggPSB0aGlzLmdhbWVBcmVhLmNvbnRleHQ7XHJcblx0XHRcclxuXHRcdC8vZHJhdyBiYWNrZ3JvdW5kXHJcblx0XHRjdHguZHJhd0ltYWdlKGJhY2tncm91bmQsMCwwKTtcclxuXHJcblxyXG5cdFx0Zm9yKGk9MDtpPGFyci5sZW5ndGg7aSsrKXtcclxuXHRcdFx0dmFyIGl0ZW09YXJyW2ldO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly9DaGVjayBpZiB0aGUgb2JqZWN0IGlzIGluIHZpZXdcclxuXHRcdFx0aWYodGhpcy5jb2xsaXNpb25DaGVja2VyLmNoZWNrKHRoaXMsaXRlbSkpe1xyXG5cdFx0XHRcdHZhciBpbWcgPSBpdGVtLmltZztcclxuXHRcdFx0XHR2YXIgc3ggPSBpdGVtLmltZ1NyY1g7XHJcblx0XHRcdFx0dmFyIHN5ID0gaXRlbS5pbWdTcmNZO1xyXG5cdFx0XHRcdHZhciBzdyA9IGl0ZW0uaW1nV2lkdGg7XHJcblx0XHRcdFx0dmFyIHNoID0gaXRlbS5pbWdIZWlnaHQ7XHJcblx0XHRcdFx0dmFyIGR4ID0gaXRlbS5pbWdYLXRoaXMueDtcclxuXHRcdFx0XHR2YXIgZHkgPSBpdGVtLmltZ1ktdGhpcy55O1xyXG5cdFx0XHRcdHZhciBkdyA9IGl0ZW0uaW1nV2lkdGg7XHJcblx0XHRcdFx0dmFyIGRoID0gaXRlbS5pbWdIZWlnaHQ7XHJcblxyXG5cdFx0XHRcdC8vZHJhdyB0byB0aGUgY2FudmFzXHJcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWcsc3gsc3ksc3csc2gsZHgsZHksZHcsZGgpO1xyXG5cclxuXHRcdFx0XHQvL3VuY29tbWVudCB0aGUgYmVsb3d0byBzZWUgYm91bmRpbmcgYm94ZXNcclxuXHRcdFx0XHQvL2N0eC5maWxsU3R5bGUgPSBpdGVtLmNvbDtcclxuXHRcdFx0XHQvL2N0eC5maWxsUmVjdChpdGVtLngtdGhpcy54LCBpdGVtLnktdGhpcy55LCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XHJcblx0XHRcdFx0Ly8gaWYoaXRlbS5pbWcpe2N0eC5kcmF3SW1hZ2UoaW1nLHN4LHN5LHN3LHNoLGR4LGR5LGR3LGRoKTt9XHJcblx0XHRcdFx0Ly8gZWxzZXtjb25zb2xlLmxvZygnbm8gaW1nJyk7fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gY2FtZXJhO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NhbWVyYS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9