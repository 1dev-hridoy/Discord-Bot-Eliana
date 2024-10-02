const { Events } = require('discord.js'); // Adjust imports as needed
const path = require('path');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const guild = member.guild;
    const welcomeChannelName = 'welcome';
    let welcomeChannel = guild.channels.cache.find(channel => channel.name === welcomeChannelName);

    // Check if the welcome channel exists, if not create one
    if (!welcomeChannel) {
      welcomeChannel = await guild.channels.create(welcomeChannelName, {
        type: 'GUILD_TEXT', // Ensure it's a text channel
        permissionOverwrites: [
          {
            id: guild.id,
            allow: ['VIEW_CHANNEL'], // Allow everyone to view the channel
          },
        ],
      });
    }

    // Total members
    const totalMembers = guild.memberCount;

    // Create the welcome message
    const welcomeMessage = `🎉 Welcome to **${guild.name}**, <@${member.id}>!`;
    const totalMessage = `Total Members: ${totalMembers}`;

    // Path to the GIF
    const gifPath = path.join(__dirname, '..', 'assets', 'welcome.gif');

    // Send the welcome message and the GIF
    await welcomeChannel.send({ 
      content: `${welcomeMessage}\n${totalMessage}`, 
      files: [gifPath] 
    });

    // Optional: Notify general channel if needed
    const generalChannel = guild.channels.cache.find(channel => channel.name === 'general');
    if (generalChannel) {
      const generalMessage = `🚨 A new member has joined! Say hello to <@${member.id}>!`;
      generalChannel.send(generalMessage);
    }
  },
};
