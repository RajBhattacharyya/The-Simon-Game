var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];

var started= false;
var level = 0;

$(document).keydown(function(){
    if (!started) {
        $("#level-title").text("level "+level);
        nextSequence();
        started= true; 
    }
});

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePressed(userChoosenColor);
    checkAnswer(userClickPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickPattern[currentLevel]){
        console.log("success")
        if(userClickPattern.length===gamePattern.length){
            setTimeout(
                function(){
                    nextSequence();
                }, 1000);
        }
    } else {
         console.log("wrong");
         var wrongAns = new Audio("sounds/wrong.mp3");
         wrongAns.play();
         $("#level-title").text("Game Over, Press Any Key to Restart")
         $("body").addClass("game-over");
         setTimeout(function(){
            $("body").removeClass("game-over");
         }, 200);
         startOver(); 
    }
}

function nextSequence() {
    userClickPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber= Math.floor(Math.random()*4);
    var randomChoosenColor= buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);
    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChoosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePressed(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

