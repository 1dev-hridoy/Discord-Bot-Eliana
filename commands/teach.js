const axios = require('axios');

module.exports = {
  name: 'teach',
  description: 'Teach the bot',
  async execute(message, args) {
    // Check if the user provided input
    if (args.length === 0) {
      return message.reply("Please provide a question and an answer in the format: 'question | answer'.");
    }

    // Join all arguments into a single string and split by '|'
    const fullInput = args.join(' ');
    const [question, answer] = fullInput.split('|').map(part => part.trim());

    // Validate the question and answer
    if (!question || !answer) {
      return message.reply('Both question and answer are required. Format: "question | answer"');
    }

    // URL encode the question and answer
    const encodedQuestion = encodeURIComponent(question);
    const encodedAnswer = encodeURIComponent(answer);

    // Construct the URL with the query parameters
    const apiUrl = `https://elianabot.xyz/add_question.php?data=questions-ans&question=${encodedQuestion}&answer=${encodedAnswer}`;

    try {
      // Send the GET request
      const response = await axios.get(apiUrl);
      const { status, message: apiMessage } = response.data;

      if (status === "success") {
        return message.reply('The question and answer have been successfully added.');
      } else {
        return message.reply(`Error: ${apiMessage}`);
      }
    } catch (error) {
      console.error('Error in teach command:', error);
      return message.reply('An error occurred while adding the question and answer. Please try again later.');
    }
  },
};
