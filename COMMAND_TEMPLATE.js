module.exports = {
    name: 'example',
    description: 'example command',
    async execute(bot, message, args, raw) {
        bot.chat("pong")
    }
}