var number = 120;
var originalNumber = number;
var intervalId;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

var states = [  "Alabama", "Alaska", "Arizona", "Arkansas", "California",
                "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
                "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
                "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
                "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
                "Nebraska", "Nevada", "New Hampshire", "New Jersey",
                "New Mexico", "New York", "North Carolina", "North Dakota", 
                "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
                "South Carolina", "South Dakota","Tennessee", "Texas", "Utah",
                "Vermont", "Virginia", "Washington", "West Virginia",
                "Wisconsin", "Wyoming"   ];

var capitals = [ "Montgomery", "Juneau", "Phoenix", "Little Rock", "Sacramento",
                "Denver", "Hartford", "Dover", "Tallahassee", "Atlanta",
                "Honolulu", "Boise", "Springfield", "Indianapolis", "Des Moines",
                "Topeka", "Frankfort", "Baton Rouge", "Augusta", "Annapolis",
                "Boston", "Lansing", "Saint Paul", "Jackson", "Jefferson City",
                "Helena", "Lincoln", "Carson City", "Concord", "Trenton",
                "Santa Fe", "Albany", "Raleigh", "Bismark", "Columbus",
                "Oklahoma City", "Salem", "Harrisburg", "Providence", "Columbia",
                "Pierre", "Nashville", "Austin", "Salt Lake City", "Montpelier",
                "Richmond", "Olympia", "Charleston", "Madison", "Cheyenne" ];

var game = [];

function getQuestions() {

	var tempQuestion;

	for(var i = 0; i < states.length; i++) {
		
		tempQuestion = {state: states[i],
			answers: [	{answer: capitals[i], isCorrect: true},
			{answer: capitals[Math.floor(Math.random() * capitals.length)], isCorrect: false},
			{answer: capitals[Math.floor(Math.random() * capitals.length)], isCorrect: false},
			{answer: capitals[Math.floor(Math.random() * capitals.length)], isCorrect: false}]
		};
	
		game.push(tempQuestion);
	}
}

function displayGameResults() {

	$("#timer").css("display", "none");

	$("#main-game-panel").html("<h2>All Done!</h2>");
	$("#main-game-panel").append("<h3>Correct Answers: " + correct + "</h3>");
	$("#main-game-panel").append("<h3>Incorrect Answers: " + incorrect + "</h3>");
	$("#main-game-panel").append("<h3>Unanswered: " + unanswered + "</h3>");


	$("#done-button").css("display", "none");
	$("#reset-button").css("display", "block");
}

function evaluateAnswers() {

// 	// for(var i = 0; i < game.length; i++) {

// 		// check the answers for this question

// 		// first make sure that there is a button checked

// 		// var inputID = "input" + i;

// 		// if($("input1[name='answer']").is(":checked")) {
// 		// 	alert("button checked");
// 		// }
// 	// }
}


function stop() {
	
	clearInterval(intervalId);
	displayGameResults();
}

function timeConverter(t) {

	//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
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

	number--;

	var time = timeConverter(number);


	$("#timer").html("<h2>" + time + "</h2>");

	if(number === 0) {
		stop();
	}
}

function formatAnswers() {

	for(var i = 0; i < game.length; i++) {
		
		var tempAnswers = [];

		tempAnswers = game[i].answers;

		for(var j = 1; j < game[i].answers.length; j++) {

			// if there are duplicates...
			while(	tempAnswers[j].answer === game[i].answers[0].answer ||
					tempAnswers[j].answer === game[i].answers[0].answer ||
					tempAnswers[j].answer === game[i].answers[0].answer ||
					tempAnswers[j].answer === game[i].answers[0].answer    ) {

				// get a new random answer from capitals array
				tempAnswers[j].answer = capitals[Math.floor(Math.random() * capitals.length)];
			}
		}

		// randomly put the temp answers back into the game array
		for (var k = 0; k < game[i].answers.length; k++) {

			// get a random number to remove from tempAnswers
			var randomNum = Math.floor(Math.random() * tempAnswers.length);

			// if(!game[i].answers[k] == tempAnswers[randomNum])
			
			game[i].answers.splice(k, 1, tempAnswers[randomNum]);
			tempAnswers.splice(randomNum, 1);
		}
	}
}

function askQuestion(i) {

	var randomNumbers = [0, 1, 2, 3];

	Math.floor(Math.random() * randomNumbers.length)

	// Display the state
	$("#main-game-panel").append("<h2>" + game[i].state + "</h2>");

	// Display the answers in random order
	$("#main-game-panel").append("<h3 id=\"answer1\">" +
							game[i].answers[randomNumbers.splice(Math.floor(Math.random() *
							randomNumbers.length), 1)].answer + "<h3>");
	$("#main-game-panel").append("<h3 id=\"answer2\">" +
							game[i].answers[randomNumbers.splice(Math.floor(Math.random() *
							randomNumbers.length), 1)].answer + "<h3>");
	$("#main-game-panel").append("<h3 id=\"answer3\">" + game[i].answers[randomNumbers.splice(Math.floor(Math.random() *
							randomNumbers.length), 1)].answer + "<h3>");
	$("#main-game-panel").append("<h3 id=\"answer4\">" + game[i].answers[randomNumbers.splice(Math.floor(Math.random() *
							randomNumbers.length), 1)].answer + "<h3>");

	$("#main-game-panel").append("<br><br>");
}

function play() {

	var time = timeConverter(number);
	$("#timer").html("<h2>" + time + "</h2>");
	$("#main-game-panel").html("");

	intervalId = setInterval(decrement, 1000);

	getQuestions();

	for(var i = 0; i < game.length; i++) {

		askQuestion(i);
	}
}

function reset() {

	correct = 0;
	incorrect = 0;
	unanswered = 0;

	$("#main-game-panel").html("");

	$("#done-button").css("display", "block");
	play();

}

$(document).ready(function() {

	$("#start-button").click(function() {

		$("#start-button").css("display", "none");
		$("#done-button").css("display", "block");
		play();
	});

	$("#done-button").click(function() {

		$("#done-button").css("display", "none");
		stop();
		evaluateAnswers();
		$("#reset-button").css("display", "block");
	});

	$("#reset-button").click(function() {

		$("#reset-button").css("display", "none");		
		reset();		
	});
});