import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import VoiceRecorder from "./components/VoiceRecorder";
import AudioPlayer from "./components/AudioPlayer";

function App() {
    const [audioResponse, setAudioResponse] = useState(null);

    return (
        <div className="app-container">
            <h1>Tamil Nadu Heritage Navigator</h1>
            <Chatbot />
            <VoiceRecorder setAudioResponse={setAudioResponse} />
            <AudioPlayer audioSrc={audioResponse} />
        </div>
    );
}

export default App;
