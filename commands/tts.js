const { Client, Intents } = require('discord.js');
const gTTS = require('gtts');
const fs = require('fs');

module.exports = {
    name: 'tts',
    description: 'Converts text to speech and sends as a voice message.',
    async execute(message, args) {
        // Check if the user provided some text
        if (!args.length) {
            return message.reply('Please provide a text to convert into speech!');
        }

        // Join the args array into a single string
        const textToConvert = args.join(' ');

        // Create a file path for the output audio file
        const audioPath = `./tts-${message.author.id}.mp3`;

        // Initialize gTTS (Google Text-to-Speech) with the text and language
        const gtts = new gTTS(textToConvert, 'en'); // 'en' stands for English

        // Save the TTS audio to a file
        gtts.save(audioPath, function (err) {
            if (err) {
                console.error(err);
                return message.reply('Error generating speech. Please try again.');
            }

            // Send the generated audio file in the chat
            message.channel.send({
                files: [{
                    attachment: audioPath,
                    name: `speech.mp3`
                }]
            }).then(() => {
                // After sending, delete the file to free up space
                fs.unlink(audioPath, (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            });
        });
    }
};
