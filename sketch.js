var SET = 0,
  PLAY  = 1,
  END   = 2;
var gameState = SET;

var bk, bkk;

var alien, alienR;

var invisibleG;

var info, infobk;

var devil, devilbk, devilGroup;

var skull, skullbk, skullGroup;

var coin, coinbk, coinGroup;

var coin2, coinbk2, coinGroup2;

var diamond, diamondbk, diamondGroup;


var pack, packItem     = 0,
  packbk;

var pack2, packItem2   = 0,
  packbk2;

var pack3, packItem3   = 0,
  packbk3;

var pack4, packItem4   = 0,
packbk4;

var score              = 0;

var hold;

var jump, jumpbk;


function preload() {

  bkk       = loadImage("wp5317006.jpg");

  alienR    = loadImage("alien 2.png");

  infobk    = loadImage("info.png");

  devilbk   = loadImage("devil.png");

  skullbk   = loadImage("skull.png");

  coinbk    = loadImage("coin.png");

  coinbk2   = loadImage("silver.png");

  coinbk3   = loadImage("bronze.png");

  diamondbk = loadImage("diamond.png");

  packbk    = loadImage("coin.png");

  packbk2   = loadImage("silver.png");
  
  packbk3   = loadImage("bronze.png");

  packbk4   = loadImage("diamond.png");

  jumpbk    = loadImage("jump button.png");



}

function setup() {

  createCanvas(windowWidth, 700);
  background("black");

  bk                 = createSprite(200, 200, 400, 400);
  bk.addImage(bkk);
  //bk.scale = 0.75;
  //bk.velocityX = -5;

  info               = createSprite(35, 35, 10, 10);
  info.addImage(infobk);
  info.scale = 0.07

  alien              = createSprite(50, 310, 50, 50);
  alien.addImage(alienR);
  alien.setCollider("rectangle", 0, 0, 65, 85, 0)

  //alien.debug = true

  invisibleG         = createSprite(60, 350, 100, 10);
  invisibleG.visible = false;

  jump               = createSprite(50, height/2 + 150, 30, 30);
  jump.addImage(jumpbk);
  jump.scale         = 0.15;
  //jump.debug = true;

  coinGroup       = createGroup();

  coinGroup2      = createGroup();

  coinGroup3      = createGroup();

  devilGroup      = createGroup();

  skullGroup      = createGroup();

  diamondGroup    = createGroup();

  pack            = createSprite(info.x + 40, info.y, 20, 20);
  pack.addImage(packbk);
  pack.scale      = 0.25

  pack2           = createSprite(info.x + 125, info.y, 20, 20);
  pack2.addImage(packbk2);
  pack2.scale     = 0.25
  
  pack3           = createSprite(info.x + 205, info.y, 20, 20);
  pack3.addImage(packbk3);
  pack3.scale     = 0.25

  pack4           = createSprite(info.x + 295, info.y, 20, 20);
  pack4.addImage(packbk4);
  pack4.scale     = 0.25
    
  hold            = createSprite(width/2, 60,width,5);
  hold.shapeColor = rgb(253, 96, 0);




}

