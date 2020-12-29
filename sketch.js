var fruit, fruitGroup;
var sword,swordImage;
var orange,orangeImage;
var apple,appleImage;
var watermelon,watermelonImage;
var banana,bananaImage;
var monster,enemyImage,enemyGroup;
var gameOver,gameOverImage; 
var score;
var PLAY=1;
var END =0;
var gameState=PLAY;

var cutSound,gameOverSound;

function preload(){
  swordImage=loadImage("sword.png");
  orangeImage=loadImage("fruit1.png");
  appleImage=loadImage("fruit2.png");
  pearImage=loadImage("fruit3.png");
  bananaImage=loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png")
  enemyImage=loadAnimation("alien1.png","alien2.png");

  cutSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);   
  sword= createSprite(40,200,20,20);
  sword.addImage("sword",swordImage);
  sword.scale=0.7;

  gameOver=createSprite(250,300);
  gameOver.addImage("gameover",gameOverImage);  
   score=0;

  
  fruitGroup =createGroup();
  enemyGroup=createGroup();

}




function draw() {
background("skyblue");
 
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  
  if(gameState === PLAY){
    
    gameOver.visible=false;
  
   if(sword.isTouching(fruitGroup)){
      fruitGroup.destroyEach();
      score=score+4;
      cutSound.play();
    }
    if(sword.isTouching(enemyGroup)){
      enemyGroup.destroyEach();
      gameState=END;
      gameOverSound.play();
    }

      Enemy();
      fruits();
    
  } 
   if(gameState === END){
                              
      gameOver.visible=true;    
      sword.addImage(gameOverImage);
      sword.x=200;
      sword.y=200;   
     
     fruitGroup.setLifetimeEach(-1);
     
     fruitGroup.setVelocityEach(0);     

    fruitGroup.visible=false;
   }

  
  drawSprites();
  textSize(20);
  text("Score : "+score,450,100);  
}



function fruits(){
  if(World.frameCount % 80 === 0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.3;
    var r=Math.round(random(1,4))
    if(r==1){
      fruit.addImage("apple",appleImage);
    }
    else if(r == 2){
      fruit.addImage("pear",pearImage);
    }
    else if(r == 3){
      fruit.addImage("orange",orangeImage);
    }
    else if(r == 4){
      fruit.addImage("banana",bananaImage);
    }
    
    fruit.y=Math.round(random(50,340));
    
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    fruitGroup.add(fruit);
    
        
     var position=Math.round(random(1,2));
    
    if(position==1){
      fruit.x=400;
  
      fruit.velocityX=-(7+score/2);
    }
    
    else if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+score/2);
    }
    
    
  }
}


function Enemy(){
  if(World.frameCount % 250 === 0){      
  monster = createSprite(400,200,20,20)
  monster.addAnimation("moving",enemyImage);
  monster.scale=0.7;
  monster.velocityX=-(5+score/10);
  monster.y=Math.round(random(100,300));
  monster.setLifetime=50;
  enemyGroup.add(monster);
  }
} 