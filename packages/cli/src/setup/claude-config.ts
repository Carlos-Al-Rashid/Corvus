/**
 * Claude Code configuration setup
 *
 * Deploys .claude/ directory and CLAUDE.md to new project
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Octokit } from '@octokit/rest';
import {
  validateDeployClaudeConfigParams,
  validateDeployToGitHubParams,
  validateProjectPath,
  validateFilePath,
  validateFileSize,
  validateFileContent,
  validateSymlink,
  sanitizeTemplateVariable,
} from './validation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface ClaudeConfigOptions {
  projectPath: string;
  projectName: string;
}

/**
 * Deploy Claude Code configuration to project
 *
 * This includes:
 * - .claude/ directory with agents, commands, MCP servers
 * - CLAUDE.md context file
 */
export async function deployClaudeConfig(options: ClaudeConfigOptions): Promise<void> {
  const { projectPath, projectName } = options;

  // Validate input parameters (security: CWE-22 prevention)
  validateDeployClaudeConfigParams(projectPath, projectName);

  // Source: templates in CLI package
  const templatesDir = path.join(__dirname, '../../templates');
  const claudeTemplateDir = path.join(templatesDir, 'claude-code');
  const claudeMdTemplate = path.join(templatesDir, 'CLAUDE.md.template');

  // Destination: project directory
  const claudeDestDir = path.join(projectPath, '.claude');
  const claudeMdDest = path.join(projectPath, 'CLAUDE.md');

  // 1. Copy .claude directory
  if (fs.existsSync(claudeTemplateDir)) {
    await copyDirectoryRecursive(claudeTemplateDir, claudeDestDir);
  } else {
    throw new Error(`Claude template directory not found: ${claudeTemplateDir}`);
  }

  // 2. Generate CLAUDE.md from template
  if (fs.existsSync(claudeMdTemplate)) {
    // Validate template file
    validateFilePath(claudeMdTemplate, templatesDir);
    validateSymlink(claudeMdTemplate);
    validateFileSize(claudeMdTemplate, 1 * 1024 * 1024); // 1MB max for template

    const templateContent = fs.readFileSync(claudeMdTemplate, 'utf-8');
    validateFileContent(templateContent);

    // Sanitize project name for template injection prevention
    const sanitizedProjectName = sanitizeTemplateVariable(projectName);
    const renderedContent = templateContent.replace(/{{PROJECT_NAME}}/g, sanitizedProjectName);

    // Atomic write
    const tempPath = `${claudeMdDest}.tmp`;
    fs.writeFileSync(tempPath, renderedContent, { encoding: 'utf-8', mode: 0o644 });
    fs.renameSync(tempPath, claudeMdDest);
  } else {
    throw new Error(`CLAUDE.md template not found: ${claudeMdTemplate}`);
  }
}

/**
 * Recursively copy directory with atomic operations
 */
async function copyDirectoryRecursive(src: string, dest: string): Promise<void> {
  // Validate paths (security: prevent path traversal)
  validateFilePath(src);
  validateFilePath(dest);

  // Create destination directory
  try {
    fs.mkdirSync(dest, { recursive: true });
  } catch (error: any) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectory
      await copyDirectoryRecursive(srcPath, destPath);
    } else {
      // Validate source file before copying
      validateSymlink(srcPath);
      validateFileSize(srcPath, 10 * 1024 * 1024); // 10MB max per file

      // Copy file atomically
      try {
        const tempPath = `${destPath}.tmp`;
        fs.copyFileSync(srcPath, tempPath);
        fs.renameSync(tempPath, destPath);
      } catch (error: any) {
        // Skip if file exists
        if (error.code !== 'EEXIST') {
          throw error;
        }
      }
    }
  }
}

/**
 * Check if Claude Code is available
 */
export function isClaudeCodeAvailable(): boolean {
  // Check if running in Claude Code environment
  // Claude Code sets specific environment variables
  return process.env.CLAUDE_CODE === 'true' || process.env.ANTHROPIC_CLI === 'true';
}

/**
 * Deploy Claude Code configuration directly to GitHub repository
 *
 * This commits .claude/ and CLAUDE.md directly to the repository
 * before local cloning, ensuring they are always present
 */
