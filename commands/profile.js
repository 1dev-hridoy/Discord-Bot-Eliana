const { ref, get } = require('firebase/database');
const { EmbedBuilder } = require('discord.js'); // Updated for Discord.js v14

module.exports = {
  name: 'profile',
  description: 'Show user profile with badges.',
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;

    try {
      // Reference to user's badges in Firebase
      const userBadgesRef = ref(db, `badges/${guildId}/${userId}`);
      const snapshot = await get(userBadgesRef);

      if (!snapshot.exists()) {
        return message.reply('❌ You have no badges yet.');
      }

      const userBadges = snapshot.val();

      // Create an embed to show the badges
      const embed = new EmbedBuilder()
        .setTitle(`${message.author.username}'s Profile`)
        .setColor('#0099ff')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 })) // Set user avatar as thumbnail
        .setDescription('Here are your badges:');

      // Add badge names and images directly to the embed
      Object.values(userBadges).forEach(badge => {
        embed.addFields({
          name: badge.name, // Display badge name
          value: `[See The Badge](${badge.imageUrl})`, // Clickable text for badge image
          inline: true // Show badges in the same line if possible
        });
      });

      await message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching profile badges:', error.message);
      await message.reply('⚡️ An error occurred while fetching your profile.');
    }
  }
};
