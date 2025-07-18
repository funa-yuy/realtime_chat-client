'use client';

import Link from 'next/link';
import './styles.css';

export default function LimitTopPage() {
	return (
		<div className="limit-container">
			<h1>アクセスする人数を制限</h1>

			<div>
				<p>このゲームは最大2人まで参加できます。</p>
				<p>「ゲームに参加」ボタンを押してゲームを開始してください。</p>
			</div>

			<div className="btn-wrapper">
				<Link href="/limit-player/join" className="btn">
					ゲームに参加
				</Link>
			</div>

			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div>
	);
}
