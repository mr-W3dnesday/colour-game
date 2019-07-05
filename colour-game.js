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
        if (this.style.backgroundColor === correctColour){
            finalGuess('Correct!');
        }
        else{
            wrongGuess(this);
        }
    }
}

function wrongGuess(i){
    i.classList.add('wrongGuess');
    userFeedbackMsg.textContent = 'Try Again.';
    guessCount += 1;
    
    // changes game difficulty
    if (guessCount === 3){
        finalGuess('Out Of Guesses!');
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
    resetBtn.textContent = 'Play Again?';
}

// add 6 colours to array and select winning colour
function pickColours(){
    squareColours = [];
    gameOver = false;
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
}

function resetGame(){
    pickColours();
    guessCount = 0;
    resetBtn.textContent = 'New Colours';
    userFeedbackMsg.textContent = 'Guess the Colour!';
}

// setup steps
var squareColours = [];
var highDifficulty = true;
var gameOver = false;
var guessCount = 0;
var allSquares = document.querySelectorAll('.square');
var heading = document.querySelector('h1');
var rgbDisplay = document.getElementById('rgbDisplay');
var userFeedbackMsg = document.getElementById('userFeedbackMsg');
var resetBtn = document.getElementById('resetBtn');
var easyBtn = document.getElementById('easyBtn');
var hardBtn = document.getElementById('hardBtn');
var correctColour;

// click listeners
allSquares.forEach(function(i){
    i.addEventListener('click',guess);
})
resetBtn.addEventListener('click',function(){
    resetGame();
})
easyBtn.addEventListener('click',function(){
    if (highDifficulty){
        highDifficulty = false;
        resetGame();
        easyBtn.classList.add('selected');
        hardBtn.classList.remove('selected');
    }
})
hardBtn.addEventListener('click',function(){
    if (!highDifficulty){
        highDifficulty = true;
        resetGame();
        hardBtn.classList.add('selected');
        easyBtn.classList.remove('selected');
    }

})

pickColours();