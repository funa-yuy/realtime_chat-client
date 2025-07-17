'use client';

import { useRouter } from 'next/navigation';
import { useProgress } from '../context/ProgressContext';
import './Navigation.css';

// ページ下部のナビゲーション(前へ・次へボタン) ------------------------------------------------
export default function Navigation() {
	const { currentStep, totalSteps, nextStep, prevStep } = useProgress();
	const router = useRouter();

	// 前のページへの遷移処理
	const handlePrevious = () => {
		if (currentStep > 1) {
			prevStep(); // 進捗状態を更新
			// page01, page02形式のURLに遷移
			router.push(`/progress-bar/page${String(currentStep - 1).padStart(2, '0')}`);
		} else if (currentStep === 1) {
			prevStep(); // 進捗状態を0に更新
			router.push('/progress-bar');	// 擬似TOPのURL
		}
	};

	// 次のページへの遷移処理
	const handleNext = () => {
		if (currentStep < totalSteps) {
			nextStep(); // 進捗状態を更新
			// page01, page02形式のURLに遷移
			router.push(`/progress-bar/page${String(currentStep + 1).padStart(2, '0')}`);
		}
	};

	return (
		<div className="navigation">
			<button
				onClick={handlePrevious}
				disabled={currentStep === 0}
				className="nav-button"
			>
				前へ
			</button>

			{/* 現在の進捗表示 */}
			<span className="step-indicator">
				{currentStep} / {totalSteps}
			</span>

			<button
				onClick={handleNext}
				disabled={currentStep === totalSteps}
				className="nav-button"
			>
				次へ
			</button>
		</div>
	);
}
