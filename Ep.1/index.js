const config = require("./config.json");
const { token, prefix } = require("./config");
const discord = require("discord.js");
const client = new discord.Client()

client.on("ready", () => {
     console.log(`${client.user.tag} is ready`)
     client.user.setActivity("YOUR STATUS!")
});

client.on("message", message => {
   if (message.content === `${prefix}ping`) {
   return message.channel.send("Pong!")
}
})

client.login(token);
