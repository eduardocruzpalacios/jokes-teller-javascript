const buttonEl = document.getElementById('button');
const audioEl = document.getElementById('audio');

function toggleButton() {
  buttonEl.disabled = !buttonEl.disabled;
}

function tellJoke(joke) {
  VoiceRSS.speech({
    key: 'Paste a voiceRSS API key here',
    src: joke,
    hl: 'es-es',
    r: 0,
    c: 'mp3',
    f: '48khz_16bit_stereo',
    ssml: false,
  });
}

async function getJoke() {
  let joke = '';
  const apiUrl = 'https://v2.jokeapi.dev/joke/Any?lang=es';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellJoke(joke);
    toggleButton();
  } catch (error) {
    return;
  }
}

buttonEl.addEventListener('click', getJoke);
audioEl.addEventListener('ended', toggleButton);
