var correct_answers = []
var triviaQuestions = []
var questionNumber=1
var amountCorrect = 0

var show = function (elem) {
	elem.classList.add('is-visible');
};

var hide = function (elem) {
	elem.classList.remove('is-visible');
};

var toggle = function (elem) {
	elem.classList.toggle('is-visible');
};

welcomeScreen();

function register(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  show(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
}

function game(){
  document.getElementById("nav-home").classList.remove('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('logIn-page'));

}

function welcomeScreen(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  show(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
  hide(document.getElementById('game-form'))
  hide(document.getElementById('display-questions'));
  hide(document.getElementById('play-again-page'))

}

function loggedInHome(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('logIn-page'));
  displayGameForm();
}

function logIn(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  show(document.getElementById('logIn-page'));
}

function displayGameForm(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
  show(document.getElementById('game-form'))
}

function endGame(){
  document.getElementById("nav-home").classList.remove('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
  hide(document.getElementById('game-form'))
  hide(document.getElementById('display-questions'));
  show(document.getElementById('play-again-page'));
}

function playAgain(){
  updateUserScore();
  correct_answers = []
  triviaQuestions = []
  questionNumber = 1
  amountCorrect = 0
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
  show(document.getElementById('game-form'))
  hide(document.getElementById('play-again-page'));
}

function updateUserScore(){
  var token = localStorage.getItem("session_token")
  var a = fetch('https://smartie-pants-trivia.herokuapp.com/api/v1/score',{
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      session_token: token,
      score: amountCorrect,
    })
  })
}

function playGame(){
  var num = document.getElementById('number-of-questions').value;
  var category = document.getElementById('category').value;
  var difficulty = document.getElementById('difficulty').value.toLowerCase();
  fetch(`https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(function(response) {
			return response.json();
		})
		.then((response) => {
			saveQuestions(response.results)
		})
    .catch((error)=> {
      console.log(error)
    })
}

function saveQuestions(questionsArray){
  triviaQuestions.push(questionsArray);
  document.getElementById("category-title").innerHTML = questionsArray[0].category;
  document.getElementById("difficulty-title").innerHTML = `(${questionsArray[0].difficulty})`;
  displayQuestions();
}

function displayQuestions(){
  hide(document.getElementById('game-form'));
  show(document.getElementById('display-questions'));
  var element = triviaQuestions[0][0]
  if (triviaQuestions[0].length != 0){
    correct_answers.push(element.correct_answer);
    element.incorrect_answers.push(element.correct_answer);
    element.incorrect_answers.sort();
    document.getElementById("question-number").innerHTML = `Question # ${questionNumber}`
    document.getElementById("actual-question").innerHTML = element.question
    document.getElementById("mc-1").innerHTML = element.incorrect_answers[0]
    document.getElementById("mc-2").innerHTML = element.incorrect_answers[1]
    document.getElementById("mc-3").innerHTML = element.incorrect_answers[2]
    document.getElementById("mc-4").innerHTML = element.incorrect_answers[3]
  }
  else{
    document.getElementById('amount-correct').innerHTML = `You got ${amountCorrect} answers correct, scoring you ${amountCorrect} points!`
    endGame()
  }
    questionNumber += 1
}

function checkAnswer(guessId){
  var guess = document.getElementById(guessId).innerHTML;
  var answer = correct_answers.slice(-1).pop();
  if (guess == answer){
    alert('Correct!');
    amountCorrect += 1;
    triviaQuestions[0].shift();
    displayQuestions();
  }
  else{
    alert(`Incorrect! The correct answer was "${answer}"`);
    triviaQuestions[0].shift();
    displayQuestions();
  }
}

function handleResponse(response) {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        }
        return Promise.reject(error)
      }
      return json
    })
};

function registerUser(){
  var nameInput = document.getElementById('name-register').value;
  var emailInput = document.getElementById('email-register').value;
  var passwordInput = document.getElementById('password-register').value;
  var passwordConfirmationInput = document.getElementById('password-confirmation-register').value;
  debugger;
  if (nameInput && emailInput && (passwordInput == passwordConfirmationInput)) {
    fetch("https://smartie-pants-trivia.herokuapp.com/api/v1/users",{
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        password_confirmation: passwordConfirmationInput
      })
    })
    .then(response => handleResponse(response))
    .then(response => saveSessionToken(response))
  }
}
function saveSessionToken(response){
  debugger;
  var token = response.data.attributes.session_token;
  localStorage.setItem("session_token", token);
  displayGameForm();
}

function logInUser(){
  var emailInput = document.getElementById('email-login').value;
  var passwordInput = document.getElementById('password-login').value;
  debugger;
  fetch("https://smartie-pants-trivia.herokuapp.com/api/v1/sessions",{
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify({
      email: emailInput,
      password: passwordInput
    })
  })
  .then(response => handleResponse(response))
  .then(response => saveSessionToken(response))
}
