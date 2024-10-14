const playBoard =  document.querySelector(".play-board");
const scoreElement =  document.querySelector(".score");
const highScoreElement =  document.querySelector(".high-score");
const controls =  document.querySelectorAll(".controls i");


let gameOver = false;
let foodX = 13, foodY = 10;
let superFoodX = 13, superFoodY = 10;
let snakeY = 5 , snakeX = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let SuperFoodActive = false;
//getting high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
let brokeHighScore = false;
highScoreElement.innerText = `High Score: ${highScore}`;


const changeFoodPosition = ()=>{
    // let SuperFood =  Math.floor(Math.random() * 10);
    // SuperFoodActive = (SuperFood > 6) ? true: false;
    // console.log(SuperFoodActive);
    //passing a random 0 - 30 value as food Position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
    // //passing a random 0 - 30 value as food Position
    // superFoodX = Math.floor(Math.random() * 30) + 1;
    // superFoodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () =>{
    clearInterval(setIntervalId);
    // alert("Game Over! Press OK to Replay");
    swal({
        title: "Opps!",
        text: "Didn't see that coming? no problem watch out next time!",
        icon: "error",
        // icon: "success",
        button: "Ok, Try Again",
      }).then((value) => {
        
          if (brokeHighScore) {
              swal({
                  title: "New High Score!",
                  text: "Hurray!, You have Just recieved 5 Blue diamond for reaching a new High Score, Keep it up!",
                  icon: "src/gemt.png",
                  // icon: "success",
                  button: "Collect Gems!",
                }).then((value) => {

                    location.reload();
                });
          }else{
            location.reload();
          }
      });
}

const changeDirection = (e)=>{
    // changing Velocity Value Based on Keypress
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
        console.log("ArrowUp");
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
        console.log("ArrowDown");
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
        console.log("ArrowLeft");
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
        console.log("ArrowRight");
    }
    // initGame();
}
controls.forEach(key =>{
    // Calling Changedirection on each key click and passing key dataset value as an object
    key.addEventListener('click', ()=> changeDirection({key: key.dataset.key}));
})

const initGame = () => {
    if (gameOver) return handleGameOver();
   
    // let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`
    
//     if (SuperFoodActive) {
//         htmlMarkup += `<div class="food super" style="grid-area: ${superFoodY} / ${superFoodX} / span 2 / span 2; border-radius:50%"></div>`

//     //checking if the snake hits the Super food
//     if (snakeX === superFoodX  && snakeY === superFoodY || (snakeX  === superFoodX + 1 && snakeY  === superFoodY ) || (snakeX  === superFoodX + 1  && snakeY  === superFoodY + 1 ) || (snakeX  === superFoodX && snakeY  === superFoodY + 1 )) {
//     //  changeFoodPosition();
//      snakeBody.push([superFoodX, superFoodY], [superFoodX, superFoodY]); //Pushing food position to snake body array
//     //  console.log(snakeBody);
//     score = score + 2;//increment score by 1

//     highScore = score >= highScore ? score : highScore;
//     localStorage.setItem("high-score", highScore);
//     scoreElement.innerText = `Score: ${score}`;
//     highScoreElement.innerText = `High Score: ${highScore}`;
//     }
// }

    //checking if the snake hits the normal food

    if (snakeX === foodX  && snakeY === foodY || (snakeX  === foodX + 1 && snakeY  === foodY ) || (snakeX  === foodX + 1  && snakeY  === foodY + 1 ) || (snakeX  === foodX && snakeY  === foodY + 1 )) {
     changeFoodPosition();
     snakeBody.push([foodX, foodY]); //Pushing food position to snake body array
    //  console.log(snakeBody);
    score++;//increment score by 1

    highScore = score >= highScore ? (function(){brokeHighScore = true; return score})()  : highScore;
    localStorage.setItem("high-score", highScore);
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
       snakeBody[i] = snakeBody[i - 1]
        
    }
    snakeBody[0] = [snakeX, snakeY]; //setting the first element of snakebody to current snake position

    // Updating The snake's head position based on current Velocity
    snakeX += velocityX;
    snakeY += velocityY;
    //setting gameover to true when snake heads hits wall
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        console.log("Ur own don Be!")
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
       //adding a div for each part of the snake's body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        //Checking if the snake head hit the body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] == snakeBody[i][0]) {
            gameOver = true
        }
    }
    playBoard.innerHTML = htmlMarkup;
}
changeFoodPosition();
// initGame();
setIntervalId = setInterval(initGame, 125)

document.addEventListener('keydown', changeDirection)