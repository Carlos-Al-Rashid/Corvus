/**
 * Ω-System Execution Engine
 *
 * Mathematical Definition: Ω: I × W → R
 *
 * The complete execution pipeline composed of 6 transforms:
 * E = θ₆ ∘ θ₅ ∘ θ₄ ∘ θ₃ ∘ θ₂ ∘ θ₁
 *
 * @module omega-system/omega-engine
 */
import type { IntentSpace } from '../types/intent';
import type { WorldSpace } from '../types/world';
import { understanding, StrategicPlan, validatePlan } from './transformations/understanding';
import { generation, TaskSet, validateTaskSet } from './transformations/generation';
import { allocation, AgentAllocation, validateAllocation } from './transformations/allocation';
import { execution, ResultSet, validateResultSet } from './transformations/execution';
import { integration, Deliverable, validateDeliverable } from './transformations/integration';
import { learning, Knowledge, validateKnowledge } from './transformations/learning';
/**
 * Pipeline stage identifier
 */
export type PipelineStage = 'θ₁' | 'θ₂' | 'θ₃' | 'θ₄' | 'θ₅' | 'θ₆';
/**
 * Pipeline state at any point
 */
export interface PipelineState {
    stage: PipelineStage;
    timestamp: string;
    durationMs: number;
    status: 'success' | 'failed' | 'skipped';
    error?: string;
}
/**
 * Full execution trace
 */
export interface ExecutionTrace {
    traceId: string;
    startedAt: string;
    completedAt: string;
    totalDurationMs: number;
    stages: PipelineState[];
    intermediates: {
        plan?: StrategicPlan;
        taskSet?: TaskSet;
        allocation?: AgentAllocation;
        resultSet?: ResultSet;
        deliverable?: Deliverable;
        knowledge?: Knowledge;
    };
}
/**
 * Engine configuration
 */
export interface OmegaEngineConfig {
    /** Enable validation between stages */
    validateBetweenStages: boolean;
    /** Stop on first validation error */
    stopOnValidationError: boolean;
    /** Enable learning stage */
    enableLearning: boolean;
    /** Maximum execution time in ms */
    maxExecutionTimeMs: number;
    /** Retry failed stages */
    retryFailedStages: boolean;
    /** Maximum retries per stage */
    maxRetries: number;
    /** Callback for stage completion */
    onStageComplete?: (stage: PipelineStage, state: PipelineState) => void;
    /** Callback for stage error */
    onStageError?: (stage: PipelineStage, error: Error) => void;
}
/**
 * Omega execution result
 */
export interface OmegaResult {
    success: boolean;
    deliverable?: Deliverable;
    knowledge?: Knowledge;
    trace: ExecutionTrace;
    errors: string[];
}
/**
 * Ω-System Execution Engine
 *
 * Orchestrates the 6-stage transformation pipeline:
 * θ₁ → θ₂ → θ₃ → θ₄ → θ₅ → θ₆
 *
 * @example
 * ```typescript
 * const engine = new OmegaEngine();
 * const result = await engine.execute(intent, world);
 * console.log(result.deliverable?.summary.status);
 * ```
 */
export declare class OmegaEngine {
    private config;
    private abortController;
    constructor(config?: Partial<OmegaEngineConfig>);
    /**
     * Execute the complete Ω pipeline
     *
     * Ω: I × W → R
     */
    execute(intent: IntentSpace, world: WorldSpace): Promise<OmegaResult>;
    /**
     * Execute a stage with retry logic
     */
    private executeWithRetry;
    /**
     * Create a pipeline state object
     */
    private createStageState;
    /**
     * Abort a running execution
     */
    abort(): void;
    /**
     * Check if engine is currently executing
     */
    isExecuting(): boolean;
}
/**
 * Execute Ω pipeline with default configuration
 *
 * @example
 * ```typescript
 * const result = await omega(intent, world);
 * ```
 */
export declare function omega(intent: IntentSpace, world: WorldSpace, config?: Partial<OmegaEngineConfig>): Promise<OmegaResult>;
/**
 * Execute Ω pipeline without learning stage
 *
 * @example
 * ```typescript
 * const result = await omegaWithoutLearning(intent, world);
 * ```
 */
export declare function omegaWithoutLearning(intent: IntentSpace, world: WorldSpace): Promise<OmegaResult>;
/**
 * Execute Ω pipeline with strict validation
 *
 * @example
 * ```typescript
 * const result = await omegaStrict(intent, world);
 * ```
 */
export declare function omegaStrict(intent: IntentSpace, world: WorldSpace): Promise<OmegaResult>;
export { understanding, validatePlan, generation, validateTaskSet, allocation, validateAllocation, execution, validateResultSet, integration, validateDeliverable, learning, validateKnowledge, };
export type { StrategicPlan } from './transformations/understanding';
export type { TaskSet } from './transformations/generation';
export type { AgentAllocation } from './transformations/allocation';
export type { ResultSet } from './transformations/execution';
export type { Deliverable } from './transformations/integration';
export type { Knowledge } from './transformations/learning';
//# sourceMappingURL=omega-engine.d.ts.map