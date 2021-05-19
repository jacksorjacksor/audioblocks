// ********
// VARIABLES
// ********
// Start page:
const start_btn = document.getElementById('start-btn');
const restart_btn = document.getElementById('restart-btn');
const screens = document.querySelectorAll('.screen');

// Main page:
const bird_array_master = [
  'blackbird',
  'blackcap',
  'chaffinch',
  'chiffchaff',
  'coaltit',
  'dunnock',
  'greenfinch',
  'magpie',
  'robin',
  'sparrow',
  'starling',
  'wren',
];

const choose_bird_btns = document.querySelectorAll('.choose-bird-btn');
const bird_song_player = document.querySelector('#bird-song-player');

let bird_array = [];
let previous_bird = '';
let secret_bird = '';
let selected_bird = {};
let playing = true;
let index = 0;

// ********
// FUNCTIONS
// ********
function setGame() {
  resetGame();
  setSecretBird();
  setPossibleBirds();
}

function resetGame() {
  previous_bird = secret_bird;
  playing = true;
  bird_song_player.src = '';
  choose_bird_btns.forEach((e) => {
    e.classList.remove('correct-answer', 'incorrect-answer');
    e.querySelector('p').classList.remove('correct-answer-text');
    e.querySelector('p').innerText = '';
  });
}

function setSecretBird() {
  // Reset the bird array
  bird_array = Array.from(bird_array_master);
  // Set a Secret bird that wasn't the previous one
  while (secret_bird === previous_bird) {
    index = Math.floor(Math.random() * bird_array.length);
    secret_bird = bird_array[index];
  }
  bird_array.splice(index, 1);
  // Set the music
  bird_song_player.src = `audio/${secret_bird}.mp3`;
  bird_song_player.play();
}

function setPossibleBirds() {
  // Make one of the boxes the answer
  index = Math.floor(Math.random() * choose_bird_btns.length);
  const secret_bird_button = choose_bird_btns[index];
  secret_bird_button.querySelector('img').src = `img/${secret_bird}.jpg`;
  secret_bird_button.querySelector('img').alt = `${secret_bird}`;
  secret_bird_button.querySelector('p').innerText = `${secret_bird}`;

  // Then fill up the other boxes with other possible birds
  choose_bird_btns.forEach((e) => {
    if (e.querySelector('p').innerText === '') {
      index = Math.floor(Math.random() * bird_array.length);
      e.querySelector('p').innerText = bird_array[index];
      e.querySelector('img').src = `img/${bird_array[index]}.jpg`;
      e.querySelector('img').alt = `${secret_bird}`;
      bird_array.splice(index, 1);
    }
  });
}

// ********
// EVENT LISTENERS
// ********
// Start of the game
start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
  setGame();
});

restart_btn.addEventListener('click', () => {
  setGame();
});

// Main business:
choose_bird_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (playing) {
      // If the inner text matches the secret bird then success conditions, else failures
      if (
        !btn
          .querySelector('p')
          .innerText.localeCompare(secret_bird, 'en', { sensitivity: 'base' })
      ) {
        btn.classList.add('correct-answer');
        btn.querySelector('p').classList.add('correct-answer-text');
      } else {
        btn.classList.add('incorrect-answer');
        choose_bird_btns.forEach((e) => {
          if (
            !e.querySelector('p').innerText.localeCompare(secret_bird, 'en', {
              sensitivity: 'base',
            })
          ) {
            e.classList.add('correct-answer');
            e.querySelector('p').classList.add('correct-answer-text');
          }
        });
      }
      playing = false;
    }
  });
});
