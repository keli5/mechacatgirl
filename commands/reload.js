const util = require("../util/nicknames")

module.exports = {
    name: 'reload',
    description: 'example command',
    async execute(bot, message, args, senderNickname) {
        owner = await util.nickIsBotOwner(bot, senderNickname)
        if (!owner) return bot.chat("&cYou must be owner to use this command!")

        bot.commands.clear()
        cmds = await bot.loadCommands(bot)

        bot.chat(`OK! Loaded ${cmds.amount} commands`)
    }
}