const axios = require('axios');

module.exports = {
    name: 'sing',
    async execute(message, args) {
        // Check if the user provided a song name
        if (args.length === 0) {
            return message.reply("Error: You need to provide a song name after the command.");
        }

        // Join the user's input as the song name for the API
        const songName = args.join(" ");

        // Send a message indicating the bot is searching
        const searchingMessage = await message.reply("🔍 Searching for the song...");

        try {
            // Send the song name to the API
            const response = await axios.get(`http://ekotapay.xyz:2243/sing=${encodeURIComponent(songName)}`);

            // If the API response contains the audio URL
            if (response.data.audio_url) {
                const { audio_url, title } = response.data;

                // Update the searching message to indicate it's sending the audio
                await searchingMessage.edit("📤 Sending your song...");

                // Send the audio file as an attachment
                await message.channel.send({
                    content: title, // Send the title as the message body
                    files: [audio_url] // Attach the audio file
                });

                // Delete the searching message after sending
                await searchingMessage.delete();
            } else {
                await searchingMessage.edit("❌ Sorry, couldn't find the song.");
            }
        } catch (error) {
            console.error("Error fetching song:", error);
            await searchingMessage.edit("⚠️ Sorry, there was an error fetching the song!");
        }
    },
};
