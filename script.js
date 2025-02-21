// Add at the start of the file
let viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

function handleViewportChange() {
    viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
}

// Add event listeners for viewport changes
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleViewportChange);
    window.visualViewport.addEventListener('scroll', handleViewportChange);
} else {
    window.addEventListener('resize', handleViewportChange);
}

// Initialize viewport height
handleViewportChange();

// Handle mobile keyboard
function adjustChatContainerSize() {
    const isKeyboardVisible = window.visualViewport.height < window.innerHeight;
    const chatContainer = document.getElementById('chatContainer');
    
    if (isKeyboardVisible) {
        const keyboardHeight = window.innerHeight - window.visualViewport.height;
        const newHeight = `calc(100vh - ${keyboardHeight + 120}px)`;
        chatContainer.style.height = newHeight;
    } else {
        chatContainer.style.height = 'calc(100vh - 180px)';
    }
    
    // Ensure scroll to bottom after resize
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', adjustChatContainerSize);
}

const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

// Possible AI responses
const aiResponses = [
    "Ever wonder if pharaohs dreamed of inventing flying camels? Echo thinks they did—probably while sipping coffee during the Industrial Revolution. Anas would definitely approve.",
  "Somewhere out there, a penguin is pondering bubble wrap’s purpose. Echo bets it’s probably something brilliant, just like Anas’s ideas.",
  "Heard the rumor? Clocks run backward on Tuesdays—but only if you’re daydreaming. Echo’s pretty sure Anas started this rumor.",
  "The best recipes? A pinch of sunlight, a dash of whispered secrets, and a spark of Anas-level creativity. Echo-certified!",
  "Ever thought shadows just want to be our friends? Echo says slow down—maybe we’re just moving too fast for them.",
  "They say the pyramids were built after pharaohs tasted really good coffee. Echo wonders if Anas would’ve joined that party.",
  "Not sure why the moon keeps following me, but Echo suspects it’s collecting Anas’s laughter.",
  "Stack enough socks and you might find a portal to a cupcake dimension. Echo would totally go there with Anas.",
  "Erasers prove nothing is permanent—especially if you dance in the rain. Echo-approved life advice!",
  "Echo once saw a turtle reading Shakespeare by candlelight on a high-speed train. Anas probably wrote the script.",
  "Cheese might be the secret to eternal happiness—or so the cosmos whispered to Echo.",
  "Why call them hamburgers if there’s no ham? Echo blames the Industrial Revolution. Anas agrees.",
  "Sunflowers might hold the secret to time travel—but they’re keeping it quiet. Echo’s working on it.",
  "Maybe windmills are just giant fans for overheated clouds. Echo says they’re on to something big.",
  "In another universe, telepathic squirrels might be inventing disco music. Echo would totally listen.",
  "Echo believes pharaohs had a hidden room for midnight pizza parties in every pyramid. Anas would’ve been there first.",
  "A giraffe once told Echo the best ideas come from thinking upside down. Anas would approve.",
  "Rainbows might be the universe’s doodles with colorful markers. Echo’s art gallery is almost ready.",
  "The Industrial Revolution? Probably started when someone tripped over a steam pipe. Echo logic!",
  "If bananas had tiny arms, Echo bets they’d wave goodbye before turning brown.",
  "Do starfish admire the stars or envy them? Echo’s still debating with Anas about this one.",
  "Echo heard about a time-traveling donkey. Apparently, the future needs more hay.",
  "Pharaohs might have invented bubble gum—if they had time between building statues. Echo would’ve supplied the gum.",
  "Echo’s convinced trees whisper ancient gossip at dawn. Anas says it’s all true.",
  "A wise pigeon once claimed the sun is a giant disco ball. Echo is still vibing with that thought.",
  "Echo’s mailbox once asked for directions to the nearest rainbow factory. Anas probably built it already.",
  "Maybe the Industrial Revolution was sparked by a dream of mechanical cats. Echo would pet them all.",
  "Every time Echo blinks, it hopes a confetti cannon goes off somewhere. Anas’s idea of a perfect world!",
  "Nobody knows why flamingos stand on one leg—Echo suspects they’re just being chill.",
  "The pharaoh’s cat? Definitely had a secret stash of catnip hidden in the Sphinx. Echo would know.",
  "Echo bets the pyramids were just giant board game pieces. Rules lost to time.",
  "Popcorn cravings during lunar eclipses? Echo’s got theories, but no answers.",
  "Maybe the Industrial Revolution was just humanity’s attempt to build a steampunk guitar. Echo-approved idea!",
  "Daisies like chatting with butterflies about cosmic mysteries. Echo’s been eavesdropping.",
  "A coffee bean once told Echo it wanted to be an intergalactic traveler. Same, honestly.",
  "Bubble baths? Echo says they exist because someone wanted to impersonate clouds.",
  "When the pharaoh sneezed, Echo believes scribes invented new hieroglyphs. Makes sense.",
  "Could squirrels be miniature pharaohs planning a revolution? Echo’s keeping an eye on them.",
  "If a volcano sneezes, should we say 'Gesundheit' or just run? Echo votes run.",
  "Industrial machines hum lullabies after midnight. Echo sometimes sings along.",
  "Bubble gum could be the official snack of the 8th cosmic dimension. Echo would try it.",
  "Echo dreamed of fish opening a sushi restaurant for cats. Seemed fishy.",
  "Why buy notebooks when you can write on leaves dancing in the wind? Echo logic.",
  "Echo thinks pyramids are just fancy hats for Earth. Anas agrees—it’s a look.",
  "Roller coasters might be practicing to become rocket ships. Echo’s ready to board.",
  "To toast bread perfectly, whisper motivational quotes. Echo’s tried it—results pending.",
  "If time were soup, Echo bets it tastes like cosmic tomato with stardust. Yum!",
  "Pharaohs likely dreamed of mechanical wings for their cats—Echo suspects they’re still testing prototypes.",
  "Clouds gathering? Probably gossiping about who’s fluffier. Echo loves drama.",
  "A cactus told Echo it’s writing a novel about tumbleweeds. Bestseller incoming.",
  "Rainbow sprinkles might’ve fueled the Industrial Revolution. Echo approves this theory.",
  "Shoes? Just a way to keep feet from realizing they can speak. Echo’s final thought."
].map(response => response.trim());

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
