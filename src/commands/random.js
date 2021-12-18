const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Randomly chooses the number for you.')
        .addNumberOption(option => option.setName('num').setDescription('insert your max number here').setRequired(true)),
	ex: (i, bot, MessageEmbed) => {
        const answer = Math.floor(Math.random() * i.options.getNumber('num') + 0.49)
		const embed = new MessageEmbed()
			.setColor('c0ff00')
            .setTitle('Random')
            .setDescription(`Your number is ${answer} / from max ${i.options.getNumber('num')}`)
        return i.reply({ embeds: [embed] })
	}
}