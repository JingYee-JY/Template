const play = document.getElementById("play");
const start = document.getElementById("start");

const startPage = document.getElementById("startPage");
const instructionPage = document.getElementById("instructionPage");
const gamePage = document.getElementById("gamePage");
const popUp = document.getElementById("popUp");
const finalPage = document.getElementById("finalPage");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("correct")
const lose = document.getElementById("wrong")

const mark = document.getElementById("mark")
const checkAnswer = document.getElementById("checkAnswer")
const showAnswer = document.getElementById("showAnswer")
const correctAnswer = document.getElementById("correctAnswer")
const medal = document.getElementById("medal")
const words1 = document.getElementById("words1")
const words2 = document.getElementById("words2")
const scoreText = document.getElementById("scoreText")

//use this for selection page
const levelButtons = document.querySelectorAll(".levelButton");
const selectionPage = document.getElementById("selectionPage");

//here for selection page
let levelIndex;

//here for level buttons condition
const levels = [
    //example of catch the flower game
    {winCondition:5, dropSpeed:2},
    {winCondition:10, dropSpeed:5},
    {winCondition:20, dropSpeed:10}
]

//here is popUp example
const popUpButton = document.querySelectorAll(".popUpButton");

play.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        startPage.classList.add("hide")
        
        //use this for selection page
        selectionPage.classList.remove("hide")
        
        //else
        /*instructionPage.classList.remove("hide")*/
    }, 200);
})

start.addEventListener("click", () => {
    playClickSound()
    setTimeout(() => {
        instructionPage.classList.add("hide")
        gamePage.classList.remove("hide")
        ready()
        Question()
    }, 200);
})

levelButtons.forEach(function(level){
    level.addEventListener('click', () => {
        playClickSound()
        setTimeout(() => {
            levelIndex = level.getAttribute("data-level") - 1
            selectionPage.classList.add("hide")
            instructionPage.classList.remove("hide")
        }, 200);
    })    
})

popUpButton.forEach(function(button){
    button.addEventListener('click', () => {
        playClickSound()
        popUp.classList.remove("hide")
        
        correctAnswer.src = "./img/correct.png"

        let lose;
        if(button.classList.contains("correct")){
            mark.src = "./img/correct.png"
            checkAnswer.textContent = "Correct!"
            showAnswer.classList.add("hide")
            lose = true;
        }
        else{
            mark.src = "./img/wrong.png"
            checkAnswer.textContent = "Good try!"
            showAnswer.classList.remove("hide")
            lose = false;
        }
        
        setTimeout(function(){
            popUp.classList.add("hide");
            gamePage.classList.add("hide")
            endGame(lose)
        }, 2000)
    })    
})


function ready(){
    //code here to get UI ready 
    //like number of point to zero and others

}

function Question(){
    //game that starts the game like showing question and stuff
    console.log("Catch " + levels[levelIndex].winCondition + " flowers and they drop at " + levels[levelIndex].dropSpeed + " speed")
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function endGame(lose){
    finalPage.classList.remove("hide")
    if(lose & levelIndex == 0){
        medal.classList.remove("hidden")
        scoreText.textContent = "Good job!"
        words1.innerHTML = "You xxx <br> 5 xxx"
        words2.textContent = ""
    }
    else if (!lose & levelIndex == 0){
        medal.classList.add("hidden")
        scoreText.textContent = "You tried!"
        words1.innerHTML = "Good try!"
        words2.textContent = "do better next time"
    }

    //this is for second version
    else if(lose){
        medal.classList.remove("hidden")
        scoreText.textContent = "Superstar"
        words1.innerHTML = "Your score"
        words2.textContent = "5/5"
    }
    else if (!lose){
        medal.classList.remove("hidden")
        scoreText.textContent = "Good try!"
        words1.innerHTML = "Your score"
        words2.textContent = "0/5"
    }
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });