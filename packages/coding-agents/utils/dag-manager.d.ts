/**
 * DAGManager - Directed Acyclic Graph Manager
 *
 * Responsibilities:
 * - Build dependency graph from tasks
 * - Detect circular dependencies (cycles)
 * - Topological sorting for execution order
 * - Generate execution recommendations
 *
 * Uses standard graph algorithms:
 * - Kahn's Algorithm for topological sorting
 * - DFS for cycle detection
 */
import { Task, DAG } from '../types/index';
/**
 * DAG Manager - Centralized graph operations
 */
export declare class DAGManager {
    /**
     * Build Directed Acyclic Graph from tasks
     *
     * Creates a dependency graph showing relationships between tasks.
     * Each edge represents a "must complete before" relationship.
     *
     * @param tasks - Array of tasks with dependencies
     * @returns DAG with nodes, edges, and topologically sorted levels
     */
    static buildDAG(tasks: Task[]): DAG;
    /**
     * Topological sort using Kahn's Algorithm
     *
     * Groups tasks into levels where:
     * - Level 0: Tasks with no dependencies (can start immediately)
     * - Level N: Tasks that depend only on tasks in levels 0 to N-1
     *
     * This enables maximum parallelism within each level.
     *
     * @param tasks - Array of tasks
     * @param edges - Dependency edges
     * @returns Array of levels, each containing task IDs that can execute in parallel
     */
    static topologicalSort(tasks: Task[], edges: Array<{
        from: string;
        to: string;
    }>): string[][];
    /**
     * Detect circular dependencies using DFS
     *
     * A cycle exists if we encounter a node that's already in the current
     * recursion stack during depth-first traversal.
     *
     * @param dag - The DAG to check
     * @returns true if cycles detected, false otherwise
     */
    static detectCycles(dag: DAG): boolean;
    /**
     * Find the cycle path (for debugging)
     *
     * If a cycle exists, return the path of task IDs forming the cycle.
     *
     * @param dag - The DAG to analyze
     * @returns Array of task IDs forming a cycle, or empty array if no cycle
     */
    static findCyclePath(dag: DAG): string[];
    /**
     * Generate execution recommendations based on DAG analysis
     *
     * Analyzes the graph structure to provide optimization suggestions.
     *
     * @param tasks - Array of tasks
     * @param dag - The dependency graph
     * @returns Array of recommendation strings
     */
    static generateRecommendations(tasks: Task[], dag: DAG): string[];
    /**
     * Calculate critical path (longest path through DAG)
     *
     * The critical path represents the minimum time needed to complete
     * all tasks, even with unlimited parallelism.
     *
     * @param tasks - Array of tasks
     * @param dag - The dependency graph
     * @returns Duration in minutes of the critical path
     */
    static calculateCriticalPath(tasks: Task[], dag: DAG): number;
    /**
     * Get execution statistics
     *
     * @param tasks - Array of tasks
     * @param dag - The dependency graph
     * @returns Statistics object
     */
    static getStatistics(tasks: Task[], dag: DAG): {
        totalTasks: number;
        totalEdges: number;
        levels: number;
        maxParallelism: number;
        averageTasksPerLevel: number;
        criticalPathDuration: number;
        hasCycles: boolean;
    };
}
//# sourceMappingURL=dag-manager.d.ts.map