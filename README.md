# Deno Hono Sample Application

このプロジェクトは、Deno、Hono、DrizzleORM を使用したモダンな Web アプリケーションのサンプルです。Domain-Driven Design (DDD)とクリーンアーキテクチャの原則に基づいて設計されています。

## アーキテクチャ

### Domain-Driven Design (DDD)

DDD は、複雑なドメインをモデリングし、ビジネスロジックを中心に据えた設計アプローチです。このプロジェクトでは以下の DDD の概念を採用しています：

- **ドメインモデル**: ビジネスルールとロジックを表現する中心的な概念
- **エンティティ**: 一意の識別子を持つドメインオブジェクト
- **値オブジェクト**: 不変で識別子を持たないドメインオブジェクト
- **リポジトリ**: ドメインオブジェクトの永続化を担当するインターフェース

### クリーンアーキテクチャ

クリーンアーキテクチャは、依存関係の方向性を制御し、ビジネスロジックの独立性を保つ設計パターンです。以下のレイヤーで構成されています：

- **ドメイン層**: ビジネスルールとエンティティを定義
- **アプリケーション層**: ユースケースとドメインロジックの調整
- **インフラストラクチャ層**: 外部サービスとの連携
- **プレゼンテーション層**: ユーザーインターフェースと API エンドポイント

## 技術スタック

- [Deno](https://deno.land/) - モダンな JavaScript/TypeScript ランタイム
- [Hono](https://hono.dev/) v4.7.4 - 軽量で高速な Web フレームワーク
- [DrizzleORM](https://orm.drizzle.team/) v0.40.0 - TypeScript ORM ライブラリ
- [PGlite](https://github.com/electric-sql/pglite) -
  ブラウザで動作する軽量な PostgreSQL 互換データベース
- [Zod](https://zod.dev/) v3.24.2 - TypeScript ファーストのスキーマ検証
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
  v0.19.2 - Hono の OpenAPI 統合

## 前提条件

- [Deno](https://deno.land/#installation)がインストールされていること
- PGlite は自動的にセットアップされるため、追加のインストールは不要です

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
- `DATABASE_URL`: PGlite の接続文字列（自動生成されます）

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

## API エンドポイント

### タスク管理

- `GET /tasks` - すべてのタスクを取得します
- `GET /tasks/:id` - 指定された ID のタスクを取得します
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
├── src/                    # ソースコード
│   ├── domain/            # ドメイン層
│   │   ├── entities/      # エンティティ定義
│   │   ├── value-objects/ # 値オブジェクト
│   │   └── repositories/  # リポジトリインターフェース
│   ├── application/       # アプリケーション層
│   │   ├── use-cases/     # ユースケース実装
│   │   └── services/      # アプリケーションサービス
│   ├── infrastructure/    # インフラストラクチャ層
│   │   ├── database/      # データベース関連
│   │   └── repositories/  # リポジトリ実装
│   ├── presentation/      # プレゼンテーション層
│   │   ├── controllers/   # コントローラー
│   │   ├── routes/        # ルーティング定義
│   │   └── middlewares/   # ミドルウェア
│   ├── lib/               # 共通ライブラリ
│   └── index.ts           # アプリケーションのエントリーポイント
├── db/                    # データベース関連
│   ├── data/             # データベースのデータ
│   └── migrations/       # マイグレーションファイル
├── deno.json             # Denoの設定ファイル
├── deno.lock             # 依存関係のロックファイル
├── drizzle.config.ts     # DrizzleORMの設定ファイル
├── .env.example          # 環境変数のテンプレート
├── .gitignore            # Gitの除外設定ファイル
└── README.md             # このファイル
```

### レイヤーの役割

#### ドメイン層 (domain/)

- ビジネスルールとロジックの定義
- エンティティと値オブジェクトの実装
- リポジトリインターフェースの定義

#### アプリケーション層 (application/)

- ユースケースの実装
- ドメインロジックの調整
- トランザクション管理

#### インフラストラクチャ層 (infrastructure/)

- データベース接続と操作
- リポジトリの実装
- 外部サービスとの連携

#### プレゼンテーション層 (presentation/)

- API エンドポイントの定義
- リクエスト/レスポンスの処理
- 認証・認可の実装

## ライセンス

MIT ライセンス
