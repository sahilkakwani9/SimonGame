var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var firstTimePressed = true;

function playSound(audio){
    var myAudio = new Audio("sounds/"+audio+'.mp3');
    myAudio.play();
}
function animatePress(color){
    $("."+color).addClass("pressed");
    setTimeout(() => { $("."+color).removeClass("pressed"); }, 1);

}
function nextSequence(){
    userClickedPattern = [];
    var randomNum = Math.floor(Math.random()*4);
    var randomcolourChoice = buttonColours[randomNum];
    gamePattern.push(randomcolourChoice);
    var button = $("#"+randomcolourChoice);
    button.fadeOut(100).fadeIn(100);
    playSound(randomcolourChoice);
    level += 1;
    $("h1").text("Level "+level);

    
}
function gameOver(){
    gamePattern = [];
    level = 0;
    firstTimePressed = true;
}
function checkAnswer(level){
    if(gamePattern[level] == userClickedPattern[level]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("sounds/wrong.mp3");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, 2);
        gameOver();

    }
}
$(".btn").click(function(){
    var userchosenColour =  this.id;
    userClickedPattern.push(userchosenColour);
    playSound(userchosenColour);
    animatePress(userchosenColour);
    checkAnswer(userClickedPattern.length-1);
})
$(document).keydown(function(){
    $("h1").text("Level "+level);
    if(firstTimePressed){
        nextSequence();
    }
    firstTimePressed = false;
})
