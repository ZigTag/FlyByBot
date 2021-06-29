import discord from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import commands from './commands';

dotenv.config();

const DEBUG_MODE = false;

const app = express();
const client = new discord.Client();

let healthy = false;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    healthy = true;
});

client.on('disconnect', () => {
    console.warn('Client disconnected');
    healthy = false;
});

client.on('message', (msg) => {
    if (DEBUG_MODE) {
        console.log(`Processing message ${msg.id} from user ${msg.author.id} in channel ${msg.channel.id} of server ${msg.guild.id}.`);
    }

    if (msg.author.id === client.user.id) {
        if (DEBUG_MODE) {
            console.log('Bailing because bot is author of message.');
        }
        return;
    }

    if (msg.content.startsWith('.')) {
        if (DEBUG_MODE) {
            console.log('Message starts with dot.');
        }

        const usedCommand = msg.content.substring(1, msg.content.includes(' ') ? msg.content.indexOf(' ') : msg.content.length);

        if (DEBUG_MODE) {
            console.log(`Command ${usedCommand} identified in message. Running it.`);
        }

        commands.forEach(({ executor, name }) => {
            const commandsArray = Array.isArray(name) ? name : [name];

            if (commandsArray.includes(usedCommand)) {
                executor(msg);
                if (DEBUG_MODE) {
                    console.log('Command executor done.');
                }
            }
        });
    }
});

client.login(process.env.BOT_SECRET)
    .then()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

app.get('/healthz', (req, res) => (healthy ? res.status(200).send('Ready') : res.status(500).send('Not Ready')));
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
