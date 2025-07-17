'use client';

import Link from "next/link";
import { ReactNode } from 'react';
import ProgressBar from './ProgressBar';
import Navigation from './Navigation';

interface LayoutProps {
	children: ReactNode;
}

// 全ページ共通のレイアウトコンポーネント ------------------------------------------------
export default function Layout({ children }: LayoutProps) {
	return (
		<div>
			{/* 上部: 進捗バー */}
			<ProgressBar />

			<main>
				{/* 中央: ページ固有のコンテンツ */}
				{children}
				<div className="btn-wrapper">
					<Link href="/" className="btn">アプリケーションTOPへ</Link>
				</div>
			</main>
			{/* 下部: ナビゲーション */}
			<Navigation />
		</div>
	);
}
