const mineflayer = import("mineflayer")

/**
 * Get the real username from a TFM chat message.
 * @param {import("mineflayer").Bot} bot 
 * @param {string} messagepart Everything before the >> of a TFM message
 */
    
async function getRealUsername(bot, messagepart) {
    //const toERN = messagepart.split(" ").at(-1)
    //console.log(messagepart)
    //console.log
    const toERN = messagepart.split(" ").at(-1).substring(0, 50) // prevent sending a massive message
    const cached = bot.knownNicknames.get(toERN) || undefined
    if (cached) {
        return cached
    }
    bot.chat("/erealname " + toERN)
    await new Promise(resolve => setTimeout(resolve, 300)); // hacky - wait 300 ms before reading the message buffer
    const realName = bot.systemMessageBuffer.at(-1).split(" ").at(-1)
    if (realName == "found." || realName == "command.") {
        return null
    }
    bot.knownNicknames.set(toERN, realName) // TODO: CACHE INVALIDATION!!!
    return realName
}

module.exports = {
    getRealUsername: getRealUsername,
}