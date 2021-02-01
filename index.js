const Discord = require("discord.js");
const config = require("./config.json");

const { requestHero } = require("./download-guide");

const client = new Discord.Client();

const { PREFIX, BOT_TOKEN: TOKEN } = config;

const getCommand = content => {
    const body = content.slice(PREFIX.length);
    const args = body.split(' ');
    const command = args.shift().toLowerCase();
    
    return command;
}

const runHeroes = async message => {
    const heroes = await requestHero();

    console.log(heroes);
    heroes.forEach(hero => {
        message.reply(`${hero.name} inda house`);
    })
};

const runPingCommand = message => {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Ping! This message had a latency of ${timeTaken}ms.`);
};

const router = (command, message) => {
    const availables = {
        ping: runPingCommand,
        heroes: runHeroes,
    };

    if (availables[command]) {
        availables[command](message);
    }
}

client.on("message", message => {
    const { content, author } = message;

    if (author.bot) {
      return false;
    }

    if (!content.startsWith(PREFIX)) {
        return false;
    }

    const command = getCommand(content);

    console.log(`Running command of ${author}`);

    router(command, message);
});

client.login(TOKEN);