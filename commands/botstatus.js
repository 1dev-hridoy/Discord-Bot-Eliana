const { admins } = require('../config.json'); // Importing the admin list
const { ActivityType } = require('discord.js'); // Importing ActivityType for status types

module.exports = {
  name: 'botstatus',
  description: 'Allows admins to set a custom status for the bot (playing, watching, etc.).',
  execute(message, args) {
    // Check if the user is an admin
    if (!admins.includes(message.author.id)) {
      return message.reply("❌ You do not have permission to use this command.");
    }

    // Check if the correct arguments are provided
    if (args.length < 2) {
      return message.reply("❌ Please provide a status type (playing, watching, listening, competing) and a status message.");
    }

    // Extract status type and message from the command arguments
    const statusType = args[0].toLowerCase();
    const statusMessage = args.slice(1).join(' '); // Join the rest of the args as the status message

    // Map status types to Discord activity types
    const statusMap = {
      playing: ActivityType.Playing,
      watching: ActivityType.Watching,
      listening: ActivityType.Listening,
      competing: ActivityType.Competing
    };

    // Check if the provided status type is valid
    if (!statusMap[statusType]) {
      return message.reply("❌ Invalid status type. Use one of the following: playing, watching, listening, competing.");
    }

    try {
      // Set the bot's status
      message.client.user.setActivity(statusMessage, { type: statusMap[statusType] });
      message.reply(`✅ Bot status updated to "${statusType}" with message: "${statusMessage}".`);
    } catch (err) {
      console.error(err);
      message.reply('❌ Failed to update bot status.');
    }
  },
};
