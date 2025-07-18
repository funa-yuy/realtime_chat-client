/**
 * セッション状態判定のユーティリティ関数群
 */
interface SessionState {
	playerCount: number;
	maxPlayers: number;
	currentPageIndex: number;
	readyPlayers: string[];
	players: Record<string, { id: string; role: string }>;
}

/**
 * 両方の役割（質問者・回答者）が選択されているかをチェック
 */
export const checkBothRolesSelected = (sessionState: SessionState | null): boolean => {
	if (!sessionState?.players) return false;
	const playerRoles = Object.values(sessionState.players)
		.map(p => (p as { id: string; role: string }).role)
		.filter(role => role !== null);
	return playerRoles.includes('questioner') && playerRoles.includes('answerer');
};

/**
 * 結果発表ページ（最終ページ）かを判定
 */
export const isResultPage = (sessionState: SessionState | null): boolean => {
	return sessionState?.currentPageIndex === 2;
};

/**
 * 他プレイヤーを待つ必要があるかを判定
 * 結果発表ページでは待機しない（片方が離脱してもそのまま継続）
 */
export const shouldWaitForOtherPlayer = (sessionState: SessionState | null): boolean => {
	if (isResultPage(sessionState)) {
		return false; // 結果発表ページでは待機しない
	}
	return !checkBothRolesSelected(sessionState);
};
