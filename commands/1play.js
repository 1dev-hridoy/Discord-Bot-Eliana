const axios = require('axios');

module.exports = {
    name: 'music', // Command name
    description: 'Play a song from YouTube',
    async execute(message, args) {
        // Check if the command is invoked in a server
        if (!message.guild) {
            return message.reply("⚠️ This command can only be used in a server.");
        }

        // Check if the user is in a voice channel
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply("⚠️ You need to be in a voice channel to play music.");
        }

        // Check if the user provided a song name
        if (args.length === 0) {
            return message.reply("⚠️ Please provide a song name.");
        }

        // Join the user's input as the song name
        const songName = args.join(" ");

        try {
            // Fetch video data from your API
            const response = await axios.get(`https://yt-dl-core.onrender.com/download?name=${encodeURIComponent(songName)}`);

            if (response.data.length === 0) {
                return message.reply("⚠️ No results found for the provided song name.");
            }

            const video = response.data[0];
            const videoUrl = video.audioUrl; // URL of the video
            const videoTitle = video.title;  // Video title for the caption

            // Send the video directly from the URL
            await message.reply({
                content: videoTitle, // Send title as the message body
                files: [videoUrl]    // Send the audio file as an attachment
            });

        } catch (error) {
            console.error(error);
            return message.reply("⚠️ An error occurred while fetching the video.");
        }
    },
};
