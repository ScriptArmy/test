const run = async (client, interaction) => {
  interaction.reply("Test command works!");
};

module.exports = {
  name: "test",
  description: "Test command.",
  perm: "SEND_MESSAGES",
  run,
};
