import { PageProps } from '../../config/pages';

export function QuestionPage({ role, onReady, isReady, isWaiting }: PageProps) {
	if (role === 'questioner') {
		return (
			<div className="page-container">
				<h1>質問を考えてください</h1>
				<p>あなたは質問者です。相手に質問を考えましょう。</p>
				<textarea
					className="question-input"
					placeholder="ここに質問を入力してください..."
					rows={4}
				/>

				<div className="ready-section">
					<button
						className="btn ready-btn"
						onClick={onReady}
						disabled={isWaiting}
					>
						{isReady ? '準備完了を取り消す' : '質問完了'}
					</button>
					{isWaiting && <p>回答者の準備を待っています...</p>}
				</div>
			</div>
		);
	}

	return (
		<div className="page-container">
			<h1>質問者が準備中です</h1>
			<p>あなたは回答者です。質問者が質問を考えるまでお待ちください。</p>
			<div className="waiting-indicator">
				<p>質問者が質問を考えています...</p>
			</div>
		</div>
	);
}
