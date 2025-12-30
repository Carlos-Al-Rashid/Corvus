# Psefoy ユーザーガイドライン

このガイドは、Psefoy を安全かつ効率的に使用するための重要な注意事項をまとめています。

## 🔒 1. セキュリティ - 最重要

### 環境変数の管理

```bash
# ❌ 絶対にやってはいけないこと
git add .env                    # .envをコミットしない
git commit -m "add API keys"    # APIキーをコミットしない

# ✅ 正しい方法
# .gitignoreに必ず含める
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "credentials.json" >> .gitignore
```

### GitHub Secrets の設定

```bash
# リポジトリのSecrets設定（必須）
gh secret set ANTHROPIC_API_KEY
gh secret set GITHUB_TOKEN

# ✅ 確認
gh secret list
```

**注意**: Secrets を設定しないと、GitHub Actions で Agent が実行できません。

---

## 💰 2. コスト管理

### Anthropic API の使用量

Psefoy は自律的に Agent を実行するため、**API コストが発生**します:

```bash
# 概算コスト（Claude Sonnet 4使用時）
- Issue 1件の自動処理: $0.50 - $2.00
- 月間10 Issue: $5 - $20
- 月間100 Issue: $50 - $200
```

### コスト削減のコツ

1. **Issue を明確に書く**
   - 曖昧な Issue は Agent が何度も試行してコスト増
   - 具体的な要件を書く

2. **auto モードの使い方**
   ```bash
   # ❌ 常時起動しない
   npx psefoy auto  # 全Issue自動処理（コスト大）

   # ✅ 必要な時だけ Agent 実行
   npx psefoy agent --issue 123
   ```

3. **予算アラート設定**
   - Anthropic Console で使用量アラートを設定
   - https://console.anthropic.com/settings/billing

---

## 📝 3. Issue の書き方

### 良い Issue の例

```markdown
### タイトル
機能追加: ユーザー認証機能

### 本文
## 目的
ユーザーがメールアドレスとパスワードでログインできるようにする

## 要件
- [ ] JWT トークンベースの認証
- [ ] /api/auth/login エンドポイント
- [ ] /api/auth/register エンドポイント
- [ ] bcrypt でパスワードハッシュ化
- [ ] トークン有効期限: 24時間

## 技術スタック
- Express.js
- jsonwebtoken
- bcrypt

## 期待される動作
1. ユーザーが /register にPOST
2. パスワードをハッシュ化してDB保存
3. /login で認証してJWTトークン返却
```

### 悪い Issue の例

```markdown
❌ タイトル: ログイン機能作って
❌ 本文: ログインできるようにしてください

# 問題点:
- 要件が不明確
- 技術スタック未指定
- Agent が何度も質問してコスト増
```

---

## 🏷️ 4. ラベルの使い方

Psefoy は **ラベルでタスクを管理**します:

### 必須ラベル

```yaml
type: feature     # 新機能
type: bug        # バグ修正
type: refactor   # リファクタリング

priority: P0-Critical  # 最優先
priority: P1-High      # 高優先度
priority: P2-Medium    # 中優先度
priority: P3-Low       # 低優先度

state: pending      # 未着手
state: analyzing    # 分析中（Agent実行中）
state: implementing # 実装中
state: reviewing    # レビュー中
state: done        # 完了
```

### ラベルの自動付与

```bash
# Issue作成時、IssueAgentが自動でラベル付与
gh issue create --title "Bug: ログインエラー" --body "..."

# 手動でラベル追加も可能
gh issue edit 123 --add-label "priority:P0-Critical"
```

---

## 🤖 5. Agent 実行のベストプラクティス

### 手動実行（推奨）

```bash
# 特定のIssueだけ処理
npx psefoy agent --issue 123

# ステータス確認
npx psefoy status
```

### 自動実行（注意）

```bash
# 全Issue自動処理（コスト注意）
npx psefoy auto

# 特定条件だけ自動実行
npx psefoy auto --label "priority:P0-Critical"
```

### GitHub Actions での実行

