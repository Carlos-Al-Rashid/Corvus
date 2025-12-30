/**
 * Context to World Space Adapter
 *
 * Converts execution context to SWML WorldSpace.
 * Maps environment, resources, and constraints to W(t, s, c, r, e).
 *
 * @module omega-system/adapters/context-to-world
 */
import type { WorldSpace } from '../../types/world';
/**
 * Execution context from existing agent system
 */
export interface ExecutionContext {
    /** Project root path */
    projectRoot: string;
    /** Repository info */
    repository?: {
        owner: string;
        name: string;
        branch: string;
        defaultBranch: string;
    };
    /** Git info */
    git?: {
        currentBranch: string;
        hasUncommittedChanges: boolean;
        lastCommitHash?: string;
    };
    /** Runtime environment */
    environment?: {
        nodeVersion: string;
        platform: string;
        arch: string;
        cpuCount: number;
        totalMemory: number;
        freeMemory: number;
    };
    /** Project configuration */
    config?: {
        language: string;
        framework?: string;
        testRunner?: string;
        buildTool?: string;
        packageManager?: string;
    };
    /** Available tools */
    tools?: string[];
    /** Active constraints */
    constraints?: {
        maxConcurrency?: number;
        timeoutMs?: number;
        memoryLimitMb?: number;
        requiresReview?: boolean;
        allowedBranches?: string[];
    };
    /** Timestamp */
    timestamp?: string;
}
/**
 * Context to World Space Adapter
 */
export declare class ContextToWorldAdapter {
    /**
     * Convert ExecutionContext to WorldSpace
     */
    static convert(context?: Partial<ExecutionContext>): WorldSpace;
}
/**
 * Convenience function
 */
export declare function contextToWorld(context?: Partial<ExecutionContext>): WorldSpace;
/**
 * Create WorldSpace from current environment
 */
export declare function createWorldFromEnvironment(): WorldSpace;
//# sourceMappingURL=context-to-world.d.ts.map