import { CommandDefinition } from '../../lib/command';
import { Roles, Channels, CommandCategory } from '../../constants';
import { makeEmbed, makeLines } from '../../lib/embed';
import { getConn } from '../../lib/db';
import Logger from '../../lib/logger';

const permittedRoles = [
    Roles.ADMIN_TEAM,
    Roles.MODERATION_TEAM,
    Roles.DEVELOPMENT_TEAM,
    Roles.MEDIA_TEAM,
    Roles.FBW_EMERITUS,
];

export const birthday: CommandDefinition = {
    name: 'birthday',
    description: 'Manages birthday reminders',
    category: CommandCategory.UTILS,
    executor: async (msg) => {
        const conn = await getConn();
        const args: string[] = msg.content.replace(/  +/g, ' ').split(' ').slice(1);

        let birthdayEmbed;

        const hasPermittedRole = msg.member.roles.cache.some((role) => permittedRoles.map((r) => r.toString()).includes(role.id));

        if (msg.channel.id !== Channels.BIRTHDAY_THREAD) {
            birthdayEmbed = makeEmbed({
                title: 'Birthday reminder',
                description: `That command can only be used in <#${Channels.BIRTHDAY_THREAD}>`,
                color: 'RED',
            });
        } else if (!hasPermittedRole) {
            birthdayEmbed = makeEmbed({
                title: 'Birthday reminder',
                description: 'You do not have permission to use this command.',
                color: 'RED',
            });
        } else if (args[0] === 'add' || args[0] === 'set') {
            const member = msg.mentions.members.first();

            if (!member) {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday add failed',
                    description: 'You need to mention a user to add a birthday reminder',
                    color: 'RED',
                });
            } else {
                const birthdayStrings = args.slice(2).join('/').split(/[/-]/);

                // Catch invalid dates
                if (birthdayStrings.length < 2) {
                    birthdayEmbed = makeEmbed({
                        title: 'Birthday add failed',
                        description: 'Insufficient args provided. Please use `.birthday add <user> <day>/<month>`',
                        color: 'RED',
                    });
                } else {
                    const birthdayDay = parseInt(birthdayStrings[0]);
                    const birthdayMonth = parseInt(birthdayStrings[1]);

                    if (Number.isNaN(birthdayDay) || Number.isNaN(birthdayMonth)) {
                        birthdayEmbed = makeEmbed({
                            title: 'Birthday add failed',
                            description: 'Invalid date format. Please use `.birthday add <user> <day>/<month>`',
                            color: 'RED',
                        });
                    } else {
                        const userID = member.user.id;

                        // Determine UTC datetime to send birthday message
                        const currentDate = new Date();
                        const utcDatetime = new Date(Date.UTC(currentDate.getUTCFullYear(), birthdayMonth - 1, birthdayDay));
                        utcDatetime.setUTCHours(10);

                        let birthdayDoc = await conn.models.Birthday.findOne({ userID });

                        if (birthdayDoc) {
                            utcDatetime.setUTCHours(utcDatetime.getUTCHours() - birthdayDoc.timezone);

                            birthdayDoc.day = birthdayDay;
                            birthdayDoc.month = birthdayMonth;
                            birthdayDoc.utcDatetime = utcDatetime;
                        } else {
                            birthdayDoc = new conn.models.Birthday({
                                userID,
                                day: birthdayDay,
                                month: birthdayMonth,
                                utcDatetime,
                                timezone: 0,
                            });
                        }

                        // If birthday already passed this year, skip to next
                        if (currentDate > utcDatetime) {
                            utcDatetime.setUTCFullYear(utcDatetime.getUTCFullYear() + 1);
                            birthdayDoc.utcDatetime = utcDatetime;
                        }

                        await birthdayDoc.save();

                        birthdayEmbed = makeEmbed({
                            title: 'Birthday added',
                            description: `${member.displayName}'s birthday has been set to ${birthdayDay}/${birthdayMonth}`,
                        });
                    }
                }
            }
        } else if (args[0] === 'remove') {
            const member = msg.mentions.members.first();

            if (member) {
                const userID = member.user.id;

                const birthday = await conn.models.Birthday.findOne({ userID });

                if (!birthday) {
                    birthdayEmbed = makeEmbed({
                        title: 'Birthday remove failed',
                        description: `${member.displayName} doesn't have a birthday set`,
                        color: 'RED',
                    });
                } else {
                    await conn.models.Birthday.deleteOne({ userID });

                    birthdayEmbed = makeEmbed({
                        title: 'Birthday removed',
                        description: `${member.displayName}'s birthday has been removed`,
                    });
                }
            } else {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday remove failed',
                    description: 'You must specify a user',
                    color: 'RED',
                });
            }
        } else if (args[0] === 'timezone') {
            const member = msg.mentions.members.first();

            if (member) {
                const userID = member.user.id;

                const birthday = await conn.models.Birthday.findOne({ userID });

                if (!birthday) {
                    birthdayEmbed = makeEmbed({
                        title: 'Birthday timezone failed',
                        description: `${member.displayName} doesn't have a birthday set`,
                        color: 'RED',
                    });
                } else {
                    const timezoneArgs = args.slice(2);

                    if (timezoneArgs.length < 1) {
                        birthdayEmbed = makeEmbed({
                            title: 'Birthday timezone failed',
                            description: 'Insufficient args provided. Please use `.birthday timezone <user> <offset>`',
                            color: 'RED',
                        });
                    } else {
                        const timezoneOffset = parseInt(timezoneArgs[0]);

                        Logger.debug(timezoneOffset);

                        if (Number.isNaN(timezoneOffset)) {
                            birthdayEmbed = makeEmbed({
                                title: 'Birthday timezone failed',
                                description: 'Invalid timezone format. Please use `.birthday timezone <user> <offset>`',
                                color: 'RED',
                            });
                        } else if (timezoneOffset < -12 && timezoneOffset > 14) {
                            birthdayEmbed = makeEmbed({
                                title: 'Birthday timezone failed',
                                description: 'Invalid timezone offset',
                                color: 'RED',
                            });
                        } else {
                            birthday.timezone = timezoneOffset;

                            // Determine UTC datetime to send birthday message
                            const currentDate = new Date();
                            const utcDatetime = new Date(Date.UTC(currentDate.getUTCFullYear(), birthday.month - 1, birthday.day));
                            utcDatetime.setUTCHours(10 - timezoneOffset);

                            // If birthday already passed this year, skip to next
                            if (currentDate > utcDatetime) {
                                utcDatetime.setUTCFullYear(utcDatetime.getUTCFullYear() + 1);
                            }

                            birthday.utcDatetime = utcDatetime;

                            await birthday.save();

                            birthdayEmbed = makeEmbed({
                                title: 'Birthday timezone set',
                                description: `${member.displayName}'s timezone has been set to Z${timezoneOffset < 0 ? '' : '+'}${timezoneOffset}`,
                            });
                        }
                    }
                }
            } else {
                birthdayEmbed = makeEmbed({
                    title: 'Birthday timezone failed',
                    description: 'You must specify a user',
                    color: 'RED',
                });
            }
        } else if (args[0] === 'list') {
            const birthdays = await conn.models.Birthday.find({});
            const members = await msg.guild.members.fetch();
            const sortedBirthdays = birthdays.slice().sort((a, b) => a.month - b.month || a.size - b.size);

            const monthBuckets = [{ month: 'January', birthdays: [] },
                { month: 'February', birthdays: [] },
                { month: 'March', birthdays: [] },
                { month: 'April', birthdays: [] },
                { month: 'May', birthdays: [] },
                { month: 'June', birthdays: [] },
                { month: 'July', birthdays: [] },
                { month: 'August', birthdays: [] },
                { month: 'September', birthdays: [] },
                { month: 'October', birthdays: [] },
                { month: 'November', birthdays: [] },
                { month: 'December', birthdays: [] }];

            for (const birthday of sortedBirthdays) {
                const member = members.get(birthday.userID);

                if (member) {
                    monthBuckets[birthday.utcDatetime.getUTCMonth()].birthdays.push(`${member.displayName} - ${birthday.day}/${birthday.month} (Z${birthday.timezone < 0 ? '' : '+'}${birthday.timezone})`);
                }
            }

            const fields = [];

            for (const monthBucket of monthBuckets) {
                if (monthBucket.birthdays.length > 0) {
                    fields.push({
                        name: monthBucket.month,
                        value: monthBucket.birthdays.join('\n'),
                    });
                }
            }

            birthdayEmbed = makeEmbed({
                title: 'Birthday list',
                description: fields.length > 0 ? null : 'No birthdays set',
                fields,
            });
        } else {
            birthdayEmbed = makeEmbed({
                title: 'Birthday help',
                description: makeLines([
                    'Use the below commands in conjunction with `.birthday` (example: `.birthday set @FBWDev 5/10`)',
                    '',
                    '**Please note:** All birthdays are in day/month format and must also be entered that way',
                    '',
                    '**Birthday commands:**',
                ]),
                fields: [
                    {
                        name: 'add <user> <birthday>',
                        value: 'Adds a birthday reminder for the specified user',
                    },
                    {
                        name: 'remove <user>',
                        value: 'Removes a birthday reminder for the specified user',
                    },
                    {
                        name: 'timezone <user> <offset>',
                        value: 'Sets the timezone of a birthday',
                    },
                    {
                        name: 'list',
                        value: 'Lists all birthday reminders',
                    },
                ],
            });
        }

        msg.channel.send({ embeds: [birthdayEmbed] });
    },
};
