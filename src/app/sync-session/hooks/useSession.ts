'use client';

import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SessionState {
	playerCount: number;
	maxPlayers: number;
	currentPageIndex: number;
	readyPlayers: string[];
	players: Record<string, { id: string; role: string }>;
}

interface UseSessionReturn {
	socket: Socket | null;
	isConnected: boolean;
	role: 'questioner' | 'answerer' | null;
	sessionState: SessionState | null;
	isSessionFull: boolean;
	hasJoined: boolean;
	isRoleTaken: boolean;
	joinSession: () => void;
	selectRole: (role: 'questioner' | 'answerer') => void;
	playerReady: (waitType: string, pageIndex: number) => void;
	resetSession: () => void;
	leaveSession: () => void;
}

export function useSession(): UseSessionReturn {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const [role, setRole] = useState<'questioner' | 'answerer' | null>(null);
	const [sessionState, setSessionState] = useState<SessionState | null>(null);
	const [isSessionFull, setIsSessionFull] = useState(false);
	const [hasJoined, setHasJoined] = useState(false);
	const [isRoleTaken, setIsRoleTaken] = useState(false);

	useEffect(() => {
		const newSocket = io('http://localhost:3000');
		setSocket(newSocket);

		newSocket.on('connect', () => {
			setIsConnected(true);
		});

		newSocket.on('disconnect', () => {
			setIsConnected(false);
		});

		newSocket.on('session-joined', () => {
			setHasJoined(true);
			setIsSessionFull(false);
		});

		newSocket.on('role-assigned', ({ role }: { role: 'questioner' | 'answerer' }) => {
			setRole(role);
			setIsRoleTaken(false);
		});

		newSocket.on('role-taken', () => {
			setIsRoleTaken(true);
		});

		newSocket.on('session-state', (state: SessionState) => {
			setSessionState(state);
		});

		newSocket.on('session-full', () => {
			setIsSessionFull(true);
		});

		return () => {
			newSocket.close();
		};
	}, []);

	const joinSession = () => {
		socket?.emit('join-session');
	};

	const selectRole = (role: 'questioner' | 'answerer') => {
		socket?.emit('select-role', { role });
		setIsRoleTaken(false);
	};

	const playerReady = (waitType: string, pageIndex: number) => {
		socket?.emit('player-ready', { waitType, pageIndex });
	};

	const resetSession = () => {
		socket?.emit('reset-session');
	};

	const leaveSession = () => {
		setRole(null);
		setHasJoined(false);
		setIsRoleTaken(false);
		setSessionState(null);
		setIsSessionFull(false);
		socket?.disconnect();
	};

	return {
		socket,
		isConnected,
		role,
		sessionState,
		isSessionFull,
		hasJoined,
		isRoleTaken,
		joinSession,
		selectRole,
		playerReady,
		resetSession,
		leaveSession
	};
}
