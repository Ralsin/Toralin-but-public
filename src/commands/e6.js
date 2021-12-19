const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('e6')
		.setDescription('Hell yeah, e621 search! (NSFW) ( ͡° ͜ʖ ͡°)')
		.addStringOption(option =>
            option.setName('tags').setDescription('Tags to search for')
        ),
	ex: (i, bot, MessageEmbed) => {
		if(!bot.channels.cache.get(i.channelId).nsfw) return i.reply({content:'This channel is not nsfw one, baka!',ephemeral:true})
        const rawTags = i.options.getString('tags') || '';
        const tags = rawTags.split('webm').join('');
        const options = {
            host: 'e621.net',
            path: `/posts.json?limit=50&tags=order:random+${tags.split(' ').join('+')}+-webm`,
            headers: {
                'User-Agent': process.env.e_user_agent,
            },
            body: {
                'login': process.env.e_login,
                'api_key': process.env.e_key
            }
        }
        const req = require('https').get(options, res => {
            if(res.statusCode != '200') console.log(`statusCode: ${res.statusCode}`);
            let array = new Array();
            res.on('data', async d => {
                array.push(d.toString('utf8'))
            })
            res.on('end', async () =>{
                const results = JSON.parse(array.join(''));
                if(!results || results.length < 5000) return i.reply('error'), console.log(results);
                if(!results.posts[0]){return i.reply({content: 'I can\'t find anything with your tags', ephemeral: true})};
                const artists = results.posts[0].tags.artist;
                const embed = new MessageEmbed()
                    .setColor('c0ff00')
                    .setTitle('e621 search')
                    .setDescription('Here\'s result')
                    .setImage(results.posts[0].file.url)
                if(artists && tags != artists){embed.addField('Artist(s):', `\`${artists}\``)};
                if(tags && tags != ' '){embed.addField('Tags used to find it:', `\`${tags}\``)};
                return i.reply({ embeds: [embed] })
            })
        })
        req.on('error', error => {
            i.reply({content: '```js'+error+'```', ephemeral: true})
        })
        req.end()
	}
}
