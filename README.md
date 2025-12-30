<div align="center">

# Psefoy

[![npm version](https://img.shields.io/npm/v/psefoy.svg)](https://www.npmjs.com/package/psefoy)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

### Issue を書く。コードが完成する。
*Write an Issue. Code is completed.*

```bash
npx psefoy
```

---

## 魔法の瞬間 / The Magic

```
📝 Issue を書く        →    🤖 AI が実装        →    ✅ PR が届く
   Write an Issue            AI implements            PR arrives
```

**10-15分で完了。** *Done in 10-15 minutes.*

---

## About Psefoy

Psefoy is an autonomous AI development platform based on the **Miyabi framework** with **test11 validation fixes** applied.

- ✅ Complete Miyabi functionality (21 agents, GitHub OS integration)
- ✅ Fixed `.claude/settings.example.json` (deprecated hooks removed)
- ✅ Added `TROUBLESHOOTING.md` (test11 experience documented)

Original Miyabi by [Shunsuke Hayashi](https://github.com/ShunsukeHayashi/Miyabi)

---

## 今すぐ試す / Try Now

```bash
# CLI
npx psefoy init my-project
cd my-project

# Setup environment
export GITHUB_TOKEN=ghp_xxxxx
export ANTHROPIC_API_KEY=sk-ant-xxxxx

# Check status
npx psefoy status

# Start autonomous mode
npx psefoy auto
```

---

## v0.19.0 新機能 / What's New

- 🎯 **7 Claude Skills** - code-reviewer, commit-helper, test-generator...
- 🪟 **Windows対応** - Cross-platform support
- 📦 **依存関係更新** - @anthropic-ai/sdk 0.71, @octokit/rest 21
- 🐛 **test11 fixes** - Settings format error, troubleshooting guide

---

## もっと詳しく / Learn More

- 📖 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions
- 📖 [CLAUDE.md](./CLAUDE.md) - Quick reference for Claude Code
- 🐛 [Issue 報告](https://github.com/Carlos-Al-Rashid/Corvus/issues)

---

## 必要なもの / Requirements

- Node.js 18+
- GitHub アカウント / GitHub account
- ANTHROPIC_API_KEY (for agent execution)

---

## ライセンス / License

[Apache 2.0](LICENSE) - Based on Miyabi by Shunsuke Hayashi

Copyright (c) 2025 Carlos Al Rashid

---

<sub>🤖 Powered by Claude AI</sub>

</div>
