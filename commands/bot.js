const axios = require('axios');

module.exports = {
    name: "bot",
    description: "Ask something and get a reply.",
    async execute(message, args) {
        // Predefined random funny replies
        const funnyReplies = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "I'm on a whiskey diet. I've lost three days already.",
            "I told my computer I needed a break, and now it won't stop sending me KitKat ads!",
            "Why don’t skeletons fight each other? They don’t have the guts.",
            "I used to play piano by ear, but now I use my hands.",
            "I would avoid the sushi if I were you. It’s a little fishy.",
            "Why was the math book sad? Because it had too many problems.",
            "I’m reading a book on anti-gravity. It’s impossible to put down!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "I used to be a baker, but I couldn’t make enough dough."
        ];

        // Check if the user asked a question or not
        if (args.length === 0) {
            // Reply with a random funny message if no question was asked
            const randomReply = funnyReplies[Math.floor(Math.random() * funnyReplies.length)];
            return message.reply(randomReply);
        }

        // Join the user's input as the question for the API
        const userQuestion = args.join(" ");
        
        try {
            // Send the question to the API
            const response = await axios.get(`https://api.elianabot.xyz/fun/chat/apiv1/chat.php?question=${encodeURIComponent(userQuestion)}`);
            
            // If the API response is successful, send the answer
            if (response.data.status === 'success') {
                const apiAnswer = response.data.answer;
                return message.reply(apiAnswer);
            } else {
                return message.reply("Something went wrong with the API!");
            }
        } catch (error) {
            console.error(error);
            return message.reply("Sorry, I couldn't fetch a response!");
        }
    },
};
