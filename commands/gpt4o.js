const axios = require('axios');
const path = require('path');

function formatResponse(response) {
  return response.replace(/\*\*(.*?)\*\*/g, (match, p1) => global.convertToGothic(p1));
}

async function handleImage(message, imageUrl, query, thinkingMessage) {
  const geminiUrl = `https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(query)}&url=${encodeURIComponent(imageUrl)}`;
  const { data } = await axios.get(geminiUrl);
  const formattedResponse = formatResponse(data.gemini);

  await message.channel.send(formattedResponse);
}

module.exports = {
  name: "gpt4o",
  description: "Ask GPT anything.",
  async execute(message, args) {
    const thinkingMessage = await message.channel.send("Thinking... 🤔");
    
    if (message.reference) {
      const repliedMessage = await message.channel.messages.fetch(message.reference.messageID);
      if (repliedMessage.attachments.size > 0) {
        const imageUrl = repliedMessage.attachments.first().url;
        const query = args.length > 0 ? args.join(" ") : "Please describe this image.";
        await handleImage(message, imageUrl, query, thinkingMessage);
        return;
      }
    }

    if (args.length === 0) {
      return message.reply("Please provide a question or reply to an image.");
    }

    const query = args.join(" ");
    const userId = message.author.id;
    const apiUrl = `https://deku-rest-api.gleeze.com/api/gpt-4o?q=${encodeURIComponent(query)}&uid=${userId}`;

    try {
      const { data } = await axios.get(apiUrl);
      const formattedResponse = formatResponse(data.result);

      // Path to the GIF
      const gifPath = path.join(__dirname, '..', 'assets', 'gpt4.gif');

      // Send the response along with the GIF
      await message.channel.send({ content: formattedResponse, files: [gifPath] });
      
      // Delete the thinking message
      await thinkingMessage.delete();

    } catch (error) {
      await message.channel.send("Sorry, I couldn't get a response from GPT.");
      console.error(error);
    }
  },
};
