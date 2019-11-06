 
 

 

 
 
 

 


 
 //************* игра*********************
 var gameWrapper = document.createElement('div');
 body.appendChild(gameWrapper);
 var canvas = document.createElement('canvas');
 gameWrapper.appendChild(canvas);
 var ctx = canvas.getContext('2d');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 
 var attckSound = new Audio('sound/attack.mp3');
 var soundOfPunch = new Audio('sound/punch.mp3');
 var fireBallSound = new Audio('sound/fireBall.mp3');
 var loseHealthSound = new Audio('sound/loseHealthSound.mp3');
 var jumpSound = new Audio('sound/jumpSound.mp3');
 var soundTrack = new Audio('sound/Massive Attack feat Mos Def- I Against I.mp3')
 soundOfPunch.volume = 0.5
 soundTrack.volume = 0.5;
 var fon = {x:0};
 var timer = 0;
 var ment= {viewX:0,
             posX: fon.x+ 50,
             posY:600};
 var  copHealth= 0;
 var womanCathCounter = 0;
 var timeCount = 60;
 var womanWalk = [];
 var womanRun = [];
 var womanIdle = {viewX:0, posX:11450 };
 var potatoes = [];
 var fireBall = [];
 var isMentMove = false;
 var isAttack = false;
 var isJump = false;
 var isPaused = false;
 var isAttackAnim = false;
 var isJumpAnim = false;
 var isMentMove = false;
 var isSoundOff = false;
 var topResults = [];
 var topPlayers = [];
 
 var fonimg =  new Image();
 fonimg.src = 'img/city.png';
 
 var copGo =  new Image();
 copGo.src = 'img/ment1.png';
 
 var womanGo =  new Image();
 womanGo.src = 'img/Woman_Walk__left.png';
 
 var womanIdleAttack =  new Image();
 womanIdleAttack.src = 'img/woman_idle__left.png';
 
 var womanFast =  new Image();
 womanFast.src = 'img/woman_run__left.png';
 
 var potatoesFree =  new Image();
 potatoesFree.src = 'img/free.png';
 
 var fire =  new Image();
 fire.src = 'img/fire-ball.png';
 
 
 document.addEventListener('keydown',  function(event){
     if(event.keyCode == '39') isMentMove = true;
     if(event.keyCode == '32') isAttack = true;
     if(event.keyCode == '38') isJump = true;
     if(event.keyCode == '80') togglePause();
     if(event.keyCode == '83') toggleSound();
 
     if(event.keyCode == '27') {
         startMenuWrapper.style.cssText = `overflow:hidden;
                                             margin:0; 
                                             background:url('img/fon.jpg') no-repeat center top;
                                             background-size:cover; 
                                             height:100vh;
                                             width: 100vw;`;
     resetVaiables();
     if(isSoundOff == false )soundTrack.pause();
     if(isPaused == false)togglePause();
     };
 });
 
 document.addEventListener('keyup',  function(event){
     if(event.keyCode == '39') isMentMove = false;
     if(event.keyCode == '32') isAttack = false;
     if(event.keyCode == '38') isJump = false;
 }); 
 
 
 /* document.addEventListener('keydown', function(event){
    if(event.keyCode == '32'){attack()}
     });
 
 document.addEventListener('keydown', function(event){
         if(event.keyCode == '38'){jump()}
     }); */
 
 
 function resize(){
     canvas.width  = window.innerWidth;
     canvas.height = window.innerHeight;
 };
 
 function mentMove(){
     if(isAttackAnim) return;
 
     if(timer%3==0){ment.viewX += 35;
         if (ment.viewX >= 140) ment.viewX = 0;}
         fon.x -=4;
         if(fonimg.width*2 + fon.x- window.innerWidth <=0){fon.x +=4;ment.posX+=4}
         console.log(fonimg.width*2);
 };
 
 function attack(){
     if(isAttackAnim || isJumpAnim)  return;
     isAttackAnim = true;
     if(isSoundOff== false)attckSound.play();
     let  att = setInterval(() => {
        if(ment.viewX >= 350){ment.viewX = 140};
        if (ment.viewX <= 140) {ment.viewX =140};
        ment.viewX += 35;
        setTimeout(() => { clearInterval(att); isAttackAnim = false; ment.viewX = 140 }, 210);
     }, 30);
 };
 
 function jump(){
     if(isAttackAnim || isJumpAnim) return;
     isJumpAnim = true;
     if(isSoundOff== false)jumpSound.play();
     let up = setInterval(() => {
         ment.posY-=10;
         if(ment.posY<=400){
             let down = setInterval(()=> {
                 if(ment.posY==600){ment.posY=600}
                 else ment.posY+=10;
             setTimeout(() => {clearInterval(up);}, 100);
             setTimeout(() => {clearInterval(down); isJumpAnim = false;}, 220);
             },20);
         };
     }, 30);
 };
 
 function togglePause(){
     if (!isPaused) isPaused = true;
     else if (isPaused) isPaused= false;
 };
 function toggleSound(){
     if (!isSoundOff) isSoundOff = true;
     else if (isSoundOff) isSoundOff= false;
 };
 
 let resetVaiables = function(){
     fon = {x:0};
         timer = 0;
         ment= {viewX:0,
                     posX: fon.x+ 50,
                     posY:600};
         copHealth= 0;
         womanCathCounter = 0;
         timeCount = 60;
         womanWalk = [];
         womanRun = [];
         womanIdle = {viewX:0, posX:11450 };
         potatoes = [];
         fireBall = [];
         isMentMove = false;
         isAttack = false;
         isJump = false;
         isPaused = false;
         isAttackAnim = false;
         isJumpAnim = false;
         isMentMove = false;
         isSoundOff = false;
 };
 
     function game(){
     resize();
     if(isPaused == false)update();
     render();
     requestAnimationFrame(game);
     };
 
 //********** Функция обновляющаю значения *****
 function update(){
     timer++;
 
     if(isMentMove) mentMove();
     if(isAttack) attack();
     if(isJump) jump();
     if(isSoundOff)soundTrack.pause();
     if(!isSoundOff) soundTrack.play();
 
     // простой  таймер игры
     if(timer%60==0)timeCount --;
 
     // диапозон рандомных чисел
     function getRandom(min, max){
     return Math.floor(Math.random() * (max - min + 1)) + min;
     };
 
     // таймер вывода идущих женщин
     if((timer)%(getRandom(200, 300))== 0){womanWalk.push({viewX:22, posX:canvas.width - fon.x})};
 
     // рассчёт отображения идущих женщин
     for(i in womanWalk){
         if (womanWalk[i].viewX<=0) womanWalk[i].viewX = 110;
         if(timer%10 == 0){
             womanWalk[i].viewX+=-22;
         };
         womanWalk[i].posX -= 1;
 
     // взаимодействие идущих женщин с сотрудником или выход за границу канвас
         if((womanWalk[i].posX + fon.x <= ment.posX+80) && (womanWalk[i].posX + fon.x>=ment.posX) && (ment.viewX>=210)){
             if(isSoundOff== false)soundOfPunch.play();
             womanCathCounter+=10;
             womanWalk.splice(i, 1);
         } else if((womanWalk[i].posX + fon.x <= ment.posX+40)&& (womanWalk[i].posX + fon.x>=ment.posX) && (ment.posY >= 550)){
             if(isSoundOff== false)loseHealthSound.play();
             copHealth+=(canvas.width/4)/10;
             womanWalk.splice(i, 1);
         }else if(womanWalk[i].posX + fon.x <=-22){
             womanWalk.splice(i, 1);
         } 
     };
 
     // таймер вывода бегущих женщин
     if((timer)%(getRandom(250, 350))== 0){womanRun.push({viewX:22, posX:canvas.width - fon.x})};
     // рассчёт отображения бегущих женщин
     for(i in womanRun){
         if (womanRun[i].viewX<=0) womanRun[i].viewX = 110;
         if(timer%5 == 0){
             womanRun[i].viewX+=-22;
         };
         womanRun[i].posX -= 2.5;
 
     // взаимодействие бегущих женщин с сотрудником или выход за границу канвас
     if((womanRun[i].posX + fon.x <= ment.posX+80) && (womanRun[i].posX + fon.x>=ment.posX) && (ment.viewX>=210)){
         if(isSoundOff== false)soundOfPunch.play();
         womanCathCounter+=30;
         womanRun.splice(i, 1);
         } else if((womanRun[i].posX + fon.x <= ment.posX+40)&& (womanRun[i].posX + fon.x>=ment.posX) && (ment.posY >= 550)){
             if(isSoundOff== false)loseHealthSound.play();
             copHealth+=(canvas.width/4)/10;
             womanRun.splice(i, 1);
         }else if(womanRun[i].posX + fon.x <=-22){
             womanRun .splice(i, 1);
         } 
     };
 
 
     // отображение атакующей женщины
     if(womanIdle.viewX <= 0) womanIdle.viewX = 176;
     if(timer%10 == 0){womanIdle.viewX +=-22; };
 
     //взаимодействие с атакующей женщиной
     if((womanIdle.posX + fon.x <= ment.posX+80) && (womanIdle.posX + fon.x>=ment.posX) && (ment.viewX>=245)){
         if(isSoundOff== false)soundOfPunch.play();
             womanCathCounter+=1000;
             womanIdle = {};
     };
     // полёт картохи
     if(timer%200== 0){potatoes.push({posX: womanIdle.posX - 15})};
 
     for(i in potatoes){
         potatoes[i].posX -= 2 ;
         if((potatoes[i].posX <= ment.posX + 10 -fon.x) && (potatoes[i].posX >= ment.posX-fon.x ) && (ment.posY >=550)){
             if(isSoundOff== false)fireBallSound.play();
             fireBall.push({viewX:0, viewY:0, posX:ment.posX});
             copHealth +=(canvas.width/4)/10;
             potatoes.splice(i, 1)}
             
        else if((potatoes[i].posX <= ment.posX +fon.x)) {potatoes.splice(i, 1)};
 
     };
 
     //взрыв
     fireBall.push({posX:ment.posX, })
     for(i in fireBall){
         fireBall[i].viewX +=100;
         if(fireBall[i].viewX == 900) {fireBall[i].viewY+=100; fireBall[i].viewX = 0;}
         if(fireBall[i].viewY >=900) fireBall.splice(i,1);
     };
 
     // условия остановки игры и записи результата
     if((timeCount == 0) || (ment.posX - window.innerWidth >=0)|| ((canvas.width/4) - copHealth <= 0) ){
         togglePause();
         if(isSoundOff == false)soundTrack.pause();
 
         localStorage.setItem(prompt('Введите ваше имя'), womanCathCounter);
         resetVaiables();
     };
 };
 
 
 //************* функция отрисовки игры **********
 function render(){
     ctx.drawImage(fonimg, 0, 0, fonimg.width, fonimg.height, fon.x, 0,fonimg.width*2, canvas.height);
     ctx.drawImage(copGo, ment.viewX, 0, 35, 32, ment.posX, ment.posY, 100, 108);
     for(i in womanWalk){
     ctx.drawImage(womanGo, womanWalk[i].viewX, 0, 22, 33, womanWalk[i].posX + fon.x, 610, 60, 100 );
     };
     for(i in womanRun) {
     ctx.drawImage(womanFast, womanRun[i].viewX, 0, 22, 33,womanRun[i].posX + fon.x, 610, 60, 100 );
     };
 
     ctx.drawImage(womanIdleAttack, womanIdle.viewX, 0, 22, 33, womanIdle.posX +fon.x, 610, 60, 100);
 
     for(i in potatoes){
         ctx.drawImage(potatoesFree, 0, 0, 500, 669,  potatoes[i].posX + fon.x , 630, 40, 50);
     };
     for(i in fireBall){
         ctx.drawImage(fire, fireBall[i].viewX, fireBall[i].viewY, 100, 100, ment.posX, 600, 100, 100);  
     };
       
     // health view
     ctx.fillStyle = 'red'
     ctx.shadowColor = "black";
     ctx.shadowOffsetX = 1;
     ctx.shadowOffsetY = 1;
     ctx.shadowBlur = 4;
     ctx.fillRect(20, 30, (canvas.width/4) - copHealth, 10);
     ctx.strokeStyle = 'white';
     ctx.lineWidth = 3;
     ctx.strokeRect(20, 30, canvas.width/4, 10);
      // points view
     ctx.fillStyle = 'white'
     ctx.font = "20px 'Press Start 2P', cursive";
     ctx.fillText(womanCathCounter, canvas.width-100, 50);
     //timer
     ctx.fillStyle = 'white'
     ctx.font = "20px 'Press Start 2P', cursive";
     ctx.fillText(timeCount, canvas.width/2, 50);
 };