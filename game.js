var gamePattern = [];
var userClickedPattern = [];
var buttoncolors = ['red', 'blue', 'yellow', 'green'];

var level = 0;
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animeatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
$(document).one("keydown", function () {
    $("#level-title").text("Level " + level);
    nextSequence();
}
);
function nextSequence() {
    level++;

    userClickedPattern = [];
    $("h1").text("Level " + level)
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);


    var randomChosenColor = buttoncolors[randomNumber];

    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play()

}

$("input").one('keypress', function () {
    nextSequence();

});

function playSound(name) {

    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play()

}
function animeatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass('pressed');

    }, 100);
}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {


            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    }
    else {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play()
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass('game-over');
        }, 200);
        $("h1").text("Game over .Press any key to Restart");
        $(document).one("keydown", function () {
            level=0;gamePattern=[];userClickedPattern=[];
            nextSequence();
        }
        );
    }
    
}


