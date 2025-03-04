const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    let message = userInput.value.trim();
    if (message === "") return;

    // Display user message
    displayMessage(message, "user");

    // Send message to OpenAI API
    fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "user", content: message }]
        })
    })
    .then(response => response.json())
    .then(data => {
        let reply = data.choices[0].message.content;
        displayMessage(reply, "bot");
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("Error: Unable to connect to AI.", "bot");
    });

    userInput.value = "";
}

function displayMessage(message, sender) {
    let msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    msgDiv.classList.add("message", sender);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
