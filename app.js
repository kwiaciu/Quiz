let state = {
	items: [],
	currentQuestion: 0,
	correctAnswers: 0,
	wrongAnswers: 0,
};

//1. Czy mogę użyć 'this' albo czegoś innego żeby w correct dać link to odpowiedzi?
let quizQuestion1 = {
	question: 'How much is 2x2?',
	answer1: '2',
	answer2: '3',
	answer3: '4',
	answer4: '5',
	correct: '4',
}

let quizQuestion2 = {
	question: 'Correct reponse to "Hello there"?',
	answer1: 'Hi',
	answer2: 'Hello',
	answer3: 'Hey',
	answer4: 'General Kenobi',
	correct: 'General Kenobi',
}

let quizQuestion3 = {
	question: 'Answer to life, the universe and everything else?',
	answer1: '42',
	answer2: 'Potato',
	answer3: 'Space',
	answer4: 'Pizza',
	correct: '42',
}

let quizQuestion4 = {
	question: 'Another generic question?',
	answer1: 'Yes, it is',
	answer2: 'Generic answer',
	answer3: 'Another generic answer',
	answer4: 'Correct answer',
	correct: 'Correct answer',
}

let quizQuestion5 = {
	question: 'Best food?',
	answer1: 'Borgar',
	answer2: 'Potato',
	answer3: 'Pizza',
	answer4: 'Bacon pancakes',
	correct: 'Pizza',
}





//quizQuestion in form of object
let addItem = function(state, quizQuestion) {
	state.items.push(quizQuestion);
}

addItem(state,quizQuestion1);
addItem(state,quizQuestion2);
addItem(state,quizQuestion3);
addItem(state,quizQuestion4);
addItem(state,quizQuestion5);



//handle start quiz
$('#start-quiz').click(function(event){
	event.preventDefault();
	$('.results').addClass('hidden');
	$('.quiz').removeClass('hidden');
	state.currentQuestion = 0;
	state.correctAnswers = 0;
	state.wrongAnswers = 0;

	$('label').removeClass('correct wrong');
	$('input[name="answer"]').attr('disabled', false);

	$('#js-check').attr('disabled', false);
	$('#js-results').addClass('hidden');
	$('#js-next').removeClass('hidden');

	prepareQuestion(state,state.currentQuestion);

});

let prepareQuestion = function(state,questionNumber){
	const questionObject = state.items[questionNumber];

	$('.question-label').text(questionObject.question);

	$('.js-answer1').text(questionObject.answer1);
	$('#answer1').attr('value',questionObject.answer1);

	$('.js-answer2').text(questionObject.answer2);
	$('#answer2').attr('value',questionObject.answer2);

	$('.js-answer3').text(questionObject.answer3);
	$('#answer3').attr('value',questionObject.answer3);

	$('.js-answer4').text(questionObject.answer4);
	$('#answer4').attr('value',questionObject.answer4);

	$('.progress').text('Current question: '+(state.currentQuestion+1)+'/'+state.items.length);
	$('.current-result').html('Current result:<br>'+ state.correctAnswers +' correct answers<br>'+state.wrongAnswers+' wrong answers');
	$('#js-next').attr('disabled', true);



};

//check answer
$('#js-check').click(function(event){
	event.preventDefault();
	let pickedAnswer = $('input[name="answer"]:checked').val();
	$('input[name="answer"]').attr('disabled', true);
	$('#js-check').attr('disabled', true);



	if (pickedAnswer===state.items[state.currentQuestion].correct) {
		$('input[name="answer"]:checked').parent('label').addClass('correct');
		state.correctAnswers++;
	}

	else {
		$('input[name="answer"]:checked').parent('label').addClass('wrong');
		state.wrongAnswers++;

		//show correct answer
		for (var i = 1; i <= 4; i++) {
			if($('#answer'+i).val()===state.items[state.currentQuestion].correct) {
			 	$('#answer'+i).parent('label').addClass('correct');
		 }
	}

	}

	$('.current-result').html('Current result:<br>'+ state.correctAnswers +' correct answers<br>'+state.wrongAnswers+' wrong answers');
	state.currentQuestion++;

	//last question case
	if (state.currentQuestion!==state.items.length) {
		$('#js-next').attr('disabled', false);
	} else {
		$('#js-results').attr('disabled', false);
		$('.final-result').html('Overall score:<br>'+state.correctAnswers +' correct answers<br>'+state.wrongAnswers+' wrong answers');

	}



});


//next question - 2. CZemu przy => nie można użyć this?
$('#js-next').click(function(event){
	console.log(this);
	event.preventDefault();
	$('label').removeClass('correct wrong');
	$('input[name="answer"]').attr('disabled', false);

	// excuse me wtf?
	$('#answer1').attr('checked', true);
	$('#answer1').removeAttr('checked');

	$('#js-check').attr('disabled', false);
	prepareQuestion(state,state.currentQuestion);
	
	if (state.currentQuestion===state.items.length-1) {
		$('#js-next').addClass('hidden');
		$('#js-results').removeClass('hidden');
		$('#js-results').attr('disabled', true);

	}
	});

$('#js-results').click(function(event){
	event.preventDefault();
	$('.quiz').addClass('hidden');
	$('.results').removeClass('hidden');
	$('.final-result').removeClass('hidden');

});
