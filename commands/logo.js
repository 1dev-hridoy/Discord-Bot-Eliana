const axios = require('axios');

module.exports = {
    name: 'logo',
    description: 'Generate a gaming logo with a name!',
    async execute(message, args) {
        // Check if the user provided both a logo ID and a name
        if (args.length < 2) {
            return message.reply('❌ Please provide a logo ID (1-5) and a name for the logo!');
        }

        // Extract logo ID and user text
        const logoId = parseInt(args[0]);
        const userText = args.slice(1).join(' ');

        // Validate logo ID
        if (isNaN(logoId) || logoId < 1 || logoId > 5) {
            return message.reply('❌ Invalid logo ID! Please provide a number between 1 and 5.');
        }

        // Generate the API URL
        const apiUrl = `https://api.elianabot.xyz/api/logo/game/logo.php?logoid=${logoId}&text=${encodeURIComponent(userText)}`;

        try {
            // Send the image as an embedded image in response
            await message.reply({
                embeds: [{
                    title: `🎮 Gaming Logo for "${userText}"`,
                    image: { url: apiUrl },
                    color: 0x00ff00 // Optional: Set embed color
                }]
            });
        } catch (error) {
            console.error('Error generating logo image:', error.message); // Log the error
            message.reply('⚠️ Something went wrong while generating the logo. Please try again.');
        }
    },
};
