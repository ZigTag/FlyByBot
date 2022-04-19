import moment from 'moment';
import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const dateFormat = 'dddd, DD MMMM LT'; // ? DD MMMM or MMMM DD

export const zulu: CommandDefinition = {
    name: 'zulu',
    description: 'Get the current time at a given UTC-offset timezone',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const args = msg.content.split(' ').slice(1);
        const utcOffset = args.length ? parseFloat(args.join('')) : 0;
        if (Number.isNaN(utcOffset)) return msg.reply('Please provide a valid timezone');

        return msg.channel.send(`It is ${moment().utc().add(utcOffset, 'hours').format(dateFormat)} in that timezone (UTC${utcOffset >= 0 ? '+' : ''}${utcOffset})`);
    },
};
