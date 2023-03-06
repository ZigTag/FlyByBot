import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';
import { makeEmbed } from '../../lib/embed';

const POV_URL = `${process.env.IMAGE_BASE_URL}memes/pov.gif`;

export const pov: CommandDefinition = {
    name: 'pov',
    description: 'Oof',
    category: CommandCategory.MEMES,
    executor: (msg) => {
        const povEmbed = makeEmbed({ image: { url: POV_URL } });
        return msg.channel.send({ embeds: [povEmbed] });
    },
};
