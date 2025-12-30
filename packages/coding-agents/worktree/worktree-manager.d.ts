/**
 * WorktreeManager - Git Worktree Lifecycle Management
 *
 * Automates worktree creation, monitoring, and cleanup for parallel issue execution.
 * Integrates with CoordinatorAgent and WaterSpiderAgent.
 */
import type { Issue, AgentType, Task, AgentConfig } from '../types/index';
/**
 * Worktree execution context
 * Contains all information needed for Claude Code execution within a worktree
 */
export interface WorktreeExecutionContext {
    task: Task;
    issue: Issue;
    config: Partial<AgentConfig>;
    promptPath?: string;
    metadata?: Record<string, any>;
}
/**
 * Worktree information
 */
export interface WorktreeInfo {
    issueNumber: number;
    path: string;
    branch: string;
    status: 'active' | 'idle' | 'completed' | 'failed' | 'cleanup';
    createdAt: string;
    lastActivityAt: string;
    sessionId: string;
    agentType?: AgentType;
    agentStatus?: 'idle' | 'executing' | 'completed' | 'failed';
    executionContext?: WorktreeExecutionContext;
}
/**
 * WorktreeManager configuration
 */
export interface WorktreeManagerConfig {
    basePath: string;
    repoRoot: string;
    mainBranch?: string;
    branchPrefix?: string;
    autoCleanup?: boolean;
    maxIdleTime?: number;
    enableLogging?: boolean;
}
/**
 * WorktreeManager - Manages Git Worktrees for parallel execution
 */
export declare class WorktreeManager {
    private config;
    private activeWorktrees;
    constructor(config: WorktreeManagerConfig);
    /**
     * Create a new worktree for an issue
     *
     * @param issue - GitHub Issue to create worktree for
     * @param options - Optional configuration including agent assignment
     * @returns WorktreeInfo with all metadata
     */
    createWorktree(issue: Issue, options?: {
        agentType?: AgentType;
        executionContext?: WorktreeExecutionContext;
    }): Promise<WorktreeInfo>;
    /**
     * Remove a worktree
     */
    removeWorktree(issueNumber: number): Promise<void>;
    /**
     * Cleanup all worktrees
     */
    cleanupAll(): Promise<void>;
    /**
     * Discover existing worktrees
     */
    private discoverWorktrees;
    /**
     * Check if a remote branch exists
     */
    private checkRemoteBranch;
    /**
     * Check if worktree has uncommitted changes
     */
    private hasUncommittedChanges;
    /**
     * Commit changes in worktree
     */
    private commitChanges;
    /**
     * Get worktree info by issue number
     */
    getWorktree(issueNumber: number): WorktreeInfo | undefined;
    /**
     * Get all active worktrees
     */
    getAllWorktrees(): WorktreeInfo[];
    /**
     * Update worktree status
     */
    updateWorktreeStatus(issueNumber: number, status: WorktreeInfo['status']): void;
    /**
     * Update agent execution status
     *
     * @param issueNumber - Issue number
     * @param agentStatus - New agent status
     */
    updateAgentStatus(issueNumber: number, agentStatus: WorktreeInfo['agentStatus']): void;
    /**
     * Set execution context for a worktree
     *
     * @param issueNumber - Issue number
     * @param context - Execution context
     */
    setExecutionContext(issueNumber: number, context: WorktreeExecutionContext): void;
    /**
     * Get all worktrees assigned to a specific agent type
     *
     * @param agentType - Agent type to filter by
     * @returns Array of worktrees assigned to this agent
     */
    getWorktreesByAgent(agentType: AgentType): WorktreeInfo[];
    /**
     * Get all worktrees with a specific agent status
     *
     * @param agentStatus - Agent status to filter by
     * @returns Array of worktrees with this agent status
     */
    getWorktreesByAgentStatus(agentStatus: WorktreeInfo['agentStatus']): WorktreeInfo[];
    /**
     * Get worktree statistics including agent information
     */
    getAgentStatistics(): {
        byAgent: Record<string, number>;
        byAgentStatus: Record<string, number>;
        totalWithAgent: number;
        totalWithoutAgent: number;
    };
    /**
     * Check for idle worktrees and cleanup if needed
     */
    cleanupIdleWorktrees(): Promise<void>;
    /**
     * Push worktree branch to remote
     */
    pushWorktree(issueNumber: number): Promise<void>;
    /**
     * Merge worktree back to main branch
     */
    mergeWorktree(issueNumber: number): Promise<void>;
    /**
     * Get worktree statistics
     */
    getStatistics(): {
        total: number;
        active: number;
        idle: number;
        completed: number;
        failed: number;
        cleanup: number;
    };
    /**
     * Write execution context files to worktree
     *
     * Creates:
     * - .agent-context.json: Machine-readable context
     * - EXECUTION_CONTEXT.md: Human-readable context
     *
     * @param issueNumber - Issue number
     */
    writeExecutionContext(issueNumber: number): Promise<void>;
    /**
     * Generate human-readable Markdown context
     */
    private generateContextMarkdown;
    /**
     * Log message
     */
    private log;
}
//# sourceMappingURL=worktree-manager.d.ts.map