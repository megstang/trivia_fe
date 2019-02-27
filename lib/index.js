var correct_answers = []
var triviaQuestions = []
var questionNumber=1
var amountCorrect = 0
localStorage.setItem("session_token", "");

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
  hide(document.getElementById('games-played-page'));
}

function game(){
  document.getElementById("nav-home").classList.remove('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('logIn-page'));
  hide(document.getElementById('games-played-page'));
}

function welcomeScreen(){
  if (localStorage.getItem("session_token") == ""){
    document.getElementById("nav-home").classList.add('active');
    document.getElementById("nav-games").classList.remove('active');
    document.getElementById("nav-board").classList.remove('active');
    hide(document.getElementById('registration-page'));
    show(document.getElementById('welcome-page'));
    hide(document.getElementById('logIn-page'));
    hide(document.getElementById('game-form'))
    hide(document.getElementById('display-questions'));
    hide(document.getElementById('play-again-page'))
    hide(document.getElementById('games-played-page'));
  }
  else{
    displayGameForm();
  }
}

function logOut(){
  localStorage.setItem("session_token", "");
  welcomeScreen();
}

function loggedInHome(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('logIn-page'));
  displayGameForm();
  hide(document.getElementById('games-played-page'));
  hide(document.getElementById('leaderboard-page'));
}

function logIn(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  show(document.getElementById('logIn-page'));
  hide(document.getElementById('games-played-page'));
  hide(document.getElementById('leaderboard-page'));
}

function displayGameForm(){
  document.getElementById("nav-home").classList.add('active');
  document.getElementById("nav-games").classList.remove('active');
  document.getElementById("nav-board").classList.remove('active');
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
  show(document.getElementById('game-form'));
  hide(document.getElementById('games-played-page'));
  hide(document.getElementById('leaderboard-page'));
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
  hide(document.getElementById('leaderboard-page'));
  show(document.getElementById('play-again-page'));
  hide(document.getElementById('games-played-page'));
}

function myGames(){
  if(localStorage.getItem("session_token") == ""){
    document.getElementById('error-must-log-in').innerHTML = "Sign in to view your game history.";
    hideAllContent();
    show(document.getElementById('games-played-page'));
  }
  else{
    document.getElementById('error-must-log-in').innerHTML = "";
    displayGames();
    document.getElementById("nav-home").classList.remove('active');
    document.getElementById("nav-games").classList.add('active');
    document.getElementById("nav-board").classList.remove('active');
    hide(document.getElementById('registration-page'));
    hide(document.getElementById('welcome-page'));
    hide(document.getElementById('logIn-page'));
    hide(document.getElementById('game-form'))
    hide(document.getElementById('display-questions'));
    hide(document.getElementById('play-again-page'));
    hide(document.getElementById('leaderboard-page'));
    show(document.getElementById('games-played-page'));
  }
}

function leaderBoard(){
  if(localStorage.getItem("session_token") == ""){
    document.getElementById('lb-must-log-in').innerHTML = "Sign in to view the Leaderboard.";
    hideAllContent();
    show(document.getElementById('leaderboard-page'));
  }
  else{
    document.getElementById('error-must-log-in').innerHTML = "";
    document.getElementById('lb-must-log-in').innerHTML = "";
    displayLeaderBoard();
    document.getElementById("nav-home").classList.remove('active');
    document.getElementById("nav-games").classList.remove('active');
    document.getElementById("nav-board").classList.add('active');
    hide(document.getElementById('registration-page'));
    hide(document.getElementById('welcome-page'));
    hide(document.getElementById('logIn-page'));
    hide(document.getElementById('game-form'))
    hide(document.getElementById('display-questions'));
    hide(document.getElementById('play-again-page'));
    hide(document.getElementById('games-played-page'));
    show(document.getElementById('leaderboard-page'));
  }
}

function hideAllContent(){
  hide(document.getElementById('registration-page'));
  hide(document.getElementById('welcome-page'));
  hide(document.getElementById('logIn-page'));
  hide(document.getElementById('game-form'))
  hide(document.getElementById('display-questions'));
  hide(document.getElementById('play-again-page'));
  hide(document.getElementById('games-played-page'));
  hide(document.getElementById('leaderboard-page'));
}

function displayGames(){
  var token = localStorage.getItem("session_token")
  fetch(`https://smartie-pants-trivia.herokuapp.com/api/v1/games?session_token=${token}`)
  .then(response => handleResponse(response))
  .then((response)=> {
    gameTable(response.data);
  })
}

