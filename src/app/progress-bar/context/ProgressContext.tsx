'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// 進捗管理用のContext型定義
interface ProgressContextType {
	currentStep: number;
	totalSteps: number;
	setCurrentStep: (step: number) => void;
	nextStep: () => void;
	prevStep: () => void;
}

// 複数ページで進捗状態を共有するためのContext
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

interface ProgressProviderProps {
	children: ReactNode;
	totalSteps: number;
}

// 進捗状態を管理するProvider
export function ProgressProvider({ children, totalSteps }: ProgressProviderProps) {
	const [currentStep, setCurrentStep] = useState(1);

	// 次のステップに進む（最大値を超えないよう制限）
	const nextStep = () => {
		setCurrentStep(prev => Math.min(totalSteps, prev + 1));
	};

	// 前のステップに戻る（TOPページ（0）まで戻れるよう制限）
	const prevStep = () => {
		setCurrentStep(prev => Math.max(0, prev - 1));
	};

	return (
		<ProgressContext.Provider value={{
			currentStep,
			totalSteps,
			setCurrentStep,
			nextStep,
			prevStep
		}}>
			{children}
		</ProgressContext.Provider>
	);
}

// 進捗状態にアクセスするためのカスタムフック
export function useProgress() {
	const context = useContext(ProgressContext);
	if (context === undefined) {
		throw new Error('useProgress must be used within a ProgressProvider');
	}
	return context;
}
