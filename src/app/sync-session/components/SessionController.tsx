'use client';

import { useSessionLogic } from '../hooks/useSessionLogic';
import { ConnectionStatus } from './ConnectionStatus';
import { SessionJoin } from './SessionJoin';
import { RoleSelection } from './RoleSelection';
import { WaitingScreen } from './WaitingScreen';
import { ActiveSession } from './ActiveSession';
import { shouldWaitForOtherPlayer } from '../utils/sessionUtils';

/**
 * セッション全体の制御を行うメインコンポーネント
 * セッションの状態に応じて適切な画面を表示する
 */
export function SessionController() {
	const {
		isConnected,
		isSessionFull,
		hasJoined,
		role,
		isRoleTaken,
		sessionState,
		joinSession,
		selectRole,
		getCurrentPage,
		isCurrentPlayerReady,
		isWaiting,
		handleReady,
		handleBackToTop
	} = useSessionLogic();

	// 1. 接続状態のチェック（接続中 or セッション満員）
	if (!isConnected || isSessionFull) {
		return <ConnectionStatus isConnected={isConnected} isSessionFull={isSessionFull} />;
	}

	// 2. セッション参加前の状態
	if (!hasJoined) {
		return <SessionJoin onJoin={joinSession} />;
	}

	// 3. 役割選択前の状態
	if (!role) {
		return (
			<RoleSelection
				onSelectRole={selectRole}
				isRoleTaken={isRoleTaken}
			/>
		);
	}

	// 4. 他プレイヤー待ちの状態（結果発表ページ以外）
	if (shouldWaitForOtherPlayer(sessionState)) {
		return <WaitingScreen role={role} onBackToTop={handleBackToTop} />;
	}

	// 5. セッション情報読み込み中
	if (!sessionState) {
		return (
			<div className="session-container">
				<h1>読み込み中...</h1>
				<p>セッション情報を読み込んでいます。</p>
			</div>
		);
	}

	// 6. 現在のページを取得し、セッション終了判定
	const currentPage = getCurrentPage();
	if (!currentPage) return null; // 全ページ完了時

	// 7. アクティブセッション中の表示
	return (
		<ActiveSession
			role={role}
			sessionState={sessionState}
			currentPage={currentPage}
			isReady={isCurrentPlayerReady()}
			isWaiting={isWaiting()}
			onReady={handleReady}
			onBackToTop={handleBackToTop}
		/>
	);
}
