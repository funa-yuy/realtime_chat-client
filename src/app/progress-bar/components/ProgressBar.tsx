import './ProgressBar.css';
import { useProgress } from '../context/ProgressContext';

// ページ上部の進捗バー ------------------------------------------------
export default function ProgressBar() {
	const { currentStep, totalSteps } = useProgress();

	// 進捗の割合を計算（0%〜100%）
	// currentStepが0の場合は0%、1以上の場合は通常の計算
	const progressPercentage = currentStep === 0 ? 0 : ((currentStep - 1) / (totalSteps - 1)) * 100;

	return (
		<div className="progress-bar-container">
			<div className="progress-bar">
				{/* 進捗を表すバー */}
				<div
					className="progress-bar-fill"
					style={{ width: `${progressPercentage}%` }}
				/>
				{/* 各ステップを表す円の生成 */}
				{Array.from({ length: totalSteps }, (_, index) => {
					const stepNumber = index + 1;
					const isCompleted = stepNumber <= currentStep && currentStep > 0;

					return (
						<div
							key={stepNumber}
							className={`progress-step ${isCompleted ? 'completed' : ''}`}
							style={{ left: `${(index / (totalSteps - 1)) * 100}%` }}
						/>
					);
				})}
			</div>
		</div>
	);
}
