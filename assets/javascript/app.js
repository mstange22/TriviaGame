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
var isEasy = true;

// The game array that will hold all of the states and answers
var game = [];

var hardGame = [
			{state: "Alabama", answers: [ {answer: "Montgomery", isCorrect: true},
										{answer: "Tuscaloosa", iscorrect: false},
										{answer: "Birmingham", isCorrect: false},
										{answer: "Jackson", isCorrect: false} ]},

			{state: "Alaska", answers: [ {answer: "Juneau", isCorrect: true},
										{answer: "Anchorage", iscorrect: false},
										{answer: "Fairbanks", isCorrect: false},
										{answer: "Olympia", isCorrect: false} ]},

			{state: "Arizona", answers: [ {answer: "Phoenix", isCorrect: true},
										{answer: "Tucson", iscorrect: false},
										{answer: "Tempe", isCorrect: false},
										{answer: "Albequerque", isCorrect: false} ]},

			{state: "Arkansas", answers: [ {answer: "Little Rock", isCorrect: true},
										{answer: "Fort Smith", iscorrect: false},
										{answer: "Jefferson City", isCorrect: false},
										{answer: "Jackson", isCorrect: false} ]},

			{state: "California", answers: [ {answer: "Sacramento", isCorrect: true},
										{answer: "Los Angeles", iscorrect: false},
										{answer: "San Francisco", isCorrect: false},
										{answer: "Carson", isCorrect: false} ]},

			{state: "Colorado", answers: [ {answer: "Denver", isCorrect: true},
										{answer: "Boulder", iscorrect: false},
										{answer: "Fort Collins", isCorrect: false},
										{answer: "Lincoln", isCorrect: false} ]},

			{state: "Connecticut", answers: [ {answer: "Hartford", isCorrect: true},
										{answer: "New Haven", iscorrect: false},
										{answer: "Bridgeport", isCorrect: false},
										{answer: "Concord", isCorrect: false} ]},

			{state: "Delaware", answers: [ {answer: "Dover", isCorrect: true},
										{answer: "Willmington", iscorrect: false},
										{answer: "Newark", isCorrect: false},
										{answer: "Annapolis", isCorrect: false} ]},

			{state: "Florida", answers: [ {answer: "Tallahassee", isCorrect: true},
										{answer: "Miami", iscorrect: false},
										{answer: "Orlando", isCorrect: false},
										{answer: "Jacksonville", isCorrect: false} ]},

			{state: "Georgia", answers: [ {answer: "Atlanta", isCorrect: true},
										{answer: "Columbus", iscorrect: false},
										{answer: "Savannah", isCorrect: false},
										{answer: "Auburn", isCorrect: false} ]},

			{state: "Hawaii", answers: [ {answer: "Honolulu", isCorrect: true},
										{answer: "Hilo", iscorrect: false},
										{answer: "Kailua-Kona", isCorrect: false},
										{answer: "Pearl City", isCorrect: false} ]},

			{state: "Idaho", answers: [ {answer: "Boise", isCorrect: true},
										{answer: "Coeur d'Alene", iscorrect: false},
										{answer: "Helena", isCorrect: false},
										{answer: "Des Moines", isCorrect: false} ]},

			{state: "Illinois", answers: [ {answer: "Springfield", isCorrect: true},
										{answer: "Chicago", iscorrect: false},
										{answer: "Madison", isCorrect: false},
										{answer: "Peoria", isCorrect: false} ]},

			{state: "Indiana", answers: [ {answer: "Indianapolis", isCorrect: true},
										{answer: "Bloomington", iscorrect: false},
										{answer: "Fort Wayne", isCorrect: false},
										{answer: "Springfield", isCorrect: false} ]},

			{state: "Iowa", answers: [ {answer: "Des Moines", isCorrect: true},
										{answer: "Iowa City", iscorrect: false},
										{answer: "Ames", isCorrect: false},
										{answer: "Pierre", isCorrect: false} ]},

			{state: "Kansas", answers: [ {answer: "Topeka", isCorrect: true},
										{answer: "Wichita", iscorrect: false},
										{answer: "Kansas City", isCorrect: false},
										{answer: "St. Louis", isCorrect: false} ]},

			{state: "Kentucky", answers: [ {answer: "Frankfort", isCorrect: true},
										{answer: "Louisville", iscorrect: false},
										{answer: "Lexington", isCorrect: false},
										{answer: "Nashville", isCorrect: false} ]},

			{state: "Louisiana", answers: [ {answer: "Baton Rouge", isCorrect: true},
										{answer: "New Orleans", iscorrect: false},
										{answer: "Shreveport", isCorrect: false},
										{answer: "Jackson", isCorrect: false} ]},

			{state: "Maine", answers: [ {answer: "Augusta", isCorrect: true},
										{answer: "Portland", iscorrect: false},
										{answer: "Albany", isCorrect: false},
										{answer: "Concord", isCorrect: false} ]},

			{state: "Maryland", answers: [ {answer: "Annapolis", isCorrect: true},
										{answer: "Baltimore", iscorrect: false},
										{answer: "Bethesda", isCorrect: false},
										{answer: "Charleston", isCorrect: false} ]},

			{state: "Massachusetts", answers: [ {answer: "Boston", isCorrect: true},
										{answer: "Springfield", iscorrect: false},
										{answer: "Amherst", isCorrect: false},
										{answer: "Hartford", isCorrect: false} ]},

			{state: "Michigan", answers: [ {answer: "Lansing", isCorrect: true},
										{answer: "Detroit", iscorrect: false},
										{answer: "Saint Paul", isCorrect: false},
										{answer: "Springfield", isCorrect: false} ]},

			{state: "Minnesota", answers: [ {answer: "Saint Paul", isCorrect: true},
										{answer: "Minneapolis", iscorrect: false},
										{answer: "Duluth", isCorrect: false},
										{answer: "Madison", isCorrect: false} ]},

			{state: "Mississippi", answers: [ {answer: "Jackson", isCorrect: true},
										{answer: "Madison", iscorrect: false},
										{answer: "Columbus", isCorrect: false},
										{answer: "Jefferson City", isCorrect: false} ]},

			{state: "Missouri", answers: [ {answer: "Jefferson City", isCorrect: true},
										{answer: "St. Louis", iscorrect: false},
										{answer: "Jackson", isCorrect: false},
										{answer: "Springfield", isCorrect: false} ]},

			{state: "Montana", answers: [ {answer: "Helena", isCorrect: true},
										{answer: "Missoula", iscorrect: false},
										{answer: "Bismarck", isCorrect: false},
										{answer: "Pierre", isCorrect: false} ]},

			{state: "Nebraska", answers: [ {answer: "Lincoln", isCorrect: true},
										{answer: "Omaha", iscorrect: false},
										{answer: "Ames", isCorrect: false},
										{answer: "Topeka", isCorrect: false} ]},

			{state: "Nevada", answers: [ {answer: "Carson City", isCorrect: true},
										{answer: "Las Vegas", iscorrect: false},
										{answer: "Reno", isCorrect: false},
										{answer: "Carson", isCorrect: false} ]},

			{state: "New Hampshire", answers: [ {answer: "Concord", isCorrect: true},
										{answer: "Manchester", iscorrect: false},
										{answer: "Dover", isCorrect: false},
										{answer: "Montpelier", isCorrect: false} ]},

			{state: "New Jersey", answers: [ {answer: "Trenton", isCorrect: true},
										{answer: "Jersey City", iscorrect: false},
										{answer: "Newark", isCorrect: false},
										{answer: "Annapolis", isCorrect: false} ]},

			{state: "New Mexico", answers: [ {answer: "Santa Fe", isCorrect: true},
										{answer: "Albequerque", iscorrect: false},
										{answer: "Las Cruces", isCorrect: false},
										{answer: "Bismarck", isCorrect: false} ]},

			{state: "New York", answers: [ {answer: "Albany", isCorrect: true},
										{answer: "New York City", iscorrect: false},
										{answer: "Utica", isCorrect: false},
										{answer: "Concord", isCorrect: false} ]},

			{state: "North Carolina", answers: [ {answer: "Raleigh", isCorrect: true},
										{answer: "Willmington", iscorrect: false},
										{answer: "Charlotte", isCorrect: false},
										{answer: "Columbia", isCorrect: false} ]},

			{state: "North Dakota", answers: [ {answer: "Bismarck", isCorrect: true},
										{answer: "Fargo", iscorrect: false},
										{answer: "Grand Forks", isCorrect: false},
										{answer: "Pierre", isCorrect: false} ]},

			{state: "Ohio", answers: [ {answer: "Columbus", isCorrect: true},
										{answer: "Cleveland", iscorrect: false},
										{answer: "Cincinnati", isCorrect: false},
										{answer: "Toledo", isCorrect: false} ]},

			{state: "Oklahoma", answers: [ {answer: "Oklahoma City", isCorrect: true},
										{answer: "Tulsa", iscorrect: false},
										{answer: "Norman", isCorrect: false},
										{answer: "Wichita", isCorrect: false} ]},

			{state: "Oregon", answers: [ {answer: "Salem", isCorrect: true},
										{answer: "Eugene", iscorrect: false},
										{answer: "Portland", isCorrect: false},
										{answer: "Olympia", isCorrect: false} ]},

			{state: "Pennsylvania", answers: [ {answer: "Harrisburg", isCorrect: true},
										{answer: "Pittsburgh", iscorrect: false},
										{answer: "Philadelphia", isCorrect: false},
										{answer: "Dover", isCorrect: false} ]},

			{state: "Rhode Island", answers: [ {answer: "Providence", isCorrect: true},
										{answer: "Dover", iscorrect: false},
										{answer: "Hartford", isCorrect: false},
										{answer: "Newport", isCorrect: false} ]},

			{state: "South Carolina", answers: [ {answer: "Columbia", isCorrect: true},
										{answer: "Charleston", iscorrect: false},
										{answer: "Greenville", isCorrect: false},
										{answer: "Raleigh", isCorrect: false} ]},

			{state: "South Dakota", answers: [ {answer: "Pierre", isCorrect: true},
										{answer: "Sioux Falls", iscorrect: false},
										{answer: "Rapid City", isCorrect: false},
										{answer: "Bismarck", isCorrect: false} ]},

			{state: "Tennessee", answers: [ {answer: "Nashville", isCorrect: true},
										{answer: "Memphis", iscorrect: false},
										{answer: "Knoxville", isCorrect: false},
										{answer: "Chattanooga", isCorrect: false} ]},

			{state: "Texas", answers: [ {answer: "Austin", isCorrect: true},
										{answer: "Dallas", iscorrect: false},
										{answer: "Fort Worth", isCorrect: false},
										{answer: "Houston", isCorrect: false} ]},

			{state: "Utah", answers: [ {answer: "Salt Lake City", isCorrect: true},
										{answer: "Saint George", iscorrect: false},
										{answer: "Provo", isCorrect: false},
										{answer: "Ogden", isCorrect: false} ]},

			{state: "Vermont", answers: [ {answer: "Montpelier", isCorrect: true},
										{answer: "Concord", iscorrect: false},
										{answer: "Springfield", isCorrect: false},
										{answer: "Burlington", isCorrect: false} ]},

			{state: "Virginia", answers: [ {answer: "Richmond", isCorrect: true},
										{answer: "Charlottesville", iscorrect: false},
										{answer: "Norfolk", isCorrect: false},
										{answer: "Alexandria", isCorrect: false} ]},

			{state: "Washington", answers: [ {answer: "Olympia", isCorrect: true},
										{answer: "Seattle", iscorrect: false},
										{answer: "Tacoma", isCorrect: false},
										{answer: "Richland", isCorrect: false} ]},

			{state: "West Virginia", answers: [ {answer: "Charleston", isCorrect: true},
										{answer: "Richmond", iscorrect: false},
										{answer: "Charlotte", isCorrect: false},
										{answer: "Columbia", isCorrect: false} ]},

			{state: "Wisconsin", answers: [ {answer: "Madison", isCorrect: true},
										{answer: "Green Bay", iscorrect: false},
										{answer: "Milwaukee", isCorrect: false},
										{answer: "Springfield", isCorrect: false} ]},

			{state: "Wyoming", answers: [ {answer: "Cheyenne", isCorrect: true},
										{answer: "Jackson", iscorrect: false},
										{answer: "Helena", isCorrect: false},
										{answer: "Pierre", isCorrect: false} ]}
];

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
    "Santa Fe", "Albany", "Raleigh", "Bismarck", "Columbus",
    "Oklahoma City", "Salem", "Harrisburg", "Providence", "Columbia",
    "Pierre", "Nashville", "Austin", "Salt Lake City", "Montpelier",
    "Richmond", "Olympia", "Charleston", "Madison", "Cheyenne"
];

