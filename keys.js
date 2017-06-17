
function keyInputController(){
  this.keyDown = {},

  this.keyHandler = function(ev, key, pressed){
          var KEY = {
            32: 'SPACE',
            87: 'W',
            68: 'D',
            65: 'A',
            83: 'S'
          }
          var keyPressed = ev.keyCode;
          ev.preventDefault();
          var keyTranslate = KEY[keyPressed];
          if(pressed){

            this.keyDown[keyTranslate] = true;
          }

          if(pressed===false){
            this.keyDown[keyTranslate] = false;

    }

  }

}
