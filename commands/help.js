const execSync = require("child_process").execSync


module.exports = {
    name: 'help',
    description: 'example command',
    async execute(bot, message, args, senderNickname) {
        const revHash = execSync("git rev-parse --short HEAD")
            .toString()
            .trim()

        bot.chat("mechacatgirl " + revHash)
        bot.chat("commands: " + [...bot.commands.keys()].join(", "))
    }
}