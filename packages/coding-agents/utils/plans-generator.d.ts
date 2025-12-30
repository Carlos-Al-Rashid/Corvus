/**
 * Plans.md Generator - Feler's 7-hour Session Pattern from OpenAI Dev Day
 *
 * Generates living documentation that maintains trajectory during long sessions.
 * Based on Feler's experience: 15M tokens, 7 hours, perfectly on track.
 *
 * Key Principles:
 * - Living document that evolves with execution
 * - DAG visualization for dependency understanding
 * - Progress tracking in real-time
 * - Decision log for context preservation
 * - Estimated vs actual time tracking
 */
import { TaskDecomposition, ExecutionReport } from '../types/index';
export declare class PlansGenerator {
    /**
     * Generate initial Plans.md from TaskDecomposition
     */
    static generateInitialPlan(decomposition: TaskDecomposition): string;
    /**
     * Update Plans.md with execution progress
     */
    static updateWithProgress(existingPlans: string, report: ExecutionReport): string;
    private static generateHeader;
    private static generateOverview;
    private static generateDAGVisualization;
    private static generateMermaidDAG;
    private static getMermaidNodeStyle;
    private static generateTaskList;
    private static formatTask;
    private static getStatusEmoji;
    private static generateProgressSection;
    private static generateProgressSectionFromReport;
    private static generateDecisions;
    private static generateRecommendations;
    private static generateFooter;
    private static groupTasksByType;
}
//# sourceMappingURL=plans-generator.d.ts.map