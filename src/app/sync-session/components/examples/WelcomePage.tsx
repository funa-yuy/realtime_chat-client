import { PageProps } from '../../config/pages';

export function WelcomePage({ role, onReady, isReady, isWaiting }: PageProps) {
	return (
		<div className="page-container">
			<h1>ようこそ</h1>
			<p>あなたの役割: {role === 'questioner' ? '質問者' : '回答者'}</p>
			<p>両方のプレイヤーが準備完了になると次のページに進みます。</p>

			<div className="ready-section">
				<button
					className="btn ready-btn"
					onClick={onReady}
					disabled={isWaiting}
				>
					{isReady ? '準備完了を取り消す' : '準備完了'}
				</button>
				{isWaiting && <p>他のプレイヤーを待っています...</p>}
			</div>
		</div>
	);
}
