const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ship')
		.setDescription('Ship people :з')
        .addUserOption(option =>
            option.setName('user1')
            .setDescription('1st user')
            .setRequired(true)
        )
        .addUserOption(option =>
            option.setName('user2')
            .setDescription('2nd user')
            .setRequired(true)
        ),
	async ex(i, bot, MessageEmbed) {
        const user1 = i.options.getUser('user1').id
        const user2 = i.options.getUser('user2').id
        const perc = await require('../modules/db/db.js').ship(user1, user2)
        let cAnswer = 'That\'s sad :\'‹'
        if(perc>=25){cAnswer = 'That\'s not so good combo.'}
        if(perc>=40){cAnswer = 'Good :з'}
        if(perc>=70){cAnswer = 'Great combo :0'}
        if(perc>=90){cAnswer = 'You\'re created for eachother! >w<'}
		const embed = new MessageEmbed()
			.setColor('c0ff00')
            .setTitle('Ship')
            .setDescription(`<@${i.user.id}> ships <@${user1}> and <@${user2}>\nIt's ${perc}% effective! ${cAnswer}`)
        return i.reply({ embeds: [embed] })
	}
}