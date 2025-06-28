'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { useCounter } from '@/hooks/useCounter'; // カスタムフックをインポート
import { io, Socket } from 'socket.io-client';

// 送信済みメッセージ表示 ----------------------------------------------------------------------
interface MessageDisplayProps {
	messages: string[];
}

function MessageDisplay({ messages }: MessageDisplayProps) {
	return (
		<div>
			<h2>送信済みメッセージ</h2>
			<ul>
				{messages.map((msg, index) => (
					<li key={index}>{msg}</li>
				))}
			</ul>
		</div>
	);
}

// チャット入力フォーム ----------------------------------------------------------------------
interface ChatInputFormProps {
	onSendMessage: (message: string) => void;
	disabled: boolean;
	count: number;
}

function ChatInputForm({ onSendMessage, disabled, count }: ChatInputFormProps) {
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = () => {
		// disabled (isZero) が true の場合はエラーメッセージを設定して処理を中断
		if (disabled) {
			setError('送信できません');
			return;
		}
		//文字列の先頭と末尾にあるスペースや改行を取り除いた上で、空文字かチェック
		if (message.trim() === '') return;

		onSendMessage(message);
		setMessage('');
		setError(''); // 送信成功時はエラーをクリア
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
		// ユーザーが新たに入力を始めたらエラーメッセージを消す
		if (error) {
			setError('');
		}
	};

	return (
		<>
			<p>残り送信回数: {count}</p>
			<div style={{ display: 'flex', margin: '10px 0' }}>
				<input
					type="text"
					value={message}
					onChange={handleChange}
					placeholder="メッセージを入力"
					style={{ flexGrow: 1, padding: '8px' }}
				/>
				<button
					onClick={handleSubmit}
					style={{ marginLeft: '10px', padding: '8px 16px' }}
				>
					送信
				</button>
			</div>
			{/* エラーメッセージがある場合のみ表示 */}
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</>
	);
}

// メインコンポーネント ----------------------------------------------------------------------
export default function LimitedChatPage() {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<string[]>([]);
	// カウンター機能の自作フックを呼び出し 初期値5
	const { count, decrement, isZero } = useCounter(5);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000');
		setSocket(newSocket);

		newSocket.on('chat message', (msg: string) => {
			setMessages(prev => [...prev, msg]);
		});

		return () => {
			newSocket.close();
		};
	}, []);

	const handleSendMessage = (message: string) => {
		// もしカウントが0、もしくは通信できてなかったら何もしない
		if (isZero || !socket) return;

		socket.emit('chat message', message);

		// 送信したら、カウントをデクリメント
		decrement();
	};

	return (
		<div>
			<h1>回数制限付きチャット</h1>
			<ChatInputForm
				onSendMessage={handleSendMessage}
				disabled={isZero}
				count={count}
			/>
			<MessageDisplay messages={messages} />
			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div>
	);
}
