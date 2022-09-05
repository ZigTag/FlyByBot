import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';

export const cfms: CommandDefinition = {
    name: 'cfms',
    description: 'Provides information on the new cfms',
    category: CommandCategory.A32NX,
    executor: (msg) => {
        const cfmsEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Custom Flight Management System',
            description: makeLines([
                'Our custom flight management system is available in both the stable and development version of the A32NX.',
                '',
                'Please look through our [documentation](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/cFMS) for information on what\'s included, guides, and known issues!',
            ]),
        });

        return msg.channel.send({ embeds: [cfmsEmbed] });
    },
};
