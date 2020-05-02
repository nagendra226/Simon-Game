/*jshint esversion: 6 */
/*jslint node: true */
/*jshint-env jquery*/


'use strict'; //strict mode is enabled to script to behave in modern way.

/**********************Global Variables - Begin **********************/
//declared as constant because won't change anywhere
const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [],
    userClickedPattern = [],
    gameLevel = 1,
    gamePlaying = true;
/**********************Global Variables -End **********************/


//animate function
function animatePress(currentColor) {

    let activeButton = document.querySelector("#" + currentColor);
    activeButton.classList.add("pressed");
    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);

}


//next sequence
function nextSequence(randomNumberToGenerate) {

    let audio,
        audioArray,
        attributeValue,
        buttonClasses,
        randomNumber,
        randomChosencolor;

    userClickedPattern = [];

    $('#level-title').text('Level ' + gameLevel);
    gameLevel++;
  

    audioArray = [];

    randomNumber = Math.floor((Math.random() * randomNumberToGenerate));

    randomChosencolor = buttonColors[randomNumber];

    gamePattern.push(randomChosencolor);


    console.log(gamePattern, randomChosencolor);

    buttonClasses = document.querySelectorAll('.btn');

    $('#' + randomChosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    for (let i = 0; i < buttonClasses.length; i++) {

        attributeValue = buttonClasses[i].getAttribute("id");

        audio = new Audio('sounds/' + attributeValue + '.mp3');

        audioArray.push(audio);

        buttonClasses[i].addEventListener('click', function (i,audioArray) {
            audioArray[i].play();
        });
    }

    return randomChosencolor;

}

$('.btn').click(function (e) {
    let userChosenColor = this.id;
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});

//Key Press Event
document.addEventListener('keypress', function (event) {
    if (gamePlaying) {
       let randomChosencolor =  nextSequence(3);
        let audio = new Audio('sounds/' + randomChosencolor + '.mp3');
        audio.play();
        gamePlaying = false;
    }

});

//Check Answer game function
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence(3), 1000);

        }
    } 
    else{
        let audio =   new Audio('sounds/wrong.mp3');
        audio.play();
         document.querySelector('body').classList.add("game-over");
        setTimeout(function () {
            document.querySelector('body').classList.remove("game-over");
        },100);
        $('#level-title').text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

//Restart the game function
function startOver(){
    gamePattern = [];
    gameLevel = 1;
    gamePlaying = true;
}