/**
 * Ω-Agent Adapter
 *
 * Main adapter for integrating existing Agents with Ω-System.
 * Provides seamless bridge between legacy Agent execution and
 * the new SWML-based Ω-System pipeline.
 *
 * @module omega-system/adapters/omega-agent-adapter
 */
import type { Issue, Task, AgentType, DAG } from '../../types';
import type { OmegaResult } from '../omega-engine';
import { OmegaEngineConfig } from '../omega-engine';
import { ExecutionContext } from './context-to-world';
import { ExecutionReport } from './deliverable-to-report';
/**
 * Agent execution request
 */
export interface AgentExecutionRequest {
    /** Issue to process */
    issue?: Issue;
    /** Tasks to execute (if already decomposed) */
    tasks?: Task[];
    /** Target agent type */
    agentType: AgentType;
    /** Execution context */
    context?: Partial<ExecutionContext>;
    /** Override options */
    options?: {
        /** Skip planning phase */
        skipPlanning?: boolean;
        /** Force sequential execution */
        forceSequential?: boolean;
        /** Enable learning */
        enableLearning?: boolean;
        /** Custom timeout */
        timeoutMs?: number;
    };
}
/**
 * Agent execution response
 */
export interface AgentExecutionResponse {
    /** Success indicator */
    success: boolean;
    /** Execution report */
    report: ExecutionReport;
    /** Raw Ω-System result (for advanced usage) */
    omegaResult?: OmegaResult;
    /** Generated tasks (for CoordinatorAgent) */
    tasks?: Task[];
    /** Generated DAG (for CoordinatorAgent) */
    dag?: DAG;
    /** Execution duration */
    durationMs: number;
}
/**
 * Adapter for integrating existing Agents with Ω-System
 *
 * This adapter provides a bridge between the legacy Agent execution model
 * and the new SWML-based Ω-System. It handles:
 * - Converting Issue to IntentSpace
 * - Creating WorldSpace from execution context
 * - Running the Ω-System pipeline
 * - Converting results back to ExecutionReport
 *
 * @example
 * ```typescript
 * const adapter = new OmegaAgentAdapter();
 *
 * const response = await adapter.execute({
 *   issue: myIssue,
 *   agentType: 'CodeGenAgent',
 *   context: { projectRoot: '/path/to/project' },
 * });
 *
 * console.log(response.report.status); // 'success'
 * ```
 */
export declare class OmegaAgentAdapter {
    private engine;
    constructor(config?: Partial<OmegaEngineConfig>);
    /**
     * Execute an agent request through Ω-System
     */
    execute(request: AgentExecutionRequest): Promise<AgentExecutionResponse>;
    /**
     * Execute multiple requests in parallel
     */
    executeParallel(requests: AgentExecutionRequest[]): Promise<AgentExecutionResponse[]>;
    /**
     * Execute requests in sequence
     */
    executeSequential(requests: AgentExecutionRequest[]): Promise<AgentExecutionResponse[]>;
    /**
     * Build IntentSpace from request
     */
    private buildIntentSpace;
    /**
     * Build WorldSpace from request
     */
    private buildWorldSpace;
    /**
     * Enhance intent with agent-specific capabilities
     */
    private enhanceIntentForAgent;
    /**
     * Build intent from tasks
     */
    private buildIntentFromTasks;
    /**
     * Convert priority number to string
     */
    private numberToPriority;
    /**
     * Extract tasks from Ω-System result
     */
    private extractTasks;
    /**
     * Create empty report when no deliverable
     */
    private createEmptyReport;
    /**
     * Create error response
     */
    private createErrorResponse;
}
/**
 * Create adapter with default configuration
 */
export declare function createOmegaAdapter(config?: Partial<OmegaEngineConfig>): OmegaAgentAdapter;
/**
 * Execute a single agent request (convenience function)
 */
export declare function executeWithOmega(request: AgentExecutionRequest): Promise<AgentExecutionResponse>;
//# sourceMappingURL=omega-agent-adapter.d.ts.map