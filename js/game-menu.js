//************* Стартовое меню*********************

var body = document.querySelector('body');
body.style.cssText = `overflow:hidden;
                        margin:0; 
                                 `;

//************1-ый фоновый слой*********
let startMenuWrapper = document.createElement('div');
startMenuWrapper.setAttribute('id', 'start-menu');
startMenuWrapper.style.cssText = `overflow:hidden;
                        margin:0; 
                        background:url('img/fon.jpg') no-repeat center top;
                        background-size:cover; 
                        height:100vh;
                        width: 100vw;
                        `;

body.appendChild(startMenuWrapper);

//************ 2-ой фоновый слой********
let wrap = document.createElement('div');
wrap.setAttribute('class', 'layer');
wrap.setAttribute('data-speed', '10');
wrap.style.cssText = `
                      left:-2%;
                      bottom: -10%;
                      z-index:0;
                      position:absolute;
                      background: url('img/manifest.png') no-repeat left bottom;
                      background-size:contain;
                      height:100vh;
                      width: 103vw;
                      overflow:scroll;           `;
startMenuWrapper.appendChild(wrap);

//************ 3-ий фоновый слой******
let container = document.createElement('div');
container.setAttribute('class', 'layer');
container.setAttribute('data-speed', '30');
container.style.cssText = `background: url('img/cop-stop.png') left bottom no-repeat ;
                            background-size: contain;   
                            left: 10%;  
                            z-index:2;
                            position:absolute;
                            height:100vh;
                            width:30vw;
                            bottom:-10%; `;
startMenuWrapper.appendChild(container);

//***************описание функции для параллакс эфекта*********
function parallax(event) {
this.querySelectorAll('.layer').forEach(function(layer){
    let speed = layer.getAttribute('data-speed');
    layer.style.transform = `translateX(${event.clientX*speed/1000}px)` + `translateY(${event.clientY*speed/1000}px)`


});
};

//***************Добавление слушателя события "движение мыши" ********
document.addEventListener('mousemove', parallax);

//***************обёртка для стартовых кнопок
let btnWrap = document.createElement('div');
startMenuWrapper.appendChild(btnWrap);
btnWrap.style.cssText = `display: flex;
                    justify-content: left;
                    flex-direction: column;     
                        `;
let btnStyles = `width: 42vw;
                height:10vh;  
                position: relative;
                left:50vw;
                top:20vh;
                font-family: 'Press Start 2P', cursive;
                font-size:40px;
                background: none;
                border:none;
                outline:none;
                cursor: pointer;
                color:rgba(221, 221, 221, 0.788);
                text-shadow: 2px 2px 4px  black,
                            0px 0px 20px  white;
                            `;
let backBtnStyles = `margin-left:5vw;
                    position: relative;
                    left:5vw;
                    top:10vh;
                    font-size: 50px;
                    background: none;
                    border:none;
                    outline:none;
                    cursor: pointer;
                    color:rgba(221, 221, 221, 0.788);
                    text-shadow: 2px 2px 4px  black,
                                    0px 0px 20px  white;
                                    `;
