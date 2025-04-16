import React, { createContext, useState, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const TractorContext = createContext();

export const TractorProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [telemetry, setTelemetry] = useState({
        battery: 0,
        speed: 0,
        motorTemperature: 0,
        cuttingStatus: 'idle',
        trailerStatus: 'empty',
        location: { lat: 0, lng: 0 }
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');

        newSocket.on('connect', () => {
            setIsConnected(true);
            setError(null);
        });

        newSocket.on('disconnect', () => {
            setIsConnected(false);
        });

        newSocket.on('error', (error) => {
            setError(error.message);
        });

        newSocket.on('tractor-telemetry', (data) => {
            setTelemetry(data);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const sendControl = (type, data) => {
        if (socket && isConnected) {
            socket.emit('control', { type, ...data });
        } else {
            setError('Not connected to tractor');
        }
    };

    const value = {
        isConnected,
        telemetry,
        error,
        sendControl
    };

    return (
        <TractorContext.Provider value={value}>
            {children}
        </TractorContext.Provider>
    );
};

export const useTractor = () => {
    const context = useContext(TractorContext);
    if (!context) {
        throw new Error('useTractor must be used within a TractorProvider');
    }
    return context;
}; 