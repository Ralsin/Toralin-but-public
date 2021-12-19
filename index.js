const { Client, Collection, MessageEmbed } = require('discord.js');

const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_EMOJIS_AND_STICKERS"] });
require('dotenv').config();

bot.cmds = new Collection();
const load_dir = (dirs) => {
    const files = require('fs').readdirSync(`./src/${dirs}`).filter(file => file.endsWith('.js'));
    for(file of files){
        const command = require(`./src/${dirs}/${file}`)
        bot.cmds.set(command.data.name, command)
    }
}
['commands', 'modules/events'].forEach(e => load_dir(e));

bot.on('ready', () => {
    console.log('I\'m funkin alive!');
	bot.user.setActivity(`${bot.guilds.cache.size} guilds.`, {type: 'WATCHING'})
    require('./src/modules/db/db.js').sync()
})

bot.on('messageCreate', msg => {
    if(msg.author.bot)return;
    bot.cmds.get('message').ex(bot, msg);
    if(msg.content.startsWith('!>') && msg.author.id == '704037343878971424'){
        try{eval(msg.content.replace("!>", "")); return msg.react(':paw:800419421406756894')}catch(e){msg.channel.send('```js\n'+e+'\n```')}
    }
});
bot.on('interactionCreate', i => {
    try{bot.cmds.get(i.commandName).ex(i, bot, MessageEmbed)}catch(e){console.log(e); i.reply({content: '```js\n'+e+'\n```', ephemeral: true})}
});

//require('./server.js')(); // for those replit dudes
bot.login(process.env.token);
