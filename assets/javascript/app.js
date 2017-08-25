var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var timer = 5;
var originalTimer = timer;
var intervalId;
var questionCounter = 0;
var correctAnswer = false;
var isUnanswered = false;

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

var game = [];

var answer1 = {};
var answer2 = {};
var answer3 = {};
var answer4 = {};

function getQuestions() {

	var tempQuestion = {};
	var tempAnswer = {};

	for(var i = 0; i < states.length; i++) {
		
		tempQuestion = {state: states[i],
			answers: [	{answer: capitals[i], isCorrect: true}
			// {answer: capitals[Math.floor(Math.random() * capitals.length)], isCorrect: false},
			// {answer: capitals[Math.floor(Math.random() * capitals.length)], isCorrect: false},
			// {answer: capitals[Math.floor(Math.random() * capitals.length)], isCorrect: false}
			]
		};

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

		// do it again...

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
 * formatAnswers()
 * Eliminate duplicates introduced at initialization
 */
// function formatAnswers() {

// 	for(var i = 0; i < game.length; i++) {

// 		for(var j = 1; j < game[i].answers.length; j++) {

// 			// if there are duplicates...
// 			while(	game[i].answers[j].answer === game[i].answers[0].answer ||
// 					game[i].answers[j].answer === game[i].answers[0].answer ||
// 					tempAnswers[j].answer === game[i].answers[0].answer ||
// 					tempAnswers[j].answer === game[i].answers[0].answer    ) {

// 				// get a new random answer from capitals array
// 				game[i].answers[j].answer = capitals[Math.floor(Math.random() * capitals.length)];
// 			}
// 		}

// 		// randomly put the temp answers back into the game array
// 		for (var k = 0; k < game[i].answers.length; k++) {

// 			// get a random number to remove from tempAnswers
// 			var randomNum = Math.floor(Math.random() * tempAnswers.length);

// 			// if(!game[i].answers[k] == tempAnswers[randomNum])
			
// 			game[i].answers.splice(k, 1, tempAnswers[randomNum]);
// 			tempAnswers.splice(randomNum, 1);
// 		}
// 	}
// }


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

function displayGameResults() {

	$("#timer").html("");
	$("#state").empty();
	$("#input1").empty();
	$("#input2").empty();
	$("#input3").empty();
	$("#input4").empty();

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
		numIncorrect++;
		correctAnswer = false;
		}
	}

	$("#results").html("<h3>Correct Answers: " + numCorrect + "</h3>");
	$("#results").append("<h3>Incorrect Answers: " + numIncorrect + "</h3>");
	$("#results").append("<h3>Unanswered: " + numUnanswered + "</h3>");
}

function stop() {
	
	clearInterval(intervalId);
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

function decrement() {

	timer--;

	var time = timeConverter(timer);

	$("#timer").html("<h2>" + time + "</h2>");

	if(timer === 0) {
		stop();
		isUnanswered = true;
		displayGameResults();
		setTimeout(reset, 2000);
	}
}

function askQuestion() {

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
	$("#input1").html("<h3 class=\"answer\">" + answer1.answer + "<h3>");
	$("#input2").html("<h3 class=\"answer\">" + answer2.answer + "<h3>");
	$("#input3").html("<h3 class=\"answer\">" + answer3.answer + "<h3>");
	$("#input4").html("<h3 class=\"answer\">" + answer4.answer + "<h3>");

	questionCounter++;
}

function play() {

	var time = timeConverter(timer);
	$("#timer").html("<h2>" + time + "</h2>");
	$("#timer").css("display", "block");
	$("#message").html("");

	intervalId = setInterval(decrement, 1000);

	askQuestion();
}

function reset() {

	correctAnswer = false;
	isUnanswered = false;

	timer = originalTimer;

	$("#results").html("");

	play();
}

$(document).ready(function() {

	$("#start-button").click(function() {

		$("#start-button").css("display", "none");
		$("#done-button").css("display", "block");

		getQuestions();
		play();
	});

    $(".input").on("click", function() {

    	stop();

    	evaluateAnswers(this.children[0].innerText);
		displayGameResults();

		setTimeout(reset, 2000);
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