/**
 * AgentAnalyzer - Intelligent task analysis and agent requirement determination
 *
 * Analyzes tasks from higher-level concepts to determine:
 * - Required agent capabilities
 * - Necessary tools and templates
 * - Optimal assignment strategy
 */
import { Task } from './types/index';
import { AgentTemplate } from './types/agent-template';
import { AgentAnalysisResult } from './types/agent-analysis';
export declare class AgentAnalyzer {
    private static instance;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): AgentAnalyzer;
    /**
     * Analyze task and determine agent requirements
     */
    analyzeTask(task: Task, availableTemplates: AgentTemplate[]): Promise<AgentAnalysisResult>;
    /**
     * Analyze task complexity from higher-level concepts
     */
    private analyzeComplexity;
    /**
     * Determine agent requirements based on task and complexity
     */
    private determineRequirements;
    /**
     * Analyze capability gaps
     */
    private analyzeCapabilities;
    /**
     * Determine assignment strategy
     */
    private determineAssignmentStrategy;
    /**
     * Infer tool type from name
     */
    private inferToolType;
}
//# sourceMappingURL=agent-analyzer.d.ts.map