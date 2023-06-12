const execSync = require("child_process").execSync

module.exports = {
    name: 'info',
    description: 'example command',
    async execute(bot, message, args) {
        const revHash = execSync("git rev-parse --short HEAD")
            .toString()
            .trim()
        const commitMade = execSync("git show -s --format=%ar " + revHash)
            .toString()
            .trim()
        bot.chat(`username: &a${bot.username}&f ○ commit &a${revHash} (&a${commitMade})`)
    }
}