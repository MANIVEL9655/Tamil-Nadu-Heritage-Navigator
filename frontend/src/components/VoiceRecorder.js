import React, { useState } from "react";
import { sendVoiceQuery } from "../services/api";
import './VoiceRecorder.css'; // Import the CSS file

const VoiceRecorder = ({ setAudioResponse }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        let audioChunks = [];

        recorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        recorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            const responseAudio = await sendVoiceQuery(audioBlob);
            setAudioResponse(URL.createObjectURL(responseAudio));
        };

        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setIsRecording(false);
    };

    return (
        <div className="voice-recorder">
            <button className={`record-button ${isRecording ? 'stop' : 'start'}`} onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
        </div>
    );
};

export default VoiceRecorder;