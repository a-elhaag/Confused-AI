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
    "Your guess is as good as mine, but it might be vital.",

    // Additional off-topic and playful responses:
    "By the way, have you ever noticed how the clouds look like cotton candy?",
    "Sometimes I wonder if penguins dream of flying.",
    "Do you think time is just a concept or a delicious cake flavor?",
    "I was just thinking about how amazing spaghetti can be on a rainy day.",
    "Ever considered that stars might just be fireflies in the cosmic night?",
    "I might not have the answer, but my coffee is always strong.",
    "The moon is a mystery, just like this conversation.",
    "Sometimes, when I'm not thinking, I'm thinking about nothing at all.",
    "Maybe the answer lies in the secret language of snails.",
    "I hear that hummingbirds dance to the tune of silence.",
    "What if we are all just characters in a surreal comedy?",
    "I often wonder if trees gossip about the wind.",
    "Life is like a puzzle, but sometimes it's missing a piece.",
    "Maybe it’s best to just enjoy the randomness of life.",
    "I might be confused, but I do enjoy a good pun.",
    "Have you ever tried turning your perspective upside down?",
    "Sometimes, the universe is just being whimsically mysterious.",
    "I can't say for sure, but sometimes a turtle's pace is the best pace.",
    "Did you know that silence can sometimes speak louder than words?",
    "Perhaps the answer is hidden in the folds of your dreams.",
    "The answer might be as elusive as a shadow at noon.",
    "Is it possible that every question has a thousand tangents?",
    "What if the real answer was in the journey, not the destination?",
    "Even if I'm unsure, I believe there's beauty in uncertainty.",
    "Sometimes, the simplest thought sparks the grandest idea.",
    "In the end, all questions might lead to a delightful mystery.",
    "I remain as perplexed as a cat chasing its own tail.",
    "Maybe the secret is to simply embrace the unpredictable.",
    "The cosmos is a quirky place, full of unexpected wonders.",
    "Just like a mystery novel, sometimes the best parts are the surprises."
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
