const { log } = require('./logger');

const sendMessage = (channelId, messageText) => {
  log(`Sending message to channel ${channelId}: ${messageText}`);
  // In an actual bot, you'd use Discord.js to send the message
  // message.client.channels.cache.get(channelId).send(messageText);
};

module.exports = { sendMessage };
