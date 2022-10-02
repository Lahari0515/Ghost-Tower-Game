var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200, 200, 30, 30);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.25;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw() {
  background("blue");
  
  if(gameState === "play"){
    
    if(tower.y > 400){
      tower.y = 300;
    }

    if(keyDown("space")){
      ghost.velocityY = -10;
    }

    if(keyDown("right_arrow")){
      ghost.x =  ghost.x + 2;
    }

    if(keyDown("left_arrow")){
      ghost.x =  ghost.x - 2;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    spawnDoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(ghost.y > 600 || invisibleBlockGroup.isTouching(ghost)){
      gameState = "end";
    }

    drawSprites();

  } else if(gameState === "end"){
    textSize(30);
    //strokeWeight(30);
    stroke("pink");
    fill("yellow");
    text("Game Over!!!!",200,300);

  }
  
}

function spawnDoors(){
  //create a door, climber and invisibleBlock sprite ; add them to respective groups

  if(frameCount % 240 === 0){
    
    door = createSprite(200, -50);
    door.addImage(doorImg);
  
    climber = createSprite(200,10);
    climber.addImage(climberImg);
  
    invisibleBlock = createSprite(200,15, climber.width, 2);
    invisibleBlock.visible = false;
  
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;

    //make the depth of ghost 1 more than the door
    ghost.depth = door.depth +1;

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }

}
