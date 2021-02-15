const Discord = require("discord.js");
const bot = new Discord.Client();
const blacklist = ["0000", "0001", "6969", "0420"]
const classes = ["797594762697375744", "797594762689380361", "797594762689380360", "797594762689380359"];
const platforms = ["797674879323340830", "797686434420752434", "797819423292522518"];
const regions = ["797821459745079316", "797821476975018034", "797821495720148992", "797821513637036062", "797821529852870697", "797821548567330846"];
const channel = process.env.CHANNEL_ID;
const unverified = process.env.UNVERIFIED_ROLE_ID;
const verified = process.env.VERIFIED_ROLE_ID;
//const logs = new Discord.TextChannel("810169385431203880", { id: process.env.LOG_CHANNEL_ID});
bot.on('message', (msg) => {
if (msg.channel == channel && msg.member.roles.cache.has(unverified) && msg.content.startsWith("\"")) { 
    //logs.send("Name starting message noticed")
let name = msg.content.split(" ")
let tag = msg.author.tag.split("#")
let missingRole = false
checkRoles (msg, classes, "You have not selected a class! Please select one before you can request a name")
checkRoles (msg, platforms, "You must choose the platform you are playing on! Please select one before you can request a name")
checkRoles (msg, regions, "You shall give us info of what region of the world you live in! Please select one before you can request a name")
if (missingRole) { return }
else {
let isBlacklisted = false
for (let i = 0; i < blacklist.length; i++) {
    if (tag == blacklist[i]) { isBlacklisted = true; }
    else {return}
}
if (isBlacklisted) {
    tag = Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
    tag = tag.toString()
}
const filter = (reaction, member) => reaction.emoji.name === '✅' && member.roles.cache.has(process.env.FILTER_ROLE)
msg.awaitReactions(filter, {maxUsers: 1})
.then( () => {
    msg.member.setNickname("CT-" + tag[1] + " " + name[0])
    .then( () => {
        msg.member.roles.remove(unverified)
        msg.member.roles.add(verified)
    })
})
.catch(console.log(`Something went wrong with a request by ${message.author.username}`))
}
/* } else if (msg.channel == channel && msg.member.roles.cache.has(unverified) && msg.content.startsWith("CT-")) {
    logs.send("CT- starting message noticed")
    let name = msg.content.split(" ")
    name = name[1]
    let tag = msg.content.split(" ")
    tag = tag[0]
    tag = tag.split("-")
    tag = tag[1]
    tag = tag.toString()
    if (tag == blacklist[0] || tag == blacklist[1] || tag == blacklist[2] || tag == blacklist[3]) {
        tag = Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
        tag = tag.toString()
}
msg.member.setNickname("CT-" + tag + " " + name)
.then( () => {
    msg.member.roles.remove(unverified)
    msg.member.roles.add(verified)
})*/
} 
})
function checkRoles (msg, array, reply) {
    let hasRole = false;
    for (let i = 0; i < array.length; i++) {
        if (msg.member.roles.cache.has(array[i])) { hasRole = true; }
        else { return }
    } 
    if (!hasRole) {
        msg.reply(reply)
        missingRole = true
    } else { return }
}


bot.login(process.env.BOT_TOKEN)