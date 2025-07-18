import { WelcomePage } from '../components/examples/WelcomePage';
import { QuestionPage } from '../components/examples/QuestionPage';
import { ResultPage } from '../components/examples/ResultPage';

/**
 * ページ設定の型定義
 */
export interface PageConfig {
	id: string; // ページの一意識別子
	name: string; // 画面に表示されるページ名
	waitType: 'both' | 'questioner' | 'answerer' | 'individual'; // 待機タイプ
	displayType: 'same' | 'different'; // 表示タイプ
	components: {
		same?: React.ComponentType<PageProps>; // 同じ画面用コンポーネント
		questioner?: React.ComponentType<PageProps>; // 質問者用コンポーネント
		answerer?: React.ComponentType<PageProps>; // 回答者用コンポーネント
	};
}

/**
 * 各ページコンポーネントに渡されるprops
 */
export interface PageProps {
	role: 'questioner' | 'answerer'; // プレイヤーの役割
	onReady: () => void; // 準備完了ボタンのハンドラー
	isReady: boolean; // 現在の準備状態
	isWaiting: boolean; // 他プレイヤー待ち状態
}

/**
 * セッションページの設定配列
 * ここに新しいページを追加することでセッションフローを拡張できる
 */
export const pages: PageConfig[] = [
	{
		id: 'welcome',
		name: 'ようこそ',
		waitType: 'both',
		displayType: 'same',
		components: {
			same: WelcomePage
		}
	},
	{
		id: 'question',
		name: '質問タイム',
		waitType: 'questioner',
		displayType: 'different',
		components: {
			questioner: QuestionPage,
			answerer: QuestionPage
		}
	},
	{
		id: 'result',
		name: '結果発表',
		waitType: 'individual',
		displayType: 'same',
		components: {
			same: ResultPage
		}
	}
];
