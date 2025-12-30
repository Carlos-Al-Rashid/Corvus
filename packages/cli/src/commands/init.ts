/**
 * init command - Create new project with Agentic OS
 *
 * Flow:
 * 1. GitHub OAuth authentication
 * 2. Create GitHub repository
 * 3. Setup labels (53 labels)
 * 4. Create GitHub Projects V2
 * 5. Deploy workflows (12+ workflows)
 * 6. Clone locally
 * 7. Initialize npm project
 * 8. Create welcome Issue
 */

import ora from 'ora';
import chalk from 'chalk';
import * as fs from 'fs';
import * as path from 'path';
import { githubOAuth } from '../auth/github-oauth';
import { createRepository } from '../setup/repository';
import { setupLabels } from '../setup/labels';
import { createProjectV2 } from '../setup/projects';
import { deployWorkflows } from '../setup/workflows';
import { cloneAndSetup } from '../setup/local';
import { createWelcomeIssue } from '../setup/welcome';
import { deployClaudeConfig, deployClaudeConfigToGitHub, verifyClaudeConfig } from '../setup/claude-config';
import { execCommand } from '../utils/cross-platform';

export interface InitOptions {
  private?: boolean;
  skipInstall?: boolean;
}

export async function init(projectName: string, options: InitOptions = {}) {
  console.log(chalk.gray('This will create a fully automated development environment.\n'));
  console.log(chalk.gray('What you get:'));
  console.log(chalk.gray('  ✓ GitHub repository with automation'));
  console.log(chalk.gray('  ✓ 6 AI agents ready to work'));
  console.log(chalk.gray('  ✓ Label-based state machine'));
  console.log(chalk.gray('  ✓ Automatic Issue → PR pipeline\n'));

  // Step 1: GitHub OAuth
  const spinner = ora('Authenticating with GitHub...').start();
  let token: string;

  try {
    token = await githubOAuth();
    spinner.succeed(chalk.green('GitHub authentication complete'));
  } catch (error) {
    spinner.fail(chalk.red('GitHub認証に失敗しました'));
    if (error instanceof Error) {
      throw new Error(`GitHub authentication failed: ${error.message}`);
    }
    throw new Error('GitHub authentication failed: Unknown error');
  }

  // Step 2: Create repository
  spinner.start(`Creating GitHub repository: ${projectName}...`);
  let repo: any;

  try {
    repo = await createRepository(projectName, token, options.private || false);
    spinner.succeed(chalk.green(`Repository created: ${chalk.cyan(repo.html_url)}`));
  } catch (error) {
    spinner.fail(chalk.red('リポジトリの作成に失敗しました'));
    if (error instanceof Error) {
      if (error.message.includes('already exists') || error.message.includes('name already exists')) {
        console.log(chalk.yellow('\n💡 解決策:\n'));
        console.log(chalk.white(`  1. 別の名前を試してください:`));
        console.log(chalk.gray(`     npx miyabi init ${projectName}-2`));
        console.log(chalk.gray(`     npx miyabi init ${projectName}-new\n`));
        console.log(chalk.white(`  2. または、既存リポジトリを削除:`));
        console.log(chalk.gray(`     gh repo delete ${projectName} --yes\n`));
        console.log(chalk.white(`  3. GitHub で確認:`));
        console.log(chalk.gray(`     https://github.com/settings/repositories\n`));
        throw new Error(`repository creation failed: リポジトリ名 "${projectName}" は既に存在しています`);
      }
      throw new Error(`repository creation failed: ${error.message}`);
    }
    throw new Error('repository creation failed: Unknown error');
  }

  // Step 3: Setup labels
  spinner.start('Creating labels (53 labels across 10 categories)...');

  try {
    const result = await setupLabels(repo.owner.login, repo.name, token);
    spinner.succeed(chalk.green(`Labels created: ${result.created} new, ${result.updated} updated`));
    console.log(chalk.gray(`  ✓ Total: ${result.created + result.updated} labels configured`));
  } catch (error) {
    spinner.fail(chalk.red('ラベルの作成に失敗しました'));
    if (error instanceof Error) {
      console.log(chalk.yellow('\n💡 解決策:\n'));
      console.log(chalk.white('  1. GitHubトークンの権限を確認してください:'));
      console.log(chalk.gray('     - repo (Full control of private repositories)'));
      console.log(chalk.gray('     - admin:org (Full control of orgs and teams)\n'));
      console.log(chalk.white('  2. 手動でラベルを作成:'));
      console.log(chalk.gray(`     cd ${projectName}`));
      console.log(chalk.gray('     gh label create "🐛 type:bug" --color "d73a4a"\n'));
      console.log(chalk.white('  3. または、Claude Codeに依頼:'));
      console.log(chalk.gray('     「識学理論準拠の65ラベルを作成してください」\n'));
      throw new Error(`Label setup failed: ${error.message}`);
    }
    throw new Error('Label setup failed: Unknown error');
  }

  // Step 4: Create Projects V2 (optional - requires additional scopes)
  spinner.start('Setting up GitHub Projects V2...');

  try {
    const project = await createProjectV2(repo.owner.login, repo.name, token);
    spinner.succeed(chalk.green(`Projects V2 created: ${chalk.cyan(project.url)}`));
  } catch (error) {
    spinner.warn(chalk.yellow('Projects V2 creation skipped (requires read:org scope)'));
    console.log(chalk.gray('  You can create Projects manually later at:'));
    console.log(chalk.gray(`  ${repo.html_url}/projects\n`));
  }

  // Step 5: Deploy workflows
  spinner.start('Deploying GitHub Actions workflows...');

  try {
    const workflowCount = await deployWorkflows(repo.owner.login, repo.name, token);
    spinner.succeed(chalk.green(`${workflowCount} workflows deployed`));
  } catch (error) {
    spinner.warn(chalk.yellow('Workflow deployment skipped'));
    console.log(chalk.gray('  You can add workflows manually later\n'));
  }

  // Step 5.5: Deploy Claude Code configuration to GitHub repository
  spinner.start('Deploying Claude Code configuration to repository...');

  try {
    await deployClaudeConfigToGitHub(repo.owner.login, repo.name, projectName, token);
    spinner.succeed(chalk.green('Claude Code configuration committed to repository'));
    console.log(chalk.gray('  ✓ .claude/ directory created'));
    console.log(chalk.gray('  ✓ CLAUDE.md context file created'));
  } catch (error) {
    spinner.fail(chalk.red('Claude Code configuration failed'));
    if (error instanceof Error) {
      console.error(chalk.red(`  Error: ${error.message}`));
      if (error.stack) {
        console.error(chalk.gray(`  Stack: ${error.stack.split('\n').slice(0, 3).join('\n')}`));
      }
    }
    console.log(chalk.yellow('  You can add .claude/ manually later\n'));
  }

  // Step 6: Clone and setup locally
  spinner.start('Setting up local project...');

  let projectPath: string | undefined;

  try {
    await cloneAndSetup(repo.clone_url, projectName, {
      skipInstall: options.skipInstall || false,
      owner: repo.owner.login,
      repo: repo.name,
    });
    projectPath = `./${projectName}`;
    spinner.succeed(chalk.green('Local setup complete'));
  } catch (error) {
    spinner.fail(chalk.red('Local setup failed, creating essential files...'));

    // Fallback: Create essential files even if cloneAndSetup failed
    try {
      const fallbackPath = `./${projectName}`;

      // Ensure directory exists
      if (!fs.existsSync(fallbackPath)) {
        execCommand(`git clone ${repo.clone_url} ${projectName}`, { stdio: 'inherit' });
      }

      projectPath = fallbackPath;

      // Create package.json
      const packageJson = {
        name: projectName,
        version: '0.1.0',
        description: 'Autonomous development powered by Agentic OS',
        type: 'module',
        scripts: {
          dev: 'tsx src/index.ts',
          build: 'tsc',
          test: 'vitest',
          lint: 'eslint . --ext .ts,.tsx',
          typecheck: 'tsc --noEmit',
        },
        keywords: ['agentic-os', 'autonomous'],
        author: '',
        license: 'MIT',
        dependencies: {},
        devDependencies: {
          '@types/node': '^20.10.0',
          '@typescript-eslint/eslint-plugin': '^6.13.0',
          '@typescript-eslint/parser': '^6.13.0',
          eslint: '^8.54.0',
          tsx: '^4.7.0',
          typescript: '^5.8.3',
          vitest: '^3.2.4',
        },
      };

      fs.writeFileSync(
        path.join(fallbackPath, 'package.json'),
        JSON.stringify(packageJson, null, 2) + '\n'
      );

      // Create tsconfig.json
      const tsconfig = {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          lib: ['ES2022'],
          moduleResolution: 'node',
          esModuleInterop: true,
          resolveJsonModule: true,
          strict: true,
          skipLibCheck: true,
          forceConsistentCasingInFileNames: true,
          outDir: './dist',
          rootDir: './src',
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'dist'],
      };

      fs.writeFileSync(
        path.join(fallbackPath, 'tsconfig.json'),
        JSON.stringify(tsconfig, null, 2) + '\n'
      );

      // Create src directory with index.ts
      const srcDir = path.join(fallbackPath, 'src');
      if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(srcDir, 'index.ts'),
        `/**\n * ${projectName}\n *\n * Autonomous development powered by Agentic OS\n */\n\nexport function main() {\n  console.log('🌸 ${projectName}');\n  console.log('Autonomous development powered by Agentic OS\\n');\n}\n\n// Run if executed directly\nif (import.meta.url === \`file://\${process.argv[1]}\`) {\n  main();\n}\n`
      );

      // Create tests directory
      const testsDir = path.join(fallbackPath, 'tests');
      if (!fs.existsSync(testsDir)) {
        fs.mkdirSync(testsDir, { recursive: true });
      }

      fs.writeFileSync(
        path.join(testsDir, 'example.test.ts'),
        `import { describe, it, expect } from 'vitest';\nimport { main } from '../src/index';\n\ndescribe('${projectName}', () => {\n  it('should run main function', () => {\n    expect(() => main()).not.toThrow();\n  });\n});\n`
      );

      // Run npm install
      if (!options.skipInstall) {
        execCommand('npm install', {
          cwd: fallbackPath,
          stdio: 'inherit',
        });
      }

      spinner.succeed(chalk.green('Essential files created'));
    } catch (fallbackError) {
      spinner.fail(chalk.red('Failed to create essential files'));
      console.log(chalk.yellow('\n💡 Please clone and setup manually:\n'));
      console.log(chalk.gray(`  git clone ${repo.clone_url}`));
      console.log(chalk.gray(`  cd ${projectName}`));
      console.log(chalk.gray(`  npm init -y && npm install\n`));
    }
  }

  // Step 6.5: Deploy Claude Code configuration
  if (projectPath) {
    spinner.start('Deploying Claude Code configuration...');

    try {
      await deployClaudeConfig({
        projectPath,
        projectName,
      });

      const verification = await verifyClaudeConfig(projectPath);

      if (verification.claudeDirExists && verification.claudeMdExists) {
        spinner.succeed(
          chalk.green(
            `Claude Code configured: ${verification.agentsCount} agents, ${verification.commandsCount} commands`
          )
        );
        console.log(chalk.gray('  ✓ .claude/ directory created'));
        console.log(chalk.gray('  ✓ CLAUDE.md context file created'));
      } else {
        spinner.warn(chalk.yellow('Claude Code configuration incomplete'));
      }
    } catch (error) {
      spinner.warn(chalk.yellow('Claude Code configuration skipped'));
      console.log(chalk.gray('  You can add .claude/ manually later\n'));
    }
  }

  // Step 7: Create welcome Issue
  spinner.start('Creating welcome Issue...');

  try {
    const issue = await createWelcomeIssue(repo.owner.login, repo.name, token);
    spinner.succeed(chalk.green(`Welcome Issue created: ${chalk.cyan(issue.html_url)}`));
  } catch (error) {
    spinner.warn(chalk.yellow('Welcome Issue skipped'));
    console.log(chalk.gray('  You can create Issues manually\n'));
  }

  // Step 8: Final verification
  if (projectPath) {
    spinner.start('Verifying project setup...');

    try {
      const verification = verifyProjectSetup(projectPath);

      if (verification.allComplete) {
        spinner.succeed(chalk.green('Project setup verified'));
        console.log(chalk.gray(`  ✓ ${verification.filesCreated} files created`));
        console.log(chalk.gray(`  ✓ ${verification.directoriesCreated} directories created`));
      } else {
        spinner.warn(chalk.yellow('Setup verification incomplete'));
        if (verification.missing.length > 0) {
          console.log(chalk.yellow(`  Missing: ${verification.missing.join(', ')}`));
        }
      }
    } catch (error) {
      spinner.warn(chalk.yellow('Verification skipped'));
    }
  }

  // Step 9: Setup GitHub Secrets and .env
  console.log(chalk.cyan('\n🔐 Setting up API keys...\n'));
  console.log(chalk.white('The AI agents need API keys to function.'));
  console.log(chalk.white('You need to configure:\n'));
  console.log(chalk.gray('  1. ANTHROPIC_API_KEY - Get from https://console.anthropic.com/'));
  console.log(chalk.gray('  2. GITHUB_TOKEN - Auto-configured (already logged in)\n'));

  try {
    // @ts-ignore
    const { default: inquirer } = await import('inquirer');

    const { anthropicKey } = await inquirer.prompt([
      {
        type: 'password',
        name: 'anthropicKey',
        message: 'Enter your Anthropic API Key (sk-ant-...):',
        mask: '*',
        validate: (input: string) => {
          if (!input || !input.startsWith('sk-ant-')) {
            return 'Please enter a valid Anthropic API key (starts with sk-ant-)';
          }
          return true;
        },
      },
    ]);

    // Set GitHub Secrets
    spinner.start('Setting GitHub Secrets...');

    try {
      // Set ANTHROPIC_API_KEY
      await execCommand(`gh secret set ANTHROPIC_API_KEY --body "${anthropicKey}"`, {
        cwd: projectPath || '.',
        stdio: 'pipe',
      });

      // GITHUB_TOKEN is auto-provided by GitHub Actions, but we can set it for local development
      await execCommand(`gh secret set GITHUB_TOKEN --body "${token}"`, {
        cwd: projectPath || '.',
        stdio: 'pipe',
      });

      spinner.succeed(chalk.green('GitHub Secrets configured'));
    } catch (error) {
      spinner.fail(chalk.red('Failed to set GitHub Secrets'));
      console.log(chalk.yellow('\n💡 Set manually:\n'));
      console.log(chalk.gray(`  gh secret set ANTHROPIC_API_KEY`));
      console.log(chalk.gray(`  gh secret set GITHUB_TOKEN\n`));
    }

    // Create .env file
    if (projectPath) {
      spinner.start('Creating .env file...');

      const envContent = `# Anthropic API Key
ANTHROPIC_API_KEY=${anthropicKey}

# GitHub Personal Access Token
GITHUB_TOKEN=${token}
`;

      const envPath = path.join(projectPath, '.env');
      fs.writeFileSync(envPath, envContent, 'utf-8');

      spinner.succeed(chalk.green('.env file created'));
      console.log(chalk.gray(`  ✓ ${envPath}`));
    }

  } catch (error) {
    console.log(chalk.yellow('\n⚠️  API key setup skipped'));
    console.log(chalk.gray('  You can configure later:\n'));
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray('  gh secret set ANTHROPIC_API_KEY'));
    console.log(chalk.gray('  echo "ANTHROPIC_API_KEY=sk-ant-..." > .env\n'));
  }

  // Success!
  console.log(chalk.green.bold('\n✅ Setup complete!\n'));
  console.log(chalk.cyan('Next steps:'));
  console.log(chalk.white(`  cd ${projectName}`));
  console.log(chalk.white('  gh issue create --title "Your task" --body "Description"\n'));
  console.log(chalk.gray('💡 Tip: The AI agents will automatically start working on your Issue.'));
  console.log(chalk.gray('    You\'ll see a PR appear within minutes!\n'));
}

/**
 * Verify project setup completeness
 */
function verifyProjectSetup(projectPath: string): {
  allComplete: boolean;
  filesCreated: number;
  directoriesCreated: number;
  missing: string[];
} {
  const fs = require('fs');
  const path = require('path');

  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    '.gitignore',
    '.env.example',
    '.eslintrc.json',
    'README.md',
    'CLAUDE.md',
    'src/index.ts',
    'tests/example.test.ts',
  ];

  const requiredDirs = ['.claude', 'src', 'tests'];

  const missing: string[] = [];
  let filesCreated = 0;
  let directoriesCreated = 0;

  // Check files
  for (const file of requiredFiles) {
    const filePath = path.join(projectPath, file);
    if (fs.existsSync(filePath)) {
      filesCreated++;
    } else {
      missing.push(file);
    }
  }

  // Check directories
  for (const dir of requiredDirs) {
    const dirPath = path.join(projectPath, dir);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      directoriesCreated++;
    } else {
      missing.push(`${dir}/`);
    }
  }

  return {
    allComplete: missing.length === 0,
    filesCreated,
    directoriesCreated,
    missing,
  };
}
