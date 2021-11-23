import { distube } from '../../index';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

export const play: CommandDefinition = {
    name: ['play', 'p'],
    description: 'Plays the top search result from youtube for the video title given.',
    category: CommandCategory.MUSIC,
    executor: async (msg) => {
        if (!msg.member.voice.channel) {
            return msg.reply('you must be in a voice channel to use this command!')
        }
        const args = msg.content.replace(/.play\s+/, ' ').split(' ');
        await distube.play(msg, args.join(' '));
    },
};
