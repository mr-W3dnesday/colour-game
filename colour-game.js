function randInt(num){
    return Math.floor(Math.random() * num + 1);
}

function rgbRandom(){
    var red = randInt(255);
    var green = randInt(255);
    var blue = randInt(255);
    var rgb = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    return rgb
}

function guess(){
    if (!gameOver){
        if (this.style.backgroundColor === correctColour){
            correctGuess();
        }
        else{
            wrongGuess(this);
        }
    }
}

function wrongGuess(i){
    i.classList.add('wrongGuess');
    userFeedbackMsg.textContent = 'Try Again.'
    console.log('test');
}


function correctGuess(){
    userFeedbackMsg.textContent = 'Correct!'
    gameOver = true;
    allSquares.forEach(function(i){
        i.classList.remove('wrongGuess');
        i.style.backgroundColor = correctColour;
    })
}

// add 6 colours to array and select winning colour
function pickColours(){
    squareColours = [];
    gameOver = false;
    allSquares.forEach(function(i){
        i.classList.remove('wrongGuess');
        i.style.backgroundColor = rgbRandom();
        squareColours.push(i.style.backgroundColor);
    });
    correctColour = squareColours[randInt(5)];
    rgbDisplay.textContent = correctColour.toUpperCase();
}

// setup steps
var squareColours = [];
var allSquares = document.querySelectorAll('.square');
var gameOver = false;
var rgbDisplay = document.getElementById('rgbDisplay');
var userFeedbackMsg = document.getElementById('userFeedbackMsg');
var resetBtn = document.getElementById('resetBtn');
var correctColour;

// click listeners
allSquares.forEach(function(i){
    i.addEventListener('click',guess);
})
resetBtn.addEventListener('click',pickColours)

pickColours();