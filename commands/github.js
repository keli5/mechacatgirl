const execSync = require("child_process").execSync

module.exports = {
    name: 'github',
    description: 'example command',
    async execute(bot, message, args) {
        const remote  = execSync("git config --get remote.origin.url")
            .toString()
            .trim()
            .replace("https://", "") // no embed 
            .replace(".git", "")

        bot.chat(`&a${remote}`)
    }
}