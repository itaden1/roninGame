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

function collisionChecker(){
	

	//collision detection
	this.check = function(ob1,ob2){
		if(ob1.x+ob1.width>ob2.x && ob1.x<ob2.x+ob2.width &&
			ob1.y+ob1.height>ob2.y && ob1.y<ob2.y+ob2.height){
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
				this.canMoveDown = false;
				break;
			}else{
				this.canMoveDown = true;
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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
var game = __webpack_require__(3);


//Start the game!!
console.log('lets begin');
var game = new game();
game.start();


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var collisionChecker = __webpack_require__(0);
var component = __webpack_require__(4);
var level = __webpack_require__(5);
var keyInputController = __webpack_require__(6);
var camera = __webpack_require__(7);
var gameArea = __webpack_require__(8);



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

		//do collision checking
		for(var i = 0;i<this.levelMap.collisionObjects.length;i++){
			this.collisionChecker.checkMovement(this.player,this.levelMap.collisionObjects[i])
		}

		//update the player and camera position
		this.player.update(this.dt);
		this.camera.update(this.dt,this.player,this.levelMap);

		//list of objects to be rendered
		var renderList=[];
		for(i=0;i<this.levelMap.collisionObjects.length;i++){
			renderList.push(this.levelMap.collisionObjects[i])
		}
		renderList.push(this.player);

		//Render
		this.camera.render(renderList,this.levelMap);
		this.fpsMeter.tick();

		//start the next loop
		requestAnimationFrame(this.gameLoop.bind(this));	
	}
}



module.exports = game;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
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
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,0,0);
					console.log(t.img);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===2){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===3){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW*2,0);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===4){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,0,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===5){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===6){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,image,this.tileW*2,this.tileH);
					this.map[y][x]=t;
					this.collisionObjects.push(t);
				}
				else if(this.map[y][x]===7){
					var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,image,this.tileW*3,0);
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
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,3,0,0,0,0,1,2,2],
		[2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,3,0,0,4,6,0,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,1,3,0,0,0,1,2,2,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,3,0,0,4,5,5,5,5,5,5,6,0,0,4,6,0,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,4,6,0,0,0,4,5,5,5,5,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,5,5,5,6,0,0,4,5,5,5,5,5,5,6,0,0,4,6,0,0,0,0,4,5,5],
		[5,5,5,6,0,0,0,4,6,0,0,0,4,5,5,5,5,5,2,2,2,3,0,0,1,3,0,0,0,1,3,0,0,4,5,5,5,6,0,0,4,5,5,5,5,5,5,6,0,0,4,6,0,0,0,0,4,5,5]
	],
	2:[],
	3:[],
	4:[],
	5:[]

}
//level = new level();

module.exports = level;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

