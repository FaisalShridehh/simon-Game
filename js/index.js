const simonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let h2heading = $("#level-title");
h2heading.text("Press Any Key To Start");
let level = 0;

let started = false; //to keep track if the game has started or not

$(document).keypress(function () {
  if (!started) {
    h2heading.text("Level " + level);
    colorsSequence();
    started = true;
    $(".about-game").addClass("hidden-about");
  }
});

let colorsSequence = function () {
  userClickedPattern = []; //clear the userClickedPattern every time the function called
  level++;
  h2heading.text("Level " + level);
  let randomColors = Math.floor(Math.random() * 4); // generate a random numbers form 0 to 4
  let randomChosenColor = simonColors[randomColors]; // to get the random colors depends on the index that the random number generate and store it inside the randomChosenColor variable
  gamePattern.push(simonColors[randomColors]); // add the random colors form previous step to the end of the gamePattern array to store colors pattern
  // console.log(randomChosenColor);
  // console.log(gamePattern);

  $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100); //animate the buttons by flashing it

  playSound(randomChosenColor); // to play a sound depends on the color name of what we get from randomChosenColor variable
};

$(".circle-simon").click(function () {
  // to detect when any of the buttons are clicked
  let userChosenColor = $(this).attr("id"); //store the id of the  button  that got clicked

  // console.log(userChosenColor);
  userClickedPattern.push(userChosenColor); // add the contents of the variable userChosenColor to the end of the empty array userClickedPattern
  // console.log(userClickedPattern);

  playSound(userChosenColor); // to play a sound depends on the color name of what we get from userChosenColor variable
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(colorName) {
  // play the sounds depends on color name

  let simonSounds = new Audio(`sounds/${colorName}.mp3`);
  simonSounds.play();
}

function animatePress(currentColor) {
  // add a class to the pressed  button that will give the button some box shadow on click then  disappear after 100ms
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // console.log(userClickedPattern[currentLevel]);
  // console.log(gamePattern[currentLevel]);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("true");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(colorsSequence(), 1000);
    }
  } else {
    let wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    h2heading.text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function () {
      $(".about-game").removeClass("hidden-about");
    }, 200);
    startOver();
    // console.log("False");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
