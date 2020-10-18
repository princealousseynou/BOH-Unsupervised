// Main Files Import
//This is The JSON File With The Bot Token In It..
const botConf = require("./WatsonConfig.json"); 
//This is the Disocord.js API we download before..
const Discord = require("discord.js");
//require("dotenv").config();
// Custom Files Import
//We will be making this file after this one
const Comm = require("./Commands");
// We will now using Watson SDK now but it's important to load it first
const Wat = require('./Watson API');

// Destructuring Modules And Classes

const {
    Client,
    ClientUser
} = Discord;

// Bot Initialiser
const Bot = new Client();


// Bot Starting Message

Bot.on("ready", () => {
    console.log("INITIALISING Watson AI assistant PLEASE WAIT.........");
    setTimeout(() => {
        console.log("Watson ACTIVE");
    }, 1000);
});


/*

This Space is for Commands Customisations

*/

const Main = new Comm.Main();

Main.Com1();

const PoP = new Wat.Wat();

PoP.Bot();



// Logging in bot into the server
Bot.login(botConf.token); //Use the bot token here