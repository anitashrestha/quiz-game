const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []; //get high scoresfrom local storage in the form of string

//show list item
highScoresList.innerHTML = highScores.map(score => {
    return (`<li class="high-score">${score.name} - ${score.score}</li>`); //display high scores in li
}).join('');

