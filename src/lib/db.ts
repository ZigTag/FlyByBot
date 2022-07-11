import mongoose from 'mongoose';
import Logger from './logger';

let connection: mongoose.Connection;

export async function connect(url: string, callback = Logger.error) {
    try {
        await mongoose.connect(url);
        connection = mongoose.connection;

        Logger.info('Connected to database');
    } catch ({ name, message, stack }) {
        callback({ name, message, stack });
    }

    mongoose.connection.on('error', (err) => {
        callback(err);
    });
}

export function getConn(callback = Logger.error) {
    if (!connection || connection.readyState !== mongoose.ConnectionStates.connected) {
        callback(new Error('Not connected to database'));
    } else {
        return connection;
    }

    return null;
}
