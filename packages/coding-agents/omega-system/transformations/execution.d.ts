/**
 * θ₄: Execution Transform
 *
 * Mathematical Definition: θ₄: A → R
 *
 * Transforms Agent Allocation into Result Set.
 * Executes tasks in parallel using worktrees and collects results.
 *
 * @module omega-system/transformations/execution
 */
import type { AgentType, AgentResult, AgentStatus } from '../../types';
import type { AgentAllocation } from './allocation';
/**
 * Task execution result
 */
export interface TaskExecutionResult {
    taskId: string;
    workerId: string;
    agentType: AgentType;
    status: AgentStatus;
    startedAt: string;
    completedAt: string;
    durationMs: number;
    tokensUsed: number;
    result: AgentResult;
    artifacts: ExecutionArtifact[];
    logs: ExecutionLog[];
}
/**
 * Execution artifact
 */
export interface ExecutionArtifact {
    artifactId: string;
    type: 'code' | 'test' | 'documentation' | 'config' | 'report';
    path: string;
    content?: string;
    hash?: string;
    sizeBytes: number;
    createdAt: string;
}
/**
 * Execution log entry
 */
export interface ExecutionLog {
    timestamp: string;
    level: 'debug' | 'info' | 'warn' | 'error';
    message: string;
    context?: Record<string, unknown>;
}
/**
 * Worker execution result
 */
export interface WorkerExecutionResult {
    workerId: string;
    agentType: AgentType;
    worktreePath?: string;
    status: 'success' | 'partial' | 'failed';
    taskResults: TaskExecutionResult[];
    totalDurationMs: number;
    totalTokensUsed: number;
    errors: string[];
}
/**
 * Batch execution result
 */
export interface BatchExecutionResult {
    batchId: string;
    level: number;
    status: 'success' | 'partial' | 'failed';
    workerResults: WorkerExecutionResult[];
    startedAt: string;
    completedAt: string;
    durationMs: number;
}
/**
 * Result Set - Output of θ₄
 *
 * R = θ₄(A)
 */
export interface ResultSet {
    resultSetId: string;
    createdAt: string;
    /** Source allocation */
    sourceAllocationId: string;
    /** All task results */
    taskResults: TaskExecutionResult[];
    /** Worker results */
    workerResults: WorkerExecutionResult[];
    /** Batch results */
    batchResults: BatchExecutionResult[];
    /** All artifacts produced */
    artifacts: ExecutionArtifact[];
    /** Execution summary */
    summary: {
        totalTasks: number;
        completedTasks: number;
        failedTasks: number;
        successRate: number;
        totalDurationMs: number;
        totalTokensUsed: number;
    };
    /** Performance metrics */
    performance: {
        parallelismAchieved: number;
        averageTaskDurationMs: number;
        throughputTasksPerMinute: number;
        resourceEfficiency: number;
    };
    /** Errors encountered */
    errors: Array<{
        taskId?: string;
        workerId?: string;
        error: string;
        timestamp: string;
        recoverable: boolean;
    }>;
    /** Metadata */
    metadata: {
        executionVersion: string;
        executionTimeMs: number;
        worktreesUsed: number;
    };
}
/**
 * θ₄: Execution Transform
 *
 * Transforms Agent Allocation (A) into Result Set (R)
 *
 * @param allocation - The agent allocation from θ₃
 * @returns Result set from execution
 *
 * @example
 * ```typescript
 * const results = await execution(allocation);
 * console.log(results.summary.successRate); // 0.95
 * ```
 */
export declare function execution(allocation: AgentAllocation): Promise<ResultSet>;
/**
 * Validate a result set
 */
export declare function validateResultSet(results: ResultSet): {
    valid: boolean;
    errors: string[];
};
/**
 * Retry failed tasks
 */
export declare function retryFailedTasks(results: ResultSet, allocation: AgentAllocation): Promise<TaskExecutionResult[]>;
//# sourceMappingURL=execution.d.ts.map