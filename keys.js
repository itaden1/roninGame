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
			13: 'ENTER',
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
