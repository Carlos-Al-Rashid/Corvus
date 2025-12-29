# Miyabi Troubleshooting Guide

Common issues and solutions for Miyabi autonomous development framework.

---

## Claude Code Integration Issues

### Issue 1: Settings Format Error

**Symptoms**:
```
hooks:
  ├ afterEdit: Expected array, but received null
  ├ beforeEdit: Expected array, but received null
  └ userPromptSubmit: Expected array, but received string
```

**Cause**: Deprecated hooks format in `.claude/settings.local.json`

**Solution**: Remove the `hooks` section entirely from your settings file.

**Correct format** (`.claude/settings.local.json`):
```json
{
  "projectContext": "Miyabi - Autonomous Development Framework",
  "workingDirectory": "/path/to/your/project",
  "preferredStyle": {
    "language": "TypeScript",
    "typeMode": "strict",
    "commitMessage": "conventional"
  },
  "qualityThreshold": {
    "minScore": 80,
    "testCoverage": 80
  }
}
```

**DO NOT include** the deprecated `hooks` section:
```json
// ❌ Remove this section
"hooks": {
  "userPromptSubmit": "...",
  "beforeEdit": null,
  "afterEdit": null
}
```

---

## Agent Execution Issues

### Issue 2: ANTHROPIC_API_KEY Error

**Symptoms**:
```
Error: ANTHROPIC_API_KEY is required for Agent execution
```

**Solution**:

1. Create `.env` file in project root:
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxx
GITHUB_TOKEN=ghp_xxxxx
```

2. For GitHub Actions, set in repository secrets:
```
Settings → Secrets and variables → Actions
Add: ANTHROPIC_API_KEY
```

3. Verify environment variable:
```bash
echo $ANTHROPIC_API_KEY
```

---

## GitHub Actions Issues

### Issue 3: Workflow Not Running

**Checklist**:
- [ ] `ANTHROPIC_API_KEY` set in GitHub Secrets
- [ ] Workflow file in `main` branch
- [ ] Issue has correct labels
- [ ] Repository permissions configured

**Manual trigger**:
```bash
gh workflow run "Autonomous Agent" --field issue_number=123
```

---

## Installation Issues

### Issue 4: npx miyabi Command Not Found

**Solution**:
```bash
# Install globally
npm install -g miyabi

# Or use npx directly
npx miyabi@latest init my-project
```

---

## Quick Fixes

### Reset Settings

If settings are corrupted:
```bash
cd .claude
rm settings.local.json
cp settings.example.json settings.local.json
# Edit and remove hooks section
```

### Verify Installation

```bash
miyabi --version
miyabi status
```

### Check Logs

```bash
# Agent execution logs
cat .ai/logs/latest.log

# GitHub Actions logs
gh run list
gh run view <run-id> --log
```

---

## Getting Help

- **Documentation**: README.md, CLAUDE.md
- **Issues**: https://github.com/ShunsukeHayashi/Miyabi/issues
- **CLI Help**: `miyabi --help`

---

🌸 **Miyabi** - Beauty in Autonomous Development
