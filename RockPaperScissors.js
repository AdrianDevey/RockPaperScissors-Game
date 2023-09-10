function playgame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock'){
    if (computerMove === 'rock'){
      result = 'Tie.';
    } 

    else if(computerMove === 'paper'){
      result = 'You lose.';
    }

    else if(computerMove === 'scissors'){
      result = 'You win.';
    }
  }

  else if (playerMove === 'paper'){
    if (computerMove === 'rock'){
      result = 'You win.';
    } 

    else if(computerMove === 'paper'){
      result = 'Tie.';
    }

    else if(computerMove === 'scissors'){
      result = 'You lose.';
    }
  }

  else if (playerMove === 'scissors'){
    if (computerMove === 'rock'){
      result = 'You lose.';
    } 

    else if(computerMove === 'paper'){
      result = 'You win.';
    }

    else if(computerMove === 'scissors'){
      result = 'Tie.';
    }
  }

  // result

  if (result === 'You win.'){
    score.wins++;
  }
  else if (result === 'You lose.'){
    score.losses++;
  }
  else if (result === 'Tie.'){
    score.ties++;
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-results').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You <img src="img/${playerMove}-emoji.png" class="icons">   VS   <img src="img/${computerMove}-emoji.png" class="icons"> Computer`;
}

function pickComputerMove(){
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3){
    computerMove = 'rock';
  }
  else if (randomNumber >= 1/3 && randomNumber < 2/3){
    computerMove  = 'paper';
  }
  else if(randomNumber >= 2/3 && randomNumber <= 1){
    computerMove = 'scissors';
  }

  return computerMove
}

function resetButton(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-results').innerHTML = "You reset the scoreboard.";

  document.querySelector('.js-moves').innerHTML = `<img src="img/hands-up.png" class="reset-icon">`;

}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML =  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


let isAutoPlaying = false;
let intervalId;

function autoPlay(){
  if (!isAutoPlaying){
    intervalId = setInterval(function(){
      const playerMove = pickComputerMove();
      playgame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    const stopped = document.querySelector('.js-autoplay').innerHTML = 'Stop';

  }
  else{
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-autoplay').innerHTML = 'Auto Play';
  }
  
}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();