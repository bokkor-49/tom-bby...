module.exports = {
  config: {
    name: "offbot",
    aliases: ["off"],
    version: "1.0.0",
    author: "your-name",
    countDown: 5,
    role: 2,
    shortDescription: "Turn off the bot",
    longDescription: "",
    category: "owner",
    guide: "{pn}"
  },

  onStart: async function ({ api, event }) {
    const permission = [
    "100071457007723"
  ]; // Replace with actual admin IDs

    if (!permission.includes(event.senderID)) {
      return api.sendMessage(
        "You don't have permission to use this command.",
        event.threadID
      );
    }

    api.sendMessage(
      "Bot is now offline. Goodbye!",
      event.threadID,
      () => process.exit(0)
    );
  }
};
