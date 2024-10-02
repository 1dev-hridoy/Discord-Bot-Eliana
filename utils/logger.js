const log = (message) => {
  console.log(`[LOG] ${message}`);
};

const sendMessage = (channelId, messageText) => {
  // Assuming you want to log the action before sending the message
  log(`Sending message to channel ${channelId}: ${messageText}`);
  // In an actual bot, you'd use Discord.js to send the message
  // e.g. message.client.channels.cache.get(channelId).send(messageText);
};

module.exports = { log, sendMessage };
