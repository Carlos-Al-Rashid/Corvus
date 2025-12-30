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
// Transform imports
import { understanding, validatePlan } from './transformations/understanding';
import { generation, validateTaskSet } from './transformations/generation';
import { allocation, validateAllocation } from './transformations/allocation';
import { execution, validateResultSet } from './transformations/execution';
import { integration, validateDeliverable } from './transformations/integration';
import { learning, validateKnowledge } from './transformations/learning';
/**
 * Default engine configuration
 */
const DEFAULT_CONFIG = {
    validateBetweenStages: true,
    stopOnValidationError: false,
    enableLearning: true,
    maxExecutionTimeMs: 600000, // 10 minutes
    retryFailedStages: true,
    maxRetries: 3,
};
// ============================================================================
// Omega Engine Class
// ============================================================================
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
export class OmegaEngine {
    config;
    abortController = null;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    /**
     * Execute the complete Ω pipeline
     *
     * Ω: I × W → R
     */
    async execute(intent, world) {
        const traceId = `trace-${Date.now()}`;
        const startedAt = new Date().toISOString();
        const startTime = Date.now();
        const stages = [];
        const errors = [];
        // Initialize abort controller
        this.abortController = new AbortController();
        // Set timeout
        const timeoutId = setTimeout(() => {
            this.abortController?.abort();
        }, this.config.maxExecutionTimeMs);
        // Intermediate results
        let plan;
        let taskSet;
        let alloc;
        let resultSet;
        let deliverable;
        let knowledge;
        try {
            // ═══════════════════════════════════════════════════════════════════════
            // θ₁: Understanding Transform (I × W → S)
            // ═══════════════════════════════════════════════════════════════════════
            const stage1Start = Date.now();
            try {
                plan = await this.executeWithRetry('θ₁', () => understanding(intent, world));
                if (this.config.validateBetweenStages) {
                    const validation = validatePlan(plan);
                    if (!validation.valid) {
                        errors.push(...validation.errors);
                        if (this.config.stopOnValidationError) {
                            throw new Error(`θ₁ validation failed: ${validation.errors.join(', ')}`);
                        }
                    }
                }
                stages.push(this.createStageState('θ₁', stage1Start, 'success'));
                this.config.onStageComplete?.('θ₁', stages[stages.length - 1]);
            }
            catch (error) {
                const stageState = this.createStageState('θ₁', stage1Start, 'failed', error);
                stages.push(stageState);
                this.config.onStageError?.('θ₁', error);
                throw error;
            }
            // ═══════════════════════════════════════════════════════════════════════
            // θ₂: Generation Transform (S × W → 𝕋)
            // ═══════════════════════════════════════════════════════════════════════
            const stage2Start = Date.now();
            try {
                taskSet = await this.executeWithRetry('θ₂', () => generation(plan, world));
                if (this.config.validateBetweenStages) {
                    const validation = validateTaskSet(taskSet);
                    if (!validation.valid) {
                        errors.push(...validation.errors);
                        if (this.config.stopOnValidationError) {
                            throw new Error(`θ₂ validation failed: ${validation.errors.join(', ')}`);
                        }
                    }
                }
                stages.push(this.createStageState('θ₂', stage2Start, 'success'));
                this.config.onStageComplete?.('θ₂', stages[stages.length - 1]);
            }
            catch (error) {
                const stageState = this.createStageState('θ₂', stage2Start, 'failed', error);
                stages.push(stageState);
                this.config.onStageError?.('θ₂', error);
                throw error;
            }
            // ═══════════════════════════════════════════════════════════════════════
            // θ₃: Allocation Transform (𝕋 × W → A)
            // ═══════════════════════════════════════════════════════════════════════
            const stage3Start = Date.now();
            try {
                alloc = await this.executeWithRetry('θ₃', () => allocation(taskSet, world));
                if (this.config.validateBetweenStages) {
                    const validation = validateAllocation(alloc);
                    if (!validation.valid) {
                        errors.push(...validation.errors);
                        if (this.config.stopOnValidationError) {
                            throw new Error(`θ₃ validation failed: ${validation.errors.join(', ')}`);
                        }
                    }
                }
                stages.push(this.createStageState('θ₃', stage3Start, 'success'));
                this.config.onStageComplete?.('θ₃', stages[stages.length - 1]);
            }
            catch (error) {
                const stageState = this.createStageState('θ₃', stage3Start, 'failed', error);
                stages.push(stageState);
                this.config.onStageError?.('θ₃', error);
                throw error;
            }
            // ═══════════════════════════════════════════════════════════════════════
            // θ₄: Execution Transform (A → R)
            // ═══════════════════════════════════════════════════════════════════════
            const stage4Start = Date.now();
            try {
                resultSet = await this.executeWithRetry('θ₄', () => execution(alloc));
                if (this.config.validateBetweenStages) {
                    const validation = validateResultSet(resultSet);
                    if (!validation.valid) {
                        errors.push(...validation.errors);
                        if (this.config.stopOnValidationError) {
                            throw new Error(`θ₄ validation failed: ${validation.errors.join(', ')}`);
                        }
                    }
                }
                stages.push(this.createStageState('θ₄', stage4Start, 'success'));
                this.config.onStageComplete?.('θ₄', stages[stages.length - 1]);
            }
            catch (error) {
                const stageState = this.createStageState('θ₄', stage4Start, 'failed', error);
                stages.push(stageState);
                this.config.onStageError?.('θ₄', error);
                throw error;
            }
            // ═══════════════════════════════════════════════════════════════════════
            // θ₅: Integration Transform (R → D)
            // ═══════════════════════════════════════════════════════════════════════
            const stage5Start = Date.now();
            try {
                deliverable = await this.executeWithRetry('θ₅', () => integration(resultSet));
                if (this.config.validateBetweenStages) {
                    const validation = validateDeliverable(deliverable);
                    if (!validation.valid) {
                        errors.push(...validation.errors);
                        if (this.config.stopOnValidationError) {
                            throw new Error(`θ₅ validation failed: ${validation.errors.join(', ')}`);
                        }
                    }
                }
                stages.push(this.createStageState('θ₅', stage5Start, 'success'));
                this.config.onStageComplete?.('θ₅', stages[stages.length - 1]);
            }
            catch (error) {
                const stageState = this.createStageState('θ₅', stage5Start, 'failed', error);
                stages.push(stageState);
                this.config.onStageError?.('θ₅', error);
                throw error;
            }
            // ═══════════════════════════════════════════════════════════════════════
            // θ₆: Learning Transform (D × I × W → K) [Optional]
            // ═══════════════════════════════════════════════════════════════════════
            if (this.config.enableLearning) {
                const stage6Start = Date.now();
                try {
                    knowledge = await this.executeWithRetry('θ₆', () => learning(deliverable, intent, world));
                    if (this.config.validateBetweenStages) {
                        const validation = validateKnowledge(knowledge);
                        if (!validation.valid) {
                            errors.push(...validation.errors);
                            // Learning validation errors are non-fatal
                        }
                    }
                    stages.push(this.createStageState('θ₆', stage6Start, 'success'));
                    this.config.onStageComplete?.('θ₆', stages[stages.length - 1]);
                }
                catch (error) {
                    // Learning stage errors are non-fatal
                    const stageState = this.createStageState('θ₆', stage6Start, 'failed', error);
                    stages.push(stageState);
                    this.config.onStageError?.('θ₆', error);
                    errors.push(`Learning stage failed: ${error.message}`);
                }
            }
            else {
                stages.push({
                    stage: 'θ₆',
                    timestamp: new Date().toISOString(),
                    durationMs: 0,
                    status: 'skipped',
                });
            }
            return {
                success: true,
                deliverable,
                knowledge,
                trace: {
                    traceId,
                    startedAt,
                    completedAt: new Date().toISOString(),
                    totalDurationMs: Date.now() - startTime,
                    stages,
                    intermediates: {
                        plan,
                        taskSet,
                        allocation: alloc,
                        resultSet,
                        deliverable,
                        knowledge,
                    },
                },
                errors,
            };
        }
        catch (error) {
            return {
                success: false,
                trace: {
                    traceId,
                    startedAt,
                    completedAt: new Date().toISOString(),
                    totalDurationMs: Date.now() - startTime,
                    stages,
                    intermediates: {
                        plan,
                        taskSet,
                        allocation: alloc,
                        resultSet,
                        deliverable,
                        knowledge,
                    },
                },
                errors: [...errors, error.message],
            };
        }
        finally {
            clearTimeout(timeoutId);
            this.abortController = null;
        }
    }
    /**
     * Execute a stage with retry logic
     */
    async executeWithRetry(_stage, fn) {
        let lastError;
        const maxRetries = this.config.retryFailedStages ? this.config.maxRetries : 1;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            if (this.abortController?.signal.aborted) {
                throw new Error('Execution aborted due to timeout');
            }
            try {
                return await fn();
            }
            catch (error) {
                lastError = error;
                if (attempt < maxRetries - 1) {
                    // Exponential backoff
                    await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100));
                }
            }
        }
        throw lastError;
    }
    /**
     * Create a pipeline state object
     */
    createStageState(stage, startTime, status, error) {
        return {
            stage,
            timestamp: new Date().toISOString(),
            durationMs: Date.now() - startTime,
            status,
            error: error ? error.message : undefined,
        };
    }
    /**
     * Abort a running execution
     */
    abort() {
        this.abortController?.abort();
    }
    /**
     * Check if engine is currently executing
     */
    isExecuting() {
        return this.abortController !== null;
    }
}
// ============================================================================
// Convenience Functions
// ============================================================================
/**
 * Execute Ω pipeline with default configuration
 *
 * @example
 * ```typescript
 * const result = await omega(intent, world);
 * ```
 */
export async function omega(intent, world, config) {
    const engine = new OmegaEngine(config);
    return engine.execute(intent, world);
}
/**
 * Execute Ω pipeline without learning stage
 *
 * @example
 * ```typescript
 * const result = await omegaWithoutLearning(intent, world);
 * ```
 */
export async function omegaWithoutLearning(intent, world) {
    return omega(intent, world, { enableLearning: false });
}
/**
 * Execute Ω pipeline with strict validation
 *
 * @example
 * ```typescript
 * const result = await omegaStrict(intent, world);
 * ```
 */
export async function omegaStrict(intent, world) {
    return omega(intent, world, {
        validateBetweenStages: true,
        stopOnValidationError: true,
    });
}
// ============================================================================
// Re-exports
// ============================================================================
// Functions
export { understanding, validatePlan, generation, validateTaskSet, allocation, validateAllocation, execution, validateResultSet, integration, validateDeliverable, learning, validateKnowledge, };
//# sourceMappingURL=omega-engine.js.map