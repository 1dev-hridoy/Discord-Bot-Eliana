const { ref, get, set } = require('firebase/database');
const axios = require('axios');

const categories = [
  "waifu", "neko", "shinobu", "megumin", "bully", "cuddle", "cry", "hug", "awoo",
  "kiss", "lick", "pat", "smug", "bonk", "yeet", "blush", "smile", "wave", "highfive", 
  "handhold", "nom", "bite", "glomp", "slap", "kill", "kick", "happy", "wink", 
  "poke", "dance", "cringe"
];

module.exports = {
  name: 'sfw',
  description: 'Fetches a safe-for-work image from specified categories and deducts coins from the user\'s balance.',
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
        if (userData.balance < 10) {
          return message.reply("❌ You need at least 10 coins to use this command.");
        }

        // Deduct 10 coins from the user's balance
        const newBalance = userData.balance - 10;
        await set(userEconomyRef, { ...userData, balance: newBalance });

        // Fetch the SFW image
        const apiUrl = `https://api.waifu.pics/sfw/${category.toLowerCase()}`;
        const response = await axios.get(apiUrl);

        if (response.data && response.data.url) {
          const imageUrl = response.data.url;
          // Reply with the image URL
          await message.reply({ 
            content: `✅ | Here is your SFW image from the category: ${category}`, 
            files: [imageUrl] // Send the image URL as a file
          });
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
