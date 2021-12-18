const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Shows profile picture of an user you mentioned, else your.')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('User to fetch avatar from')
            .setRequired(false)
        ),
	ex: (i, bot, MessageEmbed) => {
        var user = i.options.getUser('user') || i.user;
		const embed = new MessageEmbed()
            .setColor('c0ff00')
            .setTitle('**Avatar**')
            .setDescription(`Here you go. <@${user.id}>' avatar.`)
            .setImage(user.avatarURL({dynamic: true, size: 2048}))
        return i.reply({ embeds: [embed] })
	}
}