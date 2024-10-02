const { ref, get, set } = require('firebase/database');
const axios = require('axios');

const categories = ["waifu", "neko", "trap", "blowjob"];

module.exports = {
  name: 'nsfw',
  description: 'Fetches a NSFW image from the specified category for 50 coins. Available categories: waifu, neko, trap, blowjob.',
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;

    const category = args[0];
    if (!category || !categories.includes(category.toLowerCase())) {
      return message.reply(`❌ Invalid category! Please select one of the following categories: ${categories.join(", ")}`);
    }

    try {
      // Reference to user's economy data
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const snapshot = await get(userEconomyRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        
        // Check if user has enough balance
        if (userData.balance < 50) {
          return message.reply("❌ You need at least 50 coins to use this command.");
        }

        // Deduct 50 coins from the user's balance
        const newBalance = userData.balance - 50;
        await set(userEconomyRef, { ...userData, balance: newBalance });

        // Fetch the NSFW image
        const apiUrl = `https://api.waifu.pics/nsfw/${category.toLowerCase()}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.url) {
          const imageUrl = response.data.url;
          // Reply with the image URL
          await message.reply(`✅ | Here is your NSFW image from the category: ${category}\n${imageUrl}`);
        } else {
          await message.reply("⚡️ An error occurred while fetching the image. Please try again.");
        }
      } else {
        message.reply("You do not have a balance set yet.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      await message.reply("⚡️ An error occurred while processing your request. Please try again later.");
    }
  },
};
