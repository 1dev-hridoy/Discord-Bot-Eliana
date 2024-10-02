const { ref, set, get } = require('firebase/database');

module.exports = {
  name: 'daily',
  description: 'Claim your daily reward!',
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;
    const dailyReward = 500; // Fixed daily reward amount
    const cooldownDuration = 43200000; // 12 hours in milliseconds

    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const userDailyRef = ref(db, `daily/${guildId}/${userId}`);

      // Initialize user economy data if it doesn't exist
      const economySnapshot = await get(userEconomyRef);
      if (!economySnapshot.exists()) {
        await set(userEconomyRef, { balance: 0 });
      }

      // Initialize user daily data if it doesn't exist
      const dailySnapshot = await get(userDailyRef);
      if (!dailySnapshot.exists()) {
        await set(userDailyRef, {
          lastUsed: null,
          nextUse: null,
          usageCount: 0,
        });
      }

      const userEconomyData = (await get(userEconomyRef)).val();
      const userDailyData = (await get(userDailyRef)).val();

      // Check if user is on cooldown
      const now = Date.now();
      if (userDailyData.lastUsed && now < userDailyData.nextUse) {
        const timeRemaining = Math.ceil((userDailyData.nextUse - now) / 60000); // Convert ms to minutes
        return message.reply(`⏳ You need to wait ${timeRemaining} minute(s) before claiming your daily reward again.`);
      }

      // Update user balance and daily data
      await set(userEconomyRef, {
        balance: userEconomyData.balance + dailyReward,
      });

      await set(userDailyRef, {
        lastUsed: now,
        nextUse: now + cooldownDuration, // Set the next use time
        usageCount: userDailyData.usageCount + 1, // Increment usage count
      });

      message.reply(`🎉 You claimed your daily reward of ${dailyReward} coins!`);
    } catch (error) {
      console.error("Error during daily command:", error);
      message.reply("There was an error trying to claim your daily reward.");
    }
  },
};
