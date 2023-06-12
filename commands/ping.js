module.exports = {
    name: 'test',
    description: 'example command',
    async execute(bot, message, args) {
        bot.chat(`pong! // args: ${args.join(" ")}`)
    }
}