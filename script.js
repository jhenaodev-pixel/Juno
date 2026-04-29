/* ═══════════════════════════════════════════════════════
   BIRTHDAY DEDICATION — script.js
   ═══════════════════════════════════════════════════════
   🎨 CUSTOMIZE: Edit the CONFIG object below.
   ═══════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────
   CONFIG — change anything here to personalize the page
   ────────────────────────────────────────────────────────*/
const CONFIG = {
  /* ── Date ─────────────────────────────────────────────
     Unlock date: month is 0-indexed (3 = April).
     The page unlocks when the LOCAL clock hits this date. */
  unlockMonth: 3,   // 0 = Jan … 3 = Apr
  unlockDay:   29,

  /* ── Personalization ──────────────────────────────── */
  name:          'Querida Juno',                // Shown in the big header
  letterDate:    '29 de Abril, 2025',     // Date printed on the letter
  letterGreeting:'Mi persona favorita,',  // Letter salutation

  /* ── Letter body: array of paragraph strings ─────── */
  letterParagraphs: [
    'Ninguna batalla librada en este mundo ha sido tan agónica como esta: mirarte a los ojos y no caer rendido, no doblar la rodilla, no confesarlo todo. Pero es una derrota inevitable, una que no temo, que en mis sueños más íntimos busco y repito y anhelo.',
    'La esperanza enmarca mis días y la melancolía se instala en mi pecho como el eco de un nombre que no puedo callar. No existe sinfonía más perfecta, ni oda más digna a todo cuanto existe, que el milagro de tenerte cerca, tan cerca que me quema, tan cerca que respiro',
    'Si algo es cierto en esta vida, es que Dios existe, y cuando te creó nos miró a todos con misericordia. Te puso en este mundo como la prueba de que la belleza no es solo un sueño, y el mundo, siempre, será mejor contigo en él. Eres la mayor fortuna que pudo darme.',
    'Con todo el cariño del mundo, Henao ♡ — Feliz cumpleaños',
  ],

  letterClosing:   'Feliz día desde el fondo de mi corazón,', 
  letterSignature: 'el ex que más te quiere🌸',

  /* ── Music playlist ──────────────────────────────────
     Each entry: { title, src }
     For YouTube links we extract the audio via a CORS-
     compatible embed URL. Since YouTube's direct stream
     is not accessible, we use a third-party proxy format
     that works in most browsers. You can also add direct
     MP3 URLs as fallbacks.                              */
  playlist: [
    {
      title: 'Quiéreme - Camilo',
      // We'll use YouTube embed audio extraction trick
      youtubeId: 'u8MA_WNkV9M',
      // Direct embed src used in the iframe approach
      src: null
    },
    {
      title: 'Perfect - Ed Sheeran',
      youtubeId: '2Vv-BfVoq4g',
      src: null
    },
    {
      title: 'All of Me - John Legend',
      youtubeId: '450p7goxZqg',
      src: null
    },
  ],

  /* ── Petals ──────────────────────────────────────────*/
  petalEmojis:  ['🌸', '🌺', '🌷', '✿', '❀'],
  petalCount:   18,
};

/* ═══════════════════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  spawnPetals();
  checkUnlock();
  setInterval(checkUnlock, 1000);
});

/* ─── Apply CONFIG values to DOM ─── */
function applyConfig() {
  // Header name
  setText('cfg-name', CONFIG.name);

  // Letter fields
  setText('cfg-date',         CONFIG.letterDate);
  setText('cfg-letter-title', CONFIG.letterGreeting);
  setText('cfg-closing',      CONFIG.letterClosing);
  setText('cfg-signature',    CONFIG.letterSignature);

  // Letter body paragraphs
  const bodyEl = document.getElementById('cfg-letter-body');
  bodyEl.innerHTML = CONFIG.letterParagraphs
    .map(p => `<p>${p}</p>`)
    .join('');
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* ═══════════════════════════════════════════════════════
   UNLOCK LOGIC
   ═══════════════════════════════════════════════════════ */
let unlocked = false;

function checkUnlock() {
  const now   = new Date();
  const month = now.getMonth();
  const day   = now.getDate();

  // Unlock when date matches or is past the target
  const shouldUnlock =
    month > CONFIG.unlockMonth ||
    (month === CONFIG.unlockMonth && day >= CONFIG.unlockDay);

  if (shouldUnlock && !unlocked) {
    unlocked = true;
    transitionToUnlocked();
    return;
  }

  if (!shouldUnlock) {
    updateCountdown(now);
  }
}

function updateCountdown(now) {
  // Calculate next occurrence of the unlock date
  let target = new Date(now.getFullYear(), CONFIG.unlockMonth, CONFIG.unlockDay, 0, 0, 0, 0);
  if (target < now) target.setFullYear(target.getFullYear() + 1);

  const diff = target - now;

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  setNum('days',    days);
  setNum('hours',   hours);
  setNum('minutes', minutes);
  setNum('seconds', seconds);
}

function setNum(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = String(val).padStart(2, '0');
}

/* ─── Transition: countdown → birthday ─── */
function transitionToUnlocked() {
  const screenCountdown = document.getElementById('screen-countdown');
  const screenBirthday  = document.getElementById('screen-birthday');
  const musicPlayer     = document.getElementById('music-player');

  // Fade out countdown
  screenCountdown.style.transition = 'opacity 1s ease, transform 1s ease';
  screenCountdown.style.opacity = '0';
  screenCountdown.style.transform = 'translateY(-20px)';

  setTimeout(() => {
    screenCountdown.classList.add('hidden');

    // Fade in birthday
    screenBirthday.classList.remove('hidden');
    screenBirthday.style.opacity = '0';
    screenBirthday.style.transform = 'translateY(20px)';

    // Trigger reflow
    void screenBirthday.offsetWidth;

    screenBirthday.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    screenBirthday.style.opacity = '1';
    screenBirthday.style.transform = 'translateY(0)';

    // Show music player
    setTimeout(() => {
      musicPlayer.classList.remove('hidden');
      initMusicPlayer();
    }, 800);
  }, 1000);
}

/* ═══════════════════════════════════════════════════════
   ENVELOPE ANIMATION
   ═══════════════════════════════════════════════════════ */
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const env     = document.getElementById('envelope');
  const hint    = document.getElementById('tap-hint');
  const letter  = document.getElementById('letter');

  // Hide hint
  if (hint) hint.style.opacity = '0';

  // Open flap animation
  env.classList.add('opening');

  // After flap opens, slide up the letter
  setTimeout(() => {
    env.classList.add('opened');
    letter.classList.remove('hidden');
  }, 700);
}

