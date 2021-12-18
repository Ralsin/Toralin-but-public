module.exports = {
    data: { name: 'message' },
	ex: (bot, msg) => {
        if(!msg.guild) return;
        const emjs = bot.guilds.cache.get('792554220036816897').emojis.cache.map(emoji => emoji.name);
        const randEmjs = emjs[Math.floor(Math.random() * emjs.length)];
        if(Math.floor(Math.random() * 50) == '40'){
            const emj = bot.guilds.cache.get('792554220036816897').emojis.cache.find(emoji => emoji.name === randEmjs);
            if(!emj.animated){return msg.channel.send('<:'+emj+':'+emj.id+'>')}
            else {msg.channel.send('<a:'+emj+':'+emj.id+'>')}
        }
        if(msg.content.toLowerCase().includes('йифф') || msg.content.toLowerCase().includes('yiff')){msg.channel.send('<:ahh:794192721258479647>')}
		if(msg.content.toLowerCase() == 'beep'){msg.channel.send('boop!')}
	}
}