export async function deployClaudeConfigToGitHub(
  owner: string,
  repo: string,
  projectName: string,
  token: string
): Promise<void> {
  // Validate input parameters (security: prevent injection attacks)
  validateDeployToGitHubParams(owner, repo, projectName, token);

  const octokit = new Octokit({ auth: token });

  // Source: templates in CLI package
  const templatesDir = path.join(__dirname, '../../templates');
  const claudeTemplateDir = path.join(templatesDir, 'claude-code');
  const claudeMdTemplate = path.join(templatesDir, 'CLAUDE.md.template');

  // Read and collect all files to commit
  const filesToCommit: { path: string; content: string }[] = [];

  // 1. Collect all .claude/ directory files
  if (fs.existsSync(claudeTemplateDir)) {
    const claudeFiles = await collectDirectoryFiles(claudeTemplateDir, '.claude');
    filesToCommit.push(...claudeFiles);
    console.log(`[Claude Config] Collected ${claudeFiles.length} files from .claude/`);

    if (claudeFiles.length === 0) {
      throw new Error(`No files found in .claude/ template directory: ${claudeTemplateDir}`);
    }

    // Log first few file paths for debugging
    claudeFiles.slice(0, 5).forEach(f => console.log(`  - ${f.path}`));
    if (claudeFiles.length > 5) {
      console.log(`  ... and ${claudeFiles.length - 5} more files`);
    }
  } else {
    throw new Error(`Claude template directory not found: ${claudeTemplateDir}`);
  }

  // 2. Generate CLAUDE.md from template
  if (fs.existsSync(claudeMdTemplate)) {
    // Validate template file
    validateFilePath(claudeMdTemplate, templatesDir);
    validateSymlink(claudeMdTemplate);
    validateFileSize(claudeMdTemplate, 1 * 1024 * 1024); // 1MB max for template

    const templateContent = fs.readFileSync(claudeMdTemplate, 'utf-8');
    validateFileContent(templateContent);

    // Sanitize project name for template injection prevention
    const sanitizedProjectName = sanitizeTemplateVariable(projectName);
    const renderedContent = templateContent.replace(/{{PROJECT_NAME}}/g, sanitizedProjectName);
    filesToCommit.push({
      path: 'CLAUDE.md',
      content: renderedContent,
    });
    console.log(`[Claude Config] Added CLAUDE.md`);
  } else {
    throw new Error(`CLAUDE.md template not found: ${claudeMdTemplate}`);
  }

  // 2.5. Add package.json
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

  filesToCommit.push({
    path: 'package.json',
    content: JSON.stringify(packageJson, null, 2) + '\n',
  });
  console.log(`[Claude Config] Added package.json`);

  // 2.6. Add tsconfig.json
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

  filesToCommit.push({
    path: 'tsconfig.json',
    content: JSON.stringify(tsconfig, null, 2) + '\n',
  });
  console.log(`[Claude Config] Added tsconfig.json`);

  // 2.7. Add src/index.ts
  const indexTs = `/**
 * ${projectName}
 *
 * Autonomous development powered by Agentic OS
 */

export function main() {
  console.log('🌸 ${projectName}');
  console.log('Autonomous development powered by Agentic OS\\n');
}

// Run if executed directly
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  main();
}
`;

  filesToCommit.push({
    path: 'src/index.ts',
    content: indexTs,
  });
  console.log(`[Claude Config] Added src/index.ts`);

  // 2.8. Add tests/example.test.ts
  const testTs = `import { describe, it, expect } from 'vitest';
import { main } from '../src/index';

describe('${projectName}', () => {
  it('should run main function', () => {
    expect(() => main()).not.toThrow();
  });

  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });
});
`;

  filesToCommit.push({
    path: 'tests/example.test.ts',
    content: testTs,
  });
  console.log(`[Claude Config] Added tests/example.test.ts`);

  // 2.9. Add package-lock.json (minimal version)
  const packageLock = {
    name: projectName,
    version: '0.1.0',
    lockfileVersion: 3,
    requires: true,
    packages: {
      '': {
        name: projectName,
        version: '0.1.0',
        devDependencies: {
          '@types/node': '^20.10.0',
          typescript: '^5.8.3',
          tsx: '^4.7.0',
          vitest: '^3.2.4',
        },
      },
    },
  };

  filesToCommit.push({
    path: 'package-lock.json',
    content: JSON.stringify(packageLock, null, 2) + '\n',
  });
  console.log(`[Claude Config] Added package-lock.json`);

  // 3. Commit all files to GitHub using Contents API with retry mechanism
  // Retry up to 3 times in case of concurrent updates
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Get the default branch's latest commit SHA
      const { data: refData } = await octokit.git.getRef({
        owner,
        repo,
        ref: 'heads/main',
      });

      const baseCommitSha = refData.object.sha;

      // Get the base tree
      const { data: baseCommit } = await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: baseCommitSha,
      });

      const baseTreeSha = baseCommit.tree.sha;

      // Create blobs for all files
      const blobs = await Promise.all(
        filesToCommit.map(async (file) => {
          const { data: blob } = await octokit.git.createBlob({
            owner,
            repo,
            content: Buffer.from(file.content, 'utf-8').toString('base64'),
            encoding: 'base64',
          });
          return {
            path: file.path,
            mode: '100644' as const,
            type: 'blob' as const,
            sha: blob.sha,
          };
        })
      );

      // Create new tree
      const { data: newTree } = await octokit.git.createTree({
        owner,
        repo,
        base_tree: baseTreeSha,
        tree: blobs,
      });

      // Create commit
      const { data: newCommit } = await octokit.git.createCommit({
        owner,
        repo,
        message: 'chore: Initialize Claude Code configuration\n\n- Add .claude/ directory with agents and commands\n- Add CLAUDE.md context file for AI assistance\n\n🌸 Generated by Miyabi',
        tree: newTree.sha,
        parents: [baseCommitSha],
      });

      // Update ref to point to new commit
      await octokit.git.updateRef({
        owner,
        repo,
        ref: 'heads/main',
        sha: newCommit.sha,
      });

      console.log(`[Claude Config] Successfully committed ${filesToCommit.length} files to GitHub`);
      console.log(`[Claude Config] Commit SHA: ${newCommit.sha}`);

      // Success - exit retry loop
      return;
    } catch (error: any) {
      lastError = error;

      // Check if it's a "not fast forward" error
      if (error.message && error.message.includes('fast forward')) {
        console.log(`[Claude Config] Retry attempt ${attempt}/${maxRetries} due to concurrent update...`);

        // Wait a bit before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));

        // Continue to next retry
        continue;
      }

      // If it's a different error, throw immediately
      throw error;
    }
  }

  // If we exhausted all retries, throw the last error
  throw lastError;
}

