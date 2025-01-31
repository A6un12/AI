// Get DOM elements
const textInput = document.getElementById('text-input');
const speakButton = document.getElementById('speak-button');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');

// Initialize the SpeechSynthesis API
const synth = window.speechSynthesis;
let voices = [];

// Populate voice options
function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = voices
    .map((voice, i) => <option value="${i}">${voice.name} (${voice.lang})</option>)
    .join('');
}

populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

// Speak the text
function speak() {
  if (synth.speaking) {
    console.error('SpeechSynthesis is already speaking.');
    return;
  }

  if (textInput.value !== '') {
    const utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = rateInput.value;
    utterance.pitch = pitchInput.value;
    synth.speak(utterance);
  }
}

// Event listeners
speakButton.addEventListener('click', speak);