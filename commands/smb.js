module.exports = {
    name: 'smb',
    description: 'example command',
    async execute(bot, message, args, raw) {
        bot.chat("Latest system message: " + bot.systemMessageBuffer.at(-1))
    }
}