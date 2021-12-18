const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears desired amount of messages in this channel.')
        .addNumberOption(option =>
            option.setName('amount')
            .setDescription('the amount of messages (max: 100)')
            .setRequired(true)
        ),
	ex: (i, bot, MessageEmbed) => {
        if(!i.guild.members.cache.get(bot.user.id).permissions.has('MANAGE_MESSAGES')) return i.reply('```\nPermissions Error: Bot doesn\'t have needed permission (it needs ` Manage Messages ` permission).\n```');
        if(i.member.permissions.has('MANAGE_MESSAGES')){
            const value = i.options.getNumber('amount');
            if(value<1 || value>100){return i.reply({content: '```\nSome Error: You can\'t delete that amount of messages (min: 1, max: 100).\n```', ephemeral: true})}
            else {
                try{
                    i.channel.messages.fetch({limit: value}).then(msgs => {
                        const zise = msgs.size;
                        i.channel.bulkDelete(msgs);
                        return i.reply({content: `${zise} of ${value} messages was found and succesfully deleted!`, ephemeral: true})
                    });
                }catch(e){return i.reply({content: '```js\n'+e+'\n```', ephemeral: true})}
            }
        } else return i.reply('```\nPermissions Error: You don\'t have enough permissions to do this (you need ` Manage Messages ` permission).\n```')
	}
}