// ********
// VARIABLES
// ********
// Start page:
const start_btn = document.getElementById('start-btn');
const screens = document.querySelectorAll('.screen');
const audio_btn = document.querySelectorAll('.btn-audio');
const restart_btn = document.getElementById('restart-btn');
const reset_btn = document.getElementById('reset-btn');
const pause_start_btn = document.getElementById('pause-start-btn');
// ********
// EVENT LISTENERS
// ********
// Start of the game
start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
  setGame();
});

function setGame() {
  audio_btn.forEach((btn) => {
    let aud = btn.querySelector('audio');
    aud.pause();
    aud.currentTime = 0;
    if (aud.id === 'audio-layer1') {
      aud.volume = 1;
      btn.classList.add('active');
    } else {
      aud.volume = 0;
      btn.classList.remove('active');
    }
    aud.play();
  });
}

function pauseAllTracks() {
  audio_btn.forEach((btn) => {
    btn.querySelector('audio').pause();
  });
}

function playAllTracks() {
  audio_btn.forEach((btn) => {
    btn.querySelector('audio').play();
  });
}

audio_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      console.log(`Deactivate ${btn.classList}`);
      btn.classList.remove('active');
      btn.querySelector('audio').volume = 0;
    } else {
      console.log(`Activate ${btn.classList}`);
      btn.classList.add('active');
      btn.querySelector('audio').volume = 1;
    }
  });
});

restart_btn.addEventListener('click', () => {
  audio_btn.forEach((btn) => {
    let aud = btn.querySelector('audio');
    aud.currentTime = 0;
    aud.play();
  });
});

reset_btn.addEventListener('click', () => {
  setGame();
});

pause_start_btn.addEventListener('click', (e) => {
  if (e.target.classList.contains('pause')) {
    console.log('Pause => Play');
    pauseAllTracks();
    e.target.classList.remove('pause');
    e.target.classList.add('play');
    e.target.innerText = 'Play';
  } else {
    playAllTracks();
    console.log('Play => Pause');
    e.target.classList.add('pause');
    e.target.classList.remove('play');
    e.target.innerText = 'Pause';
  }
});
