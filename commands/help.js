const execSync = require("child_process").execSync


module.exports = {
    name: 'help',
    description: 'view list of commands, or help for a specific command',
    usage: "[command]",
    async execute(bot, message, args, senderNickname) {
        let command = null;
        const revHash = execSync("git rev-parse --short HEAD")
            .toString()
            .trim()

        if (!args[0]) {
            bot.chat("mechacatgirl " + revHash)
            bot.chat("commands: " + [...bot.commands.keys()].join(", "))
            return;
        }
        try {
            command = bot.commands.get(args[0]) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(args[0]));
        } catch {
            return bot.chat("&cNo command found by this name.")
        }

        bot.chat(`&a${command.name} &f-- &a${command.description} &f-- &ausage: ${bot.config.prefix}${command.name} ${command.usage || ""}`)
    }
}