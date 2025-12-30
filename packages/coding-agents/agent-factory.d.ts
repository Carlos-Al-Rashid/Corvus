/**
 * AgentFactory - Creates and manages dynamic agents
 *
 * Factory for creating agent instances from templates
 */
import { DynamicAgent } from './dynamic-agent';
import { AgentConfig } from './types/index';
import { AgentTemplate, AgentInstance } from './types/agent-template';
import { HookManager } from './hooks/hook-manager';
export declare class AgentFactory {
    private static instance;
    private templates;
    private instances;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): AgentFactory;
    /**
     * Register agent template
     */
    registerTemplate(template: AgentTemplate): void;
    /**
     * Unregister agent template
     */
    unregisterTemplate(templateId: string): boolean;
    /**
     * Get template by ID
     */
    getTemplate(templateId: string): AgentTemplate | undefined;
    /**
     * Get all templates
     */
    getAllTemplates(): AgentTemplate[];
    /**
     * Find templates by task type
     */
    findTemplatesByType(taskType: 'feature' | 'bug' | 'refactor' | 'docs' | 'test' | 'deployment'): AgentTemplate[];
    /**
     * Find best template for task type
     */
    findBestTemplate(taskType: 'feature' | 'bug' | 'refactor' | 'docs' | 'test' | 'deployment'): AgentTemplate | undefined;
    /**
     * Create agent instance from template
     */
    createAgent(templateId: string, config: AgentConfig, options?: {
        hookManager?: HookManager;
        autoInitialize?: boolean;
    }): Promise<DynamicAgent>;
    /**
     * Create agent from best matching template
     */
    createAgentForTask(taskType: 'feature' | 'bug' | 'refactor' | 'docs' | 'test' | 'deployment', config: AgentConfig, options?: {
        hookManager?: HookManager;
        autoInitialize?: boolean;
    }): Promise<DynamicAgent>;
    /**
     * Get agent instance by ID
     */
    getInstance(instanceId: string): DynamicAgent | undefined;
    /**
     * Get all active instances
     */
    getAllInstances(): DynamicAgent[];
    /**
     * Get instances by template ID
     */
    getInstancesByTemplate(templateId: string): DynamicAgent[];
    /**
     * Get idle instances (not currently running)
     */
    getIdleInstances(): DynamicAgent[];
    /**
     * Get running instances
     */
    getRunningInstances(): DynamicAgent[];
    /**
     * Destroy agent instance
     */
    destroyAgent(instanceId: string): Promise<boolean>;
    /**
     * Destroy all idle instances
     */
    destroyIdleAgents(): Promise<number>;
    /**
     * Get factory statistics
     */
    getStatistics(): {
        totalTemplates: number;
        totalInstances: number;
        idleInstances: number;
        runningInstances: number;
        completedInstances: number;
        failedInstances: number;
    };
    /**
     * Clear all templates and instances
     */
    clear(): Promise<void>;
    /**
     * Export factory state
     */
    exportState(): {
        templates: AgentTemplate[];
        instances: AgentInstance[];
    };
}
//# sourceMappingURL=agent-factory.d.ts.map