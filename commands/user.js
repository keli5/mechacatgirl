const util = require("../util/nicknames")

module.exports = {
    name: 'user',
    description: 'example command',
    async execute(bot, message, args, senderNickname) {
        /*util.getRealUsername(bot, args[0] || senderNickname).then(value => {
            value ? bot.chat(value) : bot.chat("&cNo user found!")
        })*/
        
        value = await util.getRealUsername(bot, args[0] || senderNickname)
        owner = await util.nickIsBotOwner(bot, args[0] || senderNickname)
        bot.chat(value || "No user found!")
        bot.chat(owner.toString())
    }
}