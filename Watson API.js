// All Module Imports For Watson Conversation API
const Watson = require("ibm-watson/assistant/v2");
//const watson = require("ibm-watson");
//import DiscoveryV1 from "ibm-watson/discovery/v1";
const DiscoveryV1 = require("ibm-watson/discovery/v1"); 
const {IamAuthenticator} = require("ibm-watson/auth");
const Cred = require("./ibm-credentials.json");
const botConf = require("./Watsonconfig.json");
const Discord = require("discord.js");
const AssistantV2 = require("ibm-watson/assistant/v2");


//const authenticator = new IamAuthenticator ({apikey:process.env.ASSISTANT_IAM_APIKEY,
//});
const authenticator = new IamAuthenticator ({apikey:Cred.API,
});

//const discoveryClient = new DiscoveryV1({authenticator = new IamAuthenticator({apikey: process.env.ASSISTANT__IAM_APIKEY}), version: '2020-09-24'});
  //version: Cred.version;
const assistant = new AssistantV2({
  version:'2020-09-24',
  authenticator: authenticator,
  url: process.env.ASSISTANT_URL,
});
//ibm-watson@^5.2.0
const {
  Client,
  ClientUser,
  Role

} = Discord;

// Global Variable For Seesion and Etc
var Sess_ID;
var Res;

// Initialising Watson Assisstant

/*const Ass = new AssistantV2({
  version: '2020-09-24',
  username: 'princealousseynou@gmail.com',
  password: '1A2o3diallo',
  url: Cred.URL
}, (err, res) => {
  console.log(err);
  console.log(res);
});
*/
// Initialising Watson Services

//const service = new watson.AssistantV2
const service = new AssistantV2({
  //apikey: Cred.API, //Put Your API key from the credential JSON file we created earlier
  authenticator: authenticator,
  version: '2020-09-24',
  url: Cred.URL //Put your Url From that credentials JSON file we created earlier
});

// Section For Invoking All Watson API Services And Sending Messages To Conversational Bot And Receiving The Response Back

class Main {

  Start_Sessions() {
    // Session Starting
    service.createSession({
      assistant_id: Cred.Ass_ID, //Put your Assistant ID from the watson website
    }, function (err, response) {
      if (err) {
        console.error(err);
      } else {
        Sess_ID = response.session_id;
        console.log(Sess_ID);
      }
    });
  }

  Sending_Messages(mess, callback) {

    // Sending Messages With a Delay Of 5 Sec 
    setTimeout(() => {
      service.message({
        assistant_id: Cred.Ass_ID, //Put your Assistant ID from the watson website
        session_id: Sess_ID,
        input: {
          'message_type': 'text',
          'text': `${mess}`
        }
      }, function (err, response) {
          if (err)
            console.log('Error: Sorry For Some Trouble');
          else
            Res = response.output.generic[0].text.replace( /!/gi ,"");
          callback(Res);

      });
    }, 5000);


  }

  // Removing Sessions Explicitly Instead Of Session Time Out For API On A Delay Of 9 Sec
  Removing_Sessions() {
    setTimeout(() => {

      service.deleteSession({
        assistant_id: Cred.Ass_ID, //Put your Assistant ID from the watson website
        session_id: `${Sess_ID}`,
      }, function (err, response) {
        if (err) {
          console.error("Sorry Some Error's Need To Be Fixed");
        } else {
          console.log(JSON.stringify(response, null, 2));
        }
      });


    }, 9000);

  }
  Bot() {

    const Ses = new Main();
    

    const Bot = new Client();

    
    Bot.on("message", (mess) => {
      if (mess.author.bot) return;
      if (mess.content.includes("!")) {
        Ses.Start_Sessions();
        let mess1 = mess.content.replace("!", "yee");
        let mess2 = "Hi I am Watson. Howdy!";
        console.log("%s being printed as test", mess1);
        Ses.Sending_Messages(mess2, Bot_Call);
        setTimeout(() => { Ses.Removing_Sessions(); }, 1000);
        }
        function Bot_Call(Result) {
          // Bot Initialiser
          console.log()
          try{
            mess.channel.send(Result);
          } catch {err} {
            console.error(err);
          }
          
        }

      });
    Bot.login(botConf.token);

  }



}



module.exports.Wat = Main;
