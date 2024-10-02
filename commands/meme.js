const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Get a random meme.',
  async execute(message) {
    const url = 'https://meme-api.com/gimme';

    try {
      const response = await axios.get(url);
      const meme = response.data;

      const memeEmbed = {
        title: meme.title,
        image: { url: meme.url },
        footer: { text: `Source: ${meme.subreddit}` },
      };
      await message.channel.send({ embeds: [memeEmbed] });
    } catch (error) {
      console.error('Error fetching meme:', error);
      await message.reply("Couldn't fetch a meme. Please try again.");
    }
  },
};
