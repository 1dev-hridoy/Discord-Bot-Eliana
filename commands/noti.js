const { admins } = require('../config.json'); // Importing the admin list
const { EmbedBuilder } = require('discord.js'); // Importing EmbedBuilder for embeds

module.exports = {
  name: 'noti',
  description: 'Send a notification to the news channel, but only admins can use it.',
  async execute(message, args) {
    // Check if the user is an admin
    if (!admins.includes(message.author.id)) {
      return message.reply("❌ You do not have permission to use this command.");
    }

    // Find the 'news' channel in the server
    const newsChannel = message.guild.channels.cache.find(channel => channel.name === 'news');

    if (!newsChannel) {
      return message.reply('❌ There is no "news" channel in this server.');
    }

    // Get the message content from the command's arguments
    const notificationMessage = args.join(' ') || 'No message provided';

    // Create an embedded message using EmbedBuilder
    const embed = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle('Admin Notification')
      .setDescription(notificationMessage)
      .setFooter({ text: `Sent by ${message.author.username}`, iconURL: message.author.displayAvatarURL() })
      .setTimestamp();

    let imageUrl = null;

    // Check if the command is a reply to another message
    if (message.reference) {
      try {
        // Fetch the referenced message
        const referencedMessage = await message.channel.messages.fetch(message.reference.messageId);
        
        // If the referenced message contains attachments, include the first one as the image
        if (referencedMessage.attachments.size > 0) {
          imageUrl = referencedMessage.attachments.first().url;
        }
      } catch (err) {
        console.error(err);
        return message.reply('❌ Could not fetch the replied message.');
      }
    } else {
      // If there's no replied message, check if there are attachments in the current message
      if (message.attachments.size > 0) {
        imageUrl = message.attachments.first().url;
      }
    }

    // If there is an image, set it in the embed
    if (imageUrl) {
      embed.setImage(imageUrl);
    }

    // Send the embed to the news channel
    newsChannel.send({ embeds: [embed] })
      .then(() => {
        message.reply('✅ Notification sent successfully with the image!');
      })
      .catch(err => {
        console.error(err);
        message.reply('❌ Failed to send the notification.');
      });
  },
};
