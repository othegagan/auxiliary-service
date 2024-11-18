import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const connections = new Map();

export const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('New connection:', socket.id);

        socket.on('message', (rawMessage: string) => {
            try {
                const message = JSON.parse(rawMessage);
                console.log('Received message:', message);

                switch (message.type) {
                    case 'DESKTOP_CONNECT': {
                        const sessionId = uuidv4();
                        connections.set(sessionId, { desktop: socket, mobile: null });
                        socket.emit('message', JSON.stringify({ type: 'SESSION_ID', sessionId }));
                        break;
                    }

                    case 'MOBILE_CONNECT':
                        if (connections.has(message.sessionId)) {
                            const session = connections.get(message.sessionId);
                            session.mobile = socket;
                            if (session.desktop) {
                                session.desktop.emit('message', JSON.stringify({ type: 'MOBILE_CONNECTED' }));
                            }
                        }
                        break;

                    case 'VERIFY_STATUS':
                        if (connections.has(message.sessionId)) {
                            const session = connections.get(message.sessionId);
                            if (session.desktop) {
                                session.desktop.emit(
                                    'message',
                                    JSON.stringify({
                                        type: 'VERIFY_STATUS',
                                        verified: message.verified
                                    })
                                );
                            }
                        }
                        break;
                }
            } catch (error) {
                console.error('Error processing message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Disconnected:', socket.id);
            connections.forEach((value, key) => {
                if (value.desktop === socket || value.mobile === socket) {
                    connections.delete(key);
                }
            });
        });
    });
};
