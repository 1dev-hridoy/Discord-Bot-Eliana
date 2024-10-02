const axios = require('axios');

module.exports = {
    name: 'football',
    description: 'Get a high-quality football image!',
    async execute(message) {
        const apiUrl = 'https://api.elianabot.xyz/api/football.php?api=d3ee2bd5411a44308577ed90abe0fa30';

        try {
            // Fetch the football image from the API
            const response = await axios.get(apiUrl);
            const { image_url } = response.data;

            // Send the image URL directly to the chat
            await message.reply({
                content: "⚽ Here’s your football image:",
                embeds: [{
                    image: {
                        url: image_url // Use the image URL from the API response
                    }
                }]
            });
        } catch (error) {
            console.error('Error fetching football image:', error.message);
            return await message.reply("⚠️ An error occurred while fetching the football image. Please try again later.");
        }
    },
};
