var PLAY=1;
var END=0;
var gamestate=PLAY;
var monkey , monkey_running,lostmonkeyimg
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survival=0;
var monkeys=[monkey]
function preload(){
  
  lostmonkeyimg=loadAnimation("sprite_7.png")
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving", monkey_running);
  monkey.velocityX=0
  monkey.velocityY=0
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  survival=0
}


function draw() {
background(200)
 if (gamestate===PLAY){
 stroke("black");
  textSize(20);
  fill("black");
  camera.position.x = monkey.x;
  camera.position.y =monkey.y
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);



     if(ground.x<0){
  ground.x=ground.width/2
  }


  if(keyDown("left")){
    monkey.x=monkey.x+10
    }
  
  if(keyDown("space")){
  monkey.velocityY=-12
  }


  
  
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  spawnFood();
  spawnObstacles();
   if(obstacleGroup.isTouching(monkey)){
  gamestate=END
  }
 }  
 else if(gamestate===END){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        monkey.addImage(lostmonkeyimg)
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
    
 
 }
  
 
  
  
  drawSprites();
   
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale=0.05;
    foodGroup.add(banana);
  }
}




