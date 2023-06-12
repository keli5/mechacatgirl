const util = require("../util/nicknames")

module.exports = {
    name: 'eval',
    description: 'evaluate javascript code',
    usage: "<js code>",
    async execute(bot, message, args, senderNickname) {
        return bot.chat("&cDisabled")
        owner = await util.nickIsBotOwner(bot, senderNickname)
        if (!owner) return bot.chat("&cYou must be owner to use this command!")
        try {
            bot.chat((eval(args.join(" ")) || "").toString())
        } catch (error) {
            console.error(error)
            bot.chat("&#ed1f1f" + error.constructor.name)
        }
    }
}