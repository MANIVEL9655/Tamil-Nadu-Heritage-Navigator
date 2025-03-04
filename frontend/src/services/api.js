const BASE_URL = "http://localhost:8000";

export const sendTextQuery = async (query) => {
    const response = await fetch(`${BASE_URL}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
    return response.json();
};

export const sendVoiceQuery = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);

    const response = await fetch(`${BASE_URL}/voice_query`, {
        method: "POST",
        body: formData,
    });

    return response.blob();  // Returns the AI-generated speech file
};
