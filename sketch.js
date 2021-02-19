
var monkey , monkey_running;
var backGround,backGroundImage;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var survivalTime = 0;
var score = 0;
var count = 0;
var gameState = "play";

function preload(){
  
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  
  backGroundImage = loadImage("jungle.jpg");
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(80,365,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=(0.1);
 // monkey.debug = true;
  
  backGround = createSprite(300,300);
  backGround.addImage("background",backGroundImage);
// backGround.scale =(0.65);
  backGround.velocityX = -3;
  
  ground = createSprite(225,500,1000,10);
  ground.visible= false;
  
  score = 0;
  
  FoodGroup =createGroup();
  obstaclesGroup =createGroup();
}


function draw() {
background(backGroundImage);
  //monkey.debug = (true);
  
  if (gameState === "play"){
 if(backGround.x > 300){  
    backGround.x = 200 ;
  }
    
    
    if (ground.x < 0){
        ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY = -10;
   
  }
  
   monkey.velocityY = monkey.velocityY + 0.8;
  
   if (backGround.x < 0)
      {
        backGround.x = backGround.width/4 ;
      }
    
    if (backGround.x >600)
   {
     backGround.x = backGround.width/2; 
   }
      
  
  
   if(FoodGroup.isTouching(monkey)){
    score = score+1;
    FoodGroup.destroyEach();
    monkey.scale = monkey.scale+ 0.02;
  }
 
  
  if(obstaclesGroup.isTouching(monkey)){
   /*monkey.scale = 0.09;
    count = count + 1;
    obstaclesGroup.destroyEach();
  }  
      switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
      default: break;*/

      gameState = "end";
  }
   food();
   obstacles();
survivalTime = survivalTime+Math.round(getFrameRate()/62);
   monkey.velocityY = monkey.velocityY + 1;
    
    
  }
  
  if (gameState === "end"){
   monkey.visible = false;
   backGround.visible = false;
    survivalTime=0;
    score = 0;
   FoodGroup.setLifetimeEach(0);
   obstaclesGroup.setLifetimeEach(0);
   fill("yellow");
   stroke("yellow");
   textSize(40);
   text("GAME OVER",200,305);
  
  }
  
  //food();
  //obstacles();
  
  drawSprites();
   stroke("white");
  textSize(20);
  fill("black");
  text("score:" + score,70,100);
  
   stroke("black");
  textSize(20);
  fill("white");
  text("Survival Time:" + survivalTime,300,100);
  survivalTime = Math.ceil(frameCount/getFrameRate());
}

function food(){
 if(frameCount % 80 === 0)
 {
  var banana = createSprite(); 
   banana.x = Math.round(random(90,400));
   banana.velocityX = - 3
   banana.y = Math.round(random(120,200)); 
   banana.addImage("banana",bananaImage);
   banana.scale = (0.06);
   banana.lifetime = 300; 
   //banana.debug=(true);
 
   FoodGroup.add(banana);
   monkey.depth = banana.depth + 1;
 } 
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,480,10,40);
   obstacle.velocityX = -(6 + score/100);
   obstacle.addImage("obstacles",obstacleImage)
   obstacle.scale = (0.2);
   obstacle.lifetime = 200;
   
   obstaclesGroup.add(obstacle);
   //obstacle.debug = true;
   obstacle.setCollider("rectangle",0,0,300,200)
   
 }
   
}