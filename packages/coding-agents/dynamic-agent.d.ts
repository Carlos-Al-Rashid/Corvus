/**
 * DynamicAgent - Generic agent that executes based on AgentTemplate
 *
 * Allows runtime creation of agents without predefined classes
 */
import { BaseAgent } from './base-agent';
import { Task, AgentResult, AgentConfig } from './types/index';
import { AgentTemplate, AgentInstance, AgentExecutionRecord } from './types/agent-template';
import { HookManager } from './hooks/hook-manager';
export declare class DynamicAgent extends BaseAgent {
    private template;
    private instanceId;
    private executionHistory;
    private state;
    private status;
    constructor(template: AgentTemplate, config: AgentConfig, hookManager?: HookManager);
    /**
     * Execute task using template executor
     */
    execute(task: Task): Promise<AgentResult>;
    /**
     * Initialize agent (if template provides initialization)
     */
    initialize(): Promise<void>;
    /**
     * Cleanup agent (if template provides cleanup)
     */
    cleanup(): Promise<void>;
    /**
     * Get agent instance information
     */
    getInstanceInfo(): AgentInstance;
    /**
     * Get template
     */
    getTemplate(): AgentTemplate;
    /**
     * Get instance ID
     */
    getInstanceId(): string;
    /**
     * Get execution history
     */
    getExecutionHistory(): AgentExecutionRecord[];
    /**
     * Get current status
     */
    getStatus(): 'idle' | 'running' | 'completed' | 'failed';
    /**
     * Get shared state
     */
    getState(): Map<string, any>;
    /**
     * Set state value
     */
    setState(key: string, value: any): void;
    /**
     * Get state value
     */
    getStateValue(key: string): any;
    /**
     * Clear state
     */
    clearState(): void;
    /**
     * Check if agent can handle task
     */
    canHandleTask(task: Task): boolean;
    /**
     * Get hook manager (protected accessor)
     */
    private getHookManager;
    /**
     * Set hook manager (protected mutator)
     */
    private setHookManager;
}
//# sourceMappingURL=dynamic-agent.d.ts.map