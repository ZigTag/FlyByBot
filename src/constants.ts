export const GuildID = '738864299392630914';

export enum Colors {
    FBW_CYAN = 0x00E0FE,
}

export enum CommandCategory {
    AIRCRAFT = 'Aircraft',
    SUPPORT = 'Support',
    GENERAL = 'General',
    UTILS = 'Utilities',
    MEMES = 'Memes',
    MODERATION = 'Moderation',
}

export enum Channels {
    MOD_LOGS = '783996780181585921',
    USER_LOGS = '779944761699729418',
    SCAM_LOGS = '932687046315737149',
    BOT_COMMANDS = '902990139670814750',
    BIRTHDAY_CHANNEL = '846470774361161808',
    A32NX_SUPPORT = '785976111875751956',
    LOCALISATION = '964912922272870470',
    FAQ = '751774575464939580',
    ROLES = '751780817772216401',
    PROGRESS = '747971332301389935',
    A32NX_RELEASE = '747575878170574858',
    FLIGHT_SCHOOL = '887806920252076053',
    KNOWN_ISSUES = '771435594445226005',
    SUPPORT_OPS = '838062729398976522',
}

export enum Threads {
    BIRTHDAY_THREAD = '930923893206679573',
    COUNT_THREAD = '877049017102659654',
    CFMS_ISSUES_THREAD = '926586416820011098',
    EXP_ISSUES_THREAD = '965072479796215888',
}

export enum Roles {
    ADMIN_TEAM = '738864824305319936',
    MODERATION_TEAM = '739187150909866137',
    DEVELOPMENT_TEAM = '747571237475057815',
    MEDIA_TEAM = '756972770214281346',
    FBW_EMERITUS = '878635657680027678',
    BOT_DEVELOPER = '768888763929591818',
    COMMUNITY_SUPPORT = '870394933926830100'
}

export const UserLogExclude = [
    '628400349979344919', // StickyBot
    '910632773117702185', //FBW Bot
    '856826179491594271', //FBW Staging bot
    '864492608163807302', //BenW test bot
];

export const ModLogsExclude = [
    '910632773117702185', //FBW Bot
    '856826179491594271', //FBW Staging bot
    '864492608163807302', //BenW test bot
];

export enum Units {
    DEGREES = '\u00B0',
    CELSIUS = '\u2103',
    KNOTS = 'kts',
}

// Custom emoji must be used. Identifier is determined through typing the following in the message box and pressing enter:
// \:A32:
// (Backslash<emojie code>)
// This returns a format like:
// <:A32:1044359345493790850>
// Strip <, > and the first :, add this entry below. Anything else will not work.
export const AircraftTypeList = {
    a32nx: 'A32:1044359345493790850',
    a380x: 'A38:1044359365949403166',
};
