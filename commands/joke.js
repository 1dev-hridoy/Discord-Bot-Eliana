const axios = require('axios');

module.exports = {
  name: 'joke',
  description: 'Get a random joke.',
  async execute(message) {
    const url = 'https://official-joke-api.appspot.com/jokes/random';

    try {
      const response = await axios.get(url);
      const joke = response.data;

      await message.reply(`**${joke.setup}**\n${joke.punchline}`);
    } catch (error) {
      console.error('Error fetching joke:', error);
      await message.reply("Couldn't fetch a joke. Please try again.");
    }
  },
};
