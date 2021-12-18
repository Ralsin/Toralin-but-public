const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('hex')
		.setDescription('Gives you random hex color.'),
	ex: (i, bot, MessageEmbed) => {
        var hex = '#'+Math.floor(Math.random()*0xFFFFFF).toString(16)
		const embed = new MessageEmbed()
            .setColor(hex)
            .setTitle('Random Hex color')
            .setDescription(hex)
        return i.reply({ embeds: [embed] })
	}
}