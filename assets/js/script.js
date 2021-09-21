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
    startButton.style.backgroundColor = "purple";
    startButton.style.color = "white";
    startButton.style.fontSize = "24px";
    startButton.style.width = "200px";
    startButton.style.marginLeft = "auto";
    startButton.style.marginRight = "auto";
    startButton.addEventListener("click", function(event) {
        startQuiz();
    
    });
    displayBodyEl.appendChild(startButton);
    clearInterval(timerInterval);
}

function startQuiz() {
    displayBodyEl.innerHTML="";
    nextQuestion = 0;

    displayNextQuestion();

    setTime();
}

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = "Time: " +secondsLeft ;
  
        if(secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
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
        li.style.fontSize = "24px";
        li.style.width = "50%";
        li.style.marginLeft = "auto";
        li.style.marginRight = "auto";
        li.style.backgroundColor = "purple";
        li.style.color = "white";
        li.style.padding = "10px";
        li.style.marginTop = "10px";
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
          console.log("Pressed line "+index);
          if (index==correctAnswer){
              userCorrect();
          } else {
              userWrong();
          }
          isQuestionAnswered = true;
          let nextButton = document.createElement("button");
          nextButton.textContent = "Next Question";
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
    user.score--;
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
    newDivSubmit.style.fontSize = "20px";
    newDivSubmit.style.width = "100px";
    newDivSubmit.style.marginLeft = "auto";
    newDivSubmit.style.marginRight = "auto";
    newDivSubmit.style.padding = "2px";
    newDivSubmit.style.backgroundColor = "purple";
    newDivSubmit.style.color = "white";
    newDiv.appendChild(newDivSubmit);

    newDivSubmit.addEventListener("click", function(event) {
        user.initials = newDivInput.value;
        console.log(user);
        let scores = JSON.parse(localStorage.getItem("Scores")|| "[]");
        if (scores==null){
            scores = [];
        }
        scores.push(user);
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

    let newh2 = document.createElement("h2");
    newh2.textContent = "High Scores";
    newh2.style.fontSize = "36px";
    newh2.style.marginLeft = "auto";
    newh2.style.marginRight = "auto";
    displayBodyEl.appendChild(newh2);

    let scores = JSON.parse(localStorage.getItem("Scores")|| "[]");
    console.log(scores);
    scores.sort(compare);
    console.log("Sorted");
    console.log(scores);
    localStorage.removeItem("Scores");
    localStorage.setItem("Scores",JSON.stringify(scores));
    if (scores!=null){
        let newUl = document.createElement("ol");
        //newUl.setAttribute("style","list-style-type:none");
        displayBodyEl.appendChild(newUl);

        for(let i=0;i<scores.length;i++){
            let object1 = JSON.parse(localStorage.getItem("Scores"))[i];
            console.log(object1);
            let li = document.createElement("li");
            let j = i +1;
            li.textContent = j + ". " + object1.initials + "     "+object1.score;
            li.setAttribute("data-index", i);
            li.style.fontSize = "24px";
            li.style.width = "50%";
            li.style.marginLeft = "auto";
            li.style.marginRight = "auto";
            li.style.backgroundColor = "purple";
            li.style.color = "white";
            li.style.padding = "10px";
            li.style.marginTop = "10px";
            li.style.textAlign = "left";
            newUl.appendChild(li);
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
    goBackButton.style.backgroundColor = "purple";
    goBackButton.style.color = "white";
    goBackButton.style.fontSize = "24px";
    goBackButton.style.width = "200px";
    goBackButton.style.marginLeft = "auto";
    goBackButton.style.marginRight = "auto";
    goBackButton.addEventListener("click", function(event) {
        init();
    });
    newDiv.appendChild(goBackButton);

    let clearHsButton = document.createElement("button");
    clearHsButton.textContent = "Clear high scores";
    clearHsButton.style.backgroundColor = "purple";
    clearHsButton.style.color = "white";
    clearHsButton.style.fontSize = "24px";
    clearHsButton.style.width = "300px";
    clearHsButton.style.marginLeft = "auto";
    clearHsButton.style.marginRight = "auto";
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