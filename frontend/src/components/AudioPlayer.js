import React from "react";

const AudioPlayer = ({ audioSrc }) => {
    return (
        <div className="audio-player">
            {audioSrc && <audio controls src={audioSrc}></audio>}
        </div>
    );
};

export default AudioPlayer;