function draw() {

  drawSprites();
  
  text("Score: " + score, width - 200, 35, fill("white"),textSize(20));

  alien.collide(invisibleG);
  
  //alien.bounceOff(hold);


  if (mouseIsOver(info)) {
    
    text("press the jump buttion to jump", 10, 55, fill("white"),textSize(17.5));

    text("from the devil and the skull and obtain", 10, 70, fill("white"),textSize(17.5));

    text("the gold, silver and bronze coins and the diamond to boost your power packs. if you go to the devil", 10, 85, fill("white"),textSize(17.5));

    text("your score and the power packs will become zero but", 10, 100, fill("white"),textSize(17.5));

    text("if you go to the skull,", 10, 115, fill("white"),textSize(17.5));

    text("you are dead.", 10, 130, fill("red"),textSize(17.5));
    
    text("As you go high, try not to touch the red line which would", 10, 145, fill("white"),textSize(17.5));
  
    text("kill u off.", 10, 160, fill("white"),textSize(17.5));
  }

  text("you", alien.x + 35, alien.y - 40, fill("white"), textSize(20));

  text("= " + packItem, pack.x + 20, pack.y + 5);

  text("= " + packItem2, pack2.x + 20, pack2.y + 5);

  text("= " + packItem3, pack3.x + 20, pack3.y + 5);

  text("= " + packItem4, pack4.x + 20, pack4.y + 5);


  if (gameState === SET) {
    packItem     = 0;
    bk.velocityX = 0;

    text("click on the alien to start", width/2 - 150, 100, fill("white"),textSize(25))

    if (mousePressedOver(alien)) {
      gameState = PLAY;
      
    }


  }

  if (gameState === PLAY) {
    
    score = score + Math.round(setFrameRate() / 60);
    
    bk.velocityX = -(8 + 3 * score / 100);

    if (bk.x < 0) {
      bk.x = bk.width / 2;
    }

    if (mousePressedOver(jump) && alien.y >= 120) {
      alien.velocityY = -13;
    }

    alien.velocityY = alien.velocityY + 0.8

    evil1();

    evil2();

    goldCoin();

    silverCoin();

    bronzeCoin();

    Diamond();

    if (coinGroup.isTouching(alien)) {
      packItem  = packItem + 1
    }

    if (coinGroup2.isTouching(alien)) {
      packItem2 = packItem2 + 1
    }

    if (coinGroup3.isTouching(alien)) {
      packItem3 = packItem3 + 1
    }

    if (diamondGroup.isTouching(alien)) {
      packItem4 = packItem4 + 1
    }


    if(skullGroup.isTouching(alien)){
      gameState       = END;
      alien.velocityY = 0;
    }
    
    if(devilGroup.isTouching(alien)){
      score     = 0;
      packItem  = 0;
      packItem2 = 0;
      packItem3 = 0;
      packItem4 = 0;

    }
    
    if(alien.isTouching(hold)){
      gameState       = END;
      alien.velocityY = 0;
    }

  }

  if (gameState === END){
    bk.velocityX = 0;
    
    devilGroup.setVelocityXEach(0);
    devilGroup.destroyEach();
    
    skullGroup.setVelocityXEach(0);
    skullGroup.destroyEach();
    
    coinGroup.setVelocityXEach(0);
    coinGroup.destroyEach();

    coinGroup2.setVelocityXEach(0);
    coinGroup2.destroyEach();

    coinGroup3.setVelocityXEach(0);
    coinGroup3.destroyEach();

    diamondGroup.setVelocityXEach(0);
    diamondGroup.destroyEach();
    
    devilGroup.setLifetimeEach(-1);
    skullGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
    coinGroup2.setLifetimeEach(-1);
    coinGroup3.setLifetimeEach(-1);
    diamondGroup.setLifetimeEach(-1);

    
    text("click on the alien to restart",width/2 - 150,200, textSize(30));
    
    if (mousePressedOver(alien)){
      replay();
    }
  }
  
}

function evil1() {

  if (frameCount % 230 === 0) {
    devil = createSprite(width, 310, 20, 20);
    devil.addImage(devilbk);
    devil.scale = 0.21;
    devil.velocityX = -(8 + 3 * score / 100);
    
    devil.setCollider("rectangle",0,0,350,350,0);

    
    devil.lifetime = width/-(8 + 3 * score / 100);
    
    devilGroup.add(devil);
    

  }
}

function evil2() {

  if (frameCount % 100 === 0) {
    skull = createSprite(width, 310, 20, 20);
    skull.addImage(skullbk);
    skull.scale = 0.21;
    skull.velocityX = -(8 + 3 * score / 100);
    
    skull.setCollider("circle",0,0,125);
    
    skull.lifetime = width/-(8 + 3 * score / 100);
    
    skullGroup.add(skull);

  }
}

function goldCoin() {

  if (frameCount % 210 === 0) {
    coin = createSprite(width, 215, 20, 20);
    coin.addImage(coinbk);
    coin.scale = 0.75;
    coin.velocityX = -(8 + 3 * score / 100);

    coin.setCollider("circle", 0, 0, 40);

    coin.lifeItem = width/-(8 + 3 * score / 100);
    
    coinGroup.add(coin);
  }

}

function silverCoin() {

  if (frameCount % 80 === 0) {
    coin2 = createSprite(width, 215, 20, 20);
    coin2.addImage(coinbk2);
    coin2.scale = 0.75;
    coin2.velocityX = -(8 + 3 * score / 100);

    coin2.setCollider("circle", 0, 0, 40);

    coin2.lifeItem = width/-(8 + 3 * score / 100);
    
    coinGroup2.add(coin2);
  }

}

function bronzeCoin() {

  if (frameCount % 50 === 0) {
    coin3 = createSprite(width, 215, 20, 20);
    coin3.addImage(coinbk3);
    coin3.scale = 0.75;
    coin3.velocityX = -(8 + 3 * score / 100);

    coin3.setCollider("circle", 0, 0, 40);

    coin3.lifeItem = width/-(8 + 3 * score / 100);
    
    coinGroup3.add(coin3);
  }

}

function Diamond() {

  if (frameCount % 275 === 0) {
    diamond = createSprite(width, 110, 20, 20);
    diamond.addImage(diamondbk);
    diamond.scale = 0.75;
    diamond.velocityX = -(8 + 3 * score / 100);

    diamond.setCollider("circle", 0, 0, 40);

    diamond.lifeItem = width/-(8 + 3 * score / 100);
    
    diamondGroup.add(diamond);
  }

}


function replay (){
  
  gameState = PLAY;
  
  packItem  = 0;

  packItem2 = 0;

  packItem3 = 0;

  packItem4 = 0;
  
  score     = 0;
  
  alien.y   = 300;
  
}