var worldCapitals = [
   { country: "Chile", capital: "Santiago"},
   { country: "Finland", capital: "Helsinki"},
   { country: "Afghanistan", capital: "Kabul"},
   { country: "Norway", capital: "Oslo"},
   { country: "Somalia", capital: "Mogadishu"},
   { country: "Kenya", capital: "Nairobi"},
   { country: "Turkey", capital: "Ankara"},
   { country: "France", capital: "Paris"},
   { country: "Russia", capital: "Moscow"},
   { country: "Canada", capital: "Ottawa"},
   { country: "United States", capital: "Washington, D.C."},
   { country: "China", capital: "Beijing"},
   { country: "Japan", capital: "Tokyo"},
   { country: "Phillipines", capital: "Manila"},
   { country: "Brazil", capital: "Brasilia"},
   { country: "Indonesia", capital: "Jakarta"},
   { country: "India", capital: "New Delhi"},
   { country: "Argentina", capital: "Buenos Aires"},
   { country: "Kazakhstan", capital: "Astana"},
   { country: "Ethiopia", capital: "Addis Ababa"},
   { country: "Italy", capital: "Rome"},
   { country: "Taiwan", capital: "Taipei"},
   { country: "Jordan", capital: "Amman"},
   { country: "South Africa", capital: "Pretoria"},
   { country: "Greece", capital: "Athens"},
   { country: "Cuba", capital: "Havana"},
   { country: "Cambodia", capital: "Phnom Penh"},
   { country: "South Korea", capital: "Seoul"},
   { country: "Romania", capital: "Bucharest"},
   { country: "Venezuela", capital: "Caracas"},
   { country: "Morocco", capital: "Rabat"},
   { country: "Austria", capital: "Vienna"},
   { country: "Mexico", capital: "Mexico City"},
   { country: "Saudi Arabia", capital: "Riyadh"},
   { country: "Germany", capital: "Berlin"},
   { country: "Indonesia", capital: "Jakarta"},
   { country: "Sudan", capital: "Khartoum"},
   { country: "Algeria", capital: "Algiers"},
   { country: "Spain", capital: "Madrid"},
   { country: "North Korea", capital: "Pyongyang"},
   { country: "Syria", capital: "Damascus"},
   { country: "Iran", capital: "Tehran"},
   { country: "United Kingdom", capital: "London"},
   { country: "Peru", capital: "Lima"},
   { country: "Thailand", capital: "Bangkok"},
   { country: "Mongolia", capital: "Ulaanbaatar"},
   { country: "Costa Rica", capital: "San Jose"},
   { country: "Australia", capital: "Canberra"},
   { country: "New Zealand", capital: "Wellington"},
   { country: "Honduras", capital: "Tegucigalpa"},
   { country: "Czech Republic", capital: "Prague"},
   { country: "Dominican Republic", capital: "Santo Domingo"},
   { country: "Bulgaria", capital: "Sofia"},
   { country: "Belgium", capital: "Brussels"},
   { country: "Armenia", capital: "Yerevan"},
   { country: "Sierra Leone", capital: "Freetown"},
   { country: "Ireland", capital: "Dublin"},
   { country: "Georgia", capital: "Tbilisi"},
   { country: "Senegal", capital: "Dakar"},
   { country: "Nepal", capital: "Kathmandu"},
   { country: "Guatemala", capital: "Guatemala City"},
   { country: "Haiti", capital: "Port-au-Prince"},
   { country: "Libya", capital: "Tripoli"},
   { country: "Uruguay", capital: "Montevideo"},
   { country: "Poland", capital: "Warsaw"},
   { country: "Belarus", capital: "Minsk"},
   { country: "Uganda", capital: "Kampala"},
   { country: "Ghana", capital: "Accra"},
   { country: "Lebanon", capital: "Beirut"},
   { country: "Sweden", capital: "Stockholm"},
   { country: "Ecuador", capital: "Quito"},
   { country: "Qatar", capital: "Doha"},
   { country: "Yemen", capital: "Sana'a"},
   { country: "Malaysia", capital: "Kuala Lumpur"},
   { country: "Colombia", capital: "Bogota"},
   { country: "Viet Nam", capital: "Hanoi"},
   { country: "Bolivia", capital: "La Paz"},
   { country: "Hungary", capital: "Budapest"},
   { country: "Egypt", capital: "Cairo"},
   { country: "Pakistan", capital: "Islamabad"},
];

