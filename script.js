let gameseq = [];
let userseq = [];
let gamestart = false;
let score = 0;
let level = 0;
let btns = ['green','red','orange','blue']
let hs = 0;
let start_audio = new Audio ('audio/start.mp3')
let success_audio = new Audio ('audio/success.mp3')
let select_audio = new Audio ('audio/select.mp3')
let gameover_audio = new Audio ('audio/gameover.mp3')

curStatus = document.querySelector('.status')
highScore = document.querySelector('.hs')
startBtn = document.querySelector('.startbtn')

startBtn.addEventListener("click",function(){
    if (gamestart ==false) {
        start_audio.play()
        gamestart = true;
        // console.log("Game started");
        curStatus.innerText = "Don't loose your foucs !!!"
        setTimeout(levelup, 400);
    }
})

function btnFlash(btn){
    btn.classList.add('flash')
    setTimeout(function(){
        btn.classList.remove('flash')
    }, 250);
}

function levelup(){    
    startBtn.style.borderColor = '#fff'
    startBtn.style.boxShadow= '2px 2px 10px 0 rgba(0, 0, 0, 0.5)'
    userseq = []
    level++;
    startBtn.innerText = level;

    //random btn choose
    let randIdx = Math.floor(Math.random()*4)
    let randColor = btns[randIdx];

    gameseq.push(randColor)
    let i = 0;
    function processNext(){
        if(i<gameseq.length){
            let randBtn = document.querySelector(`.${gameseq[i]}`)
            btnFlash(randBtn)
            i++;
        setTimeout(processNext, 750);
        }
    }
    processNext() 
}

function checkSeq(curIdx){
    if (gameseq[curIdx] === userseq[curIdx]) {
        if (gameseq.length == userseq.length) {
            startBtn.style.borderColor = '#198754'
            startBtn.style.boxShadow= '2px 2px 10px 2px #198754'
            success_audio.play()
            setTimeout(levelup, 1000);  
        }
    }else{
        curStatus.innerText = `Gave Over! Your Score is: ${level}`
        startBtn.innerText = "START";
        gamestart = false;
        gameseq = []
        userseq = []
        if (level>hs) {
            hs = level;
            highScore.innerText = hs;
        }
        level = 0;
        gameover_audio.play()
      startBtn.style.borderColor = '#ff0000'
      setTimeout(() => {
        startBtn.style.borderColor = '#fff'
      }, 1000);
    }
}

function btnPress(){
    // console.log(gamestart);
        
    select_audio.play()
    let btn = this
    btnFlash(btn)
    userColor = btn.getAttribute('id');
    userseq.push(userColor)
    // console.log("userseq",userseq);
    // console.log(userColor);

    checkSeq(userseq.length-1)
}
let allBtns = document.querySelectorAll('.btn')
for(btn of allBtns){
    btn.addEventListener('click',btnPress)
}
