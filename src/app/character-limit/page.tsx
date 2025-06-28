
import Link from "next/link";
import CharacterLimitInput from './components/CharacterLimitInput';

export default function CharacterLimitPage() {
	return (
		<div>
			<h1>文字数制限機能</h1>

			{/* MAX10文字の、テキスト入力欄を表示 */}
			<CharacterLimitInput maxLength={10} />

			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div>
	);
}
