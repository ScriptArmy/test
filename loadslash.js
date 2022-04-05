require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });

let bot = { client };
const guildId = "918030971306115074";
const clientId = "957633003562094592";
client.slashcommands = new Discord.Collection();
client.loadSlashCommands = (bot, reload) =>
  require("./handlers/slashcommands.js")(bot, reload);
client.loadSlashCommands(bot, false);
client.on("ready", async () => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error("Guild not found?", 404);
  }
  try {
    await guild.commands.set([...commands.slashcommands.values()]);
    console.log(`Successfully loaded in ${client.slashcommands.size}`);
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
});
