/**
 * ToolFactory - Dynamic tool generation
 *
 * Creates tools, templates, hooks dynamically based on requirements
 */
import { ToolRequirement, HookRequirement, DynamicToolSpec, ToolCreationResult } from './types/agent-analysis';
import { PreHook, PostHook, ErrorHook } from './types/hooks';
export declare class ToolFactory {
    private static instance;
    private createdTools;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): ToolFactory;
    /**
     * Create dynamic tool from requirement
     */
    createTool(requirement: ToolRequirement): Promise<ToolCreationResult>;
    /**
     * Create dynamic hook from requirement
     */
    createHook(requirement: HookRequirement): Promise<PreHook | PostHook | ErrorHook>;
    /**
     * Generate command tool implementation
     */
    private generateCommandTool;
    /**
     * Generate API tool implementation
     */
    private generateApiTool;
    /**
     * Generate library tool implementation
     */
    private generateLibraryTool;
    /**
     * Generate service tool implementation
     */
    private generateServiceTool;
    /**
     * Create pre-hook from requirement
     */
    private createPreHook;
    /**
     * Create post-hook from requirement
     */
    private createPostHook;
    /**
     * Create error-hook from requirement
     */
    private createErrorHook;
    /**
     * Get implementation type
     */
    private getImplementationType;
    /**
     * Infer dependencies
     */
    private inferDependencies;
    /**
     * Sanitize name for function/class names
     */
    private sanitizeName;
    /**
     * Capitalize first letter
     */
    private capitalize;
    /**
     * Get created tool
     */
    getTool(toolId: string): DynamicToolSpec | undefined;
    /**
     * Get all created tools
     */
    getAllTools(): DynamicToolSpec[];
    /**
     * Clear all created tools
     */
    clear(): void;
    /**
     * Export tool as executable file
     */
    exportTool(toolId: string, outputPath: string): Promise<boolean>;
}
//# sourceMappingURL=tool-factory.d.ts.map