/**
 * AgentRegistry - Assigns agents to tasks with intelligent analysis
 *
 * Manages agent assignment and creation based on task requirements
 * Uses AI-based analysis to determine optimal agent configuration
 */
import { DynamicAgent } from './dynamic-agent';
import { AgentFactory } from './agent-factory';
import { AgentConfig } from './types/index';
import { AgentAssignmentCriteria, AgentAssignmentResult, AgentInstance } from './types/agent-template';
import { AgentAnalysisResult } from './types/agent-analysis';
import { HookManager } from './hooks/hook-manager';
export declare class AgentRegistry {
    private static instance;
    private factory;
    private analyzer;
    private toolFactory;
    private assignments;
    private analysisCache;
    private config;
    private defaultHookManager?;
    private constructor();
    /**
     * Get or create singleton instance
     */
    static getInstance(config?: AgentConfig): AgentRegistry;
    /**
     * Set default hook manager (applied to all new agents)
     */
    setDefaultHookManager(hookManager: HookManager): void;
    /**
     * Assign agent to task with intelligent analysis
     *
     * 1. Analyze task requirements from higher-level concepts
     * 2. Create dynamic tools/hooks if needed
     * 3. Try to find existing idle agent that can handle the task
     * 4. If not found, create new agent with optimal configuration
     * 5. Return assignment result
     */
    assignAgent(criteria: AgentAssignmentCriteria): Promise<AgentAssignmentResult>;
    /**
     * Find idle agent matching criteria
     */
    private findIdleAgent;
    /**
     * Get number of running tasks for agent
     */
    private getAgentRunningTaskCount;
    /**
     * Get agent assigned to task
     */
    getAgentForTask(taskId: string): DynamicAgent | undefined;
    /**
     * Unassign agent from task
     */
    unassignAgent(taskId: string): boolean;
    /**
     * Get all current assignments
     */
    getAllAssignments(): Map<string, AgentInstance>;
    /**
     * Get task analysis result
     */
    getTaskAnalysis(taskId: string): AgentAnalysisResult | undefined;
    /**
     * Get assignment statistics
     */
    getStatistics(): {
        totalAssignments: number;
        activeAgents: number;
        idleAgents: number;
        totalAgents: number;
        cachedAnalyses: number;
        toolsCreated: number;
        cacheHitRate: number;
        cacheHits: number;
        cacheMisses: number;
    };
    /**
     * Cleanup completed assignments
     */
    cleanupCompletedAssignments(): number;
    /**
     * Destroy idle agents (cleanup)
     */
    destroyIdleAgents(): Promise<number>;
    /**
     * Export registry state
     */
    exportState(): {
        assignments: Array<{
            taskId: string;
            agentInstance: AgentInstance;
        }>;
        factoryState: ReturnType<AgentFactory['exportState']>;
    };
    /**
     * Clear all assignments and agents
     */
    clear(): Promise<void>;
}
//# sourceMappingURL=agent-registry.d.ts.map