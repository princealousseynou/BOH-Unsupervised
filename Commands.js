const botConf = require("./WatsonConfig.json");
const Discord = require("discord.js");
const request = require('request');

const {
    Client,
    ClientUser,
    Role
  
} = Discord;

console.log(process.env.ASSISTANT_IAM_APIKEY);
// Bot Initialiser
const Bot = new Client();

class Main {
    Main() {
        
    }
    Com1() {
        Bot.on("message", (mess) => {
            console.log(mess.content)
            let Mess = mess.content.split(" ");
            switch (Mess[0]) {
                case `${botConf.prefix}Hello`:
                    mess.channel.send(`Hello! ${mess.author} I'm SKYNET I'm new to human world and still observing every action for some amazing stuff I will controll everything in Year 3000 see you in future`);
                    setTimeout(() => {
                        mess.channel.send("Hope You're Having A Great Day ; )");
                    }, 2000);
                    break;
                case `${botConf.prefix}Who`:
                    mess.channel.send("Cyber Expert is a good person and a happy software developer as well. He likes people with some differnent kind of personalities");
                    mess.guild.members.first().sendMessage("Hope you enjoy your stay as we enjoy your welcome into our fold thanks for joining us");
                    break;
                case `${botConf.prefix}so`:
                    let userMess = Mess[1];
                    console.log(userMess);
                    mess.channel.send(`Hey guys a big fat shout out for ${userMess}`);
                    break;
                case `${botConf.prefix}addrole`:
                    if (mess.guild.members.first().hasPermissions("ADMINISTRATOR")) {
                        let addrole = mess.content.split(" ");
                        let Roll = mess.guild.roles.find(r => r.name === addrole[1]);
                        console.log(Roll.id);
                        mess.mentions.users.forEach((e) => {
                            mess.guild.members.find(r => r.id === e.id).addRole(Roll.id);
                        });
                    } else {
                        mess.guild.members.first().sendMessage("You Dont Have Permission Required To Use This Command { Contact Mod's To Do This }!")
                    }
                    break;
                case `${botConf.prefix}Commands`:
                    mess.channel.sendCode("", "1. !Who : Tell Us About Cyber Expert Who He Is And What He Likes \n2. !Hello : Say Hello To Cyber Expert \n3. !Commands : Tells All The Commands Can Be Used By Everyone");
                    break;
            }
            setInterval(() => {
                request('http://numbersapi.com/random', (error, response, body) => {
                    mess.channel.sendCode(`${response.body}`);
                });
            }, 1000 * 60 * 60);
            



        });
    }




}
Bot.login(botConf.token);


module.exports = {
    Main
};