// array of indexes for random order of states displayed
var randomStateNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
						 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
						 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
						 41, 42, 43, 44, 45, 46, 47, 48, 49];

var randomState = 0;

// Array to store answer objects for each answer for a given state
var answers = [];

$("#start-button").click(function() {

	$("#start-form").hide();
	$("#start-button").hide();

	if($("#input-easy")[0].checked) {
	
		getQuestions();	
	}

	else if($("#input-hard")[0].checked) {

		game = hardGame;
	}

	else {

		// world capitals
		getWorldQuestions();

	}

	if($("#input-timer-slow")[0].checked) {
		timer = 10;
		originalTimer = timer;
	}

	if($("#input-timer-fast")[0].checked) {
		timer = 5;
		originalTimer = timer;
	}

	maxQuestions = parseInt($("#select-num-questions").val());
	
	play();
});

$(".input").on("click", function() {

	stop();

	evaluateAnswers($(this).find("button").text().toUpperCase());
	displayGameResults(this);

	if (questionCounter < maxQuestions) {

		// setTimeout(refreshForNewQuestion, 1000);
		$("#continue-button").show();
	}

	else {

		$("#message").append("<h3><b>Quiz Complete</b></h3>");

		$("#replay-button").css("display", "block");
		$("#reset-button").css("display", "block");
	}
});

