'use client';

import { useState } from 'react';

/**
 * 文字数制限付きのテキスト入力欄を表示するコンポーネント
 * @param maxLength - MAXの文字数
 * @example
 * <CharacterLimitInput maxLength={10} />
 */

interface CharacterLimitInputProps {
	maxLength: number;
}

export default function CharacterLimitInput({ maxLength }: CharacterLimitInputProps) {
	const [text, setText] = useState<string>('');

	const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const isOverLimit = text.length > maxLength;

	return (
		<div>
			<textarea
				placeholder="テキストを入力してください"
				value={text}
				onChange={handleInputChange}
			/>

			{/* もし、上限に達していたら、エラー文を出力 */}
			{isOverLimit && (
				<p style={{ color: 'red' }}>
					{maxLength}文字以内にしてください。
				</p>
			)}
		</div>
	);
}
