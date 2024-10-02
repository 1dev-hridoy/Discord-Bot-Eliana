const { ref, set, get } = require('firebase/database');
const path = require('path');
const fs = require('fs');

// Load the shop prices from the JSON file
const shopPricesPath = path.join(__dirname, '../assets/shopPrices.json'); // Adjust the path as needed
const shopPrices = JSON.parse(fs.readFileSync(shopPricesPath, 'utf8'));

module.exports = {
  name: 'assignbadge',
  description: 'Assign a badge to a user.',
  async execute(message, args, client, db) {
    const user = message.mentions.users.first();
    const guildId = message.guild.id;
    const badgeType = args[1]?.toLowerCase(); // e.g., 'vip' or 'gold'

    if (!user || !badgeType) {
      return message.reply('❌ You need to mention a user and specify a badge type (VIP or Gold).');
    }

    // Check if the badge exists in the shop
    const badgeInfo = shopPrices.badges[badgeType];
    if (!badgeInfo) {
      return message.reply('❌ Invalid badge type! Choose either VIP or Gold.');
    }

    try {
      // Reference to user's economy data
      const userEconomyRef = ref(db, `economy/${guildId}/${user.id}`);
      const snapshot = await get(userEconomyRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        // Check if user has enough balance for the badge
        if (userData.balance < badgeInfo.price) {
          return message.reply(`❌ You need at least ${badgeInfo.price} coins to buy the ${badgeInfo.name} badge.`);
        }

        // Deduct the badge price from the user's balance
        const newBalance = userData.balance - badgeInfo.price;
        await set(userEconomyRef, { ...userData, balance: newBalance });

        // Reference to user's badges in Firebase
        const userBadgesRef = ref(db, `badges/${guildId}/${user.id}/${badgeType}`);
        
        // Set the badge in Firebase
        await set(userBadgesRef, badgeInfo);

        await message.reply(`✅ Badge **${badgeInfo.name}** assigned to <@${user.id}>. Your new balance is ${newBalance} coins.`);
      } else {
        message.reply("You do not have a balance set yet.");
      }
    } catch (error) {
      console.error('Error assigning badge:', error.message);
      await message.reply('⚡️ An error occurred while assigning the badge.');
    }
  }
};