let resultAndRulesWrapStyle = `display: flex;
                                flex-direction: column;
                                align-items: flex-end;
                                font-family: 'Press Start 2P', cursive;
                                font-size: 20px;
                                color:white;
                                width:50vw;
                                margin-bottom:30vh;`

 //*************** Кнопка СТАРТ ********
 startBtn = document.createElement('input');
 btnWrap.appendChild(startBtn);
 startBtn.type = 'button';
 startBtn.value = 'start';
 startBtn.style.cssText = btnStyles;
                                     
 //*************** Кнопка результатов*******
 reultsBtn = document.createElement('input');
 btnWrap.appendChild(reultsBtn);
 reultsBtn.type = 'button';
 reultsBtn.value = 'results';
 reultsBtn.style.cssText = btnStyles;
 
 //*************** Кнопка ПРАВИЛ ИГРЫ ******
 howToPlayBtn = document.createElement('input');
 btnWrap.appendChild(howToPlayBtn);
 howToPlayBtn.type = 'button';
 howToPlayBtn.value = 'rules';
 howToPlayBtn.style.cssText = btnStyles;
 
 //*************** кнопка BACK *******
 let backBtn = document.createElement('input');
 startMenuWrapper.appendChild(backBtn);
 backBtn.type = "button";
 backBtn.value = "◀";
 backBtn.style.cssText = backBtnStyles + `display:none`;
 
 //*************** hover для кнопок*****
 let mouseOver = function(){
     this.style.color = 'rgba(252, 252, 252, 0.89)';
     this.style.transition = '0.4s';
     this.style['text-shadow'] ='1px 1px 2px  red, 0px 0px 20px  white';
     };
 
 let mouseOut =function(){
     this.style.color = 'rgba(221, 221, 221, 0.788)';
     this.style.transition = '0.4s';
     this.style['text-shadow'] ='2px 2px 4px  black, 0px 0px 20px  white';
         };
 
 let inputs = document.querySelectorAll('input');
 inputs.forEach(function(element){
     element.addEventListener('mouseover', mouseOver );
     element.addEventListener('mouseout', mouseOut);
 });
  //по нажатию на кнопку START
  startBtn.addEventListener('click', function(){
    startMenuWrapper.style.cssText = `display:none`;
    if(isSoundOff == false)soundTrack.play();
    if(isPaused == false)game();
    if(isPaused == true)togglePause();
});
 //по нажатию  на кнопку results
 reultsBtn.addEventListener('click', function(){
    btnWrap.style.cssText = `display: none;
                            justify-content: left;
                            flex-direction: column;`;
    resultsWrapper.style.cssText = resultAndRulesWrapStyle +`margin-left:30vw;`;
    
    backBtn.style.cssText = `z-index:2;
                        display:inline-block;`
                        + backBtnStyles;      
});
//************** По нажатию на кнопку Rules*****
howToPlayBtn.addEventListener('click',function(){
    howToPlayWrapper.style.cssText = resultAndRulesWrapStyle +`margin-left:50vw;`;
    backBtn.style.cssText = `z-index:2;
                            display:inline-block;`
                            + backBtnStyles;

    btnWrap.style.cssText = `display: none;
                            justify-content: left;
                            flex-direction: column;`;
});
 //**************Кнопка backBtn ********
 backBtn.addEventListener('click', function(){
    btnWrap.style.cssText = `display: flex;
                        justify-content: left;
                        flex-direction: column;`;

    resultsWrapper.style = "display: none;";
    backBtn.style = "display: none;";
    howToPlayWrapper.style.cssText ="display:none;";
});
 // ****************results-menu*********
 var resultsWrapper = document.createElement('div');
 wrap.appendChild(resultsWrapper);
 resultsWrapper.style.cssText = `display: none;`       
     //******Сортировка localStorage ****
 let resultsArray = [];
 for (let i = 0; i < localStorage.length; i++){
     let localKey = localStorage.key(i);
     resultsArray.push({
         'key': localKey,
         'value': localStorage.getItem(localKey)
     });
 };
 
 
 resultsArray.sort(function(a, b) {
     return b.value - a.value;
 });
 
 let resultsLength = resultsArray.length > 40 ? 40 : resultsArray.length;
 
 for (let i = 0; i < resultsLength; i++){
     let span = document.createElement('span');  
     span.style.padding="1vh"
     resultsWrapper.appendChild(span);
     span.innerHTML = resultsArray[i].key + ' - ' + resultsArray[i].value + "</br>";
 };
 
  //********* how to play-menu **********
 
  var howToPlayWrapper = document.createElement('div');
  wrap.appendChild(howToPlayWrapper);
  howToPlayWrapper.style.cssText = `display: none;`;
  howToPlayWrapper.innerHTML = `<div>
      <p>
          Главная цель - собрать как можно больше очков путем остановки бегущих, идущих, и атакующих женщин.
      </p>
      <p>
          10 очков - за идущую женщину.</br>
          30 очков - за бегущую женщину.</br>
          1000 очков - за атакующую женщину в конце карты.</br>
      </p>
      <p>
          1 минута - время на выполнение задания.
      </p>
      <p>
          стрелка вперёд - сотрудник начнёт движение.</br>
          стрелка вверх - сотрудник совершит прыжок.</br>
          пробел - сотрудник махнёт дубинкой.</br>
  
          латинская 'P' - выключение/включение паузы в игре.</br>
          латинская 'S' - выключение/включение звука.</br>
          'esc'  - для выхода в основной меню.
      </p>
  </div>`;