function keyInputController(){
	this.addListeners = function(){
		document.addEventListener('keydown', function(ev){
			return this.keyHandler(ev, ev.keyCode, true); }.bind(this), false);
		document.addEventListener('keyup', function(ev){
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var collisionChecker = __webpack_require__(0);

function camera(x,y,c,canvas){
	this.x=x,
	this.y=y,
	this.width=1280,
	this.height=720,
	
	this.gameArea = canvas;
	this.collisionChecker = c;
	//Update the cameras position
	this.update = function(dt,focus,map){
		
		var map = map;
		//focus the camera on the player
		if(focus.x>this.width/2&&focus.x<map[0].length*map.tileH-this.width/2){
			this.x=focus.x-this.width/2;
		}
		
		if(focus.y<map.length*map.tileH){
			this.y=focus.y-this.height/3;
		}
	}

	//Render the game with list of objects to render
	this.render = function(arr){
		for(i=0;i<arr.length;i++){
			var item=arr[i];
			
			//Check if the object is in view
			if(this.collisionChecker.check(this,item)){
				
				var ctx = this.gameArea.context;
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
module.exports = camera;


/***/ }),
/* 8 */
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTc5NGI3ODUwZmQwN2NiYzliMDUiLCJ3ZWJwYWNrOi8vLy4vY29sbGlzaW9uQ2hlY2tlci5qcyIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIiwid2VicGFjazovLy8uL2Zwc21ldHJlLmpzIiwid2VicGFjazovLy8uL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy5qcyIsIndlYnBhY2s6Ly8vLi9sZXZlbHYwMi5qcyIsIndlYnBhY2s6Ly8vLi9rZXlzLmpzIiwid2VicGFjazovLy8uL2NhbWVyYS5qcyIsIndlYnBhY2s6Ly8vLi9jYW52YXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQSxVQUFVLDBCQUEwQjs7QUFFcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLFVBQVUsMEJBQTBCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQSxV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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxQkFBcUI7QUFDL0IsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQSxpREFBaUQsRUFBRTtBQUNuRCxFQUFFOztBQUVGO0FBQ0Esa0JBQWtCOztBQUVsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGFBQWE7QUFDdkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDk3OTRiNzg1MGZkMDdjYmM5YjA1IiwiZnVuY3Rpb24gY29sbGlzaW9uQ2hlY2tlcigpe1xyXG5cdFxyXG5cclxuXHQvL2NvbGxpc2lvbiBkZXRlY3Rpb25cclxuXHR0aGlzLmNoZWNrID0gZnVuY3Rpb24ob2IxLG9iMil7XHJcblx0XHRpZihvYjEueCtvYjEud2lkdGg+b2IyLnggJiYgb2IxLng8b2IyLngrb2IyLndpZHRoICYmXHJcblx0XHRcdG9iMS55K29iMS5oZWlnaHQ+b2IyLnkgJiYgb2IxLnk8b2IyLnkrb2IyLmhlaWdodCl7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHRoaXMuY2hlY2tNb3ZlbWVudCA9IGZ1bmN0aW9uKG9iMSxvYjIpe1xyXG5cdFx0dmFyIGNvbGxpc2lvbk9iamVjdHMgPSBvYjI7XHJcblxyXG5cdFx0Zm9yKGk9MDtpPGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoO2krKyl7XHJcblxyXG5cdFx0XHRvYmplY3RDaGVja2luZyA9IGNvbGxpc2lvbk9iamVjdHNbaV07XHJcblx0XHRcdC8vY2hlY2sgZm9yIGNvbGxpc2lvbnMgYWJvdmVcclxuXHJcblx0XHRcdGlmKHRoaXMuY2hlY2sob2IxLmJidSxvYmplY3RDaGVja2luZykmJm9iamVjdENoZWNraW5nLnNvbGlkKXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZVVwID0gZmFsc2U7XHJcblx0XHRcdFx0Ly8gdGhpcy55PW9iamVjdENoZWNraW5nLnkrb2JqZWN0Q2hlY2tpbmcuaGVpZ2h0O1xyXG5cdFx0XHRcdC8vIHRoaXMuaW1nWT1vYmplY3RDaGVja2luZy55K29iamVjdENoZWNraW5nLmhlaWdodDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVVcCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGZvcihpPTA7aTxjb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRvYmplY3RDaGVja2luZyA9IGNvbGxpc2lvbk9iamVjdHNbaV07XHJcblx0XHRcdC8vY2hlY2sgZm9yIGNvbGxpc2lvbnMgYmVsb3dcclxuXHJcblx0XHRcdGlmKHRoaXMuY2hlY2sob2IxLmJiZCxvYmplY3RDaGVja2luZykmJm9iamVjdENoZWNraW5nLnNvbGlkKXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZURvd24gPSBmYWxzZTtcclxuXHRcdFx0XHQvL3RoaXMueT1vYmplY3RDaGVja2luZy55LXRoaXMuaGVpZ2h0KzE7XHJcblx0XHRcdFx0Ly90aGlzLmltZ1k9b2JqZWN0Q2hlY2tpbmcueS10aGlzLmhlaWdodCsxO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9ZWxzZSBpZih0aGlzLmNoZWNrKG9iMS5iYmQsb2JqZWN0Q2hlY2tpbmcpJiZvYmplY3RDaGVja2luZy5wbGF0Zm9ybSYmb2IxLmJiZC55LW9iMS52ZWxvY2l0eVkqZHQ8b2JqZWN0Q2hlY2tpbmcueSl7XHJcblx0XHRcdFx0dGhpcy5jYW5Nb3ZlRG93biA9IGZhbHNlO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR0aGlzLmNhbk1vdmVEb3duID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGZvcihpPTA7aTxjb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRvYmplY3RDaGVja2luZyA9IGNvbGxpc2lvbk9iamVjdHNbaV07XHJcblx0XHRcdGlmKHRoaXMuY2hlY2sob2IxLmJibCxvYmplY3RDaGVja2luZykmJm9iamVjdENoZWNraW5nLnNvbGlkKXtcclxuXHRcdFx0XHRvYjEuY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVMZWZ0ID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0Zm9yKGk9MDtpPGNvbGxpc2lvbk9iamVjdHMubGVuZ3RoO2krKyl7XHJcblx0XHRcdG9iamVjdENoZWNraW5nID0gY29sbGlzaW9uT2JqZWN0c1tpXTtcclxuXHRcdFx0aWYodGhpcy5jaGVjayhvYjEuYmJyLG9iamVjdENoZWNraW5nKSYmb2JqZWN0Q2hlY2tpbmcuc29saWQpe1xyXG5cdFx0XHRcdG9iMS5jYW5Nb3ZlUmlnaHQgPSBmYWxzZTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0b2IxLmNhbk1vdmVSaWdodCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHJcblx0fVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjb2xsaXNpb25DaGVja2VyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbGxpc2lvbkNoZWNrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9mcHNtZXRyZS5qcycpO1xyXG52YXIgZ2FtZSA9IHJlcXVpcmUoJy4vZ2FtZS5qcycpO1xyXG5cclxuXHJcbi8vU3RhcnQgdGhlIGdhbWUhIVxyXG5jb25zb2xlLmxvZygnbGV0cyBiZWdpbicpO1xyXG52YXIgZ2FtZSA9IG5ldyBnYW1lKCk7XHJcbmdhbWUuc3RhcnQoKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qISBGUFNNZXRlciAwLjMuMSAtIDl0aCBNYXkgMjAxMyB8IGh0dHBzOi8vZ2l0aHViLmNvbS9EYXJzYWluL2Zwc21ldGVyICovXHJcbihmdW5jdGlvbihtLGope2Z1bmN0aW9uIHMoYSxlKXtmb3IodmFyIGcgaW4gZSl0cnl7YS5zdHlsZVtnXT1lW2ddfWNhdGNoKGope31yZXR1cm4gYX1mdW5jdGlvbiBIKGEpe3JldHVybiBudWxsPT1hP1N0cmluZyhhKTpcIm9iamVjdFwiPT09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09PXR5cGVvZiBhP09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKS5tYXRjaCgvXFxzKFthLXpdKykvaSlbMV0udG9Mb3dlckNhc2UoKXx8XCJvYmplY3RcIjp0eXBlb2YgYX1mdW5jdGlvbiBSKGEsZSl7aWYoXCJhcnJheVwiIT09SChlKSlyZXR1cm4tMTtpZihlLmluZGV4T2YpcmV0dXJuIGUuaW5kZXhPZihhKTtmb3IodmFyIGc9MCxqPWUubGVuZ3RoO2c8ajtnKyspaWYoZVtnXT09PWEpcmV0dXJuIGc7cmV0dXJuLTF9ZnVuY3Rpb24gSSgpe3ZhciBhPWFyZ3VtZW50cyxlO2ZvcihlIGluIGFbMV0paWYoYVsxXS5oYXNPd25Qcm9wZXJ0eShlKSlzd2l0Y2goSChhWzFdW2VdKSl7Y2FzZSBcIm9iamVjdFwiOmFbMF1bZV09XHJcbkkoe30sYVswXVtlXSxhWzFdW2VdKTticmVhaztjYXNlIFwiYXJyYXlcIjphWzBdW2VdPWFbMV1bZV0uc2xpY2UoMCk7YnJlYWs7ZGVmYXVsdDphWzBdW2VdPWFbMV1bZV19cmV0dXJuIDI8YS5sZW5ndGg/SS5hcHBseShudWxsLFthWzBdXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYSwyKSkpOmFbMF19ZnVuY3Rpb24gTihhKXthPU1hdGgucm91bmQoMjU1KmEpLnRvU3RyaW5nKDE2KTtyZXR1cm4gMT09PWEubGVuZ3RoP1wiMFwiK2E6YX1mdW5jdGlvbiBTKGEsZSxnLGope2lmKGEuYWRkRXZlbnRMaXN0ZW5lcilhW2o/XCJyZW1vdmVFdmVudExpc3RlbmVyXCI6XCJhZGRFdmVudExpc3RlbmVyXCJdKGUsZywhMSk7ZWxzZSBpZihhLmF0dGFjaEV2ZW50KWFbaj9cImRldGFjaEV2ZW50XCI6XCJhdHRhY2hFdmVudFwiXShcIm9uXCIrZSxnKX1mdW5jdGlvbiBEKGEsZSl7ZnVuY3Rpb24gZyhhLGIsZCxjKXtyZXR1cm4geVswfGFdW01hdGgucm91bmQoTWF0aC5taW4oKGItZCkvKGMtZCkqSixKKSldfVxyXG5mdW5jdGlvbiByKCl7Zi5sZWdlbmQuZnBzIT09cSYmKGYubGVnZW5kLmZwcz1xLGYubGVnZW5kW1RdPXE/XCJGUFNcIjpcIm1zXCIpO0s9cT9iLmZwczpiLmR1cmF0aW9uO2YuY291bnRbVF09OTk5PEs/XCI5OTkrXCI6Sy50b0ZpeGVkKDk5PEs/MDpkLmRlY2ltYWxzKX1mdW5jdGlvbiBtKCl7ej1BKCk7TDx6LWQudGhyZXNob2xkJiYoYi5mcHMtPWIuZnBzL01hdGgubWF4KDEsNjAqZC5zbW9vdGhpbmcvZC5pbnRlcnZhbCksYi5kdXJhdGlvbj0xRTMvYi5mcHMpO2ZvcihjPWQuaGlzdG9yeTtjLS07KUVbY109MD09PWM/Yi5mcHM6RVtjLTFdLEZbY109MD09PWM/Yi5kdXJhdGlvbjpGW2MtMV07cigpO2lmKGQuaGVhdCl7aWYody5sZW5ndGgpZm9yKGM9dy5sZW5ndGg7Yy0tOyl3W2NdLmVsLnN0eWxlW2hbd1tjXS5uYW1lXS5oZWF0T25dPXE/ZyhoW3dbY10ubmFtZV0uaGVhdG1hcCxiLmZwcywwLGQubWF4RnBzKTpnKGhbd1tjXS5uYW1lXS5oZWF0bWFwLGIuZHVyYXRpb24sZC50aHJlc2hvbGQsXHJcbjApO2lmKGYuZ3JhcGgmJmguY29sdW1uLmhlYXRPbilmb3IoYz11Lmxlbmd0aDtjLS07KXVbY10uc3R5bGVbaC5jb2x1bW4uaGVhdE9uXT1xP2coaC5jb2x1bW4uaGVhdG1hcCxFW2NdLDAsZC5tYXhGcHMpOmcoaC5jb2x1bW4uaGVhdG1hcCxGW2NdLGQudGhyZXNob2xkLDApfWlmKGYuZ3JhcGgpZm9yKHA9MDtwPGQuaGlzdG9yeTtwKyspdVtwXS5zdHlsZS5oZWlnaHQ9KHE/RVtwXT9NYXRoLnJvdW5kKE8vZC5tYXhGcHMqTWF0aC5taW4oRVtwXSxkLm1heEZwcykpOjA6RltwXT9NYXRoLnJvdW5kKE8vZC50aHJlc2hvbGQqTWF0aC5taW4oRltwXSxkLnRocmVzaG9sZCkpOjApK1wicHhcIn1mdW5jdGlvbiBrKCl7MjA+ZC5pbnRlcnZhbD8oeD1NKGspLG0oKSk6KHg9c2V0VGltZW91dChrLGQuaW50ZXJ2YWwpLFA9TShtKSl9ZnVuY3Rpb24gRyhhKXthPWF8fHdpbmRvdy5ldmVudDthLnByZXZlbnREZWZhdWx0PyhhLnByZXZlbnREZWZhdWx0KCksYS5zdG9wUHJvcGFnYXRpb24oKSk6KGEucmV0dXJuVmFsdWU9XHJcbiExLGEuY2FuY2VsQnViYmxlPSEwKTtiLnRvZ2dsZSgpfWZ1bmN0aW9uIFUoKXtkLnRvZ2dsZU9uJiZTKGYuY29udGFpbmVyLGQudG9nZ2xlT24sRywxKTthLnJlbW92ZUNoaWxkKGYuY29udGFpbmVyKX1mdW5jdGlvbiBWKCl7Zi5jb250YWluZXImJlUoKTtoPUQudGhlbWVbZC50aGVtZV07eT1oLmNvbXBpbGVkSGVhdG1hcHN8fFtdO2lmKCF5Lmxlbmd0aCYmaC5oZWF0bWFwcy5sZW5ndGgpe2ZvcihwPTA7cDxoLmhlYXRtYXBzLmxlbmd0aDtwKyspe3lbcF09W107Zm9yKGM9MDtjPD1KO2MrKyl7dmFyIGI9eVtwXSxlPWMsZztnPTAuMzMvSipjO3ZhciBqPWguaGVhdG1hcHNbcF0uc2F0dXJhdGlvbixtPWguaGVhdG1hcHNbcF0ubGlnaHRuZXNzLG49dm9pZCAwLGs9dm9pZCAwLGw9dm9pZCAwLHQ9bD12b2lkIDAsdj1uPWs9dm9pZCAwLHY9dm9pZCAwLGw9MC41Pj1tP20qKDEraik6bStqLW0qajswPT09bD9nPVwiIzAwMFwiOih0PTIqbS1sLGs9KGwtdCkvbCxnKj02LG49TWF0aC5mbG9vcihnKSxcclxudj1nLW4sdio9bCprLDA9PT1ufHw2PT09bj8obj1sLGs9dCt2LGw9dCk6MT09PW4/KG49bC12LGs9bCxsPXQpOjI9PT1uPyhuPXQsaz1sLGw9dCt2KTozPT09bj8obj10LGs9bC12KTo0PT09bj8obj10K3Ysaz10KToobj1sLGs9dCxsLT12KSxnPVwiI1wiK04obikrTihrKStOKGwpKTtiW2VdPWd9fWguY29tcGlsZWRIZWF0bWFwcz15fWYuY29udGFpbmVyPXMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmNvbnRhaW5lcik7Zi5jb3VudD1mLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaC5jb3VudCkpO2YubGVnZW5kPWYuY29udGFpbmVyLmFwcGVuZENoaWxkKHMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmxlZ2VuZCkpO2YuZ3JhcGg9ZC5ncmFwaD9mLmNvbnRhaW5lci5hcHBlbmRDaGlsZChzKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksaC5ncmFwaCkpOjA7dy5sZW5ndGg9MDtmb3IodmFyIHEgaW4gZilmW3FdJiZcclxuaFtxXS5oZWF0T24mJncucHVzaCh7bmFtZTpxLGVsOmZbcV19KTt1Lmxlbmd0aD0wO2lmKGYuZ3JhcGgpe2YuZ3JhcGguc3R5bGUud2lkdGg9ZC5oaXN0b3J5KmguY29sdW1uLndpZHRoKyhkLmhpc3RvcnktMSkqaC5jb2x1bW4uc3BhY2luZytcInB4XCI7Zm9yKGM9MDtjPGQuaGlzdG9yeTtjKyspdVtjXT1mLmdyYXBoLmFwcGVuZENoaWxkKHMoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxoLmNvbHVtbikpLHVbY10uc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLHVbY10uc3R5bGUuYm90dG9tPTAsdVtjXS5zdHlsZS5yaWdodD1jKmguY29sdW1uLndpZHRoK2MqaC5jb2x1bW4uc3BhY2luZytcInB4XCIsdVtjXS5zdHlsZS53aWR0aD1oLmNvbHVtbi53aWR0aCtcInB4XCIsdVtjXS5zdHlsZS5oZWlnaHQ9XCIwcHhcIn1zKGYuY29udGFpbmVyLGQpO3IoKTthLmFwcGVuZENoaWxkKGYuY29udGFpbmVyKTtmLmdyYXBoJiYoTz1mLmdyYXBoLmNsaWVudEhlaWdodCk7ZC50b2dnbGVPbiYmKFwiY2xpY2tcIj09PVxyXG5kLnRvZ2dsZU9uJiYoZi5jb250YWluZXIuc3R5bGUuY3Vyc29yPVwicG9pbnRlclwiKSxTKGYuY29udGFpbmVyLGQudG9nZ2xlT24sRykpfVwib2JqZWN0XCI9PT1IKGEpJiZhLm5vZGVUeXBlPT09aiYmKGU9YSxhPWRvY3VtZW50LmJvZHkpO2F8fChhPWRvY3VtZW50LmJvZHkpO3ZhciBiPXRoaXMsZD1JKHt9LEQuZGVmYXVsdHMsZXx8e30pLGY9e30sdT1bXSxoLHksSj0xMDAsdz1bXSxXPTAsQj1kLnRocmVzaG9sZCxRPTAsTD1BKCktQix6LEU9W10sRj1bXSx4LFAscT1cImZwc1wiPT09ZC5zaG93LE8sSyxjLHA7Yi5vcHRpb25zPWQ7Yi5mcHM9MDtiLmR1cmF0aW9uPTA7Yi5pc1BhdXNlZD0wO2IudGlja1N0YXJ0PWZ1bmN0aW9uKCl7UT1BKCl9O2IudGljaz1mdW5jdGlvbigpe3o9QSgpO1c9ei1MO0IrPShXLUIpL2Quc21vb3RoaW5nO2IuZnBzPTFFMy9CO2IuZHVyYXRpb249UTxMP0I6ei1RO0w9en07Yi5wYXVzZT1mdW5jdGlvbigpe3gmJihiLmlzUGF1c2VkPTEsY2xlYXJUaW1lb3V0KHgpLFxyXG5DKHgpLEMoUCkseD1QPTApO3JldHVybiBifTtiLnJlc3VtZT1mdW5jdGlvbigpe3h8fChiLmlzUGF1c2VkPTAsaygpKTtyZXR1cm4gYn07Yi5zZXQ9ZnVuY3Rpb24oYSxjKXtkW2FdPWM7cT1cImZwc1wiPT09ZC5zaG93Oy0xIT09UihhLFgpJiZWKCk7LTEhPT1SKGEsWSkmJnMoZi5jb250YWluZXIsZCk7cmV0dXJuIGJ9O2Iuc2hvd0R1cmF0aW9uPWZ1bmN0aW9uKCl7Yi5zZXQoXCJzaG93XCIsXCJtc1wiKTtyZXR1cm4gYn07Yi5zaG93RnBzPWZ1bmN0aW9uKCl7Yi5zZXQoXCJzaG93XCIsXCJmcHNcIik7cmV0dXJuIGJ9O2IudG9nZ2xlPWZ1bmN0aW9uKCl7Yi5zZXQoXCJzaG93XCIscT9cIm1zXCI6XCJmcHNcIik7cmV0dXJuIGJ9O2IuaGlkZT1mdW5jdGlvbigpe2IucGF1c2UoKTtmLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5PVwibm9uZVwiO3JldHVybiBifTtiLnNob3c9ZnVuY3Rpb24oKXtiLnJlc3VtZSgpO2YuY29udGFpbmVyLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiO3JldHVybiBifTtiLmRlc3Ryb3k9ZnVuY3Rpb24oKXtiLnBhdXNlKCk7XHJcblUoKTtiLnRpY2s9Yi50aWNrU3RhcnQ9ZnVuY3Rpb24oKXt9fTtWKCk7aygpfXZhciBBLHI9bS5wZXJmb3JtYW5jZTtBPXImJihyLm5vd3x8ci53ZWJraXROb3cpP3Jbci5ub3c/XCJub3dcIjpcIndlYmtpdE5vd1wiXS5iaW5kKHIpOmZ1bmN0aW9uKCl7cmV0dXJuK25ldyBEYXRlfTtmb3IodmFyIEM9bS5jYW5jZWxBbmltYXRpb25GcmFtZXx8bS5jYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsTT1tLnJlcXVlc3RBbmltYXRpb25GcmFtZSxyPVtcIm1velwiLFwid2Via2l0XCIsXCJvXCJdLEc9MCxrPTAsWj1yLmxlbmd0aDtrPFomJiFDOysraylNPShDPW1bcltrXStcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdfHxtW3Jba10rXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl0pJiZtW3Jba10rXCJSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07Q3x8KE09ZnVuY3Rpb24oYSl7dmFyIGU9QSgpLGc9TWF0aC5tYXgoMCwxNi0oZS1HKSk7Rz1lK2c7cmV0dXJuIG0uc2V0VGltZW91dChmdW5jdGlvbigpe2EoZStcclxuZyl9LGcpfSxDPWZ1bmN0aW9uKGEpe2NsZWFyVGltZW91dChhKX0pO3ZhciBUPVwic3RyaW5nXCI9PT1IKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikudGV4dENvbnRlbnQpP1widGV4dENvbnRlbnRcIjpcImlubmVyVGV4dFwiO0QuZXh0ZW5kPUk7d2luZG93LkZQU01ldGVyPUQ7RC5kZWZhdWx0cz17aW50ZXJ2YWw6MTAwLHNtb290aGluZzoxMCxzaG93OlwiZnBzXCIsdG9nZ2xlT246XCJjbGlja1wiLGRlY2ltYWxzOjEsbWF4RnBzOjYwLHRocmVzaG9sZDoxMDAscG9zaXRpb246XCJhYnNvbHV0ZVwiLHpJbmRleDoxMCxsZWZ0OlwiNXB4XCIsdG9wOlwiNXB4XCIscmlnaHQ6XCJhdXRvXCIsYm90dG9tOlwiYXV0b1wiLG1hcmdpbjpcIjAgMCAwIDBcIix0aGVtZTpcImRhcmtcIixoZWF0OjAsZ3JhcGg6MCxoaXN0b3J5OjIwfTt2YXIgWD1bXCJ0b2dnbGVPblwiLFwidGhlbWVcIixcImhlYXRcIixcImdyYXBoXCIsXCJoaXN0b3J5XCJdLFk9XCJwb3NpdGlvbiB6SW5kZXggbGVmdCB0b3AgcmlnaHQgYm90dG9tIG1hcmdpblwiLnNwbGl0KFwiIFwiKX0pKHdpbmRvdyk7KGZ1bmN0aW9uKG0sail7ai50aGVtZT17fTt2YXIgcz1qLnRoZW1lLmJhc2U9e2hlYXRtYXBzOltdLGNvbnRhaW5lcjp7aGVhdE9uOm51bGwsaGVhdG1hcDpudWxsLHBhZGRpbmc6XCI1cHhcIixtaW5XaWR0aDpcIjk1cHhcIixoZWlnaHQ6XCIzMHB4XCIsbGluZUhlaWdodDpcIjMwcHhcIix0ZXh0QWxpZ246XCJyaWdodFwiLHRleHRTaGFkb3c6XCJub25lXCJ9LGNvdW50OntoZWF0T246bnVsbCxoZWF0bWFwOm51bGwscG9zaXRpb246XCJhYnNvbHV0ZVwiLHRvcDowLHJpZ2h0OjAscGFkZGluZzpcIjVweCAxMHB4XCIsaGVpZ2h0OlwiMzBweFwiLGZvbnRTaXplOlwiMjRweFwiLGZvbnRGYW1pbHk6XCJDb25zb2xhcywgQW5kYWxlIE1vbm8sIG1vbm9zcGFjZVwiLHpJbmRleDoyfSxsZWdlbmQ6e2hlYXRPbjpudWxsLGhlYXRtYXA6bnVsbCxwb3NpdGlvbjpcImFic29sdXRlXCIsdG9wOjAsbGVmdDowLHBhZGRpbmc6XCI1cHggMTBweFwiLGhlaWdodDpcIjMwcHhcIixmb250U2l6ZTpcIjEycHhcIixsaW5lSGVpZ2h0OlwiMzJweFwiLGZvbnRGYW1pbHk6XCJzYW5zLXNlcmlmXCIsXHJcbnRleHRBbGlnbjpcImxlZnRcIix6SW5kZXg6Mn0sZ3JhcGg6e2hlYXRPbjpudWxsLGhlYXRtYXA6bnVsbCxwb3NpdGlvbjpcInJlbGF0aXZlXCIsYm94U2l6aW5nOlwicGFkZGluZy1ib3hcIixNb3pCb3hTaXppbmc6XCJwYWRkaW5nLWJveFwiLGhlaWdodDpcIjEwMCVcIix6SW5kZXg6MX0sY29sdW1uOnt3aWR0aDo0LHNwYWNpbmc6MSxoZWF0T246bnVsbCxoZWF0bWFwOm51bGx9fTtqLnRoZW1lLmRhcms9ai5leHRlbmQoe30scyx7aGVhdG1hcHM6W3tzYXR1cmF0aW9uOjAuOCxsaWdodG5lc3M6MC44fV0sY29udGFpbmVyOntiYWNrZ3JvdW5kOlwiIzIyMlwiLGNvbG9yOlwiI2ZmZlwiLGJvcmRlcjpcIjFweCBzb2xpZCAjMWExYTFhXCIsdGV4dFNoYWRvdzpcIjFweCAxcHggMCAjMjIyXCJ9LGNvdW50OntoZWF0T246XCJjb2xvclwifSxjb2x1bW46e2JhY2tncm91bmQ6XCIjM2YzZjNmXCJ9fSk7ai50aGVtZS5saWdodD1qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC41LGxpZ2h0bmVzczowLjV9XSxcclxuY29udGFpbmVyOntjb2xvcjpcIiM2NjZcIixiYWNrZ3JvdW5kOlwiI2ZmZlwiLHRleHRTaGFkb3c6XCIxcHggMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuNSksIC0xcHggLTFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjUpXCIsYm94U2hhZG93OlwiMCAwIDAgMXB4IHJnYmEoMCwwLDAsLjEpXCJ9LGNvdW50OntoZWF0T246XCJjb2xvclwifSxjb2x1bW46e2JhY2tncm91bmQ6XCIjZWFlYWVhXCJ9fSk7ai50aGVtZS5jb2xvcmZ1bD1qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC41LGxpZ2h0bmVzczowLjZ9XSxjb250YWluZXI6e2hlYXRPbjpcImJhY2tncm91bmRDb2xvclwiLGJhY2tncm91bmQ6XCIjODg4XCIsY29sb3I6XCIjZmZmXCIsdGV4dFNoYWRvdzpcIjFweCAxcHggMCByZ2JhKDAsMCwwLC4yKVwiLGJveFNoYWRvdzpcIjAgMCAwIDFweCByZ2JhKDAsMCwwLC4xKVwifSxjb2x1bW46e2JhY2tncm91bmQ6XCIjNzc3XCIsYmFja2dyb3VuZENvbG9yOlwicmdiYSgwLDAsMCwuMilcIn19KTtqLnRoZW1lLnRyYW5zcGFyZW50PVxyXG5qLmV4dGVuZCh7fSxzLHtoZWF0bWFwczpbe3NhdHVyYXRpb246MC44LGxpZ2h0bmVzczowLjV9XSxjb250YWluZXI6e3BhZGRpbmc6MCxjb2xvcjpcIiNmZmZcIix0ZXh0U2hhZG93OlwiMXB4IDFweCAwIHJnYmEoMCwwLDAsLjUpXCJ9LGNvdW50OntwYWRkaW5nOlwiMCA1cHhcIixoZWlnaHQ6XCI0MHB4XCIsbGluZUhlaWdodDpcIjQwcHhcIn0sbGVnZW5kOntwYWRkaW5nOlwiMCA1cHhcIixoZWlnaHQ6XCI0MHB4XCIsbGluZUhlaWdodDpcIjQycHhcIn0sZ3JhcGg6e2hlaWdodDpcIjQwcHhcIn0sY29sdW1uOnt3aWR0aDo1LGJhY2tncm91bmQ6XCIjOTk5XCIsaGVhdE9uOlwiYmFja2dyb3VuZENvbG9yXCIsb3BhY2l0eTowLjV9fSl9KSh3aW5kb3csRlBTTWV0ZXIpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Zwc21ldHJlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb2xsaXNpb25DaGVja2VyID0gcmVxdWlyZSgnLi9jb2xsaXNpb25DaGVja2VyLmpzJyk7XHJcbnZhciBjb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMuanMnKTtcclxudmFyIGxldmVsID0gcmVxdWlyZSgnLi9sZXZlbHYwMi5qcycpO1xyXG52YXIga2V5SW5wdXRDb250cm9sbGVyID0gcmVxdWlyZSgnLi9rZXlzLmpzJyk7XHJcbnZhciBjYW1lcmEgPSByZXF1aXJlKCcuL2NhbWVyYS5qcycpO1xyXG52YXIgZ2FtZUFyZWEgPSByZXF1aXJlKCcuL2NhbnZhcy5qcycpO1xyXG5cclxuXHJcblxyXG4vL2Z1bmN0aW9uIHRvIGZpbmQgZGVsdGEgdGltZVxyXG5mdW5jdGlvbiB0aW1lU3RhbXAoKXtcclxuXHRyZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPyB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGdhbWUoKXtcclxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHQvL2xvYWQga2V5IGNvbXBvbmVudHMgXHJcblx0XHR0aGlzLmZwc01ldGVyID0gbmV3IEZQU01ldGVyKHsgZGVjaW1hbHM6IDAsIGdyYXBoOiB0cnVlLCB0aGVtZTogJ2RhcmsnLCBsZWZ0OiAnNXB4JyB9KTtcclxuXHRcdFxyXG5cdFx0Ly9sb2FkIGNvbGxpc2lvbiBjaGVja2VyXHJcblx0XHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIgPSBuZXcgY29sbGlzaW9uQ2hlY2tlcigpO1xyXG5cclxuXHRcdHRoaXMuZ2FtZUFyZWEgPSBuZXcgZ2FtZUFyZWEoKTtcclxuXHRcdHRoaXMuY2FtZXJhID0gbmV3IGNhbWVyYSgwLDAsdGhpcy5jb2xsaXNpb25DaGVja2VyLHRoaXMuZ2FtZUFyZWEpO1xyXG5cdFx0dGhpcy5jb250cm9sbGVyID0gbmV3IGtleUlucHV0Q29udHJvbGxlcigpO1xyXG5cdFx0dGhpcy5jb250cm9sbGVyLmFkZExpc3RlbmVycygpO1xyXG5cdFx0XHJcblxyXG5cdFx0Ly9sb2FkIGltYWdlc1xyXG5cdFx0dGhpcy50aWxlcyA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0dGhpcy5wbGF5ZXJJbWcgPSBuZXcgSW1hZ2UoKTtcclxuXHRcdHRoaXMudGlsZXMuc3JjID0naW1nL3RpbGVzLnBuZyc7XHJcblx0XHR0aGlzLnBsYXllckltZy5zcmMgPSAnaW1nL3dhdGVyY29sb3IucG5nJztcclxuXHJcblx0XHR0aGlzLmxldmVsTWFwID0gbmV3IGxldmVsKDEsdGhpcy50aWxlcyk7XHJcblxyXG5cdFx0Ly9pbml0aWFsaXNlIGNvbXBvbmVudHNcclxuXHRcdHRoaXMuZ2FtZUFyZWEuc3RhcnQoKTtcclxuXHRcdHRoaXMucGxheWVyID0gbmV3IGNvbXBvbmVudCg2NCwxMjgsXCJyZWRcIiwwLDM5MCwncGxheWVyJyx0aGlzLnBsYXllckltZyk7XHJcblx0XHR0aGlzLmxldmVsTWFwLnBvcHVsYXRlTWFwKCk7XHJcblxyXG5cdFx0Ly9pbml0aWF0ZSBkZWx0YSB0aW1lXHJcblx0XHR0aGlzLm5vdyA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5kdCA9IHRpbWVTdGFtcCgpO1xyXG5cdFx0dGhpcy5sYXN0ID0gdGltZVN0YW1wKCk7XHJcblxyXG5cdFx0Ly9zdGFydCB0aGUgZ2FtZSBsb29wXHJcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5nYW1lTG9vcC5iaW5kKHRoaXMpKTtcdFxyXG5cdH0sXHJcblxyXG5cdHRoaXMuY2hlY2tLZXlzID0gZnVuY3Rpb24oKXtcclxuXHJcblx0XHRpZih0aGlzLmNvbnRyb2xsZXIua2V5RG93bi5EKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIudmVsb2NpdHlYKz10aGlzLnBsYXllci5hY2NlbGVyYXRpb247XHJcblx0XHRcdH1cclxuXHRcdGlmKHRoaXMuY29udHJvbGxlci5rZXlEb3duLkEpe1xyXG5cdFx0XHR0aGlzLnBsYXllci52ZWxvY2l0eVgtPXRoaXMucGxheWVyLmFjY2VsZXJhdGlvbjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuY29udHJvbGxlci5rZXlEb3duLlNQQUNFKXtcclxuXHRcdFx0dGhpcy5wbGF5ZXIuanVtcCh0aGlzLmR0KTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnBsYXllci5jYW5KdW1wPXRydWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dGhpcy5nYW1lTG9vcCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRcclxuXHRcdHRoaXMuZnBzTWV0ZXIudGlja1N0YXJ0KCk7XHJcblx0XHRcclxuXHRcdC8vdXBkYXRlIGRlbHRhIHRpbWVcclxuXHRcdHRoaXMubm93ID0gdGltZVN0YW1wKCk7XHJcblx0XHR0aGlzLmR0ID0gTWF0aC5taW4oMSwodGhpcy5ub3cgLSB0aGlzLmxhc3QpIC8gMTAwMCk7XHJcblx0XHR0aGlzLmdhbWVBcmVhLmNsZWFyKCk7XHJcblx0XHR0aGlzLmNoZWNrS2V5cygpO1xyXG5cclxuXHRcdC8vZG8gY29sbGlzaW9uIGNoZWNraW5nXHJcblx0XHRmb3IodmFyIGkgPSAwO2k8dGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2tNb3ZlbWVudCh0aGlzLnBsYXllcix0aGlzLmxldmVsTWFwLmNvbGxpc2lvbk9iamVjdHNbaV0pXHJcblx0XHR9XHJcblxyXG5cdFx0Ly91cGRhdGUgdGhlIHBsYXllciBhbmQgY2FtZXJhIHBvc2l0aW9uXHJcblx0XHR0aGlzLnBsYXllci51cGRhdGUodGhpcy5kdCk7XHJcblx0XHR0aGlzLmNhbWVyYS51cGRhdGUodGhpcy5kdCx0aGlzLnBsYXllcix0aGlzLmxldmVsTWFwKTtcclxuXHJcblx0XHQvL2xpc3Qgb2Ygb2JqZWN0cyB0byBiZSByZW5kZXJlZFxyXG5cdFx0dmFyIHJlbmRlckxpc3Q9W107XHJcblx0XHRmb3IoaT0wO2k8dGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzLmxlbmd0aDtpKyspe1xyXG5cdFx0XHRyZW5kZXJMaXN0LnB1c2godGhpcy5sZXZlbE1hcC5jb2xsaXNpb25PYmplY3RzW2ldKVxyXG5cdFx0fVxyXG5cdFx0cmVuZGVyTGlzdC5wdXNoKHRoaXMucGxheWVyKTtcclxuXHJcblx0XHQvL1JlbmRlclxyXG5cdFx0dGhpcy5jYW1lcmEucmVuZGVyKHJlbmRlckxpc3QsdGhpcy5sZXZlbE1hcCk7XHJcblx0XHR0aGlzLmZwc01ldGVyLnRpY2soKTtcclxuXHJcblx0XHQvL3N0YXJ0IHRoZSBuZXh0IGxvb3BcclxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmdhbWVMb29wLmJpbmQodGhpcykpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZ2FtZTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9nYW1lLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGNvbXBvbmVudCh3aWR0aCwgaGVpZ2h0LCBjb2xvciwgeCwgeSwgbmFtZSxpbWcpe1xyXG5cdFxyXG5cdC8vc2V0YmFzaWMgdmFsdWVzXHJcblx0dGhpcy5uYW1lID0gbmFtZTtcclxuXHR0aGlzLmNvbCA9IGNvbG9yO1xyXG5cclxuXHQvL21hcCBwb3NpdGlvbiBvZiBjaGFyYWN0ZXJcclxuXHR0aGlzLnggPSB4O1xyXG5cdHRoaXMueSA9IHk7XHJcblxyXG5cdC8vc2V0IHNpemVcclxuXHR0aGlzLndpZHRoID0gd2lkdGg7XHJcblx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0XHJcblx0Ly9pbWFnZSB0byBiZSB1c2VkLCBpbWFnZSBzaXplIGFuZCBpbWFnZSBsb2NhdGlvbiBpbiByZWxhdGlvbiB0byBvYmplY3QgbG9jYXRpb24gXHJcblx0dGhpcy5pbWcgPSBpbWc7XHJcblx0dGhpcy5pbWdYID0gdGhpcy54LXRoaXMud2lkdGgvNDtcclxuXHR0aGlzLmltZ1kgPSB0aGlzLnk7XHJcblx0dGhpcy5pbWdTcmNYID0gMDtcclxuXHR0aGlzLmltZ1NyY1kgPSAwO1xyXG5cdHRoaXMuaW1nV2lkdGggPSB3aWR0aCoyO1xyXG5cdHRoaXMuaW1nSGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdFxyXG5cdC8vcGh5c2ljc1xyXG5cdHRoaXMuY2FuSnVtcCA9IHRydWU7XHJcblx0dGhpcy52ZWxvY2l0eVggPSAwO1xyXG5cdHRoaXMudmVsb2NpdHlZID0gMDtcclxuXHR0aGlzLm1heFNwZWVkID0gNTtcclxuXHR0aGlzLmdyYXZpdHkgPSAwLjM7XHJcblx0dGhpcy5mcmljdGlvbiA9IDAuODtcclxuXHR0aGlzLmFjY2VsZXJhdGlvbiA9IDEuNTtcclxuXHJcblx0Ly9ib3VuZGluZyBib3hlcyBmb3IgY29sbGlzaW9uIGRldGVjdGlvbiwgY29sb3IgdmFsdWUgaXMgZm9yIHRlc3RpbmcgcHVycG9zZXNcclxuXHR0aGlzLmJidSA9IHtjb2w6J3llbGxvdycseDp0aGlzLngseTp0aGlzLnksd2lkdGg6dGhpcy53aWR0aCxoZWlnaHQ6dGhpcy5oZWlnaHQvMn1cclxuXHR0aGlzLmJiZCA9IHtjb2w6J2JsdWUnLHg6dGhpcy54LHk6dGhpcy55Kyh0aGlzLmhlaWdodC8yKSx3aWR0aDp0aGlzLndpZHRoLCBoZWlnaHQ6dGhpcy5oZWlnaHQvMn1cclxuXHR0aGlzLmJibCA9IHtjb2w6J29yYW5nZScseDp0aGlzLngtMyx5OnRoaXMueSsxMCx3aWR0aDp0aGlzLndpZHRoLzItMyxoZWlnaHQ6dGhpcy5oZWlnaHQtMjAgfVxyXG5cdHRoaXMuYmJyID0ge2NvbDonYnJvd24nLHg6dGhpcy54Kyh0aGlzLndpZHRoLzIpLHk6dGhpcy55KzEwLHdpZHRoOnRoaXMud2lkdGgvMiszLGhlaWdodDp0aGlzLmhlaWdodC0yMH1cclxuXHJcblx0Ly9ib29sZWFucyB0byBjaGVjayBiZWZvcmUgbW92aW5nIHRoZSBjaGFyYWN0ZXJcclxuXHR0aGlzLmNhbk1vdmVVcCA9IGZhbHNlO1xyXG5cdHRoaXMuY2FuTW92ZURvd24gPSBmYWxzZTtcclxuXHR0aGlzLmNhbk1vdmVSaWdodCA9IGZhbHNlO1xyXG5cdHRoaXMuY2FuTW92ZUxlZnQgPSBmYWxzZTtcclxuXHR0aGlzLmFjdGlvbiA9ICdkZWZhdWx0JztcclxuXHJcblx0dGhpcy5qdW1wID0gZnVuY3Rpb24oZHQpe1xyXG5cdFx0dmFyIGNvbGxpc2lvbk9iamVjdHMgPSBnYW1lLmxldmVsTWFwLmNvbGxpc2lvbk9iamVjdHM7XHJcblx0XHRmb3IoaT0wO2k8Y29sbGlzaW9uT2JqZWN0cy5sZW5ndGg7aSsrKXtcclxuXHRcdFx0aWYoY2hlY2tDb2xsaXNpb24odGhpcyxjb2xsaXNpb25PYmplY3RzW2ldKSYmdGhpcy5jYW5KdW1wKXtcclxuXHRcdFx0XHR0aGlzLnZlbG9jaXR5WT0tNztcclxuXHRcdFx0XHR0aGlzLmNhbkp1bXAgPSBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbihkdCl7XHJcblx0XHR0aGlzLnZlbG9jaXR5WCAqPSB0aGlzLmZyaWN0aW9uICogZHQ7XHJcblx0XHRpZih0aGlzLmNhbk1vdmVMZWZ0KXtcclxuXHRcdFx0dGhpcy52ZWxvY2l0eVgtPXRoaXMuYWNjZWxlcmF0aW9uKmR0O1xyXG5cdFx0fWVsc2UgaWYodGhpcy52ZWxvY2l0eVg8MCl7XHJcblx0XHRcdHRoaXMudmVsb2NpdHlYPTA7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5jYW5Nb3ZlUmlnaHQpe1xyXG5cdFx0XHR0aGlzLnZlbG9jaXR5WCs9dGhpcy5hY2NlbGVyYXRpb24qZHQ7XHJcblx0XHR9ZWxzZSBpZih0aGlzLnZlbG9jaXR5WD4wKXtcclxuXHRcdFx0dGhpcy52ZWxvY2l0eVg9MDtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLmNhbk1vdmVEb3duKXtcclxuXHRcdFx0dGhpcy52ZWxvY2l0eVkgKz0gdGhpcy5ncmF2aXR5ICogZHQ7XHJcblxyXG5cdFx0fWVsc2UgaWYoIXRoaXMuY2FuTW92ZURvd24mJnRoaXMudmVsb2NpdHlZPjApe1xyXG5cdFx0XHR0aGlzLnZlbG9jaXR5WSA9IDA7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIXRoaXMuY2FuTW92ZVVwJiZ0aGlzLnZlbG9jaXR5WTwwKXtcclxuXHRcdFx0dGhpcy52ZWxvY2l0eVk9MDtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnggKz0gdGhpcy52ZWxvY2l0eVggKiBkdDtcclxuXHRcdHRoaXMuaW1nWCArPSB0aGlzLnZlbG9jaXR5WCAqIGR0O1xyXG5cdFx0dGhpcy55ICs9IHRoaXMudmVsb2NpdHlZICogZHQ7XHJcblx0XHR0aGlzLmltZ1kgKz0gdGhpcy52ZWxvY2l0eVkgKiBkdDtcclxuXHJcblx0XHR0aGlzLmJidSA9IHtjb2w6J3llbGxvdycseDp0aGlzLngseTp0aGlzLnkrdGhpcy52ZWxvY2l0eVkqZHQsd2lkdGg6dGhpcy53aWR0aCxoZWlnaHQ6dGhpcy5oZWlnaHQvNH1cclxuXHRcdHRoaXMuYmJkID0ge2NvbDonYmx1ZScseDp0aGlzLngseTp0aGlzLnkrKHRoaXMuaGVpZ2h0LTIpK3RoaXMudmVsb2NpdHlZKmR0LHdpZHRoOnRoaXMud2lkdGgsIGhlaWdodDoyfVxyXG5cdFx0dGhpcy5iYmwgPSB7Y29sOidvcmFuZ2UnLHg6dGhpcy54K3RoaXMudmVsb2NpdHlYKmR0LTEseTp0aGlzLnkrMyx3aWR0aDp0aGlzLndpZHRoLzItMyxoZWlnaHQ6dGhpcy5oZWlnaHQtNiB9XHJcblx0XHR0aGlzLmJiciA9IHtjb2w6J2Jyb3duJyx4OnRoaXMueCsodGhpcy53aWR0aC8yLTEpKzErdGhpcy52ZWxvY2l0eVgqZHQseTp0aGlzLnkrMyx3aWR0aDp0aGlzLndpZHRoLzIrMyxoZWlnaHQ6dGhpcy5oZWlnaHQtNn1cclxuXHR9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY29tcG9uZW50O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbmZ1bmN0aW9uIHRpbGUoeCx5LHcsaCxzb2xpZCxwbGF0Zm9ybSxpbWcsc3gsc3kpe1xyXG5cclxuXHQvL3Bvc2l0aW9uIGFuZCBzaXplXHJcblx0dGhpcy54ID0geDtcclxuXHR0aGlzLnkgPSB5O1xyXG5cdHRoaXMud2lkdGggPSB3O1xyXG5cdHRoaXMuaGVpZ2h0ID0gaDtcclxuXHJcblx0Ly9pbWFnZSB2YWx1ZXNcclxuXHR0aGlzLmltZ1g9eDtcclxuXHR0aGlzLmltZ1k9eTtcclxuXHR0aGlzLmltZ1dpZHRoID0gNjQ7XHJcblx0dGhpcy5pbWdIZWlnaHQgPSA2NDtcclxuXHR0aGlzLmNvbD0nZ3JlZW4nO1xyXG5cdHRoaXMuaW1nID0gaW1nO1xyXG5cdHRoaXMuaW1nU3JjWCA9IHN4O1xyXG5cdHRoaXMuaW1nU3JjWSA9IHN5O1xyXG5cclxuXHQvL3R5cGUgb2YgdGlsZVxyXG5cdHRoaXMuc29saWQgPSBzb2xpZDtcclxuXHR0aGlzLnBsYXRmb3JtID0gcGxhdGZvcm07XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBsZXZlbChsZXZlbCxpbWcpe1xyXG5cclxuXHR0aGlzLnRpbGVXID0gNjQ7XHJcblx0dGhpcy50aWxlSCA9IDY0O1xyXG5cclxuXHR0aGlzLmNvbGxpc2lvbk9iamVjdHMgPSBbXTtcclxuXHR0aGlzLmltYWdlID0gaW1nO1xyXG5cdHRoaXMubWFwID0gbWFwR3JpZHNbbGV2ZWxdO1xyXG5cclxuXHQvL2l0ZXJhdGUgdGhyb3VnaCB0aGUgYXJyYXkgbWFwIGFuZCBnZW5lcmF0ZSB0aWxlc1xyXG5cdHRoaXMucG9wdWxhdGVNYXAgPSBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIGltYWdlID0gaW1nO1xyXG5cdFx0Zm9yKHg9MDt4PHRoaXMubWFwWzBdLmxlbmd0aDt4Kyspe1xyXG5cdFx0XHRmb3IoeT0wO3k8dGhpcy5tYXAubGVuZ3RoO3krKyl7XHJcblx0XHRcdFx0aWYodGhpcy5tYXBbeV1beF09PT0xKXtcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCp0aGlzLnRpbGVXLHkqdGhpcy50aWxlSCx0aGlzLnRpbGVXLHRoaXMudGlsZUgsdHJ1ZSxmYWxzZSxpbWFnZSwwLDApO1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2codC5pbWcpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF09dDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwW3ldW3hdPT09Mil7XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILHRydWUsZmFsc2UsaW1hZ2UsdGhpcy50aWxlVywwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTMpe1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCx0cnVlLGZhbHNlLGltYWdlLHRoaXMudGlsZVcqMiwwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTQpe1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCx0cnVlLGZhbHNlLGltYWdlLDAsdGhpcy50aWxlSCk7XHJcblx0XHRcdFx0XHR0aGlzLm1hcFt5XVt4XT10O1xyXG5cdFx0XHRcdFx0dGhpcy5jb2xsaXNpb25PYmplY3RzLnB1c2godCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsc2UgaWYodGhpcy5tYXBbeV1beF09PT01KXtcclxuXHRcdFx0XHRcdHZhciB0ID0gbmV3IHRpbGUoeCp0aGlzLnRpbGVXLHkqdGhpcy50aWxlSCx0aGlzLnRpbGVXLHRoaXMudGlsZUgsdHJ1ZSxmYWxzZSxpbWFnZSx0aGlzLnRpbGVXLHRoaXMudGlsZUgpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF09dDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwW3ldW3hdPT09Nil7XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILHRydWUsZmFsc2UsaW1hZ2UsdGhpcy50aWxlVyoyLHRoaXMudGlsZUgpO1xyXG5cdFx0XHRcdFx0dGhpcy5tYXBbeV1beF09dDtcclxuXHRcdFx0XHRcdHRoaXMuY29sbGlzaW9uT2JqZWN0cy5wdXNoKHQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbHNlIGlmKHRoaXMubWFwW3ldW3hdPT09Nyl7XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILGZhbHNlLGZhbHNlLGltYWdlLHRoaXMudGlsZVcqMywwKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTgpe1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCxmYWxzZSxmYWxzZSxpbWFnZSx0aGlzLnRpbGVXKjMsdGhpcy50aWxlSCoyKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZWxzZSBpZih0aGlzLm1hcFt5XVt4XT09PTkpe1xyXG5cdFx0XHRcdFx0dmFyIHQgPSBuZXcgdGlsZSh4KnRoaXMudGlsZVcseSp0aGlzLnRpbGVILHRoaXMudGlsZVcsdGhpcy50aWxlSCxmYWxzZSx0cnVlLGltYWdlLHRoaXMudGlsZVcqMyx0aGlzLnRpbGVIKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0XHR0aGlzLmNvbGxpc2lvbk9iamVjdHMucHVzaCh0KTtcclxuXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHR2YXIgdCA9IG5ldyB0aWxlKHgqdGhpcy50aWxlVyx5KnRoaXMudGlsZUgsdGhpcy50aWxlVyx0aGlzLnRpbGVILGZhbHNlKTtcclxuXHRcdFx0XHRcdHRoaXMubWFwW3ldW3hdPXQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG52YXIgbWFwR3JpZHMgPSB7XHJcblxyXG5cdC8vYXJyYXlzIHJlcHJlc2VudGluZyB0aGUgbGV2ZWwgbGF5b3V0XHJcblx0MTpbXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuXHRcdFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDBdLFxyXG5cdFx0WzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDMsMCwwLDAsMCwxLDIsMl0sXHJcblx0XHRbMiwyLDIsMywwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwxLDIsMiwyLDIsMiwyLDMsMCwwLDQsNiwwLDAsMCwwLDQsNSw1XSxcclxuXHRcdFs1LDUsNSw2LDAsMCwwLDEsMywwLDAsMCwxLDIsMiwyLDMsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsMiwyLDMsMCwwLDQsNSw1LDUsNSw1LDUsNiwwLDAsNCw2LDAsMCwwLDAsNCw1LDVdLFxyXG5cdFx0WzUsNSw1LDYsMCwwLDAsNCw2LDAsMCwwLDQsNSw1LDUsNSwzLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDEsNSw1LDUsNiwwLDAsNCw1LDUsNSw1LDUsNSw2LDAsMCw0LDYsMCwwLDAsMCw0LDUsNV0sXHJcblx0XHRbNSw1LDUsNiwwLDAsMCw0LDYsMCwwLDAsNCw1LDUsNSw1LDUsMiwyLDIsMywwLDAsMSwzLDAsMCwwLDEsMywwLDAsNCw1LDUsNSw2LDAsMCw0LDUsNSw1LDUsNSw1LDYsMCwwLDQsNiwwLDAsMCwwLDQsNSw1XVxyXG5cdF0sXHJcblx0MjpbXSxcclxuXHQzOltdLFxyXG5cdDQ6W10sXHJcblx0NTpbXVxyXG5cclxufVxyXG4vL2xldmVsID0gbmV3IGxldmVsKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGxldmVsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xldmVsdjAyLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImZ1bmN0aW9uIGtleUlucHV0Q29udHJvbGxlcigpe1xyXG5cdHRoaXMuYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldil7XHJcblx0XHRcdHJldHVybiB0aGlzLmtleUhhbmRsZXIoZXYsIGV2LmtleUNvZGUsIHRydWUpOyB9LmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXYpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5rZXlIYW5kbGVyKGV2LCBldi5rZXlDb2RlLCBmYWxzZSk7IH0uYmluZCh0aGlzKSwgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cdC8vb2JqZWN0IHRvIGhvbGQgcHJlc3NlZCBrZXlzXHJcblx0dGhpcy5rZXlEb3duID0ge30sXHJcblxyXG5cdHRoaXMua2V5SGFuZGxlciA9IGZ1bmN0aW9uKGV2LCBrZXksIHByZXNzZWQpe1xyXG5cclxuXHRcdC8vdHJhbnNsYXRpb24gZGljdGlvbmFyeVxyXG5cdFx0dmFyIEtFWSA9IHtcclxuXHRcdFx0MzI6ICdTUEFDRScsXHJcblx0XHRcdDg3OiAnVycsXHJcblx0XHRcdDY4OiAnRCcsXHJcblx0XHRcdDY1OiAnQScsXHJcblx0XHRcdDgzOiAnUydcclxuXHRcdH1cclxuXHJcblx0XHR2YXIga2V5UHJlc3NlZCA9IGV2LmtleUNvZGU7XHJcblx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdC8vdHJhbnNsYXRlIGtleSBjb2RlIHRvIHN0cmluZyB1c2luZyB0cmFuc2xhdGUgZGljdGlvbmFyeVxyXG5cdFx0dmFyIGtleVRyYW5zbGF0ZSA9IEtFWVtrZXlQcmVzc2VkXTtcclxuXHJcblx0XHRpZihwcmVzc2VkKXtcclxuXHRcdFx0dGhpcy5rZXlEb3duW2tleVRyYW5zbGF0ZV0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHByZXNzZWQ9PT1mYWxzZSl7XHJcblx0XHRcdHRoaXMua2V5RG93bltrZXlUcmFuc2xhdGVdID0gZmFsc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbi8vdmFyIGtleXMgPSBuZXcga2V5SW5wdXRDb250cm9sbGVyKCk7XHJcbm1vZHVsZS5leHBvcnRzID0ga2V5SW5wdXRDb250cm9sbGVyO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2tleXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvbGxpc2lvbkNoZWNrZXIgPSByZXF1aXJlKCcuL2NvbGxpc2lvbkNoZWNrZXIuanMnKTtcclxuXHJcbmZ1bmN0aW9uIGNhbWVyYSh4LHksYyxjYW52YXMpe1xyXG5cdHRoaXMueD14LFxyXG5cdHRoaXMueT15LFxyXG5cdHRoaXMud2lkdGg9MTI4MCxcclxuXHR0aGlzLmhlaWdodD03MjAsXHJcblx0XHJcblx0dGhpcy5nYW1lQXJlYSA9IGNhbnZhcztcclxuXHR0aGlzLmNvbGxpc2lvbkNoZWNrZXIgPSBjO1xyXG5cdC8vVXBkYXRlIHRoZSBjYW1lcmFzIHBvc2l0aW9uXHJcblx0dGhpcy51cGRhdGUgPSBmdW5jdGlvbihkdCxmb2N1cyxtYXApe1xyXG5cdFx0XHJcblx0XHR2YXIgbWFwID0gbWFwO1xyXG5cdFx0Ly9mb2N1cyB0aGUgY2FtZXJhIG9uIHRoZSBwbGF5ZXJcclxuXHRcdGlmKGZvY3VzLng+dGhpcy53aWR0aC8yJiZmb2N1cy54PG1hcFswXS5sZW5ndGgqbWFwLnRpbGVILXRoaXMud2lkdGgvMil7XHJcblx0XHRcdHRoaXMueD1mb2N1cy54LXRoaXMud2lkdGgvMjtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoZm9jdXMueTxtYXAubGVuZ3RoKm1hcC50aWxlSCl7XHJcblx0XHRcdHRoaXMueT1mb2N1cy55LXRoaXMuaGVpZ2h0LzM7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL1JlbmRlciB0aGUgZ2FtZSB3aXRoIGxpc3Qgb2Ygb2JqZWN0cyB0byByZW5kZXJcclxuXHR0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKGFycil7XHJcblx0XHRmb3IoaT0wO2k8YXJyLmxlbmd0aDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbT1hcnJbaV07XHJcblx0XHRcdFxyXG5cdFx0XHQvL0NoZWNrIGlmIHRoZSBvYmplY3QgaXMgaW4gdmlld1xyXG5cdFx0XHRpZih0aGlzLmNvbGxpc2lvbkNoZWNrZXIuY2hlY2sodGhpcyxpdGVtKSl7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0dmFyIGN0eCA9IHRoaXMuZ2FtZUFyZWEuY29udGV4dDtcclxuXHRcdFx0XHR2YXIgaW1nID0gaXRlbS5pbWc7XHJcblx0XHRcdFx0dmFyIHN4ID0gaXRlbS5pbWdTcmNYO1xyXG5cdFx0XHRcdHZhciBzeSA9IGl0ZW0uaW1nU3JjWTtcclxuXHRcdFx0XHR2YXIgc3cgPSBpdGVtLmltZ1dpZHRoO1xyXG5cdFx0XHRcdHZhciBzaCA9IGl0ZW0uaW1nSGVpZ2h0O1xyXG5cdFx0XHRcdHZhciBkeCA9IGl0ZW0uaW1nWC10aGlzLng7XHJcblx0XHRcdFx0dmFyIGR5ID0gaXRlbS5pbWdZLXRoaXMueTtcclxuXHRcdFx0XHR2YXIgZHcgPSBpdGVtLmltZ1dpZHRoO1xyXG5cdFx0XHRcdHZhciBkaCA9IGl0ZW0uaW1nSGVpZ2h0O1xyXG5cclxuXHRcdFx0XHQvL2RyYXcgdG8gdGhlIGNhbnZhc1xyXG5cdFx0XHRcdGN0eC5kcmF3SW1hZ2UoaW1nLHN4LHN5LHN3LHNoLGR4LGR5LGR3LGRoKTtcclxuXHRcdFx0XHQvL2N0eC5maWxsU3R5bGUgPSBpdGVtLmNvbDtcclxuXHRcdFx0XHQvL2N0eC5maWxsUmVjdChpdGVtLngtdGhpcy54LCBpdGVtLnktdGhpcy55LCBpdGVtLndpZHRoLCBpdGVtLmhlaWdodCk7XHJcblx0XHRcdFx0Ly8gaWYoaXRlbS5pbWcpe2N0eC5kcmF3SW1hZ2UoaW1nLHN4LHN5LHN3LHNoLGR4LGR5LGR3LGRoKTt9XHJcblx0XHRcdFx0Ly8gZWxzZXtjb25zb2xlLmxvZygnbm8gaW1nJyk7fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gY2FtZXJhO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NhbWVyYS5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuZnVuY3Rpb24gZ2FtZUFyZWEoKXtcclxuXHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLFxyXG5cdHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMudGlsZVcgPSA2NDtcclxuXHRcdHRoaXMudGlsZUggPSA2NDtcclxuXHRcdHRoaXMuY2FudmFzLndpZHRoID0gMTI4MDtcclxuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IDcyMDtcclxuXHRcdHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0XHQvL3ZhciBnYW1lQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lJyk7XHJcblx0XHR2YXIgbW9jaHRtbCA9IFwiPGRpdj48aDE+aGk8L2gxPjwvZGl2PlwiXHJcblx0XHRkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLmNhbnZhcywgZG9jdW1lbnQuYm9keS5jaGlsZE5vZGVzWzBdKTtcclxuXHR9LFxyXG5cclxuXHR0aGlzLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHRcdHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGdhbWVBcmVhO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NhbnZhcy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9