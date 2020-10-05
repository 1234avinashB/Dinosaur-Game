var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0
var gameState = PLAY
var cloud, cloudsGroup, cloudImage;
var score = 0;
var obstacleGrp, cloudGrp;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, reset;
var gameOverImg, resetImg;
var jumpMP3, dieMP3, checkPointMP3;


var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
  resetImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  
  jumpMP3 = loadSound("jump.mp3");
  dieMP3 = loadSound("die.mp3");
  checkPointMP3  = loadSound("checkPoint.mp3");
 
}

function setup() {
  createCanvas(600, 200);
  // creating trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  // creating ground
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(7+4*(score/100));
  
  // creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  // creating reset 
  reset = createSprite(300,100,10,10);
  reset.addImage(resetImg);
  reset.scale = 0.5
  
  // creating game over
  gameOver = createSprite(300,75,101,0);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5
  //console.log("Hello"+ 5)
  
  //creating groups
  obstacleGrp = new Group();
  cloudGrp = new Group();
  
  //creating new boundaries
  //trex.debug = true;
  trex.setCollider("circle",0,0,40);
  
}


function draw() {
background("lightgreen");
  
  //console.log(trex.y)

  
  trex.collide(invisibleGround);
  
  
  //game states
  if(gameState===PLAY){
    // game over and reset 
    reset.visible = false;
    gameOver.visible = false;
    //spawn the clouds
  spawnClouds();
  //spawning the obstacles
  spawnObstacles();
  //calculating the score
  score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")&& trex.y >= 161) {
    trex.velocityY = -12;
    jumpMP3.play();    
  }
  trex.velocityY = trex.velocityY + 0.8
  ground.velocityX = -(7+4*(score/100));
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
   if(obstacleGrp.isTouching(trex)){
   gameState = END;
    dieMP3.play();
     /*trex.velocityY = -12;
     jumpMP3.play();*/
   }
    if(score%500 === 0 && score>0){
       checkPointMP3.play();
       }
  }else if(gameState===END){
    // game over and reset 
    reset.visible = true;
    gameOver.visible = true;
    ground.velocityX = 0;
    obstacleGrp.setVelocityXEach(0);
    cloudGrp.setVelocityXEach(0);
    obstacleGrp.setLifetimeEach(-1);
    cloudGrp.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided);
    trex.velocityY = 0;
     if(mousePressedOver(reset)||keyDown("space")){
    restart();
  }
  }
 
  // showing the score
  fill("red")
  text("Score:" + score, 500, 30 );
  //console.log(getFrameRate());
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudGrp.add(cloud);
    }
}

function spawnObstacles(){
//spawning the obstacles
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,163,10,10);
    obstacle.scale = 0.5; 
    //obstacle velocity
    obstacle.velocityX = -(7+4*(score/100));
    //obstacle lifetime
    obstacle.lifetime =  150;
    var idontknow = Math.round(random(1,6));
    switch(idontknow){
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle4);
        break;
      case 5: obstacle.addImage(obstacle5);
        break;
       case 6: obstacle.addImage(obstacle6);
        break; 
        default: break;
        
    }
   obstacleGrp.add(obstacle);
    //obstacle.debug = true;
  }
}
function restart(){
  gameState = PLAY;
  obstacleGrp.destroyEach();
  cloudGrp.destroyEach();
  score = 0;
  trex.changeAnimation("running",trex_running);
}


