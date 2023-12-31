const util = require("../util/nicknames")

module.exports = {
    name: 'lookat',
    description: 'look at the sender or a specific person',
    usage: "[user]",
    async execute(bot, message, args, senderNickname) {
        targetname = (await util.getRealUsername(bot, args[0] || senderNickname)) || args[0]
        targetname = targetname.toLowerCase()
        targetEntity = null;
        for (const [id, ent] of Object.entries(bot.entities)) {
            if (ent.type == "player") {
                if (ent.username.toLowerCase() == targetname) {
                    targetEntity = ent
                }
            }
        }

        if (!targetEntity) return bot.chat("Couldn't find user near me!");
        bot.lookAt(targetEntity.position.offset(0, 1.6, 0))
    }
}