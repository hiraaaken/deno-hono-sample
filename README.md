# Deno Hono Sample Application

このプロジェクトは、Deno、Hono、DrizzleORMを使用したモダンなWebアプリケーションのサンプルです。

## 技術スタック

- [Deno](https://deno.land/) - モダンなJavaScript/TypeScriptランタイム
- [Hono](https://hono.dev/) v4.7.4 - 軽量で高速なWebフレームワーク
- [DrizzleORM](https://orm.drizzle.team/) v0.40.0 - TypeScript ORMライブラリ
- [PostgreSQL](https://www.postgresql.org/) - データベース
- [Zod](https://zod.dev/) v3.24.2 - TypeScriptファーストのスキーマ検証
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi) v0.19.2 - HonoのOpenAPI統合

## 前提条件

- [Deno](https://deno.land/#installation)がインストールされていること
- PostgreSQLがインストールされており、実行中であること

## セットアップ

1. リポジトリのクローン:
```bash
git clone <repository-url>
cd deno-hono-sample
```

2. 環境変数の設定:
```bash
# .envファイルを作成し、必要な環境変数を設定
cp .env.example .env
```

必要な環境変数:
- `PORT`: アプリケーションのポート番号（デフォルト: 8000）
- `POSTGRES_HOST`: PostgreSQLホスト
- `POSTGRES_PORT`: PostgreSQLポート
- `POSTGRES_DB`: データベース名
- `POSTGRES_USER`: データベースユーザー
- `POSTGRES_PASSWORD`: データベースパスワード
- `DATABASE_URL`: 自動生成される接続文字列

3. データベースのセットアップ:
```bash
# マイグレーションの実行
deno task db:migrate
```

## 開発

開発サーバーの起動:

```bash
deno task dev
```

アプリケーションは `http://localhost:8000` で実行されます。

## APIエンドポイント

### タスク管理
- `GET /tasks` - すべてのタスクを取得します
- `GET /tasks/:id` - 指定されたIDのタスクを取得します
- `POST /tasks` - 新しいタスクを作成します
  - リクエストボディ:
    ```json
    {
      "title": "タスクのタイトル",
      "description": "タスクの説明",
      "dueDate": "2024-03-20T00:00:00Z" // オプション
    }
    ```
- `PUT /tasks/:id` - タスクを更新します（実装中）
- `DELETE /tasks/:id` - タスクを削除します（実装中）

## プロジェクト構造

```
.
├── src/               # ソースコード
│   ├── application/   # アプリケーション層（ユースケース）
│   ├── domain/       # ドメイン層（エンティティ、値オブジェクト）
│   ├── infrastructure/ # インフラストラクチャ層（データベース、外部サービス）
│   ├── lib/          # 共通ライブラリ
│   ├── presentation/ # プレゼンテーション層（コントローラー、ルーティング）
│   └── index.ts      # アプリケーションのエントリーポイント
├── db/               # データベース関連
│   ├── data/        # データベースのデータ
│   └── migrations/  # マイグレーションファイル
├── deno.json        # Denoの設定ファイル
├── deno.lock        # 依存関係のロックファイル
├── drizzle.config.ts # DrizzleORMの設定ファイル
├── .env.example     # 環境変数のテンプレート
├── .gitignore       # Gitの除外設定ファイル
└── README.md        # このファイル
```

## ライセンス

MITライセンス 