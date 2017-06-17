
function level(level){
  this.tileW = 64;
  this.tileH = 64;
  this.maps ={
    1:[
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,6,6],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,7,7,0,0,9,0,1,4,4],
      [0,0,0,0,0,0,0,0,0,0,7,7,7,8,8,8,8,2,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,7,0,9,0,9,3,6,6],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,2],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,6,6],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,9,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,8,8,1,4,4],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,2,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,6],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,4,4],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,5,5],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,6,6],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,1]
    ]

  }
  this.map = this.maps[level];
  this.populateMap = function(){
    for(x=0;x<this.map.length;x++){
      for(y=0;y<this.map[x].length;y++){
        if(this.map[x][y]===1){
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,tiles,0,0);
          this.map[x][y]=t;
          collisionObjects.push(t);
        }
        else if(this.map[x][y]===2){
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,tiles,this.tileW,0);
          this.map[x][y]=t;
          collisionObjects.push(t);
        }
        else if(this.map[x][y]===3){
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,tiles,this.tileW*2,0);
          this.map[x][y]=t;
          collisionObjects.push(t);
        }
        else if(this.map[x][y]===4){
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,tiles,0,this.tileH);
          this.map[x][y]=t;
          collisionObjects.push(t);
        }
        else if(this.map[x][y]===5){
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,tiles,this.tileW,this.tileH);
          this.map[x][y]=t;
          collisionObjects.push(t);
        }
        else if(this.map[x][y]===6){
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,true,false,tiles,this.tileW*2,this.tileH);
          this.map[x][y]=t;
          collisionObjects.push(t);
        }
        else if(this.map[x][y]===7){
            var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,tiles,this.tileW*3,0);
            this.map[x][y]=t;
            collisionObjects.push(t);
        }
        else if(this.map[x][y]===8){
            var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,false,tiles,this.tileW*3,this.tileH*2);
            this.map[x][y]=t;
            collisionObjects.push(t);
        }
        else if(this.map[x][y]===9){
            var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false,true,tiles,this.tileW*3,this.tileH);
            this.map[x][y]=t;
            collisionObjects.push(t);

        }else{
          var t = new tile(x*this.tileW,y*this.tileH,this.tileW,this.tileH,false);
          this.map[x][y]=t;
        }
      }
    }
  }
}
