import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

export const freetext: CommandDefinition = {
    name: ['freetext', 'ft'],
    description: 'Provides a link to the FlyByWire free text tutorial video',
    category: CommandCategory.A32NX,
    executor: (msg) => msg.channel.send(makeEmbed({
        title: 'FlyByWire A32NX | Free Text',
        description: 'Please see our [guide](https://docs.flybywiresim.com/fbw-a32nx/feature-guides/freetext/) on how to use the FlyByWire A32NX Free Text feature.',
    })),
};
