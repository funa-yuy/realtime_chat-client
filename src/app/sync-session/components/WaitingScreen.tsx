interface WaitingScreenProps {
	role: 'questioner' | 'answerer';
	onBackToTop: () => void;
}

export function WaitingScreen({ role, onBackToTop }: WaitingScreenProps) {
	return (
		<div className="session-container">
			<h1>他のプレイヤーを待っています</h1>
			<p>あなたの役割: {role === 'questioner' ? '質問者' : '回答者'}</p>
			<p>もう一人のプレイヤーが役割を選択するまでお待ちください。</p>

			<div className="waiting-indicator">
				<p>待機中...</p>
			</div>

			<div className="session-footer">
				<button className="btn back-btn" onClick={onBackToTop}>
					同期機能のTOPに戻る
				</button>
			</div>
		</div>
	);
}
