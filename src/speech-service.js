import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import {
  AudioConfig,
  SpeakerAudioDestination,
  SpeechSynthesizer,
} from 'microsoft-cognitiveservices-speech-sdk';

const subscriptionKey = ``; // process.env.subscriptionKey
const speechConfig = sdk.SpeechConfig.fromSubscription(
  subscriptionKey,
  'eastus'
);
const microphoneAudioConfig = AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new sdk.SpeechRecognizer(
  speechConfig,
  microphoneAudioConfig
);

const fromText = async (text) => {
  stopMicrophoneListener();

  const player = new SpeakerAudioDestination();
  const synthesizer = new SpeechSynthesizer(speechConfig, player);

  synthesizer.speakTextAsync(
    text,
    (result) => {
      if (result) {
        console.log('speaking');
        synthesizer.close();
        return result.audioData;
      }
    },
    (error) => {
      console.log(error);
      synthesizer.close();
    }
  );

  player.onAudioEnd = () => {
    startMicrophoneListener();
  };
};

const fromMic = async (callback) => {
  startMicrophoneListener();

  //  The event recognized signals that a final recognition result is received.
  recognizer.recognized = (s, e) => {
    const spokenText = e.result.text;

    if (spokenText !== undefined && spokenText.length > 0) {
      callback(spokenText);
    }
  };
};

const startMicrophoneListener = async () => {
  recognizer.startContinuousRecognitionAsync();
};

const stopMicrophoneListener = async () => {
  recognizer.stopContinuousRecognitionAsync();
};

export { fromMic, fromText, startMicrophoneListener, stopMicrophoneListener };
