import { PageProps } from '../../config/pages';

export function ResultPage({ role }: PageProps) {
	const handleIndividualExit = () => {
		window.location.reload();
	};

	return (
		<div className="page-container">
			<h1>セッション完了</h1>
			<p>お疲れさまでした！</p>
			<p>あなたの役割: {role === 'questioner' ? '質問者' : '回答者'}</p>

			<div className="result-content">
				<h2>セッション結果</h2>
				<p>今回のセッションは正常に完了しました。</p>
				<p>各自、好きなタイミングで終了できます。</p>
				<p>※相手が先に終了しても、あなたはこの画面を継続して見ることができます。</p>
			</div>

			<div className="ready-section">
				<button
					className="btn ready-btn"
					onClick={handleIndividualExit}
				>
					終了する
				</button>
			</div>
		</div>
	);
}
