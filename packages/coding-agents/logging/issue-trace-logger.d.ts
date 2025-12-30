/**
 * Issue Trace Logger
 *
 * Complete lifecycle tracking for GitHub Issues.
 * Tracks state transitions, agent executions, label changes, quality reports,
 * PRs, deployments, escalations, and manual annotations.
 *
 * Usage:
 *   const logger = new IssueTraceLogger(issueNumber, issueTitle, issueUrl, deviceIdentifier);
 *   logger.startTrace();
 *   logger.recordStateTransition('pending', 'analyzing', 'CoordinatorAgent');
 *   logger.startAgentExecution('CoordinatorAgent', 'task-123');
 *   logger.endAgentExecution('CoordinatorAgent', 'success');
 *   logger.saveTrace();
 */
import type { IssueTraceLog, IssueState, QualityReport, PRResult, DeploymentResult, EscalationInfo, AgentType, AgentStatus, AgentResult } from '../types/index';
/**
 * IssueTraceLogger - Complete Issue lifecycle tracker
 */
export declare class IssueTraceLogger {
    private trace;
    private traceDir;
    private traceFilePath;
    private activeAgentExecutions;
    private sessionId;
    constructor(issueNumber: number, issueTitle: string, issueUrl: string, deviceIdentifier: string, sessionId?: string);
    /**
     * Start tracking the Issue
     */
    startTrace(): void;
    /**
     * End tracking - mark Issue as completed
     */
    endTrace(finalState?: IssueState, reason?: string): void;
    /**
     * Get current trace
     */
    getTrace(): IssueTraceLog;
    /**
     * Record state transition
     */
    recordStateTransition(from: IssueState, to: IssueState, triggeredBy: string, reason?: string): void;
    /**
     * Start agent execution
     */
    startAgentExecution(agentType: AgentType, taskId?: string): void;
    /**
     * End agent execution
     */
    endAgentExecution(agentType: AgentType, status: AgentStatus, result?: AgentResult, error?: string): void;
    /**
     * Update task statistics
     */
    updateTaskStats(total: number, completed: number, failed: number): void;
    /**
     * Increment completed tasks
     */
    incrementCompletedTasks(): void;
    /**
     * Increment failed tasks
     */
    incrementFailedTasks(): void;
    /**
     * Record label change
     */
    recordLabelChange(action: 'added' | 'removed', label: string, performedBy: string): void;
    /**
     * Record quality report
     */
    recordQualityReport(report: QualityReport): void;
    /**
     * Record pull request
     */
    recordPullRequest(pr: PRResult): void;
    /**
     * Record deployment
     */
    recordDeployment(deployment: DeploymentResult): void;
    /**
     * Record escalation
     */
    recordEscalation(escalation: EscalationInfo): void;
    /**
     * Record agent message for inter-agent communication tracking
     */
    recordAgentMessage(message: {
        from: AgentType;
        to: AgentType;
        type: string;
        id: string;
    }): void;
    /**
     * Add note
     */
    addNote(author: string, content: string, tags?: string[]): void;
    /**
     * Save trace to disk
     */
    saveTrace(): void;
    /**
     * Load trace from disk
     */
    private loadTrace;
    /**
     * Create new trace
     */
    private createNewTrace;
    /**
     * Generate session ID
     */
    private generateSessionId;
    /**
     * Calculate total duration
     */
    private calculateTotalDuration;
    /**
     * Load existing trace log
     */
    static load(issueNumber: number): IssueTraceLogger | null;
    /**
     * Get all trace logs
     */
    static getAllTraces(): IssueTraceLog[];
    /**
     * Delete trace log
     */
    static deleteTrace(issueNumber: number): boolean;
}
//# sourceMappingURL=issue-trace-logger.d.ts.map