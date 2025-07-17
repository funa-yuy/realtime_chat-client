'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ProgressProvider, useProgress } from '../context/ProgressContext';
import { PROGRESS_CONFIG } from '../config';

function Page03Content() {
	const { setCurrentStep } = useProgress();

	// ページアクセス時に進捗を3に設定
	useEffect(() => {
		setCurrentStep(3);
	}, [setCurrentStep]);

	return (
		<Layout>
			<div>
				<h1>ページ 03</h1>
				<p>これは3番目のページです。</p>
				<p>中間地点を過ぎました。</p>
			</div>
		</Layout>
	);
}

export default function Page03() {
	return (
		// 総ステップ数は config.ts で一元管理
		<ProgressProvider totalSteps={PROGRESS_CONFIG.TOTAL_STEPS}>
			<Page03Content />
		</ProgressProvider>
	);
}
