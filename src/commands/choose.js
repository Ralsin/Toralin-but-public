const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('choose')
		.setDescription('In other words: Random v2.')
        .addStringOption(option => option.setName('1st').setDescription('1st option').setRequired(true))
        .addStringOption(option => option.setName('2nd').setDescription('2nd option').setRequired(true))
        .addStringOption(option => option.setName('3rd').setDescription('3rd option'))
        .addStringOption(option => option.setName('4th').setDescription('4th option'))
        .addStringOption(option => option.setName('5th').setDescription('5th option'))
        .addStringOption(option => option.setName('6th').setDescription('6th option'))
        .addStringOption(option => option.setName('7th').setDescription('7th option'))
        .addStringOption(option => option.setName('8th').setDescription('8th option'))
        .addStringOption(option => option.setName('9th').setDescription('9th option'))
        .addStringOption(option => option.setName('10th').setDescription('10th option')),
	ex: (i, bot, MessageEmbed) => {
        const vars = [];
        const one = i.options.getString('1st'); const two = i.options.getString('2nd')
        const three = i.options.getString('3rd'); const four = i.options.getString('4th')
        const five = i.options.getString('5th'); const sex = i.options.getString('6th')
        const seven = i.options.getString('7th'); const eight = i.options.getString('8th')
        const nine = i.options.getString('9th'); const ten = i.options.getString('10th')
        if(one){vars.push(one)};if(two){vars.push(two)};
        if(three){vars.push(three)};if(four){vars.push(four)};
        if(five){vars.push(five)};if(sex){vars.push(sex)};
        if(seven){vars.push(seven)};if(eight){vars.push(eight)};
        if(nine){vars.push(nine)};if(ten){vars.push(ten)};
        const rand = vars[Math.floor(Math.random() * vars.length + 0.25)];
        const embed = new MessageEmbed()
			.setColor('c0ff00')
            .setTitle('Choose')
            .setDescription(`Random decides...\n\`${rand}\``)
        return i.reply({ embeds: [embed] })
	}
}