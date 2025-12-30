/**
 * IssueAgent - GitHub Issue Analysis & Management Agent
 *
 * Responsibilities:
 * - Analyze GitHub Issues automatically
 * - Determine issue type (feature/bug/refactor/docs/test)
 * - Assess Severity (Sev.1-5)
 * - Assess Impact (Critical/High/Medium/Low)
 * - Apply Organizational (組織設計) theory label system (65 labels)
 * - Assign appropriate team members (via CODEOWNERS)
 * - Extract task dependencies
 *
 * Issue #41: Added retry logic with exponential backoff for all GitHub API calls
 */
import { BaseAgent } from '../base-agent';
import { AgentResult, AgentConfig, Task, Issue } from '../types/index';
import { OmegaAgentAdapter } from '../omega-system/adapters';
export declare class IssueAgent extends BaseAgent {
    private octokit;
    private owner;
    private repo;
    private omegaAdapter?;
    constructor(config: AgentConfig);
    /**
     * Initialize repository information
     */
    private initializeRepository;
    /**
     * Main execution: Analyze Issue and apply labels
     */
    execute(task: Task): Promise<AgentResult>;
    /**
     * Fetch Issue from GitHub (with LRU cache + automatic retry)
     */
    private fetchIssue;
    /**
     * Apply labels to Issue (with automatic retry on transient failures)
     */
    private applyLabels;
    /**
     * Assign team members to Issue (with automatic retry on transient failures)
     */
    private assignTeamMembers;
    /**
     * Add analysis comment to Issue (with automatic retry on transient failures)
     */
    private addAnalysisComment;
    /**
     * Analyze Issue and determine classification
     */
    private analyzeIssue;
    /**
     * Determine responsibility assignment
     */
    private determineResponsibility;
    /**
     * Determine appropriate Agent
     */
    private determineAgent;
    /**
     * Build complete label set based on Organizational theory
     */
    private buildLabelSet;
    /**
     * Get emoji for Severity
     */
    private getSeverityEmoji;
    /**
     * Determine assignees from CODEOWNERS or responsibility
     */
    private determineAssignees;
    /**
     * Format analysis comment for GitHub
     */
    private formatAnalysisComment;
    /**
     * Analyze issue using Ω-System pipeline
     */
    analyzeWithOmega(issue: Issue): Promise<AgentResult>;
    /**
     * Check if Ω-System is enabled
     */
    isOmegaEnabled(): boolean;
    /**
     * Get Ω-System adapter
     */
    getOmegaAdapter(): OmegaAgentAdapter | undefined;
}
//# sourceMappingURL=issue-agent.d.ts.map