const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scriptting>",
        answer: 1

    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3

    },
    {
        question: "How do you write  'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4

    },
]

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
        //go to the end package
        return window.location.assign("/end.html");
    }

    questionCounter++;
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
        console.log(classToApply);

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


startGame();