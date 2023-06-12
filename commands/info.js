const execSync = require("child_process").execSync

module.exports = {
    name: 'info',
    description: 'example command',
    async execute(bot, message, args) {
        const revHash = execSync("git rev-parse --short HEAD")
            .toString()
            .trim()
        const remote  = execSync("git config --get remote.origin.url")
            .toString()
            .trim()
            .replace("https://", "") // no embed 
            .replace(".git", "")

        bot.chat(`username: &a${bot.username}&f ○ commit &a${revHash} &f○ &a${remote}`)
    }
}