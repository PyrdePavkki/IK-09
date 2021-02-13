const Discord = require("discord.js");
const bot = new Discord.Client();
const blacklist = ["0000", "0001", "6969", "0420"]
const channel = [process.env.CHANNEL_ID_51ST, process.env.CHANNEL_ID];
const unverified = {
    "797594762668146739": process.env.UNVERIFIED_ROLE_ID_51ST,
    "810169385431203880": process.env.UNVERIFIED_ROLE_ID
}
const verified = {
    "797594762668146739": process.env.VERIFIED_ROLE_ID_51ST,
    "810169385431203880": process.env.VERIFIED_ROLE_ID
}
const logs = process.env.LOG_CHANNEL_ID;
bot.on('message', (msg) => {
if (channel.has(msg.channel.id) && unverified.has(msg.member.roles.cache) && msg.content.startsWith("\"")) { 
    logs.send("Name starting message noticed")
let name = msg.content.split(" ")
let tag = msg.author.tag.split("#")
if (tag == blacklist[0] || tag == blacklist[1] || tag == blacklist[2] || tag == blacklist[3]) {
    tag = Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10) + "" + Math.floor(Math.random() * 10)
    tag = tag.toString()
}
msg.member.setNickname("CT-" + tag[1] + " " + name[0])
.then( () => {
    msg.member.roles.remove(unverified[msg.guild.id.toString()])
    msg.member.roles.add(verified[msg.guild.id.toString()])
})
} else if (channel.has(msg.channel.id) && unverified.has(msg.member.roles.cache) && msg.content.startsWith("CT-")) {
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
    msg.member.roles.remove(unverified[msg.guild.id.toString()])
    msg.member.roles.add(verified[msg.guild.id.toString()])
})
}
})
bot.login(process.env.BOT_TOKEN)