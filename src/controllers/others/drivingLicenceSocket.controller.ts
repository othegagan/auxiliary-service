import { Server, Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const connections = new Map();

export const initializeSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        const sessionId = uuidv4();

        // Initialize a new session
        connections.set(sessionId, {
            desktop: socket,
            mobile: null,
            verified: null // Changed to nullable to handle true/false explicitly
        });

        // Send session ID to desktop client
        socket.emit(
            'message',
            JSON.stringify({
                type: 'SESSION_ID',
                sessionId
            })
        );

        // Handle incoming messages
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

                if (data.type === 'VERIFY_STATUS' && data.sessionId) {
                    const session = connections.get(data.sessionId);
                    if (session) {
                        session.verified = data.verified;

                        // Notify the desktop of the current verification status
                        session.desktop.emit(
                            'message',
                            JSON.stringify({
                                type: 'VERIFY_STATUS',
                                verified: data.verified // true or false
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