function displayLeaderBoard(){
  fetch("https://smartie-pants-trivia.herokuapp.com/api/v1/users")
  .then(response => handleResponse(response))
  .then((response)=> {
    leaderBoardTable(response.data);
  })
}

function leaderBoardTable(users){
  var table = document.getElementById("leaderboard-table");
  var i = 1;
  users.forEach(function(user) {
    if (document.getElementById(`user-entry-${i}`) != null){
      clearRow(table,i);
    }
    else {
      var name = user.attributes.name;
      var email = user.attributes.email;
      var total_points = user.attributes["score"];
      $(table).append(`
        <tr id ="user-entry-${i}" >
          <td>${i}</td>
          <td>${name}</td>
          <td>${email}</td>
          <td>${total_points}</td>
        </tr>
      `)
      i+=1
    }
  });
}

function clearRow(table,i){
  $(table).append(`
    <tr id ="user-entry-${i}" >
    </tr>
  `)
}

function gameTable(game_data){
  var table = document.getElementById("games-played-table")
  if (document.getElementById('headers')== null){
    $(table).append(`
      <tr id = "headers">
        <th>Category</th>
        <th>Difficulty</th>
        <th>Correct</th>
        <th>Percent</th>
      </tr>`)
    }
  game_data.forEach(function(game) {
    var id = game.id
    if (document.getElementById(`game-entry-${id}`)== null){
      var category = game.attributes.category;
      var level = game.attributes.difficulty;
      var correct = game.attributes.correct;
      var num_questions = game.attributes.num_questions;
      var percent = Math.round(correct/num_questions * 100)
      $(table).append(`
        <tr id ="game-entry-${id}" >
          <td>${category}</td>
          <td>${level}</td>
          <td>${correct}/${num_questions}</td>
          <td>${percent}%</td>
        </tr>
      `)
    }
});
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
  hide(document.getElementById('games-played-page'));
}

function saveGamePlayed(){
  var token = localStorage.getItem("session_token")
  var num = document.getElementById('number-of-questions').value;
  var category_name = categoryName(document.getElementById('category').value);
  var difficulty = document.getElementById('difficulty').value.toLowerCase();
  fetch('https://smartie-pants-trivia.herokuapp.com/api/v1/games',{
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      session_token: token,
      correct: amountCorrect,
      difficulty: difficulty,
      num_questions: num,
      category: category_name
    })
  })
  .then(function(response) {
    return response.json();
  })
}


function updateUserScore(){
  var token = localStorage.getItem("session_token")
  fetch('https://smartie-pants-trivia.herokuapp.com/api/v1/score',{
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
      alert("There are not enough questions in this category for your selection. Please select a different category, or a lower number.");
      playAgain();
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
    document.getElementById('number-correct').innerHTML = amountCorrect
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
    saveGamePlayed();
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
  document.getElementById('log-out').innerHTML = "Log Out"
  var token = response.data.attributes.session_token;
  localStorage.setItem("session_token", token);
  displayGameForm();
}

function logInUser(){
  var emailInput = document.getElementById('email-login').value;
  var passwordInput = document.getElementById('password-login').value;
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
  .catch(error => alert("We can't seem to find you in the system. Please try your email and password again, or register for a new account."))
}

function checkbox(){
  var x = document.getElementById("password-login");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

function categoryName(value){
  if (value ==9 ){return "General Knowledge"}
  else if(value ==10){ return "Entertainment: Books"}
  else if(value ==11){ return "Entertainment: Film"}
  else if(value ==12){ return "Entertainment: Music"}
  else if(value ==13){ return "Entertainment: Musicals & Theatres"}
  else if(value ==14){ return "Entertainment: Television"}
  else if(value ==15){ return "Entertainment: Video Games"}
  else if(value ==16){ return "Entertainment: Board Games"}
  else if(value ==17){ return "Science & Nature"}
  else if(value ==18){ return "Science: Computers"}
  else if(value ==19){ return "Science: Math"}
  else if(value ==20){ return "Mythology"}
  else if(value ==21){ return "Sports"}
  else if(value ==22){ return "Geography"}
  else if(value ==23){ return "History"}
  else if(value ==24){ return "Politics"}
  else if(value ==25){ return "Art"}
  else if(value ==26){ return "Celebrities"}
  else if(value ==27){ return "Animals"}
  else if(value ==28){ return "Vehicles"}
  else if(value ==29){ return "Entertainment: Comics"}
  else if(value ==30){ return "Science: Gadgets"}
  else if(value ==31){ return "Entertainment: Japanese Anime & Manga"}
  else { return "Entertainment: Cartoon & Animations"}
}
