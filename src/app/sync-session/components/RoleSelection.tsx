import Link from "next/link";

interface RoleSelectionProps {
	onSelectRole: (role: 'questioner' | 'answerer') => void;
	isRoleTaken: boolean;
}

export function RoleSelection({ onSelectRole, isRoleTaken }: RoleSelectionProps) {
	return (
		<div className="session-container">
			<h1>役割を選択してください</h1>
			<p>あなたの役割を選んでください。先に選ばれた役割は選択できません。</p>

			{isRoleTaken && (
				<p style={{ color: 'red', marginBottom: '1rem' }}>
					その役割は既に選ばれています。別の役割を選択してください。
				</p>
			)}

			<div className="role-selection">
				<button
					className="btn role-btn"
					onClick={() => onSelectRole('questioner')}
				>
					質問者になる
				</button>

				<button
					className="btn role-btn"
					onClick={() => onSelectRole('answerer')}
				>
					回答者になる
				</button>
			</div>

			<div className="role-description">
				<h2>役割について</h2>
				<div className="role-info">
					<div>
						<h3>質問者</h3>
						<p>相手に質問を投げかける役割です。</p>
					</div>
					<div>
						<h3>回答者</h3>
						<p>質問者からの質問に回答する役割です。</p>
					</div>
				</div>
			</div>
			<div className="btn-wrapper">
				<Link href="/" className="btn">アプリケーションTOPへ</Link>
			</div>
		</div>
	);
}
