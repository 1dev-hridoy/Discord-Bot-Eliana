const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'shop',
  description: 'Displays the available items in the shop along with their prices.',
  
  async execute(message, args, client) {
    try {
      // Path to the shopPrices.json file
      const shopFilePath = path.join(__dirname, '../assets/shopPrices.json');

      // Read the shopPrices.json file
      const shopData = fs.readFileSync(shopFilePath, 'utf8');
      const shopPrices = JSON.parse(shopData);

      // Check if there are any items in the shop
      if (!shopPrices || Object.keys(shopPrices).length === 0) {
        return message.reply("The shop is currently empty.");
      }

      // Create a string to display the shop items and their prices
      let shopDisplay = "**Available Items in the Shop:**\n\n";

      // Loop through each category in the shopPrices
      for (const [category, items] of Object.entries(shopPrices)) {
        shopDisplay += `**${category.charAt(0).toUpperCase() + category.slice(1)}:**\n`; // Capitalize category name
        for (const [item, details] of Object.entries(items)) {
          shopDisplay += `- **${item}**: ${details.price} coins`;
          // If it's a badge, include the image
          if (details.imageUrl) {
            shopDisplay += ` - [![${details.name}](${details.imageUrl})]`;
          }
          shopDisplay += `\n`;
        }
        shopDisplay += "\n"; // Add a line break between categories
      }

      // Send the shop information as a reply
      await message.reply(shopDisplay);
    } catch (error) {
      console.error("Error reading shop prices:", error);
      await message.reply("⚡️ An error occurred while fetching the shop items. Please try again later.");
    }
  }
};
