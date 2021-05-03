const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//localStorage saves value  as a string so we need to convert them into JSON string, intialize empty highScore array
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;
console.log(highScores);


finalScore.innerText = mostRecentScore;

//triggers when navigate into and away from input
username.addEventListener('keyup', () => {
saveScoreBtn.disabled = !username.value; //disable save btn when username input is empty otherwise enable.
});

//add score to list, sort list and cut anything greater than 5 in descending order
saveHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();

    const score = {
        score: Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score);
    //sort highScores highest to lowest score, if B > A than put B before A
    highScores.sort((a, b) => b.score - a.score)
    highScores.splice(5); // at index 5 cut off everything after that
    
    //saving highScores in localStorage high to low
    localStorage.setItem('highScores', JSON.stringify(highScores));    
    window.location.assign('/'); //go back home page after finishing quiz and enter username
    
    console.log(highScores);
}


