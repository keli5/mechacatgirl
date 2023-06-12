const util = require("../util/getusername")

module.exports = {
    name: 'user',
    description: 'example command',
    async execute(bot, message, args, senderNickname) {
        console.log(senderNickname)

        util.getRealUsername(bot, args[0] || senderNickname).then(value => {
            value == "found." ? bot.chat("&cInvalid user!") : bot.chat(value)
        })
        
    }
}