'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ProgressProvider, useProgress } from '../context/ProgressContext';
import { PROGRESS_CONFIG } from '../config';

function Page02Content() {
	const { setCurrentStep } = useProgress();

	// ページアクセス時に進捗を2に設定
	useEffect(() => {
		setCurrentStep(2);
	}, [setCurrentStep]);

	return (
		<Layout>
			<div>
				<h1>ページ 02</h1>
				<p>これは2番目のページです。</p>
				<p>進捗バーが更新されているのを確認してください。</p>
			</div>
		</Layout>
	);
}

export default function Page02() {
	return (
		// 総ステップ数は config.ts で一元管理
		<ProgressProvider totalSteps={PROGRESS_CONFIG.TOTAL_STEPS}>
			<Page02Content />
		</ProgressProvider>
	);
}
