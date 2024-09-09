let score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  const savedScore = JSON.parse(localStorage.getItem('score'));
  if (savedScore) {
    score = savedScore;
  }

  updateScoreElement();


let isAutoPlaying=false;



let  intervalId;
 function autoPlay(){
    if(!isAutoPlaying){
    intervalId=   setInterval(function(){
        const playerMove=pickComputerMove();
        makeMove(playerMove);
      },1000);

      isAutoPlaying=true;
    }else {
    clearInterval( intervalId);
     isAutoPlaying=false;
    }
   
 }




  function makeMove(playerMove) {
    const computerMove = pickComputerMove();
    const resultElement = document.querySelector('.js-result');

    if (playerMove === computerMove) {
      resultElement.innerHTML = `Tie.`;
      score.ties += 1;

    } else if (
      (playerMove === 'rock' && computerMove === 'scissors') ||
      (playerMove === 'paper' && computerMove === 'rock') ||
      (playerMove === 'scissors' && computerMove === 'paper')
    ) {
      resultElement.innerHTML = `You win.`;
      score.wins += 1;

    } else {
      resultElement.innerHTML = `You lose.`;
      score.losses += 1;
    }

    const movesElement = document.querySelector('.js-moves-chosen');
    movesElement.innerHTML = `
    You
    <img   class="icon" src="${playerMove}-emoji.png" alt="">
    <img   class="icon"  src="${computerMove}-emoji.png" alt="">
 
    computer
    `;

    updateScoreElement();
    localStorage.setItem('score', JSON.stringify(score));
  }

  function resetScore() {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };

    updateScoreElement();
    localStorage.removeItem('score');
  }

  function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove;

    if (randomNumber < (1 / 3)) {
      computerMove = 'rock';
    } else if (randomNumber < (2 / 3)) {
      computerMove = 'paper';
    } else {
      computerMove = 'scissors';
    }

    return computerMove;
  }

  function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `
      Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}
    `;
  }