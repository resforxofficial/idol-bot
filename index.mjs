import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();
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
    if (msg.content.startsWith("/정보")) {
        const args = msg.content.split(" ");
        const nameOfgroup = args[1];

        return msg.reply();
    }
});

client.login(process.env.API_KEY);
