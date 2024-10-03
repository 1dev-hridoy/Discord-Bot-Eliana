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
<h3>Make The Both Rules Ttrue And Publish </h3>
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
<h3>Enter Your Bot Name And Click Create. Now Got To Bot Section...</h3>

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
- <h2>Here's Some Command Example</h2>
<p align="center">
<pre><code>module.exports = {
  name: 'ping',
  description: 'Replies with Pong!',
  execute(message) {
    message.reply('Pong!');
  },
};</code></pre>
<img src="![image](https://github.com/user-attachments/assets/8327bc13-1f79-49f7-80b7-c1e37e75c51d)
">
