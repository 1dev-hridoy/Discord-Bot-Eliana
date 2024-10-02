const { EmbedBuilder } = require('discord.js'); // Updated import for discord.js v14

module.exports = {
    name: 'info',
    description: 'Shows complete server info',
    execute(message) {
        const guild = message.guild;

        // Create an embed for server info
        const infoEmbed = new EmbedBuilder() // Updated constructor
            .setColor('#0099ff') // Set embed color
            .setTitle(`Server Information for ${guild.name}`)
            .setThumbnail(guild.iconURL()) // Server logo
            .addFields([
                { name: 'Server Name', value: guild.name, inline: true },
                { name: 'Server ID', value: guild.id, inline: true },
                { name: 'Total Members', value: guild.memberCount.toString(), inline: true },
                { name: 'Region', value: guild.preferredLocale || 'Unknown', inline: true },
                { name: 'Owner', value: `${guild.members.cache.get(guild.ownerId)?.user.tag || 'Unknown'} (ID: ${guild.ownerId})`, inline: true },
                { name: 'Created On', value: guild.createdAt.toDateString(), inline: true },
            ])
            .setTimestamp() // Add timestamp
            .setFooter({ text: `Requested by ${message.author.tag}`, iconURL: message.author.displayAvatarURL() }); // Footer with requester info

        // Send the embed message
        message.channel.send({ embeds: [infoEmbed] });
    },
};
