const mineflayer = require("mineflayer")
const fs = require("fs")
const readline = require("readline")
const exit = require("process").exit
const util = require("./util/getusername")
const config = require("./config.json")

const PREFIX = config.prefix

let bot = mineflayer.createBot({
    host: config.host,
    auth: config.auth,
    username: config.username,
    version: config.version,
})
bot.commands = new Map()
bot.knownNicknames = new Map() // TODO: CACHE INVALIDATION!!!
bot.systemMessageBuffer = [];

bot.config = config

bot.on("spawn", () => {
    bot.physicsEnabled = false;
    bot.chat("/gmc")
})

const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
    terminal: true
});

rl.prompt()
rl.on("line", (line) => {
    if (line == "exit") {
        exit(0)
    }
    bot.chat(line)
    rl.prompt()
})

bot.on('message', async (json, pos) => {
    console.log(json.toAnsi())
    message = json.toString().split("» ")[1];
    if (pos == "system") {
        if ()
        return bot.systemMessageBuffer.push(json.toString());
    }
    if (pos != "chat") return;
    if (!message.startsWith(PREFIX)) return;

    const args = message.slice(PREFIX.length).split(/ +/);
    let commandName = "";
    let command = null;

    try {
        commandName = args.shift().toLowerCase();
        command = bot.commands.get(commandName) || bot.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
    } catch (e) {
        return bot.chat("&cInvalid command!")
    }
    let senderNickname = json.toString().split("» ")[0].trim(); // hacky as shit
    try {
        command.execute(bot, message, args, senderNickname)
    } catch (e) {
        console.error(e)
        bot.chat(`&4${e.constructor.name} &r- see console for details`)
    }
})

bot.on('error', () => {
    console.log("grahhhh")
})

function loadCommands(bot) {
    let loadedCommands = 0;
    let loadedCommandNames = [];
    fs.readdirSync("./commands/").forEach(command => {
        delete require.cache[require.resolve(`./commands/${command}`)];

        const commandName = command.split('.')[0];
        const commandFile = require(`./commands/${command}`);

        bot.commands.set(commandName, commandFile)
        loadedCommands++;
        loadedCommandNames.push(commandName)
    })
    console.log(bot.commands)
    return {
        "amount": loadedCommands,
        "names": loadedCommandNames
    }
}

bot.loadCommands = loadCommands;

bot.on("login", () => {
    var cmdInfo = loadCommands(bot)
    return console.log(`Loaded ${cmdInfo.amount} commands...`)
})

bot.on("end", () => {
    exit(1)
})