import { CommandDefinition } from '../../lib/command';
import { CommandCategory } from '../../constants';

const XP_URL = `${process.env.IMAGE_BASE_URL}memes/xp.gif`;

export const xp: CommandDefinition = {
    name: ['xp', 'xplane', 'x-plane'],
    description: 'XPlane',
    category: CommandCategory.MEMES,
    executor: (msg) => msg.channel.send(XP_URL),
};
