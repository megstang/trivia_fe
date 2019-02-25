var correct_answers = []

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

function playGame(){
  var num = document.getElementById('number-of-questions').value;
  var category = document.getElementById('category').value;
  var difficulty = document.getElementById('difficulty').value.toLowerCase();
  fetch(`https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=multiple`)
    .then(function(response) {
			return response.json();
		})
		.then((response) => {
      debugger;
			displayQuestions(response.results)
		})
    .catch((error)=> {
      console.log(error)
    })
}

function displayQuestions(questionsArray){
  hide(document.getElementById('game-form'));
  show(document.getElementById('display-questions'));
  var questionNumber=1
  questionsArray.forEach(function(element) {
    correct_answers.push(element.correct_answer);
    element.incorrect_answers.push(element.correct_answer);
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("actual-question").innerHTML = element.question
    document.getElementById("mc-1").innerHTML = element.incorrect_answers[0]
    document.getElementById("mc-2").innerHTML = element.incorrect_answers[1]
    document.getElementById("mc-3").innerHTML = element.incorrect_answers[2]
    document.getElementById("mc-4").innerHTML = element.incorrect_answers[3]
    debugger;
    $("#mc-1").on("click",function(){
        if (document.getElementById('mc-1').innerHTML == element.correct_answer){
          alert("Correct!")
        }
        else{
          alert("Incorrect!")
        }
    });
    $("#mc-2").on("click",function(){
        if (document.getElementById('mc-1').innerHTML == element.correct_answer){
          alert("Correct!")
        }
        else{
          alert("Incorrect!")
        }
    });
    $("#mc-3").on("click",function(){
        if (document.getElementById('mc-1').innerHTML == element.correct_answer){
          alert("Correct!")
        }
        else{
          alert("Incorrect!")
        }
    });
    $("#mc-4").on("click",function(){
        if (document.getElementById('mc-1').innerHTML == element.correct_answer){
          alert("Correct!")
        }
        else{
          alert("Incorrect!")
        }
    });
  })
}

function checkAnswer(){
  debugger;
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
  if (nameInput && emailInput && (passwordInput == passwordConfirmationInput)) {
    debugger;
    var a = fetch('https://smartie-pants-trivia.herokuapp.com/api/v1/users',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        password_confirmation: passwordConfirmationInput,
      })
    })
    .then(function(response) {
      handleResponse(response);
    })
    debugger;
    // .then((response)=>{
    //   debugger;
    //   logInUser(response);
    // });
  }
}

function logInUser(){
  debugger;
}
