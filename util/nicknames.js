const mineflayer = import("mineflayer")

/**
 * Get the real username from a TFM chat message.
 * @param {import("mineflayer").Bot} bot 
 * @param {string} messagepart Everything before the >> of a TFM message
 */
    
async function getRealUsername(bot, messagepart, use_cache = true) {
    //const toERN = messagepart.split(" ").at(-1)
    //console.log(messagepart)
    //console.log
    const toERN = messagepart.split(" ").at(-1).substring(0, 50) // prevent sending a massive message
    const cached = bot.knownNicknames.get(toERN) || undefined
    if (cached && use_cache) {
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

/**
 * Find if a nickname is the bot owner.
 * This function is trivial if you already have a real username.
 * @param {import("mineflayer").Bot} bot 
 * @param {string} nickname 
 */
async function nickIsBotOwner(bot, nickname) {
    value = await getRealUsername(bot, nickname, false) // don't trust the cache here
    return (value == bot.config.owner)
}

module.exports = {
    getRealUsername: getRealUsername,
    nickIsBotOwner: nickIsBotOwner
}