const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('cmd-name')
		.setDescription('Description.'),
	ex: (i, bot, MessageEmbed) => {
		const embed = new MessageEmbed()
			.setColor('c0ff00')
            .setTitle('Title')
            .setDescription('Description')
        return i.reply({ embeds: [embed] })
	}
}