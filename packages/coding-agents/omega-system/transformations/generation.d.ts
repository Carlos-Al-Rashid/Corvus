/**
 * θ₂: Generation Transform
 *
 * Mathematical Definition: θ₂: S × W → 𝕋
 *
 * Transforms Strategic Plan and World Space into a Task Set.
 * Generates concrete tasks from strategic objectives and builds the DAG.
 *
 * @module omega-system/transformations/generation
 */
import type { WorldSpace } from '../../types/world';
import type { Task, DAG } from '../../types';
import type { StrategicPlan } from './understanding';
/**
 * Extended task with generation metadata
 */
export interface GeneratedTask extends Task {
    /** Source objective ID */
    sourceObjectiveId: string;
    /** Estimated token cost */
    estimatedTokens: number;
    /** Required tools */
    requiredTools: string[];
    /** Input artifacts needed */
    inputArtifacts: string[];
    /** Output artifacts produced */
    outputArtifacts: string[];
    /** Subtasks (for decomposition) */
    subtasks?: GeneratedTask[];
}
/**
 * Task Set - Output of θ₂
 *
 * 𝕋 = θ₂(S, W)
 */
export interface TaskSet {
    setId: string;
    createdAt: string;
    /** Source plan */
    sourcePlanId: string;
    /** All generated tasks */
    tasks: GeneratedTask[];
    /** Task dependency graph */
    dag: DAG;
    /** Task groupings */
    groups: TaskGroup[];
    /** Summary statistics */
    summary: {
        totalTasks: number;
        byType: Record<string, number>;
        byPriority: Record<number, number>;
        estimatedTotalDurationMs: number;
        estimatedTotalTokens: number;
        parallelizableTasks: number;
    };
    /** Metadata */
    metadata: {
        generationVersion: string;
        generationTimeMs: number;
    };
}
/**
 * Task grouping for parallel execution
 */
export interface TaskGroup {
    groupId: string;
    name: string;
    tasks: string[];
    canParallelize: boolean;
    estimatedDurationMs: number;
    dependsOn: string[];
}
/**
 * θ₂: Generation Transform
 *
 * Transforms Strategic Plan (S) and World Space (W) into Task Set (𝕋)
 *
 * @param plan - The strategic plan from θ₁
 * @param world - The world space context
 * @returns Task set for allocation
 *
 * @example
 * ```typescript
 * const taskSet = await generation(plan, world);
 * console.log(taskSet.summary.totalTasks); // 15
 * ```
 */
export declare function generation(plan: StrategicPlan, world: WorldSpace): Promise<TaskSet>;
/**
 * Validate a task set
 */
export declare function validateTaskSet(taskSet: TaskSet): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=generation.d.ts.map