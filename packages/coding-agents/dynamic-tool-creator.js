/**
 * DynamicToolCreator - Runtime tool creation for agents
 *
 * Allows agents to create and use tools dynamically during execution
 */
import { ToolFactory } from './tool-factory';
import { SecurityValidator } from './utils/security-validator';
import { logger } from './ui/index';
export class DynamicToolCreator {
    toolFactory;
    executionCache = new Map();
    toolExecutionHistory = [];
    constructor() {
        this.toolFactory = ToolFactory.getInstance();
    }
    /**
     * Create and execute a tool in one step
     */
    async createAndExecuteTool(requirement, params, context) {
        logger.info(`[DynamicToolCreator] Creating and executing tool: ${requirement.name}`);
        // Step 1: Create tool
        const creationResult = await this.toolFactory.createTool(requirement);
        if (!creationResult.success || !creationResult.tool) {
            return {
                success: false,
                error: creationResult.error || 'Tool creation failed',
                durationMs: creationResult.durationMs,
                toolId: 'unknown',
            };
        }
        // Step 2: Execute tool
        return this.executeTool(creationResult.tool, params, context);
    }
    /**
     * Execute a dynamic tool
     */
    async executeTool(tool, params, context) {
        const startTime = Date.now();
        logger.info(`[DynamicToolCreator] Executing tool: ${tool.name} (${tool.id})`);
        try {
            let result;
            // Execute based on implementation type
            switch (tool.implementationType) {
                case 'function':
                    result = await this.executeFunctionTool(tool, params);
                    break;
                case 'class':
                    result = await this.executeClassTool(tool, params);
                    break;
                case 'command-wrapper':
                    result = await this.executeCommandTool(tool, params);
                    break;
                case 'api-wrapper':
                    result = await this.executeApiTool(tool, params);
                    break;
                default:
                    throw new Error(`Unknown implementation type: ${tool.implementationType}`);
            }
            const durationMs = Date.now() - startTime;
            const executionResult = {
                success: true,
                result,
                durationMs,
                toolId: tool.id,
            };
            // Store in history
            this.toolExecutionHistory.push({
                toolId: tool.id,
                context,
                result: executionResult,
            });
            logger.success(`✓ Tool executed: ${tool.name} (${durationMs}ms)`);
            return executionResult;
        }
        catch (error) {
            const durationMs = Date.now() - startTime;
            const executionResult = {
                success: false,
                error: error.message,
                durationMs,
                toolId: tool.id,
            };
            logger.error(`Tool execution failed: ${error.message}`);
            return executionResult;
        }
    }
    /**
     * Execute function-type tool
     */
    async executeFunctionTool(tool, params) {
        if (typeof tool.implementation !== 'string') {
            throw new Error('Function tool requires string implementation');
        }
        // Security validation before execution
        logger.info(`[Security] Validating function tool code: ${tool.name}`);
        const validation = SecurityValidator.validate(tool.implementation);
        if (!validation.safe) {
            const criticalIssues = validation.issues.filter((issue) => issue.severity >= 90);
            logger.error(`[Security] Code validation failed for ${tool.name}`);
            logger.error(`  Critical issues: ${criticalIssues.length}`);
            throw new Error(`Security validation failed: ${criticalIssues.length} critical issue(s) detected\n` +
                criticalIssues.map((issue) => `  - ${issue.message}`).join('\n'));
        }
        const securityScore = SecurityValidator.getSecurityScore(tool.implementation);
        logger.success(`[Security] ✓ Code validated (score: ${securityScore}/100)`);
        // In a real implementation, this would use vm module or eval
        // For safety, we'll just simulate execution
        logger.info(`Simulating function tool execution: ${tool.name}`);
        return {
            success: true,
            message: `Function tool ${tool.name} executed`,
            params,
            securityScore,
        };
    }
    /**
     * Execute class-type tool
     */
    async executeClassTool(tool, params) {
        if (typeof tool.implementation !== 'string') {
            throw new Error('Class tool requires string implementation');
        }
        // Security validation before execution
        logger.info(`[Security] Validating class tool code: ${tool.name}`);
        const validation = SecurityValidator.validate(tool.implementation);
        if (!validation.safe) {
            const criticalIssues = validation.issues.filter((issue) => issue.severity >= 90);
            logger.error(`[Security] Code validation failed for ${tool.name}`);
            logger.error(`  Critical issues: ${criticalIssues.length}`);
            throw new Error(`Security validation failed: ${criticalIssues.length} critical issue(s) detected\n` +
                criticalIssues.map((issue) => `  - ${issue.message}`).join('\n'));
        }
        const securityScore = SecurityValidator.getSecurityScore(tool.implementation);
        logger.success(`[Security] ✓ Code validated (score: ${securityScore}/100)`);
        // Simulate class instantiation and execution
        logger.info(`Simulating class tool execution: ${tool.name}`);
        return {
            success: true,
            message: `Class tool ${tool.name} executed`,
            params,
            securityScore,
        };
    }
    /**
     * Execute command-type tool
     */
    async executeCommandTool(tool, params) {
        const { exec } = await import('child_process');
        const { promisify } = await import('util');
        const execAsync = promisify(exec);
        // Build command
        const command = tool.name;
        const args = Object.entries(params)
            .map(([key, value]) => `--${key}=${value}`)
            .join(' ');
        const fullCommand = `${command} ${args}`;
        logger.info(`Executing command: ${fullCommand}`);
        try {
            const { stdout, stderr } = await execAsync(fullCommand);
            return {
                success: true,
                stdout: stdout.trim(),
                stderr: stderr.trim(),
                command: fullCommand,
            };
        }
        catch (error) {
            throw new Error(`Command failed: ${error.message}`);
        }
    }
    /**
     * Execute API-type tool
     */
    async executeApiTool(_tool, params) {
        const url = params.url;
        const method = params.method || 'GET';
        const headers = params.headers || {};
        logger.info(`API request: ${method} ${url}`);
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: method !== 'GET' ? JSON.stringify(params.body) : undefined,
            });
            const data = await response.json();
            return {
                success: response.ok,
                status: response.status,
                data,
            };
        }
        catch (error) {
            throw new Error(`API request failed: ${error.message}`);
        }
    }
    /**
     * Create a simple tool with minimal specification
     */
    async createSimpleTool(name, description, type, params = {}) {
        const requirement = {
            name,
            type,
            description,
            parameters: params,
            priority: 10,
            critical: false,
        };
        return this.toolFactory.createTool(requirement);
    }
    /**
     * Create a tool from natural language description
     */
    async createToolFromDescription(description, _context) {
        logger.info('[DynamicToolCreator] Analyzing tool description...');
        // Simple NLP-based tool creation (in real implementation, use AI)
        const analysis = this.analyzeDescription(description);
        const requirement = {
            name: analysis.name,
            type: analysis.type,
            description: analysis.description,
            parameters: analysis.parameters,
            priority: 10,
            critical: false,
        };
        return this.toolFactory.createTool(requirement);
    }
    /**
     * Analyze tool description (simple heuristic-based)
     */
    analyzeDescription(description) {
        const lower = description.toLowerCase();
        // Infer type
        let type = 'command';
        if (lower.includes('api') || lower.includes('http') || lower.includes('request')) {
            type = 'api';
        }
        else if (lower.includes('service') || lower.includes('cloud')) {
            type = 'service';
        }
        else if (lower.includes('library') || lower.includes('package')) {
            type = 'library';
        }
        // Extract name (simple heuristic)
        const words = description.split(' ');
        const name = words[0].toLowerCase().replace(/[^a-z0-9]/g, '_');
        return {
            name,
            type,
            description,
            parameters: {},
        };
    }
    /**
     * Get tool execution history
     */
    getExecutionHistory() {
        return [...this.toolExecutionHistory];
    }
    /**
     * Get execution statistics
     */
    getStatistics() {
        const totalExecutions = this.toolExecutionHistory.length;
        const successfulExecutions = this.toolExecutionHistory.filter((h) => h.result.success).length;
        const failedExecutions = totalExecutions - successfulExecutions;
        const totalDuration = this.toolExecutionHistory.reduce((sum, h) => sum + h.result.durationMs, 0);
        const averageDurationMs = totalExecutions > 0 ? totalDuration / totalExecutions : 0;
        const toolsCreated = this.toolFactory.getAllTools().length;
        return {
            totalExecutions,
            successfulExecutions,
            failedExecutions,
            averageDurationMs: Math.round(averageDurationMs),
            toolsCreated,
        };
    }
    /**
     * Clear execution cache and history
     */
    clear() {
        this.executionCache.clear();
        this.toolExecutionHistory = [];
        logger.info('Dynamic tool creator cleared');
    }
    /**
     * Export tool for reuse
     */
    async exportTool(toolId, outputPath) {
        return this.toolFactory.exportTool(toolId, outputPath);
    }
}
//# sourceMappingURL=dynamic-tool-creator.js.map