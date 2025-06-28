import { useState, useCallback } from 'react';

/* 現状: counterとlimited-chat内で使用。 */

/**
 * カウントダウン機能を提供するカスタムフック.
 * @param initialValue - カウンターの初期値
 * @returns \{ count, decrement, isZero }
 * @example
 * const { count, decrement, isZero } = useCounter(10);
 */
export const useCounter = (initialValue: number) => {
	// count: 現在のカウント数
	const [count, setCount] = useState(initialValue);

	// カウントを1減らす関数
	const decrement = useCallback(() => {
		setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
	}, []);

	// isZero: カウントが0かどうかを示すboolean値
	const isZero = count === 0;

	return { count, decrement, isZero };
};
