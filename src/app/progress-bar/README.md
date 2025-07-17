# プログレスバー機能

複数ページにわたる進捗状況を視覚的に表示するコンポーネントです。

## ディレクトリ構造

```
progress-bar/
├── context/
│   └── ProgressContext.tsx     # 進捗状態の管理
├── components/
│   ├── ProgressBar.tsx         # 進捗バー(外面上部)の本体
│   ├── ProgressBar.css         # 進捗バーのスタイル
│   ├── Layout.tsx              # 共通レイアウト
│   ├── Navigation.tsx          # ナビゲーション(外面下部)の本体
│   └── Navigation.css          # ナビゲーションのスタイル
├── page01/ ~ page05/
│   └── page.tsx                # 各ステップページ
├── config.ts                   # 進捗バー設定
└── page.tsx                    # TOPページ（進捗開始前）
```

## 新しいページを追加する方法

### 1. 総ステップ数を更新

`config.ts` ファイルの `TOTAL_STEPS` を新しい数に変更：

```typescript
// config.ts
export const PROGRESS_CONFIG = {
  TOTAL_STEPS: 6, // 5から6に変更
} as const;
```

### 2. 新しいページディレクトリを作成

例：6番目のページを追加する場合

```bash
mkdir client/src/app/progress-bar/page06
```

### 3. ページファイルを作成

`page06/page.tsx` を作成し、以下の内容をコピーペースト：

```tsx
'use client';

import { useEffect } from 'react';
import Layout from '../components/Layout';
import { ProgressProvider, useProgress } from '../context/ProgressContext';
import { PROGRESS_CONFIG } from '../config';

function Page06Content() {
	const { setCurrentStep } = useProgress();

	// ページアクセス時に進捗を1に設定
	useEffect(() => {
		setCurrentStep(6);	//ページ番号と一致させる（page01なら1）
	}, [setCurrentStep]);

	return (
		<Layout>
			<div>
				{/* ここにレイアウトを置く */}
				<h1>ページ 06</h1>
				<p>ここにページの内容を記述</p>
			</div>
		</Layout>
	);
}

export default function Page06() {
	return (
		// 総ステップ数は config.ts で一元管理
		<ProgressProvider totalSteps={PROGRESS_CONFIG.TOTAL_STEPS}>
			<Page06Content />
		</ProgressProvider>
	);
}
```

## ⚙️ カスタマイズポイント

### ページ番号の変更
各ページの `setCurrentStep()` の値を変更：

```tsx
// page06なら6、page10なら10
setCurrentStep(6);
```

### ページ内容の変更
`Layout` 内の `<div>` の中身を自由に編集：

```tsx
<Layout>
	<div>
		<h1>カスタムタイトル</h1>
		<p>カスタム内容</p>
		{/* お好みのコンポーネントやコンテンツ */}
	</div>
</Layout>
```

## 🔧 重要なファイル

| ファイル              | 役割         | 編集が必要な場合       |
| --------------------- | ------------ | ---------------------- |
| `config.ts`           | 設定管理     | **ページ追加時は必須** |
| `ProgressContext.tsx` | 進捗状態管理 | 通常は編集不要         |
| `ProgressBar.tsx`     | 進捗バー表示 | 通常は編集不要         |
| `Navigation.tsx`      | ページ間遷移 | 通常は編集不要         |
| 各 `page.tsx`         | 個別ページ   | **ページ追加時は必須** |

## 注意事項

1. `config.ts` で総ステップ数を管理: 新しいページを追加する時は必ず `config.ts` の `TOTAL_STEPS` を更新してください
2. ページ番号の連番: page01, page02... のように連番で作成してください
3. `setCurrentStep()` の値: ページ番号と一致させてください（page06なら6）

## 動作確認

ページ追加後、以下を確認：

1. `/progress-bar` にアクセスして page01 にリダイレクトされるか
2. 各ページで進捗バーが正しく表示されるか
3. 「前へ」「次へ」ボタンで正常に遷移できるか
4. 新しいページで進捗が正しく更新されるか

## デザインカスタマイズ

進捗バーの見た目を変更したい場合は `ProgressBar.css` を編集してください。
globals.css の CSS変数（`--color-button-default` など）を活用しています。
