/**
 * CoordinatorAgent - The Orchestrator of Autonomous Operations
 *
 * Responsibilities:
 * - Task decomposition (Issue → Tasks)
 * - DAG construction (dependency graph)
 * - Topological sorting
 * - Agent assignment
 * - Parallel execution control
 * - Progress monitoring
 *
 * This is the MOST IMPORTANT agent in the hierarchy.
 */
import { BaseAgent } from '../base-agent';
import { AgentResult, AgentConfig, Task, Issue, TaskDecomposition } from '../types/index';
import { OmegaAgentAdapter } from '../omega-system/adapters';
export declare class CoordinatorAgent extends BaseAgent {
    private worktreeManager?;
    private githubClient?;
    private omegaAdapter?;
    constructor(config: AgentConfig);
    /**
     * Main execution: Coordinate full task lifecycle
     */
    execute(task: Task): Promise<AgentResult>;
    /**
     * Decompose GitHub Issue into executable Tasks
     */
    decomposeIssue(issue: Issue): Promise<TaskDecomposition>;
    /**
     * Extract tasks from Issue body
     * Supports formats:
     * - [ ] Task description
     * - 1. Task description
     * - ## Task Title
     */
    private extractTasks;
    /**
     * Create Task from Issue information
     */
    private createTask;
    /**
     * Assign Agent based on task type
     */
    private assignAgent;
    /**
     * Create execution plan
     */
    private createExecutionPlan;
    /**
     * Execute with Ω-System pipeline
     *
     * Uses the SWML-based Ω-System for enhanced execution with:
     * - Mathematical foundation (Ω: I × W → R)
     * - 6-stage transformation pipeline
     * - Automated learning from execution
     *
     * @param issue - The GitHub Issue to process
     * @returns AgentResult with Ω-System execution data
     */
    executeWithOmega(issue: Issue): Promise<AgentResult>;
    /**
     * Check if Ω-System is enabled
     */
    isOmegaEnabled(): boolean;
    /**
     * Get Ω-System adapter (for advanced usage)
     */
    getOmegaAdapter(): OmegaAgentAdapter | undefined;
    /**
     * Execute tasks in parallel (respecting DAG levels)
     */
    private executeParallel;
    /**
     * Execute all tasks in a level in parallel (OPTIMIZED: Real agent execution)
     *
     * Performance: Now calls actual specialist agents instead of simulation
     */
    private executeLevelParallel;
    /**
     * Execute tasks using Task Tool parallel executor (NEW)
     *
     * Uses Claude Code Task tool for true parallel execution across
     * multiple isolated Git worktrees.
     *
     * Benefits:
     * - True parallel execution (not limited by single process)
     * - Isolated worktrees prevent conflicts
     * - Leverages Claude Code's Task tool
     * - Better scalability for large task sets
     */
    private executeWithTaskTool;
    /**
     * Create a specialist agent instance based on agent type
     */
    private createSpecialistAgent;
    /**
     * Log execution progress
     */
    private logProgress;
    /**
     * Save execution report to file
     */
    private saveExecutionReport;
    /**
     * Generate Plans.md file (Feler's 7-hour session pattern from OpenAI Dev Day)
     *
     * Creates a living document that maintains trajectory during long sessions.
     * Placed in worktree root or reports directory.
     */
    private generatePlansFile;
    /**
     * Update Plans.md with execution report
     */
    private updatePlansWithReport;
    /**
     * Fetch Issue from GitHub (or local metadata)
     */
    private fetchIssue;
    /**
     * Fetch Issue by issue number for worktree creation
     */
    private fetchIssueForWorktree;
    /**
     * Get agent-specific prompt path for Claude Code execution
     *
     * Maps agent types to their corresponding prompt files in .claude/agents/prompts/
     */
    private getAgentPromptPath;
}
//# sourceMappingURL=coordinator-agent.d.ts.map