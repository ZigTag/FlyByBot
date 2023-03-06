import { CommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const FMA_IMAGE_URL = `${process.env.IMAGE_BASE_URL}/a32nx/fma.png`;

export const fma: CommandDefinition = {
    name: 'fma',
    description: 'Provides a link to the FMA docs guide',
    category: CommandCategory.AIRCRAFT,
    executor: (msg) => {
        const fmaEmbed = makeEmbed({
            title: 'FlyByWire A32NX | Flight Mode Annunciator ',
            description: makeLines([
                'The Flight Mode Annunciator (FMA) at the top of the PFD shows the status of the A/THR, the AP/FD vertical and lateral modes, the approach capabilities, and the AP, A/THR and FD engagement status.',
                '',
                'Please visit our [documentation](https://docs.flybywiresim.com/pilots-corner/a32nx-briefing/pfd/fma/) website to learn more about FMAs.',
            ]),
            image: { url: FMA_IMAGE_URL },
        });

        return msg.channel.send({ embeds: [fmaEmbed] });
    },
};
