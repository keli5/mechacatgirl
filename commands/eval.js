const util = require("../util/nicknames")

module.exports = {
    name: 'eval',
    description: 'example command',
    async execute(bot, message, args, senderNickname) {
        owner = await util.nickIsBotOwner(bot, senderNickname)
        if (!owner) return bot.chat("&cYou must be owner to use this command!")

        bot.chat((eval(args.join(" ")) || "").toString())
    }
}