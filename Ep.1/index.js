const express = require('express');
const discord = require('discord.js');
const config = require('./config.json');
const { token, prefix } = require('./config');
const client = new discord.Client();

client.on('ready', () => {
  console.log(`${client.user.username}`);
  client.user.setActivity('DISCORD.JS', {type: 'watching'});
});

client.on('message', message => {
  if (message.content === `${prefix}ping`) {
    return message.channel.send(`🏓pong! ${(client.ws.ping)}-ms`);
  }
});

client.login(token);

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
