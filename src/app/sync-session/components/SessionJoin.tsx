import Link from "next/link";

interface SessionJoinProps {
	onJoin: () => void;
}

export function SessionJoin({ onJoin }: SessionJoinProps) {
	return (
		<div className="session-container">
			<h1>セッション参加</h1>
			<p>セッションに参加してください。</p>
			<button className="btn" onClick={onJoin}>
				セッションに参加
			</button>
			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div>
	);
}
