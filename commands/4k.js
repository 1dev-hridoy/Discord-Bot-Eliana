const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

// Directory for enhanced images
const enhancedImagesDir = path.join(__dirname, '../enhanced_images');
fs.ensureDirSync(enhancedImagesDir); // Ensure the directory exists

module.exports = {
    name: '4k',
    description: 'Upscale the quality of an image.',
    async execute(message) {
        // Check if the message is a reply
        if (!message.reference) {
            return message.reply('Please reply to an image!');
        }

        // Fetch the replied message
        const repliedMessage = await message.fetchReference();

        // Check if the replied message has attachments
        if (repliedMessage.attachments.size === 0) {
            return message.reply('The replied message does not contain any image!');
        }

        const imageUrl = repliedMessage.attachments.first().url;

        try {
            // Upscale the image
            const enhancedImageUrl = await upscaleImage(imageUrl);
            await message.reply(`Here is the enhanced image: ${enhancedImageUrl}`);
        } catch (error) {
            console.error(error);
            await message.reply('There was an error processing the image.');
        }
    },
};

async function upscaleImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);

    // Enhance the image using sharp
    const enhancedImageBuffer = await sharp(imageBuffer)
        .resize({ width: 1200, height: 800, fit: 'contain' }) // Resize while maintaining aspect ratio
        .toFormat('jpeg', { quality: 90 }) // High quality JPEG
        .modulate({
            brightness: 1.6, // Increase brightness
            saturation: 1.6, // Increase saturation
        })
        .sharpen({ sigma: 1.8, flat: 2.0, jagged: 2.0 }) // Advanced sharpening
        .linear(1.3, -40) // Increased contrast adjustment
        .blur(1) // Slight blur to smoothen out details and reduce noise
        .convolve({
            kernel: [
                0, -1, 0,
                -1, 5, -1,
                0, -1, 0
            ] // Apply a valid sharpening kernel
        })
        .toBuffer();

    // Generate a unique filename
    const filename = `enhanced_${Date.now()}.jpg`;
    const filePath = path.join(enhancedImagesDir, filename);

    // Save the enhanced image on the server
    await fs.writeFile(filePath, enhancedImageBuffer);

    // Return the URL of the enhanced image
    const imageUrl = `http://localhost:3000/enhanced_images/${filename}`;

    // Delete the file after a delay (e.g., 10 seconds)
    setTimeout(async () => {
        await fs.remove(filePath);
    }, 10000);

    return imageUrl;
}
