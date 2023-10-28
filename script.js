const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Oceania", correct: true},
            {text: "Europe", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: "What is the color of the sun?",
        answers: [
            {text: "Red", correct: false},
            {text: "Orange", correct: false},
            {text: "White", correct: true},
            {text: "Yellow", correct: false},
        ]
    },
    {
        question: "Which is the most populated continent in the world?",
        answers: [
            {text: "Asia", correct: true},
            {text: "Oceania", correct: false},
            {text: "Europe", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: "What was the first living thing to be transported to space?",
        answers: [
            {text: "A fruit fly", correct: true},
            {text: "A monkey", correct: false},
            {text: "A rat", correct: false},
            {text: "A nigerian", correct: false},
        ]
    },
    {
        question: "Which country has the strongest military in the world?",
        answers: [
            {text: "USA", correct: true},
            {text: "India", correct: false},
            {text: "France", correct: false},
            {text: "Isreal", correct: false},
        ]
    },
    {
        question: "What is the capital of UAE?",
        answers: [
            {text: "Dubai", correct: false},
            {text: "Abu dhabi", correct: true},
            {text: "Rabat", correct: false},
            {text: "Abuja", correct: false},
        ]
    },
    {
        question: "Which is the capital of South korea?",
        answers: [
            {text: "Hongkong", correct: false},
            {text: "Beijin", correct: false},
            {text: "Abuja", correct: false},
            {text: "Seoul", correct: true},
        ]
    },
    {
        question: "Will nigeria get better?",
        answers: [
            {text: "On God", correct: false},
            {text: "Never", correct: false},
            {text: "Yes", correct: true},
            {text: "Maybe", correct: false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex =0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0; //this will restart the question index from 0 when you start a new question or you reload the page
    score = 0; //this will restart the score index from 0 when you start a new question or you reload the page
    nextButton.innerHTML = "Next"; // it is added  because at the end we will change the text to the restart or replay, so if you restart the quiz again the button will be next 
    showQuestion();  //this function will display the questions
}

function showQuestion() {
    resetState(); // this will reset the questions i.e it will remove the previous text written in HTML and replace it with the one's written in javascript
    let currentQuestion = questions[currentQuestionIndex]; //this is done so as to call the questions in order i.e it starts from the index 0 then it starts numbering all the questions 1, 2, 3, 4 after the index 0
    let questionNo = currentQuestionIndex + 1; // it means when the index is 0 then the first quetion is 1 and the next question is 2, i.e the currentQuestion index + 1, i.e (1+1 = 2) and the next after that is 3 i.e the  previous currentQuestion index +1, i.e (2+1), etc.
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //this displays the question with the questionNo and the answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); //this will create a button 
        button.innerHTML = answer.text; //this will add the answer and text written for the questions in javascript to the webpage i.e in the innerHTML
        button.classList.add("btn"); // this will add a class name to the button
        answerButtons.appendChild(button); // this will display or add the the button inside the "answer-buttons" div in the HTML and in the webpage
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//this will remove all the previous question
function resetState() {
    nextButton.style.display = "none"
    while(answerButtons. firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectdBtn = e.target; // when the button is clicked it will add the selected button element
    const isCorrect = selectdBtn.dataset.correct === "true"; //it check's whether the selected button is true
    if(isCorrect) {
        selectdBtn.classList.add("correct"); //it will add the class name "correct" if the selected button is true
        score++;
    } else {
        selectdBtn.classList.add("incorrect"); //it will add the class name "incorrect" if the selected button is false
    }

    //the array forEach will check if the button or the dataset clicked is true then it will add the classname 'correct' if the button is true
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; //this will be disable the button after an option has been clicked, so as to prevent re-answering of the question 
    });
    nextButton.style.display = "block"; //this will display the next button which was hidden before
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};

function handleNextButton() {
    currentQuestionIndex++; //it will increase the currentQuestionIndex by 1 if you clicked on the next button
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", function() {
    if(currentQuestionIndex < questions.length) { // if the currentQuestionIndex is lesser than the questions.length (i.e questionNo) it will execute the handleNextButton() function
        handleNextButton();
    } else {
        startQuiz();
    }
})


//this function displays the output, so it will call the startQuiz() function and it will set the currentQuestionIndex to 0, score 0 and button text next, then it will call the showQuestion() function which will display the question and the question number and the answer in the button
startQuiz();