'use client'

import Link from "next/link";
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import './styles.css';

export default function ChatAppScroll() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000');
		setSocket(newSocket);

		//chat messageイベントが発生し、msgを受信したら
		newSocket.on('chat message', (msg: string) => {
			//過去のメッセージに追加する
			setMessages(prev => [...prev, msg]);
		});

		return () => {
			newSocket.close();
		};
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		//messageもsocketもあれば、messageを送信する
		if (message && socket) {
			socket.emit('chat message', message);
			setMessage('');
		}
	};

	return (
		<div>
			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>

			<div className="chat-container">
				<div className="messages-container">
					<ul className="messages-list">
						{messages.map((msg, index) => (
							<li key={index} className="message-item">{msg}</li>
						))}
					</ul>
					<div ref={messagesEndRef} />
				</div>
				<form className="form-container" onSubmit={handleSubmit}>
					<input
						type="text"
						className="message-input"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						autoComplete='off'
						placeholder="メッセージを入力..."
					/>
					<button className="send-btn" type='submit'>送信</button>
				</form>
			</div>
		</div>
	);
}