```yaml
# .github/workflows/autonomous-agent.yml
# Issue作成時に自動実行される

# ❌ 無限ループ注意
# AgentがIssueを作成 → 新しいIssueでAgentが起動 → ...

# ✅ 対策: 特定ラベルのみ実行
on:
  issues:
    types: [opened, labeled]

jobs:
  run-agent:
    if: contains(github.event.issue.labels.*.name, 'agent:auto-run')
```

---

## 📊 6. モニタリング

### Agent 実行ログの確認

```bash
# ログディレクトリ
cat .ai/logs/latest.log

# GitHub Actions ログ
gh run list
gh run view <run-id> --log
```

### エラー時の対処

```bash
# システム診断
npx psefoy doctor

# 出力例:
# ✓ GitHub token configured
# ✗ ANTHROPIC_API_KEY not found  # ← 問題発見
# ✓ Repository connected
```

---

## 🔄 7. ワークフロー理解

### 正常なフロー

```
1. Issue作成
   ↓
2. IssueAgent: 自動ラベル付与
   ↓
3. CoordinatorAgent: タスク分解（DAG作成）
   ↓
4. CodeGenAgent: コード生成
   ↓
5. ReviewAgent: 品質チェック（80点以上で次へ）
   ↓
6. TestAgent: テスト実行
   ↓
7. PRAgent: Draft PR作成
   ↓
8. 人間がレビュー＆マージ
   ↓
9. DeploymentAgent: 自動デプロイ
```

### 人間の介入ポイント

1. **Issue作成時**: 要件を明確に書く
2. **PR レビュー時**: コードをレビューしてマージ
3. **エラー時**: ログを確認して修正

---

## 🚫 8. やってはいけないこと

### セキュリティ

```bash
❌ APIキーをコミット
❌ .envをpush
❌ Secretsをコード内にハードコーディング
❌ public リポジトリに機密情報
```

### コスト

```bash
❌ auto モードを常時起動
❌ 曖昧なIssueを大量作成
❌ 無限ループするワークフロー
❌ テストなしでAgent実行
```

### ワークフロー

```bash
❌ AgentがPRを自動マージ（必ず人間がレビュー）
❌ mainブランチに直接push
❌ テストをスキップ
❌ レビューをスキップ
```

---

## ✅ 9. チェックリスト

### 初回セットアップ時

- [ ] `.env` を `.gitignore` に追加
- [ ] GitHub Secrets を設定
- [ ] Anthropic API キーの有効性確認
- [ ] `npx psefoy doctor` でシステムチェック
- [ ] テストIssueで動作確認

### Issue 作成時

- [ ] 明確なタイトル
- [ ] 具体的な要件
- [ ] 期待される動作を記述
- [ ] 技術スタック指定
- [ ] 適切なラベル付与

### Agent 実行後

- [ ] ログを確認
- [ ] 生成されたコードをレビュー
- [ ] テストを実行
- [ ] 品質スコアを確認（80点以上）
- [ ] PRをレビューしてマージ

### 月次レビュー

- [ ] Anthropic API 使用量確認
- [ ] コスト確認
- [ ] Agent 成功率確認
- [ ] Issue処理時間の確認

---

## 📚 10. トラブルシューティング

### よくあるエラー

1. **Agent が動かない**
   ```bash
   # 確認事項
   - ANTHROPIC_API_KEY 設定されているか
   - GitHub Secrets 設定されているか
   - Issue に適切なラベルが付いているか
   ```

2. **コストが高い**
   ```bash
   # 対策
   - Issue を明確に書く
   - auto モード使用を控える
   - 小さいタスクに分割
   ```

3. **PR が作成されない**
   ```bash
   # 確認事項
   - ReviewAgent が80点以上つけているか
   - テストが通っているか
   - GitHub token に権限があるか
   ```

---

## 📖 関連ドキュメント

- [README.md](./README.md) - 基本的な使い方
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - トラブルシューティング
- [CLAUDE.md](./CLAUDE.md) - Claude Code クイックリファレンス

---

🌸 **Psefoy** - Beauty in Autonomous Development

これらのガイドラインに従えば、安全かつ効率的に Psefoy を使用できます。
