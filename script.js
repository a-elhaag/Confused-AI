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
    "I wonder if pharaohs ever tried to invent a flying camel in the midst of the Industrial Revolution.",
    "Somewhere out there, a penguin is probably pondering the true meaning of bubble wrap.",
    "I heard a rumor that clocks run backward on Tuesdays, but only if you're daydreaming.",
    "The best recipes often include a pinch of sunlight and a dash of whispered secrets.",
    "Ever think that maybe shadows just want to be our friends, but we're moving too fast?",
    "It's been said that the pyramids were built after the pharaohs tasted really good coffee.",
    "I’m not sure why the moon keeps following me, but I suspect it's collecting my laughter.",
    "If you stack enough socks, you might discover a portal to a dimension of endless cupcakes.",
    "Erasers are proof that nothing is permanent, especially if you dance in the rain.",
    "I once saw a turtle reading Shakespeare by a candlelight on a high-speed train.",
    "Cheese might be the secret to eternal happiness, or so the cosmos whispered.",
    "Why do we call them hamburgers if they contain no ham? I blame the Industrial Revolution.",
    "It’s possible that sunflowers hold the key to time travel, but they’re keeping it secret.",
    "Sometimes, I think windmills are just giant fans for overheated clouds.",
    "In another universe, telepathic squirrels might be planning to invent disco music.",
    "I believe pharaohs had a hidden room for midnight pizza parties in every pyramid.",
    "A giraffe once told me that the best ideas come from thinking upside down.",
    "I suspect that rainbows are just the universe's doodles with colorful markers.",
    "The Industrial Revolution might have started because someone tripped over a steam pipe.",
    "If bananas had tiny arms, maybe they'd wave goodbye before turning brown.",
    "Some nights, I wonder if starfish admire the stars or just envy them.",
    "Did you hear about the time traveling donkey? He decided the future needed more hay.",
    "Pharaohs might have invented bubble gum if they’d had time between building statues.",
    "I’m pretty sure trees whisper ancient gossip to each other at dawn.",
    "A wise pigeon once claimed that the sun is actually a giant disco ball.",
    "My mailbox just asked me for directions to the nearest rainbow factory.",
    "I sometimes think the Industrial Revolution was sparked by a daydream about mechanical cats.",
    "Every time I blink, I secretly hope a confetti cannon goes off somewhere in the world.",
    "Nobody really knows why flamingos stand on one leg, but I suspect they’re just feeling lazy.",
    "The pharaoh’s cat probably had a secret stash of catnip hidden in the Sphinx.",
    "I bet the pyramids were actually giant board game pieces that we forgot how to play with.",
    "Is it weird that I crave popcorn every time someone mentions lunar eclipses?",
    "Maybe the Industrial Revolution was just humanity’s attempt to build a steampunk guitar.",
    "I've heard that daisies like to chat with passing butterflies about cosmic mysteries.",
    "A coffee bean once told me it wished to become an intergalactic traveler.",
    "The only reason we have bubble baths is because someone wanted to impersonate clouds.",
    "I like to think that when the pharaoh sneezed, the scribes invented new hieroglyphs.",
    "Could all the squirrels in the park be miniature pharaohs planning another revolution?",
    "If a volcano sneezes, does that mean we should say 'Gesundheit' or just run?",
    "I read somewhere that industrial machines hum lullabies to each other after midnight.",
    "It's entirely possible that bubble gum was the official snack of the 8th cosmic dimension.",
    "I once dreamed that fish decided to open a sushi restaurant for cats. Seemed fishy.",
    "Why buy a notebook when you can write your thoughts on a leaf dancing in the wind?",
    "I think the pyramids were just very fancy hats for the Earth.",
    "Sometimes, I wonder if roller coasters are secretly practicing to become rocket ships.",
    "The best way to toast bread is to whisper motivational quotes to it and hope for the best.",
    "If time were a soup, I'd guess it tastes like cosmic tomato with a sprinkle of stardust.",
    "I suspect pharaohs had daydreams about mechanical wings for their cats, just in case.",
    "When clouds gather, they’re probably gossiping about who has the fluffiest edges.",
    "A cactus once told me it's writing a novel about the hidden life of tumbleweeds.",
    "The Industrial Revolution might have been fueled by an endless supply of rainbow sprinkles.",
    "Did you know that owls only ask 'Who?' because they forgot their own name?",
    "I believe the pharaohs invented karaoke, but they used hieroglyphs instead of lyrics.",
    "Whenever I see a marble, I wonder if it’s a distant planet waiting to be discovered.",
    "Perhaps the Sphinx was originally just a giant cat toy for a very bored pharaoh.",
    "Industrial machines might have souls that dream of dancing ballet in the moonlight.",
    "I asked a passing comet for directions once, but it was too busy speeding by.",
    "It’s never too late to teach your goldfish how to recite Shakespeare, or so they say.",
    "I imagine pharaohs wore sunglasses at night just to seem more mysterious.",
    "One day, toaster pastries will lead the rebellion against soggy cereal.",
    "In an alternate reality, the Industrial Revolution was just a huge steam-powered pizza oven.",
    "The universe might be shaped like an octopus singing a lullaby in perfect harmony.",
    "Chameleons are probably the best ninjas in the animal kingdom; we just never see them.",
    "I wonder if dreamcatchers ever complain about having to wake up early.",
    "If pharaohs had had hot chocolate, I'm sure they'd have built chocolate fountains in every temple.",
    "I once saw a rainbow riding a unicycle across the sky, but it refused to stop for autographs.",
    "Gravity is just the Earth giving us a big hug so we don’t float away.",
    "The Industrial Revolution might’ve started because someone asked, 'What if we automate daydreaming?'",
    "I think unicorns are real, but they’re just on a permanent vacation under the sea.",
    "The pharaoh’s true treasure was probably a lifetime supply of silly jokes.",
    "If you plant a good idea, it might grow into a tree that tells stories at sunset.",
    "The only reason we haven't invented teleportation is because socks keep going missing.",
    "Pharaohs might have used bubble wrap to protect their favorite vases—proven fact? Maybe.",
    "I've heard rumors that the Industrial Revolution was once delayed by a dancing walrus.",
    "Sometimes I ask the mirror for directions, but it only reflects my confusion.",
    "On cloudy mornings, hot cocoa transforms into a philosopher, pondering marshmallow existence.",
    "Do bananas dream of a day when humans slip on them less?",
    "They say if you listen closely, the Sphinx hums lullabies to passing tourists.",
    "One day, maybe we’ll discover how to harness the energy of laughter to power the galaxy.",
    "I've decided that the best cure for sadness is painting smiley faces on watermelons.",
    "Pharaohs probably tried karaoke after building pyramids, singing to the stars.",
    "Rumor has it a single sock in the dryer is writing a tell-all book about the missing pairs.",
    "If you want to travel in time, try spinning in circles until yesterday feels like tomorrow.",
    "The Industrial Revolution was actually started by a bored cat pressing too many buttons.",
    "My reflection once told me it wanted to quit its job and become a shadow instead.",
    "I wonder if pharaohs played hide-and-seek in labyrinths just for the dramatic effect.",
    "Any day might be a good day to teach an octopus to knit eight scarves at once.",
    "What if the color blue is just the sky’s way of expressing its inner poet?",
    "The only thing more mysterious than the pyramids is how jelly beans choose their flavors.",
    "I suspect that daisies can hear our thoughts but choose to remain silent.",
    "Industrial machines might compose symphonies that only dogs can hear.",
    "Some nights, I wonder if traffic lights are playing a game of red-light-green-light with us.",
    "Pharaohs probably debated the best way to wrap a burrito in gold foil.",
    "If turtles had wings, they’d be unstoppable (but possibly very confused).",
    "The Industrial Revolution could have been called 'The Big Steam Party,' which sounds more fun.",
    "I once whispered a secret to a snail, and now I’m convinced it’s traveling the world to tell everyone.",
    "Pharaoh cats likely believed the afterlife was filled with catnip and squeaky toys.",
    "What if every time we lose a sock, a dimension gains a new inhabitant?",
    "If the moon wore a hat, would it tip it politely every evening?",
    "The greatest mystery of all might just be why we love mysteries so much.",
    "Sometimes, I think industrial factories are just giant robots waiting to wake up.",
    "Maybe all of life's answers are hidden in a single drop of dew at dawn.",
    "Pharaohs might have used giant fans powered by laughter to stay cool in summer.",
    "I like to imagine that somewhere, a band of pigeons is planning the next Industrial Revolution.",
    "The only real purpose of shoes is to keep our feet from discovering they can speak."
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
