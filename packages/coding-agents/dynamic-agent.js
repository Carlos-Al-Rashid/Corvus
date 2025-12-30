/**
 * DynamicAgent - Generic agent that executes based on AgentTemplate
 *
 * Allows runtime creation of agents without predefined classes
 */
import { BaseAgent } from './base-agent';
import { DynamicToolCreator } from './dynamic-tool-creator';
export class DynamicAgent extends BaseAgent {
    template;
    instanceId;
    executionHistory = [];
    state = new Map();
    status = 'idle';
    constructor(template, config, hookManager) {
        super(template.name, config);
        this.template = template;
        this.instanceId = `${template.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        if (hookManager) {
            this.setHookManager(hookManager);
        }
    }
    /**
     * Execute task using template executor
     */
    async execute(task) {
        this.status = 'running';
        this.currentTask = task;
        const executionId = `exec-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const startTime = new Date().toISOString();
        this.log(`Executing task ${task.id} with template ${this.template.name}`);
        try {
            // Create tool creator for this execution
            const toolCreator = new DynamicToolCreator();
            // Create execution context
            const context = {
                config: this.config,
                hookManager: this.getHookManager(),
                startTime: Date.now(),
                state: this.state,
                log: this.log.bind(this),
                utils: {
                    sleep: this.sleep.bind(this),
                    retry: this.retry.bind(this),
                    executeCommand: this.executeCommand.bind(this),
                },
                toolCreator,
            };
            // Execute template function
            const result = await this.template.executor(task, context);
            // Record execution
            const endTime = new Date().toISOString();
            this.executionHistory.push({
                executionId,
                taskId: task.id,
                startTime,
                endTime,
                durationMs: Date.now() - this.startTime,
                result,
            });
            this.status = 'completed';
            this.log(`Task ${task.id} completed successfully`);
            return result;
        }
        catch (error) {
            // Record failed execution
            const endTime = new Date().toISOString();
            this.executionHistory.push({
                executionId,
                taskId: task.id,
                startTime,
                endTime,
                durationMs: Date.now() - this.startTime,
                error: error.message,
            });
            this.status = 'failed';
            this.log(`Task ${task.id} failed: ${error.message}`);
            throw error;
        }
    }
    /**
     * Initialize agent (if template provides initialization)
     */
    async initialize() {
        if (this.template.initialize) {
            this.log(`Initializing ${this.template.name}`);
            await this.template.initialize(this.config);
            this.log(`Initialization complete`);
        }
    }
    /**
     * Cleanup agent (if template provides cleanup)
     */
    async cleanup() {
        if (this.template.cleanup) {
            this.log(`Cleaning up ${this.template.name}`);
            await this.template.cleanup(this.config);
            this.log(`Cleanup complete`);
        }
    }
    /**
     * Get agent instance information
     */
    getInstanceInfo() {
        return {
            instanceId: this.instanceId,
            templateId: this.template.id,
            agentType: this.template.name,
            config: this.config,
            hookManager: this.getHookManager(),
            createdAt: new Date().toISOString(),
            status: this.status,
            currentTask: this.currentTask,
            executionHistory: this.executionHistory,
            metadata: this.template.metadata,
        };
    }
    /**
     * Get template
     */
    getTemplate() {
        return this.template;
    }
    /**
     * Get instance ID
     */
    getInstanceId() {
        return this.instanceId;
    }
    /**
     * Get execution history
     */
    getExecutionHistory() {
        return [...this.executionHistory];
    }
    /**
     * Get current status
     */
    getStatus() {
        return this.status;
    }
    /**
     * Get shared state
     */
    getState() {
        return this.state;
    }
    /**
     * Set state value
     */
    setState(key, value) {
        this.state.set(key, value);
    }
    /**
     * Get state value
     */
    getStateValue(key) {
        return this.state.get(key);
    }
    /**
     * Clear state
     */
    clearState() {
        this.state.clear();
    }
    /**
     * Check if agent can handle task
     */
    canHandleTask(task) {
        // Check if task type is supported
        if (!this.template.supportedTypes.includes(task.type)) {
            return false;
        }
        // Check required capabilities (if specified)
        if (this.template.requiredCapabilities) {
            // In a real implementation, check against available capabilities
            // For now, assume all capabilities are available
        }
        return true;
    }
    /**
     * Get hook manager (protected accessor)
     */
    getHookManager() {
        // Access through protected property
        return this.hookManager;
    }
    /**
     * Set hook manager (protected mutator)
     */
    setHookManager(hookManager) {
        // Set through protected property
        this.hookManager = hookManager;
    }
}
//# sourceMappingURL=dynamic-agent.js.map