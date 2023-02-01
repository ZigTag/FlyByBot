import { MessageCommandDefinition } from '../../lib/command';
import { makeEmbed, makeLines } from '../../lib/embed';
import { CommandCategory } from '../../constants';

const SOP_IMAGE_URL = 'https://cdn.discordapp.com/attachments/791494566058000434/1003434989918097438/SOP.png';

const genericSopEmbed = makeEmbed({
    title: 'FlyByWire A32NX | SOP',
    url: 'https://github.com/flybywiresim/manuals/raw/master/pdf/A32NX%20Documentation/FBW%20A32NX%20SOP.pdf',
    description: makeLines([
        'Click the title to download as a PDF',
    ]),
    image: { url: SOP_IMAGE_URL },
});

export const sop: MessageCommandDefinition = {
    name: 'sop',
    description: 'Displays first page of SOP and provides PDF download',
    category: CommandCategory.AIRCRAFT,
    genericEmbed: genericSopEmbed,
};
