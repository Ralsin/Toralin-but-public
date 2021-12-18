const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Shows bot ping and uptime.'),
	ex: (i, bot, MessageEmbed) => {
		var bot_ping = i.createdTimestamp - Date.now();
		if(bot_ping < 0){bot_ping = bot_ping * (-1)}
		const embed = new MessageEmbed()
			.setColor('c0ff00')
			.addField('Ping: ', `Bot: ${bot_ping}ms\nAPI: ${bot.ws.ping}ms`)
			.addField('Uptime: ', require('ms')(bot.uptime))

        return i.reply({ embeds: [embed] })
	}
}