/* ═══════════════════════════════════════════════════════
   MUSIC PLAYER
   ═══════════════════════════════════════════════════════
   Since YouTube audio can't be fetched directly due to
   CORS, we use a hidden <iframe> to embed the YouTube
   player, controlling it via the YouTube IFrame API.
   The visible player UI is purely decorative; the actual
   audio comes from the YouTube embed iframe.
   ═══════════════════════════════════════════════════════ */

let currentSongIndex = 0;
let ytPlayer         = null;
let ytReady          = false;
let isPlaying        = false;

function initMusicPlayer() {
  updateSongName();
  loadYouTubeAPI();
}

function loadYouTubeAPI() {
  // Inject the YouTube IFrame API script once
  if (window.YT) { createYTPlayer(); return; }

  const tag = document.createElement('script');
  tag.src   = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

  // The YT API calls this function when ready
  window.onYouTubeIframeAPIReady = createYTPlayer;
}

function createYTPlayer() {
  // Create a hidden container for the iframe
  let container = document.getElementById('yt-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'yt-container';
    Object.assign(container.style, {
      position: 'fixed', bottom: '-9999px', left: '-9999px',
      width: '1px', height: '1px', opacity: '0', pointerEvents: 'none',
    });
    document.body.appendChild(container);
  }

  const song = CONFIG.playlist[currentSongIndex];
  ytPlayer = new YT.Player(container, {
    height: '1',
    width:  '1',
    videoId: song.youtubeId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady:       onYTReady,
      onStateChange: onYTStateChange,
    },
  });
}

function onYTReady() {
  ytReady = true;
}

function onYTStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    nextSong();
  }
  isPlaying = (event.data === YT.PlayerState.PLAYING);
  updatePlayIcon();
}

function togglePlay() {
  if (!ytReady || !ytPlayer) return;

  if (isPlaying) {
    ytPlayer.pauseVideo();
  } else {
    ytPlayer.playVideo();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % CONFIG.playlist.length;
  updateSongName();

  if (ytReady && ytPlayer) {
    const song = CONFIG.playlist[currentSongIndex];
    ytPlayer.loadVideoById(song.youtubeId);
    if (!isPlaying) ytPlayer.pauseVideo();
  }
}

function updateSongName() {
  const song = CONFIG.playlist[currentSongIndex];
  setText('song-name', song.title);
}

function updatePlayIcon() {
  const iconPlay  = document.getElementById('icon-play');
  const iconPause = document.getElementById('icon-pause');
  if (!iconPlay || !iconPause) return;

  if (isPlaying) {
    iconPlay.classList.add('hidden');
    iconPause.classList.remove('hidden');
  } else {
    iconPlay.classList.remove('hidden');
    iconPause.classList.add('hidden');
  }
}

/* ═══════════════════════════════════════════════════════
   FLOATING PETALS
   ═══════════════════════════════════════════════════════ */
function spawnPetals() {
  const container = document.getElementById('petals');

  for (let i = 0; i < CONFIG.petalCount; i++) {
    const petal = document.createElement('span');
    petal.classList.add('petal');
    petal.textContent = CONFIG.petalEmojis[Math.floor(Math.random() * CONFIG.petalEmojis.length)];

    // Random horizontal position
    petal.style.left = `${Math.random() * 100}vw`;

    // Random size and duration
    const size     = 0.8 + Math.random() * 1.0;
    const duration = 8 + Math.random() * 12;
    const delay    = Math.random() * 15;

    petal.style.fontSize        = `${size}rem`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay   = `${delay}s`;

    container.appendChild(petal);
  }
}

/* ═══════════════════════════════════════════════════════
   DEV HELPER — open console and run: forceUnlock()
   to preview the unlocked state without waiting.
   ═══════════════════════════════════════════════════════ */
window.forceUnlock = function() {
  if (!unlocked) {
    unlocked = true;
    transitionToUnlocked();
    console.log('🌸 Birthday screen unlocked!');
  }
};
