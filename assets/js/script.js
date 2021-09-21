let displayBodyEl = document.querySelector(".display-body");
let timeEl = document.querySelector(".time");
let viewHsEl = document.querySelector(".view-hs");

let quizQuestions = {
    questions : ["Inside which HTML element do we put the JavaScript?","Which of the following type of variable is visible only within a function where it is defined?","Which of the following function of String object combines the text of two strings and returns a new string?","Which of the following function of Array object creates a new array with the results of calling a provided function on every element in this array?","Which of the following function of Array object adds and/or removes elements from an array?"],
    options : [["<js>","<javascript>","<script>","<scripting>"],["Global variable","Local variable","Both","None"],["add","merge","concat","append"],["push","join","pop","map"],["toSource","sort","splice","unshift"]],
    answers : [2,1,2,3,2]
}

let nextQuestion = 0;
let startButton;
let timerInterval;
let newResult;
let secondsLeft = 60;
let correctAnswer = -1;
let user = {
    score: 0,
    initials: ""
}

function init(){
    displayBodyEl.innerHTML="";
    viewHsEl.textContent = "View High Scores";
    user.score = 0;
    correctAnswer = -1;
    secondsLeft = 60;
    let newH1El = document.createElement("h1");
    newH1El.textContent = "Coding Quiz Challange";
    newH1El.style.fontSize = "36px";
    displayBodyEl.appendChild(newH1El);

    let newText = document.createElement("p");
    newText.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    newText.style.fontSize = "24px";
    newText.style.width = "50%";
    newText.style.marginLeft = "auto";
    newText.style.marginRight = "auto";
    displayBodyEl.appendChild(newText);

    startButton = document.createElement("button");
    startButton.textContent = "Start Quiz";
    startButton.className = "quiz-button";
    startButton.addEventListener("click", function(event) {
        startQuiz();
    
    });
    displayBodyEl.appendChild(startButton);
    clearInterval(timerInterval);
}

function startQuiz() {
    displayBodyEl.innerHTML="";
    viewHsEl.textContent = "";
    nextQuestion = 0;

    displayNextQuestion();

    setTime();
}

function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " +secondsLeft ;
  
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            endGame();
        }
  
    }, 1000);
}

function displayNextQuestion() {

    if (nextQuestion===quizQuestions.questions.length){
        endGame();
        return;
    }
    let isQuestionAnswered = false;
    displayBodyEl.innerHTML="";
    let newText = document.createElement("p");
    newText.textContent = quizQuestions.questions[nextQuestion];
    newText.style.fontSize = "24px";
    newText.style.width = "50%";
    newText.style.marginLeft = "auto";
    newText.style.marginRight = "auto";
    displayBodyEl.appendChild(newText);

    let newUl = document.createElement("ul");
    newUl.setAttribute("style","list-style-type:none");
    displayBodyEl.appendChild(newUl);

    for(let i=0;i<4;i++){
        let li = document.createElement("li");
        li.textContent = quizQuestions.options[nextQuestion][i];
        li.setAttribute("data-index", i);
        li.className="option-list";

        newUl.appendChild(li);
    }
    correctAnswer = quizQuestions.answers[nextQuestion];

    newResult = document.createElement("p");
    newResult.style.color = "grey";
    newResult.textContent = "";
    displayBodyEl.appendChild(newResult);

    newUl.addEventListener("click", function(event) {
        if (isQuestionAnswered){
            return;
        }
        let element = event.target;
        if (element.matches("li")) {
          let index = element.getAttribute("data-index");
          if (index==correctAnswer){
              userCorrect();
          } else {
              userWrong();
          }
          isQuestionAnswered = true;
          let nextButton = document.createElement("button");
          nextButton.textContent = "Next Question";
          if (nextQuestion===quizQuestions.questions.length-1){
            nextButton.textContent = "Done!";
          }
          nextButton.className = "quiz-button";
          nextButton.addEventListener("click", function (event) {
            nextQuestion++;
            displayNextQuestion();
          });
          displayBodyEl.appendChild(nextButton); 
        }
      });
}

function userCorrect() {
    user.score++;
    newResult.textContent="Correct!";
}

function userWrong() {
    newResult.textContent="Wrong!";
    secondsLeft -= 10;
    if (secondsLeft<0){
        secondsLeft=0;
    }
}

