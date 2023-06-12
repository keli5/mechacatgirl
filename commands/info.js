module.exports = {
    name: 'info',
    description: 'example command',
    async execute(bot, message, args) {
        bot.chat(`username: ${bot.username} //`)
    }
}