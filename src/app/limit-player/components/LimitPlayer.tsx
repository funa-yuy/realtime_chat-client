'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

// グローバルセッションのステータス情報
interface GlobalStatus {
	participantCount: number;
	maxParticipants: number;
}

// エラーメッセージの型定義
interface SessionError {
	message: string;
	currentCount?: number;
}

export default function LimitPlayer() {
	const router = useRouter();

	// Socket.IO接続インスタンス
	const [socket, setSocket] = useState<Socket | null>(null);
	// 全体のセッション状態
	const [globalStatus, setGlobalStatus] = useState<GlobalStatus | null>(null);
	// エラー情報
	const [error, setError] = useState<SessionError | null>(null);
	// サーバー接続状態
	const [isConnected, setIsConnected] = useState(false);
	// ゲーム参加成功状態
	const [joinedSuccessfully, setJoinedSuccessfully] = useState(false);

	// Socket.IO接続とイベントリスナーの設定
	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000');

		// サーバー接続時：グローバルセッションへの参加を試行
		newSocket.on('connect', () => {
			setIsConnected(true);
			newSocket.emit('join-global-session');
		});

		// サーバー切断時：接続状態を更新
		newSocket.on('disconnect', () => {
			setIsConnected(false);
		});

		// セッション状態更新時：参加者数などの情報を受信
		newSocket.on('global-status', (status: GlobalStatus) => {
			setGlobalStatus(status);
		});

		// セッション満員時：エラーメッセージを表示
		newSocket.on('session-full', (errorData: SessionError) => {
			setError(errorData);
		});

		// 参加成功時：正常に参加できた状態に移行
		newSocket.on('join-success', () => {
			setJoinedSuccessfully(true);
			setError(null);
		});

		setSocket(newSocket);

		// コンポーネント終了時：セッション退出とSocket切断
		return () => {
			newSocket.emit('leave-global-session');
			newSocket.disconnect();
		};
	}, []);

	// セッション退出ボタンのクリックハンドラー
	const handleLeaveSession = () => {
		if (socket) {
			socket.emit('leave-global-session');
			socket.disconnect();
		}
		// 擬似TOPページに戻る
		router.push('/limit-player');
	};

	// 接続中の表示
	if (!isConnected) {
		return <div className="status-message">接続中...</div>;
	}

	// エラー時の表示（2人制限オーバーなど）
	if (error) {
		return (
			<div className="error-container">
				<div className="error-message">{error.message}</div>
				<button className="btn" onClick={() => window.location.reload()}>
					再試行
				</button>
			</div>
		);
	}

	// 参加処理中の表示
	if (!joinedSuccessfully) {
		return <div className="status-message">ゲームに参加中...</div>;
	}

	// 正常にゲーム参加できた場合のメイン表示
	return (
		<div className="session-container">
			<div className="session-info">
				<h2>ゲーム情報</h2>
				<p>参加者数: {globalStatus?.participantCount || 0}/2</p>
				<p>ステータス: {globalStatus?.participantCount === 2 ? '満員' : '参加者募集中'}</p>
			</div>

			<div className="actions">
				<button className="btn" onClick={handleLeaveSession}>
					ゲームから退出
				</button>
			</div>
		</div>
	);
}
