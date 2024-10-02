const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports = {
  name: "anivid",
  description: "Fetch a random anime video and send it.",
  async execute(message) {
    try {
      // API URL for fetching a random anime video
      const apiUrl = `https://api.elianabot.xyz/anime/video/random.php?api=60692715c1ddc848f83b0989534e9a03`;
      const response = await axios.get(apiUrl);

      // Check if the response contains a valid video URL
      if (!response.data || !response.data.url) {
        return message.reply('⚠️ Failed to retrieve the video URL. Please try again later.');
      }

      const videoUrl = response.data.url;

      // Determine the extension based on the URL or content type
      const extension = await getExtensionFromUrl(videoUrl);
      const videoPath = path.join(__dirname, `tempVideo${extension}`);

      // Download the video file
      const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      await fs.writeFile(videoPath, videoResponse.data);

      // Send the video as an attachment
      await message.channel.send({
        content: '🎬 Here is your anime video!',
        files: [videoPath],
      });

      // Optionally delete the file after sending
      await fs.remove(videoPath);
    } catch (error) {
      console.error('Error fetching data from API:', error);
      await message.reply('⚡️ Error occurred while fetching the anime video. Please try again later.');
    }
  },
};

// Helper function to get the file extension from the URL or MIME type
async function getExtensionFromUrl(mediaUrl) {
  const response = await axios.head(mediaUrl); // Use HEAD request to get headers without downloading the file
  const mimeType = response.headers["content-type"];
  const extension = getExtensionFromMimeType(mimeType);
  return extension || path.extname(new URL(mediaUrl).pathname).toLowerCase();
}

// Map MIME types to file extensions
function getExtensionFromMimeType(mimeType) {
  const mimeTypeMap = {
    'video/mp4': '.mp4',
    'video/webm': '.webm',
    'video/ogg': '.ogv',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'audio/mpeg': '.mp3',
    'audio/mp4': '.mp4',
    'audio/wav': '.wav',
  };
  return mimeTypeMap[mimeType] || '';
}
