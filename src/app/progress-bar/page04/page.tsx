'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ProgressProvider, useProgress } from '../context/ProgressContext';
import { PROGRESS_CONFIG } from '../config';

function Page04Content() {
	const { setCurrentStep } = useProgress();

	// ページアクセス時に進捗を4に設定
	useEffect(() => {
		setCurrentStep(4);
	}, [setCurrentStep]);

	return (
		<Layout>
			<div>
				<h1>ページ 04</h1>
				<p>これは4番目のページです。</p>
				<p>ゴールまであと少しです。</p>
			</div>
		</Layout>
	);
}

export default function Page04() {
	return (
		// 総ステップ数は config.ts で一元管理
		<ProgressProvider totalSteps={PROGRESS_CONFIG.TOTAL_STEPS}>
			<Page04Content />
		</ProgressProvider>
	);
}
