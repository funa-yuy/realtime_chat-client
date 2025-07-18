import { PageRenderer } from './PageRenderer';
import { PageConfig } from '../config/pages';
import { pages } from '../config/pages';

interface ActiveSessionProps {
	role: 'questioner' | 'answerer';
	sessionState: {
		playerCount: number;
		maxPlayers: number;
		currentPageIndex: number;
	};
	currentPage: PageConfig;
	isReady: boolean;
	isWaiting: boolean;
	onReady: () => void;
	onBackToTop: () => void;
}

export function ActiveSession({
	role,
	sessionState,
	currentPage,
	isReady,
	isWaiting,
	onReady,
	onBackToTop
}: ActiveSessionProps) {
	return (
		<div className="session-container">
			<div className="session-header">
				<h2>ページ {sessionState.currentPageIndex + 1}/{pages.length}: {currentPage.name}</h2>
				<div className="player-info">
					<span>プレイヤー数: {sessionState.playerCount}/{sessionState.maxPlayers}</span>
					<span>あなたの役割: {role === 'questioner' ? '質問者' : '回答者'}</span>
				</div>
			</div>

			<PageRenderer
				pageConfig={currentPage}
				role={role}
				onReady={onReady}
				isReady={isReady}
				isWaiting={isWaiting}
			/>

			<div className="session-footer">
				<button className="btn back-btn" onClick={onBackToTop}>
					同期機能のTOPに戻る
				</button>
			</div>
		</div>
	);
}
