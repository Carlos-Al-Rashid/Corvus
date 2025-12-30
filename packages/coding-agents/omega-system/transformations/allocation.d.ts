/**
 * θ₃: Allocation Transform
 *
 * Mathematical Definition: θ₃: 𝕋 × W → A
 *
 * Transforms Task Set and World Space into Agent Allocation.
 * Optimizes task-to-agent assignment for parallel execution.
 *
 * @module omega-system/transformations/allocation
 */
import type { WorldSpace } from '../../types/world';
import type { AgentType } from '../../types';
import type { TaskSet } from './generation';
/**
 * Agent capability profile
 */
export interface AgentCapability {
    agentType: AgentType;
    supportedTaskTypes: string[];
    maxConcurrency: number;
    averageTokensPerMinute: number;
    qualityScore: number;
    specializations: string[];
}
/**
 * Worker assignment
 */
export interface WorkerAssignment {
    workerId: string;
    agentType: AgentType;
    assignedTasks: string[];
    worktreePath?: string;
    estimatedDurationMs: number;
    estimatedTokens: number;
    priority: number;
}
/**
 * Execution batch for parallel processing
 */
export interface ExecutionBatch {
    batchId: string;
    level: number;
    workers: WorkerAssignment[];
    canExecuteInParallel: boolean;
    estimatedDurationMs: number;
    dependsOn: string[];
}
/**
 * Agent Allocation - Output of θ₃
 *
 * A = θ₃(𝕋, W)
 */
export interface AgentAllocation {
    allocationId: string;
    createdAt: string;
    /** Source task set */
    sourceTaskSetId: string;
    /** All worker assignments */
    workers: WorkerAssignment[];
    /** Execution batches */
    batches: ExecutionBatch[];
    /** Agent utilization */
    utilization: {
        byAgent: Record<AgentType, {
            taskCount: number;
            estimatedTokens: number;
            estimatedDurationMs: number;
            utilizationPercent: number;
        }>;
        totalWorkers: number;
        activeWorkers: number;
    };
    /** Resource allocation */
    resources: {
        totalEstimatedTokens: number;
        totalEstimatedDurationMs: number;
        maxConcurrency: number;
        worktreesRequired: number;
    };
    /** Optimization metrics */
    optimization: {
        parallelizationFactor: number;
        loadBalanceScore: number;
        estimatedEfficiencyGain: number;
    };
    /** Metadata */
    metadata: {
        allocationVersion: string;
        allocationTimeMs: number;
        strategy: 'greedy' | 'balanced' | 'priority-first';
    };
}
/**
 * θ₃: Allocation Transform
 *
 * Transforms Task Set (𝕋) and World Space (W) into Agent Allocation (A)
 *
 * @param taskSet - The task set from θ₂
 * @param world - The world space context
 * @returns Agent allocation for execution
 *
 * @example
 * ```typescript
 * const allocation = await allocation(taskSet, world);
 * console.log(allocation.optimization.parallelizationFactor); // 0.75
 * ```
 */
export declare function allocation(taskSet: TaskSet, world: WorldSpace): Promise<AgentAllocation>;
/**
 * Validate an allocation
 */
export declare function validateAllocation(alloc: AgentAllocation): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=allocation.d.ts.map