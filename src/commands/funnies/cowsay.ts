import Filter from 'bad-words';
import { say } from 'cowsay';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const cowsay: CommandDefinition = {
    name: ['cowsay', 'cs'],
    description: 'Emulates the famous UNIX program `cowsay`.',
    category: CommandCategory.FUNNIES,
    executor: (msg) => {
        const filter = new Filter();
        const text = msg.content.replace(/\.(cowsay|cs)\s*`*/, '');

        if (filter.isProfane(text)) {
            return msg.reply('Please do not use profane language with this command.');
        }

        if (text) {
            return msg.channel.send(`\`\`\`\n${say(({ text }))}\n\`\`\``);
        }

        return msg.reply('Please provide some text.');
    },
};
