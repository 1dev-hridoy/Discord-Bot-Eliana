const axios = require('axios');

module.exports = {
  name: '8ball',
  description: 'Ask the Magic 8 Ball a question! Use "biased" for a biased response.',
  async execute(message) {
    // Get the user's question from the message
    const question = message.content.split(' ').slice(1).join(' ');
    if (!question) {
      return message.reply('Please ask a question!');
    }

    // Replace spaces with '+' for the API request
    const formattedQuestion = encodeURIComponent(question);
    const apiUrl = `https://www.eightballapi.com/api/biased?question=${formattedQuestion}&lucky=true`;

    try {
      // Send request to the API
      const response = await axios.get(apiUrl);
      const reading = response.data.reading; // Get the reading
      const sentiment = response.data.sentiment; // Get the sentiment

      // Prepare the response message
      const replyMessage = `🎱 Magic 8 Ball says: "${reading}"\nSentiment Score: ${sentiment.score}\nSentiment Comparative: ${sentiment.comparative}`;
      
      // Send the response back to the chat
      await message.reply(replyMessage);
    } catch (error) {
      console.error('Error fetching Magic 8 Ball answer:', error);
      return message.reply("An error occurred while fetching the Magic 8 Ball answer. Please try again later.");
    }
  },
};
