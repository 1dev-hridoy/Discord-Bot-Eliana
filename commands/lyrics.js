const axios = require("axios");

const baseApiUrl = async () => {
    const base = await axios.get(
        `https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`
    );
    return base.data.api;
};

const sendChunkedMessage = async (message, content) => {
    const chunks = content.match(/(.|[\r\n]){1,2000}/g); // Split content into chunks of 2000 characters
    for (const chunk of chunks) {
        await message.reply(chunk);
    }
};

module.exports = {
    name: "lyrics",
    description: "Get song lyrics with their images",
    async execute(message, args) {
        try {
            const songs = args.join(' ');
            if (!songs) {
                return message.reply("Please provide a song name!");
            }

            const res = await axios.get(`${await baseApiUrl()}/lyrics2?songName=${encodeURIComponent(songs)}`);
            const data = res.data;

            if (!data.title || !data.artist || !data.lyrics) {
                return message.reply("An error occurred while fetching lyrics!");
            }

            const songMessage = `**Song Title**: ${data.title}\n` +
                                `**Artist**: ${data.artist}\n` +
                                `**Lyrics**:\n${data.lyrics}`;

            // Check if the message exceeds 2000 characters
            if (songMessage.length > 2000) {
                await sendChunkedMessage(message, songMessage);
            } else {
                if (data.image) {
                    await message.channel.send({ content: songMessage, files: [data.image] });
                } else {
                    await message.reply(songMessage);
                }
            }
        } catch (error) {
            console.error(error);
            return message.reply("Error: " + error.message);
        }
    },
};
