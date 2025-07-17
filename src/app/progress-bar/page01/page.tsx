'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ProgressProvider, useProgress } from '../context/ProgressContext';
import { PROGRESS_CONFIG } from '../config';

// ページ固有のレイアウト ------------------------------------------------
function Page01Content() {
	const { setCurrentStep } = useProgress();

	// ページアクセス時に進捗を1に設定
	useEffect(() => {
		setCurrentStep(1);	//ページ番号と一致させる（page01なら1）
	}, [setCurrentStep]);

	return (
		<Layout>
			<div>
				{/* ここにレイアウトを置く */}
				<h1>ページ 01</h1>
				<p>これは最初のページです。</p>
			</div>
		</Layout>
	);
}

// メイン ------------------------------------------------
export default function Page01() {
	return (
		// 総ステップ数は config.ts で一元管理
		<ProgressProvider totalSteps={PROGRESS_CONFIG.TOTAL_STEPS}>
			<Page01Content />
		</ProgressProvider>
	);
}
