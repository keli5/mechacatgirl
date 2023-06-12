module.exports = {
    name: 'reload',
    description: 'example command',
    async execute(bot, message, args, raw) {
        bot.commands.clear()
        cmds = await bot.loadCommands(bot)

        bot.chat(`OK! Loaded ${cmds.amount} commands`)
    }
}