/**
 * Recursively collect all files in a directory for GitHub commit
 */
async function collectDirectoryFiles(
  srcDir: string,
  basePrefix: string
): Promise<{ path: string; content: string }[]> {
  const files: { path: string; content: string }[] = [];

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    // Use POSIX path separator (/) for GitHub
    const relativePath = path.posix.join(basePrefix, entry.name);

    if (entry.isDirectory()) {
      // Recursively collect subdirectory files
      const subFiles = await collectDirectoryFiles(srcPath, relativePath);
      files.push(...subFiles);
    } else {
      // Validate file before reading
      validateSymlink(srcPath);
      validateFileSize(srcPath, 10 * 1024 * 1024); // 10MB max per file

      // Read file content
      const content = fs.readFileSync(srcPath, 'utf-8');
      validateFileContent(content);

      files.push({
        path: relativePath,
        content,
      });
    }
  }

  return files;
}

/**
 * Verify Claude Code configuration
 */
export async function verifyClaudeConfig(projectPath: string): Promise<{
  claudeDirExists: boolean;
  claudeMdExists: boolean;
  agentsCount: number;
  commandsCount: number;
}> {
  // Validate project path
  validateProjectPath(projectPath);

  const claudeDir = path.join(projectPath, '.claude');
  const claudeMd = path.join(projectPath, 'CLAUDE.md');

  const claudeDirExists = fs.existsSync(claudeDir);
  const claudeMdExists = fs.existsSync(claudeMd);

  let agentsCount = 0;
  let commandsCount = 0;

  if (claudeDirExists) {
    const agentsDir = path.join(claudeDir, 'agents');
    const commandsDir = path.join(claudeDir, 'commands');

    if (fs.existsSync(agentsDir)) {
      agentsCount = fs.readdirSync(agentsDir).filter(f => f.endsWith('.md')).length;
    }

    if (fs.existsSync(commandsDir)) {
      commandsCount = fs.readdirSync(commandsDir).filter(f => f.endsWith('.md')).length;
    }
  }

  return {
    claudeDirExists,
    claudeMdExists,
    agentsCount,
    commandsCount,
  };
}
