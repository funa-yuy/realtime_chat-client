# Sync Session システム

質問者と回答者の2人でリアルタイム同期セッションを行うシステムです。

## 📁 システム構成

```
sync-session/
├── page.tsx                  # エントリーポイント
├── config/
│   └── pages.ts             # ページ設定（メイン編集箇所）
├── components/
│   ├── SessionController.tsx # メイン制御コンポーネント
│   ├── ActiveSession.tsx    # アクティブセッション表示
│   ├── ConnectionStatus.tsx # 接続状態表示
│   ├── SessionJoin.tsx      # セッション参加画面
│   ├── RoleSelection.tsx    # 役割選択画面
│   ├── WaitingScreen.tsx    # 待機画面
│   ├── PageRenderer.tsx     # ページ描画エンジン
│   └── examples/           # ページコンテンツ実装
│       ├── WelcomePage.tsx
│       ├── QuestionPage.tsx
│       └── ResultPage.tsx
├── hooks/
│   ├── useSession.ts        # サーバー通信
│   └── useSessionLogic.ts   # ビジネスロジック
├── utils/
│   └── sessionUtils.ts      # 状態判定関数
└── styles.css              # スタイル定義
```

## 🎯 セッションフロー

1. **接続・参加** → サーバー接続・セッション参加
2. **役割選択** → 質問者・回答者を選択（両方選択まで待機）
3. **ページ進行** → 設定に応じて同期的にページを進行
4. **セッション終了** → 各自が個別に終了

## 🚀 新しいページの追加方法

### 手順1: ページコンポーネントの作成

`components/examples/` にページコンポーネントを作成：

```tsx
// components/examples/MyNewPage.tsx
import { PageProps } from '../../config/pages';

export function MyNewPage({ role, onReady, isReady, isWaiting }: PageProps) {
  return (
    <div className="page-container">
      <h1>新しいページタイトル</h1>
      <p>あなたの役割: {role === 'questioner' ? '質問者' : '回答者'}</p>

      {/* ページ固有のコンテンツ */}
      <div className="content">
        <p>ここにページの内容を書く</p>
      </div>

      {/* 準備完了ボタン（必須） */}
      <div className="ready-section">
        <button
          className="btn ready-btn"
          onClick={onReady}
          disabled={isWaiting}
        >
          {isReady ? '準備完了を取り消す' : '次へ進む'}
        </button>
        {isWaiting && <p>他のプレイヤーを待っています...</p>}
      </div>
    </div>
  );
}
```

### 手順2: ページ設定への追加

`config/pages.ts` でコンポーネントをインポート：

```tsx
import { MyNewPage } from '../components/examples/MyNewPage';
```

`pages` 配列に新しいページ設定を追加：

```tsx
export const pages: PageConfig[] = [
  // ... 既存のページ
  {
    id: 'my-new-page',           // ユニークID
    name: 'マイページ',           // 画面に表示される名前
    waitType: 'both',            // 待機タイプ（下記参照）
    displayType: 'same',         // 表示タイプ（下記参照）
    components: {
      same: MyNewPage           // コンポーネント指定
    }
  }
];
```

## 📝 設定オプション詳細

### waitType（どのプレイヤーの準備完了まで待つか）

| 値             | 説明                                   | 使用例                   |
| -------------- | -------------------------------------- | ------------------------ |
| `'both'`       | 両方のプレイヤーが準備完了するまで待つ | 一緒に見る説明ページ     |
| `'questioner'` | 質問者のみの準備完了で次へ進む         | 質問者が質問を考える時間 |
| `'answerer'`   | 回答者のみの準備完了で次へ進む         | 回答者が回答する時間     |
| `'individual'` | 各自が個別に終了（待機しない）         | 最終結果ページ           |

### displayType（画面表示方法）

| 値            | 説明                             | 設定方法                                                       |
| ------------- | -------------------------------- | -------------------------------------------------------------- |
| `'same'`      | 両プレイヤーに同じ画面を表示     | `same: MyComponent`                                            |
| `'different'` | プレイヤーごとに異なる画面を表示 | `questioner: QuestionerComponent, answerer: AnswererComponent` |

## 🎨 役割別表示の実装

### パターン1: 同じコンポーネント内で条件分岐（推奨）

```tsx
export function QuestionPage({ role, onReady, isReady, isWaiting }: PageProps) {
  if (role === 'questioner') {
    return (
      <div className="page-container">
        <h1>質問を考えてください</h1>
        <textarea placeholder="質問を入力..." />
        <button className="btn ready-btn" onClick={onReady}>
          質問完了
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>質問者が準備中です</h1>
      <p>お待ちください...</p>
    </div>
  );
}
```

### パターン2: 別々のコンポーネント

```tsx
// 個別にコンポーネントを作成
export function QuestionerPage({ onReady }: PageProps) { /* ... */ }
export function AnswererPage({ onReady }: PageProps) { /* ... */ }

// pages.ts での設定
{
  displayType: 'different',
  components: {
    questioner: QuestionerPage,
    answerer: AnswererPage
  }
}
```

## 🔧 既存ページの改修方法

### コンテンツの変更
1. `components/examples/` の該当ファイルを編集
2. スタイルは `styles.css` に追加

### 待機条件の変更
1. `config/pages.ts` の `waitType` を変更
2. 必要に応じて `displayType` も変更

### ページ順序の変更
1. `config/pages.ts` の `pages` 配列の順序を変更

## 🎯 よくある実装パターン

### 1. 説明ページ（両方同じ画面）
```tsx
{
  waitType: 'both',
  displayType: 'same',
  components: { same: ExplanationPage }
}
```

### 2. 入力ページ（質問者のみ）
```tsx
{
  waitType: 'questioner',
  displayType: 'different',
  components: {
    questioner: InputPage,
    answerer: WaitingPage
  }
}
```

### 3. 最終結果ページ（個別終了）
```tsx
{
  waitType: 'individual',
  displayType: 'same',
  components: { same: ResultPage }
}
```

## 🚨 注意事項

### 必須実装項目
- 各ページコンポーネントには必ず `onReady` ボタンを配置
- `PageProps` インターフェースに従った props を受け取る
- `className="page-container"` で外側を囲む

### スタイリング
- 既存のCSSクラス（`.btn`, `.ready-btn` など）を使用
- 新しいスタイルは `styles.css` に追加
- `globals.css` の CSS変数を活用

### デバッグ方法
1. ブラウザの開発者ツールでコンソールを確認
2. 2つのブラウザタブで同時テスト
3. サーバー側ログも確認

## 📚 参考情報

### PageProps インターフェース
```tsx
interface PageProps {
  role: 'questioner' | 'answerer';  // プレイヤーの役割
  onReady: () => void;               // 準備完了ボタンのハンドラー
  isReady: boolean;                  // 現在の準備状態
  isWaiting: boolean;                // 他プレイヤー待ち状態
}
```

### 使用可能なCSSクラス
- `.page-container` - ページの基本コンテナ
- `.ready-section` - 準備完了ボタン周辺
- `.btn`, `.ready-btn` - ボタンスタイル
- `.waiting-indicator` - 待機表示用

このドキュメントに従って、効率的にページの追加・改修を行うことができます。
