// initialisation steps
var highDifficulty = true;
var allSquares = document.querySelectorAll('.square');
var heading = document.querySelector('h1');
var rgbDisplay = document.getElementById('rgbDisplay');
var userFeedbackMsg = document.getElementById('userFeedbackMsg');
var resetBtn = document.getElementById('resetBtn');
var easyBtn = document.getElementById('easyBtn');
var hardBtn = document.getElementById('hardBtn');

function randInt(num){
    return Math.round(Math.random() * num);
}

function rgbRandom(){
    var red = randInt(255);
    var green = randInt(255);
    var blue = randInt(255);
    var rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    return rgb;
}

function guess(){
    if (!gameOver){
        this.style.backgroundColor === correctColour ? finalGuess('Correct'): wrongGuess(this);
    }
}

function wrongGuess(i){
    i.classList.add('wrongGuess');
    userFeedbackMsg.textContent = 'Try Again';
    guessCount += 1;
    // changes game difficulty
    if (guessCount === 3){
        finalGuess('Out Of Guesses');
    }
}

function finalGuess(msg){
    userFeedbackMsg.textContent = msg;
    gameOver = true;
    allSquares.forEach(function(i){
        i.classList.remove('wrongGuess');
        i.style.backgroundColor = correctColour;
    })
    heading.style.backgroundColor = correctColour;
    resetBtn.textContent = 'Play Again';
}

// resets game state. Picks all colours and winner, resets variables
function pickColours(){
    squareColours = [];
    gameOver = false;
    guessCount = 0;
    if (highDifficulty){
        for (i = 0; i < allSquares.length; i++){
            allSquares[i].style.display = 'block'
            allSquares[i].classList.remove('wrongGuess');
            allSquares[i].style.backgroundColor = rgbRandom();
            squareColours.push(allSquares[i].style.backgroundColor);
        }
        correctColour = squareColours[randInt(5)];
        rgbDisplay.textContent = correctColour;
    }
    else{
        for (i = 0; i < allSquares.length; i++){
            if (i <= 2){
                allSquares[i].classList.remove('wrongGuess');
                allSquares[i].style.backgroundColor = rgbRandom();
                squareColours.push(allSquares[i].style.backgroundColor);
            }
            else{
                allSquares[i].style.display = 'none'
            }
        }
        correctColour = squareColours[randInt(2)];
        rgbDisplay.textContent = correctColour;
    }
    resetBtn.textContent = 'New Colours';
    userFeedbackMsg.textContent = 'Guess the Colour';
}

// click listeners
allSquares.forEach(function(i){
    i.addEventListener('click',guess);
})
resetBtn.addEventListener('click',function(){
    pickColours();
})
easyBtn.addEventListener('click',function(){
    if (highDifficulty){
        highDifficulty = false;
        pickColours();
        easyBtn.classList.add('selected');
        hardBtn.classList.remove('selected');
    }
})
hardBtn.addEventListener('click',function(){
    if (!highDifficulty){
        highDifficulty = true;
        pickColours();
        hardBtn.classList.add('selected');
        easyBtn.classList.remove('selected');
    }

})
pickColours();