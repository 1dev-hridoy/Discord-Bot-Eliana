const axios = require('axios');

module.exports = {
    name: 'animedp',
    description: 'Get a high-quality anime profile picture!',
    async execute(message) {
        // API endpoint that provides the anime profile picture
        const apiUrl = 'https://api.elianabot.xyz/api/animepfp.php?api=d3ee2bd5411a44308577ed90abe0fa30';

        try {
            // Fetch the anime image from the API
            const response = await axios.get(apiUrl);

            // Extract the image URL from the API response
            const animeImageUrl = response.data.image_url;

            // Send the anime image as an embedded image
            await message.reply({
                embeds: [{
                    title: '🌸 Your High-Quality Anime Profile Picture!',
                    image: { url: animeImageUrl },
                    color: 0xffb6c1 // A soft pink color for anime vibes
                }]
            });
        } catch (error) {
            console.error('Error fetching anime profile picture:', error.message);
            await message.reply('⚠️ Something went wrong while fetching the anime profile picture. Please try again later.');
        }
    },
};
