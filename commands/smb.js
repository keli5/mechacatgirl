module.exports = {
    name: 'smb',
    description: 'view the latest entry in the system message buffer',
    async execute(bot, message, args, raw) {
        bot.chat("Latest system message: " + bot.systemMessageBuffer.at(-1))
    }
}