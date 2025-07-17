'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ProgressProvider, useProgress } from '../context/ProgressContext';

function Page05Content() {
	const { setCurrentStep } = useProgress();

	// ページアクセス時に進捗を5に設定（最終ページ）
	useEffect(() => {
		setCurrentStep(5);
	}, [setCurrentStep]);

	return (
		<Layout>
			<div>
				<h1>ページ 05</h1>
				<p>これは最後のページです。</p>
				<p>お疲れ様でした！プロセスが完了しました。</p>
			</div>
		</Layout>
	);
}

export default function Page05() {
	return (
		<ProgressProvider totalSteps={5}>
			<Page05Content />
		</ProgressProvider>
	);
}
