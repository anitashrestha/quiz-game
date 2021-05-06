const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [];

//fetch question form API and
fetch("questions.json")
.then(res => {
    return res.json(); 
})
.then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
})
.catch(err => { //if something goes wrong this will throw the message
    console.log(err);
})

//CONSTANTS
const CORRECT_BONUS = 10; //When user gives the correct answer how much bonus they get
const MAX_QUESTIONS = 3; //How many questions does the user gets before they finish the


startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions];//spread operator(3 dots) says to use the array and spread each of its items and put them into new Array
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score); //store recent score in localStorage
        //go to the end package
        return window.location.assign("/end.html");
    }

    questionCounter++;
    //update the question counter dynamically
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    //upadate the progress bar by incrementiong the weight in % of progress bars
    progressBarFull.style.width =  `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1); //this will take the available question array and get rid of question that have already been used

    acceptingAnswers = true;
}

//able to click and get reference to which choice they clicked
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        //create correct and incorrect classification and change the class name acc to answer chosen
        //const classToApply = 'incorrect'; //defualt class name
        //if (selectedAnswer == currentQuestion.answer) {
         //   classToApply = 'correct';
       // }
        
        //Another way to change class name using ternary operator is
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        //call incrementScore function when the ans is correct by checking the class name
        if (classToApply == 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        //choose whole container element use parentelement and use classList to apply class in JS.
        selectedChoice.parentElement.classList.add(classToApply);

        //set timeout to remove class when new question loads.
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        

        //checks whether the selected answer the correct answer are same
        //console.log(selectedAnswer == currentQuestion.answer);
        
    });
});

//increment score and update score text
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

