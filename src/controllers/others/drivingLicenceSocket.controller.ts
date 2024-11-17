import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const connections = new Map();
export const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const sessionId = uuidv4();
        connections.set(sessionId, {
            desktop: socket,
            mobile: null,
            verified: false
        });

        // Send session ID to desktop client
        socket.emit(
            'message',
            JSON.stringify({
                type: 'SESSION_ID',
                sessionId
            })
        );

        // Handle mobile device connecting
        socket.on('message', (rawMessage: string) => {
            try {
                const data = JSON.parse(rawMessage);

                if (data.type === 'MOBILE_CONNECT' && data.sessionId) {
                    const session = connections.get(data.sessionId);
                    if (session) {
                        session.mobile = socket;
                        session.desktop.emit(
                            'message',
                            JSON.stringify({
                                type: 'MOBILE_CONNECTED'
                            })
                        );
                    }
                }

                if (data.type === 'VERIFY_COMPLETE' && data.sessionId) {
                    const session = connections.get(data.sessionId);
                    if (session) {
                        session.verified = true;
                        session.desktop.emit(
                            'message',
                            JSON.stringify({
                                type: 'VERIFICATION_COMPLETE'
                            })
                        );
                    }
                }
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        });

        // Clean up on disconnect
        socket.on('disconnect', () => {
            connections.forEach((value, key) => {
                if (value.desktop === socket || value.mobile === socket) {
                    connections.delete(key);
                }
            });
        });
    });
};
