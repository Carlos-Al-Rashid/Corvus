/**
 * AgentFactory - Creates and manages dynamic agents
 *
 * Factory for creating agent instances from templates
 */
import { DynamicAgent } from './dynamic-agent';
import { logger } from './ui/index';
export class AgentFactory {
    static instance;
    templates = new Map();
    instances = new Map();
    constructor() { }
    /**
     * Get singleton instance
     */
    static getInstance() {
        if (!AgentFactory.instance) {
            AgentFactory.instance = new AgentFactory();
        }
        return AgentFactory.instance;
    }
    /**
     * Register agent template
     */
    registerTemplate(template) {
        if (this.templates.has(template.id)) {
            logger.warning(`Template "${template.id}" already registered, overwriting`);
        }
        this.templates.set(template.id, template);
        logger.info(`✓ Registered agent template: ${template.name} (${template.id})`);
    }
    /**
     * Unregister agent template
     */
    unregisterTemplate(templateId) {
        const deleted = this.templates.delete(templateId);
        if (deleted) {
            logger.info(`Unregistered agent template: ${templateId}`);
        }
        return deleted;
    }
    /**
     * Get template by ID
     */
    getTemplate(templateId) {
        return this.templates.get(templateId);
    }
    /**
     * Get all templates
     */
    getAllTemplates() {
        return Array.from(this.templates.values());
    }
    /**
     * Find templates by task type
     */
    findTemplatesByType(taskType) {
        return Array.from(this.templates.values()).filter((template) => template.supportedTypes.includes(taskType));
    }
    /**
     * Find best template for task type
     */
    findBestTemplate(taskType) {
        const candidates = this.findTemplatesByType(taskType);
        if (candidates.length === 0) {
            return undefined;
        }
        // Sort by priority (higher is better)
        candidates.sort((a, b) => b.priority - a.priority);
        return candidates[0];
    }
    /**
     * Create agent instance from template
     */
    async createAgent(templateId, config, options) {
        const template = this.templates.get(templateId);
        if (!template) {
            throw new Error(`Template "${templateId}" not found`);
        }
        logger.info(`Creating agent from template: ${template.name}`);
        // Create dynamic agent
        const agent = new DynamicAgent(template, config, options?.hookManager);
        // Auto-initialize if requested
        if (options?.autoInitialize !== false) {
            await agent.initialize();
        }
        // Store instance
        this.instances.set(agent.getInstanceId(), agent);
        logger.success(`✓ Agent created: ${agent.getInstanceId()}`);
        return agent;
    }
    /**
     * Create agent from best matching template
     */
    async createAgentForTask(taskType, config, options) {
        const template = this.findBestTemplate(taskType);
        if (!template) {
            throw new Error(`No template found for task type: ${taskType}`);
        }
        return this.createAgent(template.id, config, options);
    }
    /**
     * Get agent instance by ID
     */
    getInstance(instanceId) {
        return this.instances.get(instanceId);
    }
    /**
     * Get all active instances
     */
    getAllInstances() {
        return Array.from(this.instances.values());
    }
    /**
     * Get instances by template ID
     */
    getInstancesByTemplate(templateId) {
        return Array.from(this.instances.values()).filter((agent) => agent.getTemplate().id === templateId);
    }
    /**
     * Get idle instances (not currently running)
     */
    getIdleInstances() {
        return Array.from(this.instances.values()).filter((agent) => agent.getStatus() === 'idle' || agent.getStatus() === 'completed');
    }
    /**
     * Get running instances
     */
    getRunningInstances() {
        return Array.from(this.instances.values()).filter((agent) => agent.getStatus() === 'running');
    }
    /**
     * Destroy agent instance
     */
    async destroyAgent(instanceId) {
        const agent = this.instances.get(instanceId);
        if (!agent) {
            return false;
        }
        logger.info(`Destroying agent: ${instanceId}`);
        // Cleanup
        await agent.cleanup();
        // Remove from registry
        this.instances.delete(instanceId);
        logger.success(`✓ Agent destroyed: ${instanceId}`);
        return true;
    }
    /**
     * Destroy all idle instances
     */
    async destroyIdleAgents() {
        const idleAgents = this.getIdleInstances();
        let count = 0;
        for (const agent of idleAgents) {
            const destroyed = await this.destroyAgent(agent.getInstanceId());
            if (destroyed) {
                count++;
            }
        }
        logger.info(`Destroyed ${count} idle agents`);
        return count;
    }
    /**
     * Get factory statistics
     */
    getStatistics() {
        const instances = this.getAllInstances();
        return {
            totalTemplates: this.templates.size,
            totalInstances: instances.length,
            idleInstances: instances.filter((a) => a.getStatus() === 'idle').length,
            runningInstances: instances.filter((a) => a.getStatus() === 'running').length,
            completedInstances: instances.filter((a) => a.getStatus() === 'completed').length,
            failedInstances: instances.filter((a) => a.getStatus() === 'failed').length,
        };
    }
    /**
     * Clear all templates and instances
     */
    async clear() {
        // Destroy all instances
        const instanceIds = Array.from(this.instances.keys());
        for (const instanceId of instanceIds) {
            await this.destroyAgent(instanceId);
        }
        // Clear templates
        this.templates.clear();
        logger.info('Factory cleared');
    }
    /**
     * Export factory state
     */
    exportState() {
        return {
            templates: Array.from(this.templates.values()),
            instances: Array.from(this.instances.values()).map((agent) => agent.getInstanceInfo()),
        };
    }
}
//# sourceMappingURL=agent-factory.js.map