$("#continue-button").click(function() {

	$("#continue-button").hide();
	refreshForNewQuestion();
});

$("#replay-button").click(function() {

	reset();
	refreshForNewQuestion();
});

$("#reset-button").click(function() {

	reset();

	correctAnswer = false;
	isUnanswered = false;

	$("#results").html("");
	$("#timer").html("<h3>Select Options</h3>");
	$("#message").html("");

	$("#start-form").show();
	$("#start-button").show();
});


function refreshForNewQuestion() {

	correctAnswer = false;
	isUnanswered = false;

	timer = originalTimer;

	$("#results").html("");

	play();
}

function reset() {

	$("#replay-button").css("display", "none");
	$("#reset-button").css("display", "none");

	numCorrect = 0;
	numIncorrect = 0;
	numUnanswered = 0;
	questionCounter = 0;

	randomStateNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
						 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
						 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
						 41, 42, 43, 44, 45, 46, 47, 48, 49];
	randomState = 0;
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
 * getQuestions()
 * Builds the game array by first iterating over the states and capitals array, then
 * pushing random capitals into the answers array (after confirming no duplicates).
 * Tedious, but it works.
 */
function getQuestions() {

	game = [];

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
 * getWorldQuestions()
 * Builds the game array by first iterating over the worldCapitals array, then
 * pushing random capitals into the answers array (after confirming no duplicates).
 */
function getWorldQuestions() {

	maxQuestions = worldCapitals.length;

	game = [];

	var tempQuestion = {};
	var tempAnswer = {};

	for(var i = 0; i < worldCapitals.length; i++) {
		
		tempQuestion = {state: worldCapitals[i].country, answers: [{answer: worldCapitals[i].capital, isCorrect: true}]};

		game.push(tempQuestion);

		// add capitals / decoys.

		tempAnswer = {answer: worldCapitals[Math.floor(Math.random() * capitals.length)].capital,
																			isCorrect: false};	

		// if the first random capital is the same as the state capital...
		while (tempAnswer.answer === game[i].answers[0].answer) {

			// get a new random capital..
			tempAnswer = {answer: worldCapitals[Math.floor(Math.random() * capitals.length)].capital,
																			isCorrect: false};	
		}

		// if here, then it must be ok
		game[i].answers.push(tempAnswer);

		// do it again for the third element...
		tempAnswer = {answer: worldCapitals[Math.floor(Math.random() * capitals.length)].capital,
																			isCorrect: false};	

		// if the first random capital is the same as the state capital AND first decoy.
		while (tempAnswer.answer === game[i].answers[0].answer ||
				tempAnswer.answer === game[i].answers[1].answer) {

			// get a new random capital..
			tempAnswer = {answer: worldCapitals[Math.floor(Math.random() * capitals.length)].capital,
																			isCorrect: false};
		}
		
		game[i].answers.push(tempAnswer);

		// and again...
		tempAnswer = {answer: worldCapitals[Math.floor(Math.random() * capitals.length)].capital,
																			isCorrect: false};

		// Check all 3 previous elements...
		while (tempAnswer.answer === game[i].answers[0].answer ||
				tempAnswer.answer === game[i].answers[1].answer ||
				tempAnswer.answer === game[i].answers[2].answer) {


			tempAnswer = {answer: worldCapitals[Math.floor(Math.random() * capitals.length)].capital,
																			isCorrect: false};
		}
		
		game[i].answers.push(tempAnswer);
	}
}

/*
 * askQuestion()
 * Display the state and then randomly display the 4 possible answers.
 */
function askQuestion() {

	randomState = randomStateNumber.splice(Math.floor(Math.random() *
													randomStateNumber.length), 1);
	// capture the correct capital
	correctCapital = game[questionCounter].answers[0];

	var randomNumbers = [0, 1, 2, 3];

	// display the state
	$("#state").html("<h2>" + game[randomState].state + "</h2>");

	// get the 4 possible answers in random order
	for(var i = 0; i < 4; i++) {
		answers[i] = game[randomState].answers[randomNumbers.splice(
							Math.floor(Math.random() * randomNumbers.length), 1)];
	}

	// display the answers
	$(".input").css("min-height", "50px");
	$("#input1").html("<button class=\"answer button button-primary\">" + answers[0].answer + "</button>");
	$("#input2").html("<button class=\"answer button button-primary\">" + answers[1].answer + "</button>");
	$("#input3").html("<button class=\"answer button button-primary\">" + answers[2].answer + "</button>");
	$("#input4").html("<button class=\"answer button button-primary\">" + answers[3].answer + "</button>");

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

	if(answer === answers[0].answer.toUpperCase()) {
		correctAnswer = answers[0].isCorrect;
	}

	else if(answer === answers[1].answer.toUpperCase()) {
		correctAnswer = answers[1].isCorrect;
	}
	else if(answer === answers[2].answer.toUpperCase()) {
		correctAnswer = answers[2].isCorrect;
	}
	else if(answer === answers[3].answer.toUpperCase()) {
		correctAnswer = answers[3].isCorrect;
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

		$("#timer").html("<h2>Unanswered</h2>");
		$("#message").html("<h4>The capital is of <b>" +
					game[randomState].state + "</b> is <b>" +
					game[randomState].answers[0].answer + "</b></h4>");
		numUnanswered++;
		isUnanswered = false;
	}

	else {

		if(correctAnswer) {

			$("#timer").html("<h2>Correct!</h2>");
			numCorrect++;
			correctAnswer = false;
		}

		else {

		$("#timer").html("<h2>Incorrect</h2>");
		$("#message").html("<h4>The capital is of <b>" +
					game[randomState].state + "</b> is <b>" +
					game[randomState].answers[0].answer + "</b></h4>");
		numIncorrect++;
		correctAnswer = false;
		}
	}

	$("#results").html("<h5>Correct Answers: " + numCorrect + "</h5>");
	$("#results").append("<h5>Incorrect Answers: " + numIncorrect + "</h5>");
	$("#results").append("<h5>Unanswered: " + numUnanswered + "</h5>");
}

/*
 * timer functions
 */
function decrement() {

	timer--;

	var time = timeConverter(timer);

	$("#timer").html("<h2>" + time + "</h2>");

	if(timer === 0) {

		stop();

		isUnanswered = true;

		displayGameResults();

		if (questionCounter < maxQuestions) {

			// setTimeout(refreshForNewQuestion, 1000);
			$("#continue-button").show();
		}

		else {

			$("#message").append("<h3><b>Quiz Complete</b></h3>");
			$("#reset-button").show();
			$("#replay-button").show();
		}
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