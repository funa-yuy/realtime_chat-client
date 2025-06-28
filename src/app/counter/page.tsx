'use client';

import Link from "next/link";
import { useCounter } from '@/hooks/useCounter'; // カスタムフックをインポート

export default function CounterPage() {
	// カウンター機能の自作フックを呼び出し 初期値10
	const { count, decrement, isZero } = useCounter(10);

	return (
		<div>
			<h1>残り回数カウンター</h1>
			{/* 残り回数(count)を表示 */}
			<h2>{count}</h2>

			{isZero && <p style={{ color: 'red' }}>カウントが0になりました</p>}

			{/* isZeroがtrueならボタンを無効化(disabled)する */}
			<div className="btn-wrapper">
				<button className="btn" onClick={decrement} disabled={isZero}>
					減らす
				</button>
			</div>
			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div >
	);
}
