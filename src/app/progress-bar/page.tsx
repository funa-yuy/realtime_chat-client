'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { PROGRESS_CONFIG } from './config';
import ProgressBar from './components/ProgressBar';

// ページ固有のレイアウト ------------------------------------------------
function ProgressTopContent() {
	const { setCurrentStep, nextStep } = useProgress();
	const router = useRouter();

	useEffect(() => {
		setCurrentStep(0);// TOPページでは進捗を0に設定
	}, [setCurrentStep]);

	// 次へボタンのクリック処理
	const handleNext = () => {
		nextStep(); // 進捗を1に更新
		router.push('/progress-bar/page01');
	};

	return (
		<div>
			{/* 進捗バー表示 */}
			<ProgressBar />

			<main>
				<h1>進捗バー</h1>

				<div>
					<p>「開始」ボタンを押して進捗バーの動作を確認してください。</p>
				</div>

				<div className="btn-wrapper">
					<button onClick={handleNext} className="btn">
						開始
					</button>
				</div>

				<div className="btn-wrapper">
					<Link href="/" className="btn">
						アプリケーションTOPへ
					</Link>
				</div>
			</main>
		</div>
	);
}

// メイン ------------------------------------------------
export default function ProgressBarPage() {
	return (
		<ProgressProvider totalSteps={PROGRESS_CONFIG.TOTAL_STEPS}>
			<ProgressTopContent />
		</ProgressProvider>
	);
}
