/*
 * State Capitals Trivia
 * Michael Stange
 * UCSD Coding Boot Camp
 * Assignment #5 
 */

var maxQuestions = 50;
var questionCounter = 0;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var timer = 5;
var originalTimer = timer;
var intervalId;
var correctAnswer = false;
var isUnanswered = false;
var correctCapital = "";

var states = [
	"Alabama", "Alaska", "Arizona", "Arkansas", "California",
    "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
	"Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
    "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
    "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", 
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota","Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
];

var capitals = [
	"Montgomery", "Juneau", "Phoenix", "Little Rock", "Sacramento",
    "Denver", "Hartford", "Dover", "Tallahassee", "Atlanta",
    "Honolulu", "Boise", "Springfield", "Indianapolis", "Des Moines",
    "Topeka", "Frankfort", "Baton Rouge", "Augusta", "Annapolis",
    "Boston", "Lansing", "Saint Paul", "Jackson", "Jefferson City",
    "Helena", "Lincoln", "Carson City", "Concord", "Trenton",
    "Santa Fe", "Albany", "Raleigh", "Bismark", "Columbus",
    "Oklahoma City", "Salem", "Harrisburg", "Providence", "Columbia",
    "Pierre", "Nashville", "Austin", "Salt Lake City", "Montpelier",
    "Richmond", "Olympia", "Charleston", "Madison", "Cheyenne"
];

// The game array that will hold all of the states and answers
var game = [];

// Objects for each answer for a given state
var answer1 = {};
var answer2 = {};
var answer3 = {};
var answer4 = {};


$(document).ready(function() {

	$("#start-button").click(function() {

		$("#start-button").css("display", "none");
		$(".jumbotron").css("background-image", "none");

		getQuestions();
		play();
	});

    $(".input").on("click", function() {

    	stop();

    	evaluateAnswers(this.children[0].innerText);
		displayGameResults(this);

		if (questionCounter < maxQuestions) {

			setTimeout(reset, 1000);
		}

		else {

			$("#message").append("<h1>Quiz Complete!</h1>");
			$("#reset-button").css("display", "block");
		}
	});

	$("#reset-button").click(function() {

		$("#reset-button").css("display", "none");

			numCorrect = 0;
			numIncorrect = 0;
			numUnanswered = 0;
			questionCounter = 0;

			reset();		
	});
});

/*
 * getQuestions()
 * Builds the game array by first iterating over the states and capitals array, then
 * pushing random capitals into the answers array (after confirming no duplicates).
 * Tedious, but it works.
 */
function getQuestions() {

	var tempQuestion = {};
	var tempAnswer = {};

	for(var i = 0; i < states.length; i++) {
		
		tempQuestion = {state: states[i], answers: [{answer: capitals[i], isCorrect: true}]};

		game.push(tempQuestion);

		// add capitals / decoys.

		tempAnswer = {answer: capitals[Math.floor(Math.random() * capitals.length)],
																			isCorrect: false};	

		// if the first random capital is the same as the state capital...
		while (tempAnswer.answer === game[i].answers[0].answer) {

			// get a new random capital..
			tempAnswer = {answer: capitals[Math.floor(Math.random() * capitals.length)],
																			isCorrect: false};
		}

		// if here, then it must be ok
		game[i].answers.push(tempAnswer);

		// do it again for the third element...

		tempAnswer = {answer: capitals[Math.floor(Math.random() * capitals.length)],
																			isCorrect: false};	

		// if the first random capital is the same as the state capital AND first decoy.
		while (tempAnswer.answer === game[i].answers[0].answer ||
				tempAnswer.answer === game[i].answers[1].answer) {

			// get a new random capital..
			tempAnswer = {answer: capitals[Math.floor(Math.random() * capitals.length)],
																			isCorrect: false};
		}
		
		game[i].answers.push(tempAnswer);

		// and again...

		tempAnswer = {answer: capitals[Math.floor(Math.random() * capitals.length)],
																			isCorrect: false};	

		// Check all 3 previous elements...
		while (tempAnswer.answer === game[i].answers[0].answer ||
				tempAnswer.answer === game[i].answers[1].answer ||
				tempAnswer.answer === game[i].answers[2].answer) {

			// get a new random capital..
			tempAnswer = {answer: capitals[Math.floor(Math.random() * capitals.length)],
																			isCorrect: false};
		}
		
		game[i].answers.push(tempAnswer);
	}
}

/*
 * play()
 * Starts the timer and asks a question.
 */
