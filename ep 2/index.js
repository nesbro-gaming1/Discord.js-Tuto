const { MessageAttachment } = require("discord.js")
const { MessageEmbed } = require('discord.js');

const { Client, Collection } = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Client({
	disableEveryone: true
});

// Collections
client.commands = new Collection();
client.aliases = new Collection();

// Run the command loader
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	console.log(`Hi, ${client.user.username} is now online!`);
	client.user.setActivity('YOUR STSTUS!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;

	
	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	
	let command = client.commands.get(cmd);
	
	if (!command) command = client.commands.get(client.aliases.get(cmd));


	if (command) command.run(client, message, args);
});
client.login(token);
