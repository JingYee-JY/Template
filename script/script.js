const play = document.getElementById("play");
const start = document.getElementById("start");
const again = document.getElementById("again");
const home = document.getElementById("home");

const startPage = document.getElementById("startPage");
const instructionPage = document.getElementById("instructionPage");
const gamePage = document.getElementById("gamePage");
const popUp = document.getElementById("popUp");
const finalPage = document.getElementById("finalPage");

const clickSound = document.getElementById("click")
const clap = document.getElementById("clap")
const completed = document.getElementById("correct")
const wrong = document.getElementById("wrong")
const lose = document.getElementById("lose")

const scoreCount = document.getElementById("score-count")
const questionCount = document.getElementById("question-count")
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

let current;
let addscore = 1
let total = 5;
let score;

let tempoArray = [];

let answer = {answer:"C", image: "./img/correct.png"}

//here is answerBtn user can select
const answerBtn = document.querySelectorAll(".answerBtn");

//here is finalV2
const group1 = document.querySelector(".group1");

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

answerBtn.forEach(function(button){
    button.addEventListener('click', () => {
        playClickSound()
        console.log(answer.image, answer.answer)

        let data  = button.getAttribute("data")

        popUp.classList.remove("hide")
        
        correctAnswer.src = answer.image

        if(data == answer.answer){
            mark.src = "./img/correct.png"
            checkAnswer.textContent = "Correct!"
            showAnswer.classList.add("hide")
            score +=1
            scoreCount.textContent = score;
        }
        else{
            mark.src = "./img/wrong.png"
            checkAnswer.textContent = "Good try!"
            showAnswer.classList.remove("hide")
        }
        
        setTimeout(function(){
            popUp.classList.add("hide");
            if(current == total){
                gamePage.classList.add("hide")
                endGame()
            }
            else{
                Question()
            }
        }, 3000)
    })    
})

again.addEventListener("click", () => {
  playClickSound()
  //controls amd buttons visibility
  let delay = setTimeout(() => {
    startPage.classList.remove("hide");
    finalPage.classList.add("hide")
  }, 200);
});

home.addEventListener("click", () => {
  playClickSound()
  let delay = setTimeout(() => {
    location.assign('https://gimme.sg/activations/minigames/main.html');
  }, 200);
})


function ready(){
    //code here to get UI ready 
    //like number of point to zero and others
    current = 0;
    questionCount.textContent = current + "/" + total

    score = 0;
    scoreCount.textContent = score

    //resetArray()
}

function resetArray(){
    tempoArray = []

    for(let i = 0; i < numbers.length; i++){
        tempoArray.push(numbers[i])
    }
}

function Question(){
    //game that starts the game like showing question and stuff
    console.log("Catch " + levels[levelIndex].winCondition + " flowers and they drop at " + levels[levelIndex].dropSpeed + " speed")
    current +=1;
    questionCount.textContent = current + "/" + total;

    answer.answer = "C"
    answer.image = "./img/correct.png"
}

function playClickSound(){
    console.log(clickSound)
    clickSound.currentTime = 0
    clickSound.play()
}

function endGame(){
    finalPage.classList.remove("hide")

    let pass = total / 2

    //this is for first version
    if(levelIndex == 0){//REMOVE THIS
        if(score < pass){
            lose.currentTime = 0
            lose.play()
            medal.classList.add("hidden")
            scoreText.textContent = "You tried!"
            words1.innerHTML = "Good try!"
            words2.textContent = "do better next time"
        }
        else{
            clap.currentTime = 0
            clap.play() 
            medal.classList.remove("hidden")
            scoreText.textContent = "Good job!"
            words1.innerHTML = `You got <br> ${score} right!`
            words2.textContent = ""
            setTimeout(function(){
                confetti.start()
                setTimeout(function(){
                    confetti.stop()
                }, 2000)
            }, 500)
        }
    } //REMOVE THIS

    //this is for second version
    else{//REMOVE THIS
        let starScore = total / 5;
        //change the star image according the score;
        if(score < pass){
            lose.currentTime = 0
            lose.play()
            if(score == starScore + starScore)
                    medal.src = "./img/youTried.png"
                else if(score < starScore + starScore && score >= starScore) // score < 2 && score >= 1
                    medal.src = "./img/youTried1.png"
                else
                    medal.src = "./img/youTried2.png"

            group1.classList.add("group1V2")
            scoreText.textContent = "Good try!"
            scoreText.classList.add("scoreTextV2")
            words1.classList.add("words1V2")
            words2.classList.add("words2V2")
            words1.innerHTML = "Your score"
        }
        else{
            clap.currentTime = 0
            clap.play()
            if(score == total) // score = 5
                medal.src = "./img/excellent.png"
            else if(score < total && score >= total - starScore) // score < 5 && score >= 4
                medal.src = "./img/wellDone.png"
            else if(score < total - starScore && score >= (total - starScore - starScore)) // score < 4 && score >= 3
                medal.src = "./img/wellDone1.png"

            group1.classList.add("group1V2")
            words1.classList.add("words1V2")
            words2.classList.add("words2V2")

            scoreText.classList.add("scoreTextV2")

            if(score == total){
                scoreText.textContent = "Superstar!"
            }
            else if(score > pass){
                scoreText.textContent = "Well done!"
            }
            else{
                scoreText.textContent = "Good try!"
            }

            setTimeout(function(){
                confetti.start()
                setTimeout(function(){
                    confetti.stop()
                }, 2000)
            }, 500)
        }
        words1.innerHTML = "Your score"
        words2.textContent = score + "/" + total
    } //REMOVE THIS
}

/*prevent double tag zoom*/
document.addEventListener('dblclick', function(event) {
    event.preventDefault();
    }, { passive: false });