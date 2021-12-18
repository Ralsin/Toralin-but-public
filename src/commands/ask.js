const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ask')
		.setDescription('Answers to your question.')
        .addStringOption(option =>
            option
            .setName('question')
            .setDescription('Your question')
            .setRequired(true)
        ),
	ex: (i, bot, MessageEmbed) => {
        const answers = ['I don\'t think so', 'nah', 'Try one more time', 'Yep', 'uh...', 'ofc no', 'maybe', 'maybe?..', 'nou', 'go ahead', 'idk', 'nope.', '50/50']
        const answer = answers[Math.floor(Math.random() * answers.length)]
		const embed = new MessageEmbed()
            .setColor('c0ff00')
            .setTitle('Q&A')
            .addField('Question:', i.options.getString('question'))
            .addField('Answer:', answer)
        return i.reply({ embeds: [embed] })
	}
}