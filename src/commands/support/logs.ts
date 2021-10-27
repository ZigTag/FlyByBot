import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const logs: CommandDefinition = {
    name: ['installerlogs', 'logs'],
    description: 'Provides an explanation on how to receive installer error logs for support',
    category: CommandCategory.FBW,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Installer Logs',
        description: makeLines([
            'If you encounter an error with the installer, please send us a copy of the logs. To do this:',
            '1. Open the debug tool with ^Ctrl + F12',
            '2. Find and select \'Console\' in the top menu',
            '3. Right click anywhere in the log displayed',
            '4. Click \'Save as\' and send the log to us',
        ]),
    })),
};