function play() {

	var time = timeConverter(timer);
	$("#timer").html("<h2>" + time + "</h2>");
	$("#timer").css("display", "block");
	$("#message").html("");

	intervalId = setInterval(decrement, 1000);

	askQuestion();
}

/*
 * askQuestion()
 * Display the state and then randomly display the 4 possible answers.
 */
function askQuestion() {

	// capture the correct capital
	correctCapital = game[questionCounter].answers[0];

	var randomNumbers = [0, 1, 2, 3];

	Math.floor(Math.random() * randomNumbers.length)

	// Display the state
	$("#state").html("<h2>" + game[questionCounter].state + "</h2>");

	answer1 = game[questionCounter].answers[randomNumbers.splice(Math.floor(Math.random() *
													randomNumbers.length), 1)];
	answer2 = game[questionCounter].answers[randomNumbers.splice(Math.floor(Math.random() *
													randomNumbers.length), 1)];
	answer3 = game[questionCounter].answers[randomNumbers.splice(Math.floor(Math.random() *
													randomNumbers.length), 1)];
	answer4 = game[questionCounter].answers[randomNumbers.splice(Math.floor(Math.random() *
													randomNumbers.length), 1)];

	// Display the answers in random order
	$(".input").css("min-height", "50px");
	$("#input1").html("<button class=\"answer btn btn-primary btn-lg\">" + answer1.answer + "</button>");
	$("#input2").html("<button class=\"answer btn btn-primary btn-lg\">" + answer2.answer + "</button>");
	$("#input3").html("<button class=\"answer btn btn-primary btn-lg\">" + answer3.answer + "</button>");
	$("#input4").html("<button class=\"answer btn btn-primary btn-lg\">" + answer4.answer + "</button>");

	questionCounter++;
}

/*
 * evaluateAnswers(answer)
 * Receives a string representing the user's guess.
 * Compare the string against the answers# objects to determine if the
 *  isCorrect field is true or false.
 * Update correct / incorrect / unanswered.
 */
function evaluateAnswers(answer) {

	var objectToTest = {}

	if(answer === answer1.answer) {
		correctAnswer = answer1.isCorrect;
	}

	else if(answer === answer2.answer) {
		correctAnswer = answer2.isCorrect;
	}
	else if(answer === answer3.answer) {
		correctAnswer = answer3.isCorrect;
	}
	else if(answer === answer4.answer) {
		correctAnswer = answer4.isCorrect;
	}

	else {
		unanswered = true;
	}
}

/*
 * displayGameResults()
 * Clear the main-game-panel and display the correct, incorrect and unanswered
 *  totals.
 */
function displayGameResults() {

	$("#timer").html("");
	$("#state").empty();
	$("#input1").empty();
	$("#input2").empty();
	$("#input3").empty();
	$("#input4").empty();
	$(".input").css("min-height", "0");

	if(isUnanswered) {

		$("#message").html("Unanswered");
		numUnanswered++;
		isUnanswered = false;
	}

	else {

		if(correctAnswer) {

			$("#message").html("Correct!");
			numCorrect++;
			correctAnswer = false;
		}

		else {

		$("#message").html("Incorrect");
		$("#message").append("<h3>The capital is of " +
					game[questionCounter - 1].state + " is " +
					game[questionCounter - 1].answers[0].answer + "</h3>");
		numIncorrect++;
		correctAnswer = false;
		}
	}

	$("#results").html("<h3>Correct Answers: " + numCorrect + "</h3>");
	$("#results").append("<h3>Incorrect Answers: " + numIncorrect + "</h3>");
	$("#results").append("<h3>Unanswered: " + numUnanswered + "</h3>");
}

function decrement() {

	timer--;

	var time = timeConverter(timer);

	$("#timer").html("<h2>" + time + "</h2>");

	if(timer === 0) {
		stop();
		isUnanswered = true;
		displayGameResults();
		setTimeout(reset, 1000);
	}
}

function timeConverter(t) {

	//  Takes the current time in seconds and convert it
	//   to minutes and seconds (mm:ss).
	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);

	if (seconds < 10) {
		seconds = "0" + seconds;
	}

	if (minutes === 0) {
		minutes = "  ";
	}

	else if (minutes < 10) {
		minutes = " " + minutes;
	}

	return minutes + ":" + seconds;
}

function stop() {
	
	clearInterval(intervalId);
}

function reset() {

	correctAnswer = false;
	isUnanswered = false;

	timer = originalTimer;

	$("#results").html("");

	play();
}