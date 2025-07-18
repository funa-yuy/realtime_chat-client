import { useState, useEffect } from 'react';
import { useSession } from './useSession';
import { pages } from '../config/pages';

/**
 * セッションのビジネスロジックを管理するカスタムフック
 * サーバー通信(useSession)とページ制御ロジックを組み合わせる
 */
export function useSessionLogic() {
	const sessionHook = useSession();
	const [readyPlayers, setReadyPlayers] = useState<string[]>([]);

	// セッション状態の変更を監視して準備完了プレイヤーリストを更新
	useEffect(() => {
		if (sessionHook.sessionState) {
			setReadyPlayers(sessionHook.sessionState.readyPlayers);
		}
	}, [sessionHook.sessionState]);

	/**
	 * 現在のページ設定を取得
	 */
	const getCurrentPage = () => {
		if (!sessionHook.sessionState) return null;
		return pages[sessionHook.sessionState.currentPageIndex] || null;
	};

	/**
	 * 現在のプレイヤーが準備完了状態かを判定
	 */
	const isCurrentPlayerReady = () => {
		if (!sessionHook.socket?.id || !sessionHook.sessionState) return false;
		return readyPlayers.includes(sessionHook.socket.id);
	};

	/**
	 * 他プレイヤーを待機中かを判定
	 * 準備完了後、待機タイプに応じて待機状態を決定
	 */
	const isWaiting = () => {
		const currentPage = getCurrentPage();
		if (!currentPage || !sessionHook.sessionState) return false;

		const isReady = isCurrentPlayerReady();
		if (!isReady) return false;

		const { waitType } = currentPage;

		switch (waitType) {
			case 'both': // 両方のプレイヤーが準備完了するまで待つ
				return readyPlayers.length < 2;
			case 'questioner': // 質問者のみ
			case 'answerer': // 回答者のみ
			case 'individual': // 個別終了（待機しない）
				return false;
			default:
				return false;
		}
	};

	/**
	 * 準備完了ボタンのハンドラー
	 * サーバーに準備完了状態を送信
	 */
	const handleReady = () => {
		const currentPage = getCurrentPage();
		if (currentPage && sessionHook.sessionState) {
			sessionHook.playerReady(currentPage.waitType, sessionHook.sessionState.currentPageIndex);
		}
	};

	/**
	 * 同期機能のTOPに戻る処理
	 * セッションから離脱してページをリロード
	 */
	const handleBackToTop = () => {
		sessionHook.leaveSession();
		window.location.reload();
	};

	return {
		...sessionHook,
		readyPlayers,
		getCurrentPage,
		isCurrentPlayerReady,
		isWaiting,
		handleReady,
		handleBackToTop,
	};
}
