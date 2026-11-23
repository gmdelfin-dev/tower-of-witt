const bgMusic = new Audio('tow-music/marimba-game-music.mp3');
bgMusic.loop = true;    // play again and again
bgMusic.volume = 0.4;   // 0 is silent, 1 is full volume

// continue from the saved second (nothing saved = start from 0)
const savedTime = localStorage.getItem('towMusicTime');
if (savedTime !== null) {
    bgMusic.currentTime = Number(savedTime);
}

// was the music muted on the last page?
let isMuted = (localStorage.getItem('towMuted') === 'yes');
bgMusic.muted = isMuted;

// the mute button in style
const muteButton = document.createElement('button');
muteButton.id = 'mute-button';
muteButton.type = 'button';
document.body.appendChild(muteButton);

// showmuteicon -> the icon follows the state
function showMuteIcon() {
    if (isMuted) {
        muteButton.textContent = '🔇';
        muteButton.title = 'Unmute music';
    } else {
        muteButton.textContent = '🔊';
        muteButton.title = 'Mute music';
    }
}
showMuteIcon();

// click -> switch between muted and not muted, and remember it
muteButton.addEventListener('click', function () {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    if (isMuted) {
        localStorage.setItem('towMuted', 'yes');
    } else {
        localStorage.setItem('towMuted', 'no');
    }
    showMuteIcon();
});

/* the browser blocks music until the player clicks or presses a key,
* so we start it on the first click or key press */
function playMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
    }
}
document.addEventListener('click', playMusic);
document.addEventListener('keydown', playMusic);

// save the second every 0.5 second
setInterval(function () {
    localStorage.setItem('towMusicTime', bgMusic.currentTime);
}, 500);