function endGame (){

    clearInterval(timerInterval);

    displayBodyEl.innerHTML="";
    let newh2 = document.createElement("h2");
    newh2.textContent = "All done!";
    newh2.style.fontSize = "36px";
    newh2.style.marginLeft = "auto";
    newh2.style.marginRight = "auto";
    displayBodyEl.appendChild(newh2);

    let newText = document.createElement("p");
    newText.textContent = "Your score is "+user.score;
    newText.style.fontSize = "24px";
    newText.style.width = "50%";
    newText.style.marginLeft = "auto";
    newText.style.marginRight = "auto";
    displayBodyEl.appendChild(newText);

    let newDiv = document.createElement("div");
    newDiv.style.display="flexbox";
    newDiv.style.width = "50%";
    newDiv.style.marginLeft = "auto";
    newDiv.style.marginRight = "auto";
    displayBodyEl.appendChild(newDiv);

    let newDivTxt = document.createElement("label");
    newDivTxt.textContent = "Your initials";
    newDivTxt.style.fontSize = "20px";
    newDivTxt.style.width = "20%";
    newDivTxt.style.marginLeft = "auto";
    newDivTxt.style.marginRight = "auto";
    newDivTxt.style.padding = "2px";
    newDiv.appendChild(newDivTxt);

    let newDivInput = document.createElement("input");
    newDivInput.type = "text";
    newDivInput.style.fontSize = "20px";
    newDivInput.style.width = "20%";
    newDivInput.style.marginLeft = "auto";
    newDivInput.style.marginRight = "auto";
    newDivInput.style.padding = "2px";
    newDiv.appendChild(newDivInput);

    let newDivSubmit = document.createElement("input");
    newDivSubmit.type = "submit";
    newDivSubmit.className = "quiz-button";
    newDivSubmit.style.margin = "5px";

    newDiv.appendChild(newDivSubmit);

    newDivSubmit.addEventListener("click", function(event) {
        user.initials = newDivInput.value;
        let scores = JSON.parse(localStorage.getItem("Scores")|| "[]");
        if (scores==null){
            scores = [];
        }
        let initialFound = false;
        for(let i=0;i<scores.length;i++){
            if (scores[i].initials===user.initials){
                initialFound= true;
                if (scores[i].score < user.score){
                    scores[i].score = user.score;
                }

            }
        }
        if (!initialFound){
            scores.push(user);
        }
        
        localStorage.setItem("Scores",JSON.stringify(scores));
        displayHighScores();
    });
    

}

function compare( a, b ) {
    if ( a.score > b.score ){
      return -1;
    }
    if ( a.score < b.score ){
      return 1;
    }
    return 0;
  }

function displayHighScores() {
    displayBodyEl.innerHTML="";
    timeEl.textContent = "";
    viewHsEl.textContent = "";

    let newh2 = document.createElement("h2");
    newh2.textContent = "High Scores";
    newh2.style.fontSize = "36px";
    newh2.style.marginLeft = "auto";
    newh2.style.marginRight = "auto";
    displayBodyEl.appendChild(newh2);

    let scores = JSON.parse(localStorage.getItem("Scores")|| "[]");
    if (scores!=null){
        scores.sort(compare);
        localStorage.removeItem("Scores");
        localStorage.setItem("Scores",JSON.stringify(scores));

        let newOl = document.createElement("ol");
        displayBodyEl.appendChild(newOl);

        for(let i=0;i<scores.length;i++){
            let scoreObj = JSON.parse(localStorage.getItem("Scores"))[i];
            let li = document.createElement("li");
            li.innerHTML= scoreObj.initials + " <span class='score'>"+scoreObj.score+"</span>";
            li.setAttribute("data-index", i);
            li.className = "score-list";

            newOl.appendChild(li);
        }
        
    }

    let newDiv = document.createElement("div");
    newDiv.style.display="flexbox";
    newDiv.style.width = "50%";
    newDiv.style.marginLeft = "auto";
    newDiv.style.marginRight = "auto";
    displayBodyEl.appendChild(newDiv);

    let goBackButton = document.createElement("button");
    goBackButton.textContent = "Go back";
    goBackButton.className = "quiz-button";
    goBackButton.addEventListener("click", function(event) {
        init();
    });
    newDiv.appendChild(goBackButton);

    let clearHsButton = document.createElement("button");
    clearHsButton.textContent = "Clear scores";
    clearHsButton.className = "quiz-button";
    clearHsButton.addEventListener("click", function(event) {
        localStorage.removeItem("Scores");
        displayHighScores();
    });
    newDiv.appendChild(clearHsButton);

}

viewHsEl.addEventListener("click", function(event) {
    displayHighScores();
});

init();