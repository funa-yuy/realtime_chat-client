'use client';

import Link from 'next/link';
import LimitPlayer from '../components/LimitPlayer';
import '../styles.css';

export default function LimitJoinPage() {
	return (
		<div className="limit-container">
			<h1>2人制限ゲーム</h1>

			<LimitPlayer />

			<div className="btn-wrapper">
				<Link href="/limit-player" className="btn">
					戻る
				</Link>
			</div>
		</div>
	);
}
