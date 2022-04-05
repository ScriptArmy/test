require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

let bot = { client };
client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
});
client.slashcommands = new Discord.Collection();
client.loadSlashCommands = (bot, reload) =>
  require("./handlers/slashcommands.js")(bot, reload);
client.loadSlashCommands(bot, false);
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.inGuild())
    return interaction.reply("This interaction can only be used in a guild.");
  const slashcmd = client.slashcommands.get(interaction.commandName);
  if (!slashcmd) return interaction.reply("Invalid slash command.");
  if (!slashcmd.perms && !interaction.member.permissions.has(slashcmd.perm))
    return interaction.reply(
      "You do not have the required permissions to run this command/interaction."
    );
  slashcmd.run(client, interaction);
});
client.login(process.env.TOKEN);
