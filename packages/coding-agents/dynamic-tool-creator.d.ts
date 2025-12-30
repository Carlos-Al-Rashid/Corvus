/**
 * DynamicToolCreator - Runtime tool creation for agents
 *
 * Allows agents to create and use tools dynamically during execution
 */
import { ToolRequirement, DynamicToolSpec, ToolCreationResult } from './types/agent-analysis';
import type { IToolCreator } from './types/tool-creator-interface';
/**
 * Dynamic tool execution context
 */
export interface DynamicToolContext {
    /** Agent instance ID */
    agentInstanceId: string;
    /** Task ID */
    taskId: string;
    /** Execution timestamp */
    timestamp: string;
    /** Additional metadata */
    metadata?: Record<string, any>;
}
/**
 * Tool execution result
 */
export interface ToolExecutionResult {
    /** Whether execution was successful */
    success: boolean;
    /** Result data */
    result?: any;
    /** Error message if failed */
    error?: string;
    /** Execution time (ms) */
    durationMs: number;
    /** Tool ID */
    toolId: string;
}
export declare class DynamicToolCreator implements IToolCreator {
    private toolFactory;
    private executionCache;
    private toolExecutionHistory;
    constructor();
    /**
     * Create and execute a tool in one step
     */
    createAndExecuteTool(requirement: ToolRequirement, params: any, context: DynamicToolContext): Promise<ToolExecutionResult>;
    /**
     * Execute a dynamic tool
     */
    executeTool(tool: DynamicToolSpec, params: any, context: DynamicToolContext): Promise<ToolExecutionResult>;
    /**
     * Execute function-type tool
     */
    private executeFunctionTool;
    /**
     * Execute class-type tool
     */
    private executeClassTool;
    /**
     * Execute command-type tool
     */
    private executeCommandTool;
    /**
     * Execute API-type tool
     */
    private executeApiTool;
    /**
     * Create a simple tool with minimal specification
     */
    createSimpleTool(name: string, description: string, type: 'command' | 'api' | 'library' | 'service', params?: Record<string, any>): Promise<ToolCreationResult>;
    /**
     * Create a tool from natural language description
     */
    createToolFromDescription(description: string, _context: DynamicToolContext): Promise<ToolCreationResult>;
    /**
     * Analyze tool description (simple heuristic-based)
     */
    private analyzeDescription;
    /**
     * Get tool execution history
     */
    getExecutionHistory(): Array<{
        toolId: string;
        context: DynamicToolContext;
        result: ToolExecutionResult;
    }>;
    /**
     * Get execution statistics
     */
    getStatistics(): {
        totalExecutions: number;
        successfulExecutions: number;
        failedExecutions: number;
        averageDurationMs: number;
        toolsCreated: number;
    };
    /**
     * Clear execution cache and history
     */
    clear(): void;
    /**
     * Export tool for reuse
     */
    exportTool(toolId: string, outputPath: string): Promise<boolean>;
}
//# sourceMappingURL=dynamic-tool-creator.d.ts.map