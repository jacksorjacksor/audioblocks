// ********
// VARIABLES
// ********
// Start page:
const start_btn = document.getElementById('start-btn');
const restart_btn = document.getElementById('restart-btn');
const screens = document.querySelectorAll('.screen');
const audio_btn = document.querySelectorAll('.btn-audio');
// ********
// EVENT LISTENERS
// ********
// Start of the game
start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
  setGame();
});

audio_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      btn.classList.remove('active');
      btn.querySelector('audio').volume === 0;
    } else {
      btn.classList.add('active');
      btn.querySelector('audio').volume === 0;
    }
  });
});
