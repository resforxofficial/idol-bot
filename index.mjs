import { Client, Events, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
const text = fs.readFileSync("./ik.json", "utf-8");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.once(Events.ClientReady, rc => {
    console.log("Success", rc.user.tag);
});

client.on("messageCreate", (msg) => {
    if (msg.content === "ping") {
        return msg.reply("pong");
    }
});

client.login(text[0]);
