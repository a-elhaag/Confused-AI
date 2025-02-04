const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Possible AI responses
const aiResponses = [
    "Hmmm, I don't know, but that sounds important.",
    "I’m not entirely sure, but that does sound significant.",
    "I'm stumped, but that might be worth looking into!",
    "Interesting... I'm not certain, but it could be important.",
    "I’m unsure, but you may need to explore it further.",
    "That’s puzzling. It might be relevant though.",
    "Hard to say, but it might be a key detail!",
    "I’m not sure how to answer that, but it seems noteworthy.",
    "That’s beyond my scope, but I have a feeling it matters.",
    "I wish I knew, but it sure sounds like a big deal.",
    "I can’t quite figure that out, but it sounds crucial.",
    "I'm drawing a blank, but there might be more to it.",
    "That's above my pay grade, but don't ignore it!",
    "Not sure about that, but I wouldn't dismiss it.",
    "Your guess is as good as mine, but it might be vital."
];

// Event Listeners for sending messages
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Send a message and trigger the "Confused AI" response with a spinner
function sendMessage() {
    const text = userInput.value.trim();
    if (text === '') return;

    // Append user message
    addMessage('user', text);
    userInput.value = '';

    // Append a placeholder for the AI message with a loading spinner
    const aiMessage = addMessage('ai', '');
    const spinner = document.createElement('span');
    spinner.classList.add('spinner');
    const loadingText = document.createElement('span');
    loadingText.textContent = "Thinking...";
    aiMessage.appendChild(spinner);
    aiMessage.appendChild(loadingText);

    // Simulate AI response delay
    setTimeout(() => {
        // Pick a random response from the list
        const randomIndex = Math.floor(Math.random() * aiResponses.length);
        aiMessage.innerHTML = aiResponses[randomIndex];
    }, 1500);
}

// Adds a message to the chat container
// 'sender' should be either 'user' or 'ai'
function addMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);

    // Auto-scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
    return messageDiv;
}
