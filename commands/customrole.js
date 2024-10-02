const fs = require('fs');
const path = require('path');
const { ref, get, set } = require('firebase/database');

// Load the shop prices from the JSON file
const shopPricesPath = path.join(__dirname, '../assets/shopPrices.json'); // Adjust the path as needed
const shopPrices = JSON.parse(fs.readFileSync(shopPricesPath, 'utf8'));

module.exports = {
  name: 'customrole',
  description: 'Allows users to create a custom role with a chosen color for a specified price.',
  
  async execute(message, args, client, db) {
    const userId = message.author.id;
    const guildId = message.guild.id;
    const roleName = args[0];
    const roleColor = args[1];

    // List of allowed colors (without #)
    const allowedColors = [
      "FF0000", // Red
      "00FF00", // Green
      "0000FF", // Blue
      "FFFF00", // Yellow
      "FF00FF", // Magenta
      "00FFFF", // Cyan
    ];

    // Check if roleName and roleColor are provided
    if (!roleName || !roleColor) {
      return message.reply(`❌ Please provide both a role name (without spaces) and a valid color (choose from: ${allowedColors.map(c => `#${c}`).join(", ")})`);
    }

    // Prevent spaces in roleName
    if (/\s/.test(roleName)) {
      return message.reply("❌ The role name cannot contain spaces. Please use a single word or hyphenate.");
    }

    // Remove # from roleColor if it exists
    const formattedColor = roleColor.replace("#", "").toUpperCase();

    // Check if the color is valid
    if (!allowedColors.includes(formattedColor)) {
      return message.reply(`❌ Invalid color! Please select one of the following: ${allowedColors.map(c => `#${c}`).join(", ")}`);
    }

    try {
      // Get the price for custom role from shopPrices
      const customRolePrice = shopPrices.roles.customRole.price || 100; // Default to 100 if not found

      // Reference to user's economy data
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`);
      const snapshot = await get(userEconomyRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const currentBalance = Number(userData.balance); // Ensure this is a number

        // Log current balance
        console.log('Current Balance:', currentBalance);

        // Check if currentBalance is a valid number
        if (isNaN(currentBalance)) {
          console.error('Balance is NaN:', userData.balance);
          return message.reply("❌ Your balance is not valid. Please contact an administrator.");
        }

        // Check if user has enough balance
        if (currentBalance < customRolePrice) {
          return message.reply(`❌ You need at least ${customRolePrice} coins to create a custom role.`);
        }

        // Calculate new balance
        const newBalance = currentBalance - customRolePrice;

        // Log the new balance
        console.log('New Balance:', newBalance);

        // Update the user's balance in the database
        await set(userEconomyRef, { ...userData, balance: newBalance });

        // Create the custom role with the color (re-add # symbol to the color)
        const role = await message.guild.roles.create({
          name: roleName,
          color: `#${formattedColor}`,
          reason: `Custom role created by ${message.author.tag}`,
        });

        // Assign the role to the user
        await message.member.roles.add(role);

        // Reply with success message
        await message.reply(`✅ You successfully created the role **${roleName}** with the color **#${formattedColor}** for **${customRolePrice} coins!**`);
      } else {
        message.reply("❌ You do not have a balance set yet.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      await message.reply("⚡️ An error occurred while processing your request. Please try again later.");
    }
  },
};
