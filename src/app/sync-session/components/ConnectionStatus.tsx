interface ConnectionStatusProps {
	isConnected: boolean;
	isSessionFull: boolean;
}

export function ConnectionStatus({ isConnected, isSessionFull }: ConnectionStatusProps) {
	if (!isConnected) {
		return (
			<div className="session-container">
				<h1>接続中...</h1>
				<p>サーバーに接続しています。</p>
			</div>
		);
	}

	if (isSessionFull) {
		return (
			<div className="session-container">
				<h1>セッション満員</h1>
				<p>このセッションは既に2人のプレイヤーで満員です。</p>
			</div>
		);
	}

	return null;
}
