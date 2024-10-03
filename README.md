<img src="https://i.ibb.co.com/XSQrjc5/banner.jpg" alt="Eliana Bot Banner">
<h1 align="center"><img src="https://i.ibb.co.com/ZfpwYb7/logo.png" alt="Nazuko" style="width: 35px; height: 35px;">
 ✨ Eliana Discord Bot</h1>
<p align="center">
<img src="https://img.shields.io/badge/Node.js%20Support-20.x-blue" alt="Node.js Support">
<img src="https://img.shields.io/badge/size-20.7%20MB-green" alt="Size">
<img src="https://img.shields.io/badge/code%20version-v1.0.0-yellow" alt="Code Version">
<img src="https://img.shields.io/badge/license-MIT-gray" alt="License">

</p>

- [📝 **Note**](#-note)
- [🚧 **Requirement**](#-requirement)
- [📝 **Tutorial**](#-tutorial)
- [🔥 **Tutorial Firebase**](#-tutorial-firebase)
- [🤖 **Bot Token And Setting**](#-bot)
- [🖥️ **Dashboard**](#-dashboard)
- [🧩 **Command Example**](#-command-example)
- [📩 **Contact**](#-contact)


## 📝 **Note**
- ElianaBot is a free, open-source project built to enhance the Discord experience for communities worldwide. Our goal is to provide a versatile, customizable bot that meets the diverse needs of server owners and their members.

- Packed with a wide array of features, ElianaBot includes moderation tools, entertainment options, and utility commands designed to make managing and engaging with your Discord server easier. Whether you’re looking to play music, host interactive polls, or share trivia questions, ElianaBot helps create a more dynamic and enjoyable server environment.

- As an open-source project, we welcome developers of all levels to join our growing community! Feel free to fork ElianaBot from GitHub, tailor it to your needs, and contribute to its ongoing development. Let's build the best community tool together!

## 🚧 **Requirement**
- Knowledge of **programming**, javascript, nodejs, firebase

## 🔥 **Tutorial**
- Soon


## 🔥 **Tutorial-firebase**
- <p align="center">
Go to <a href="https://www.w3schools.com">Firebase</a>
</p>

<img src="https://i.ibb.co.com/kK75DZC/getstart.png">
<h3>Click Get started</h3>

<img src="https://i.ibb.co.com/m6WsMqz/getstart-with-project.png">
<h3>Then Get started with a Firebase project</h3>

<img src="https://i.ibb.co.com/Njp9hhj/enter-bot-name.png">
<h3>Now Enter Your Bot Name And Click The CheckBox And Continue</h3>

<img src="https://i.ibb.co.com/cNqmmtB/agin-con.png">
<h3>Again Continue</h3>

<img src="https://i.ibb.co.com/9VfM8TH/create-project.png">
<h3>Click The CheckBox And Create Project</h3>

<img src="https://i.ibb.co.com/yfMtVJF/wait-and-con.png">
<h3>Wait Some Moment And Continue </h3>

<img src="https://i.ibb.co.com/nj2NSVx/click-web.png">
<h3>Now Click On Web</h3>

<img src="https://i.ibb.co.com/HCKH08f/register-app.png">
<h3>Now Enter Your Bot Name Again And Click Register App</h3>

<img src="https://i.ibb.co.com/72tjppp/20241003-014210-11zon.jpg">
<h3>Once You Click Register App You Will Find Above Photo Screenshot But For Database URL Click Continue to console</h3>

<img src="https://i.ibb.co.com/z40DFjN/buildandrealtimedb.png">
<h3>Now Click On Build And Select Real Time Database </h3>

<img src="https://i.ibb.co.com/QcBcqqt/create-db.png">
<h3>Then create database then continue and then enable </h3>

<img src="https://i.ibb.co.com/375RNtQ/rules.png">
<h3>Now Go To Rules Tab</h3>

<img src="https://camo.githubusercontent.com/de407bccdb7775cee5f39b7f2d523ce3aad69557a14dfa01ffec2c55c1facd0e/68747470733a2f2f692e6962622e636f2e636f6d2f505468353578322f747275652e706e67">
<h3>Make The Both Rules True And Publish </h3>
	<pre><code>{
  "rules": {
    ".read": true,
    ".write": true
  }
}	</code></pre>

<img src="https://i.ibb.co.com/svz3nmH/dburl.png">
<h3>Now Go Back To Data Tab And Click On Copy URL And Add On Database URL In Config File</h3>

## 🔥 **Bot**
<img src="https://i.ibb.co.com/0hbLnz1/developer-section.png">
<h3>Go To <a href="https://discord.com/developers/applications">Discord Developer</a> Section And Then Click New Application</h3>

<img src="https://i.ibb.co.com/BLyTRxL/give-bot-name.png">
<h3>Enter Your Bot Name And Click Create. Now Go To Bot Section...</h3>

<img src="https://i.ibb.co.com/KGQktsG/resettoken.png">
<h3>Form The Bot Section Click On Reset Token Then Click Yes Do Form Popup And Enter Your Discord Account Password</h3>

<img src="https://i.ibb.co.com/h7mpp9k/Screenshot-2024-10-03-080633.pngh7mpp9k/Screenshot-2024-10-03-080633.png">
<h3>And You Will Get A Bot Token Copy And Paste It On config.json File And Then Turn On 3 Switch Form Privileged Gateway Intents
 Section</h3>

<h4>Full config.json</h4>
<pre><code>{
  "token": "ADD_BOT_TOKEN",
  "prefix": "!",
  "firebase": {
    "apiKey": "ADD_FIREBASE_API_KEY",
    "authDomain": "ADD_FIREBASE_AUTH_DOMAIN",
    "databaseURL": "ADD_FIREBASE_DV_URL",
    "projectId": "ADD_FIREBASE_PROJECT_ID"
  },
  "admins": [
    "ADMIN_UID"
  ],
  "owners": [
    "OWNER_UID"
  ]
}</code></pre>

## 🖥️ **Dashboard**
<p align="center">
<a href="https://i.ibb.co.com/31kcvWB/dashboard.png" target="_blank">Screenshot</a> *Dashboard Code Not Included In This Repo.
</p>


## 🔥 **Command-Example**
- <h2>Here's Some Command Example</h2><br>
<p align="center">Replay With Message
<pre><code>module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  execute(message) {
    message.reply('Pong!');
  },
};</code></pre>
<img src="https://github.com/user-attachments/assets/b8e46078-6863-4dc5-968e-a17d8b07aa07"></p>
<br>

<p align="center">Admin Only Command
<pre><code>const { admins } = require('../config.json'); // Importing the admin list

module.exports = {
  name: 'hello',
  description: 'Replies with Hello, but only admins can use it.',
  execute(message) {
    // Check if the user is an admin
    if (!admins.includes(message.author.id)) {
      return message.reply("❌ You do not have permission to use this command.");
    }
// If the user is an admin, reply with "Hello!"
    message.reply('Hello!');
  },
};
</code></pre>
<img src="https://github.com/user-attachments/assets/65958964-2b90-4670-bd74-3d89c0becb04"></p>
<br>


<p align="center">Add Balance To User Account 
<pre><code>const { ref, set, get } = require('firebase/database'); // Import Firebase database functions
module.exports = {
  name: 'money', // Command name
  description: 'Add 10 coins to your account.', // Description of the command
  async execute(message, args, client, db) {
    const userId = message.author.id; // Get user ID of the person using the command
    const guildId = message.guild.id; // Get the ID of the current server
    const addAmount = 10; // Fixed amount of 10 coins to add
    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`); // Reference to the user's economy data in the database
      // Check if the user has an existing economy record
      const economySnapshot = await get(userEconomyRef); 
      if (!economySnapshot.exists()) { // If no record exists, initialize it with a balance of 0
        await set(userEconomyRef, { balance: 0 });
      }
      const userEconomyData = (await get(userEconomyRef)).val(); // Get the user's current balance
      // Update the user's balance by adding 10 coins
      await set(userEconomyRef, { balance: userEconomyData.balance + addAmount });
      // Reply to the user with their new balance
      message.reply(`💰 You received 10 coins! Your new balance is ${userEconomyData.balance + addAmount} coins.`);
    } catch (error) {
      console.error("Error adding money:", error); // Log any errors that occur
      message.reply("There was an error trying to add money."); // Inform the user if an error occurs
    }
  },
};
</code></pre>
<img src="https://github.com/user-attachments/assets/1ec6b11c-f1f4-4997-aef7-fe2ef3770545"></p>
<br>

<p align="center">Spend Balance Form User Account 
<pre><code>const { ref, get, set } = require('firebase/database'); // Import Firebase database functions

module.exports = {
  name: 'spend', // Command name
  description: 'Spend coins from your account.', // Description of the command
  async execute(message, args, client, db) {
    const userId = message.author.id; // Get the ID of the user who triggered the command
    const guildId = message.guild.id; // Get the ID of the current guild (server)
    const spendAmount = 50; // Amount to be spent (deducted)
    try {
      const userEconomyRef = ref(db, `economy/${guildId}/${userId}`); // Reference to the user's economy data in the database
      const snapshot = await get(userEconomyRef); // Get the user's current balance
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const currentBalance = Number(userData.balance); // Convert balance to a number
        if (isNaN(currentBalance)) { // Check if balance is valid
          return message.reply("❌ Your balance is invalid. Please contact an administrator.");
        }
        if (currentBalance < spendAmount) { // Check if the user has enough coins
          return message.reply(`❌ You don't have enough coins. You need at least ${spendAmount} coins.`);
        }
        // Deduct the amount from the user's balance
        const newBalance = currentBalance - spendAmount;
        // Update the user's balance in the database
        await set(userEconomyRef, { ...userData, balance: newBalance });
        // Notify the user about the successful transaction
        message.reply(`✅ You spent ${spendAmount} coins. Your new balance is ${newBalance} coins.`);
      } else {
        message.reply("❌ You do not have a balance set yet.");
      }
    } catch (error) {
      console.error("Error processing spend command:", error); // Log any errors that occur
      message.reply("⚡️ An error occurred while processing your request. Please try again later.");
    }
  },
};
</code></pre>
<img src="https://github.com/user-attachments/assets/a6032ac1-171a-43de-b586-2c931197902e"></p>
<br>

## 📩 **Contact**
<p align="center">  <h2>📬 How to reach me:</h2>

  <table border="1" cellpadding="10" cellspacing="0">
    <tr>
      <th>Discord</th>
      <th>Telegram</th>
      <th>Instagram</th>
      <th>YouTube</th>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/6b381b30-861d-4a3c-859a-367da4956347" alt="Facebook QR" width="150"><br>
        <a href="https://discord.gg/yfBx5GU9Xr">Eliana Support Server</a>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/0bd6fcf3-332b-400b-8edf-0aa613c2d7bc" alt="Telegram QR" width="150"><br>
        <a href="https://t.me/BD_NOOBRA">BD_NOOBRA</a>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/727d205c-3f31-494b-ba2e-a594122d2b20" alt="Twitter QR" width="150"><br>
        <a href="https://www.instagram.com/hridoycode/">HridoyCode</a>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/f9dedbbb-606c-4ab5-b67b-73ab2f640ebb" alt="YouTube QR" width="150"><br>
        <a href="https://www.youtube.com/@hridoy-code">Hridoy Code</a>
      </td>
    </tr>
  </table>

  <h3>Email: <a href="mailto:dev.hridoy2002@gmail.com">dev.hridoy2002@gmail.com</a></h3></p>



  
