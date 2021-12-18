require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [];
const commandFiles = require('fs').readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const clientId = process.env.appId; // <-- your bot id

for (const file of commandFiles) {
	const command = require(`../commands/${file}`);
	if(command.data){commands.push(command.data.toJSON())};
}

const rest = new REST({ version: '9' }).setToken(process.env.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, '897194672882057306'),
            { body: commands },
        );
        
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
