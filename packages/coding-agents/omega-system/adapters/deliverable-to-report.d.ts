/**
 * Deliverable to Report Adapter
 *
 * Converts Ω-System Deliverable back to ExecutionReport format.
 * Bridges Ω-System output to existing agent result handling.
 *
 * @module omega-system/adapters/deliverable-to-report
 */
import type { Deliverable } from '../transformations/integration';
import type { Knowledge } from '../transformations/learning';
/**
 * Execution report format used by existing agents
 */
export interface ExecutionReport {
    /** Report ID */
    id: string;
    /** Execution status */
    status: 'success' | 'partial' | 'failure';
    /** Summary message */
    summary: string;
    /** Detailed results */
    results: {
        /** Tasks completed */
        tasksCompleted: number;
        /** Tasks failed */
        tasksFailed: number;
        /** Total tasks */
        totalTasks: number;
        /** Success rate */
        successRate: number;
    };
    /** Generated artifacts */
    artifacts: Array<{
        type: string;
        path?: string;
        content?: string;
        url?: string;
    }>;
    /** Quality metrics */
    quality?: {
        score: number;
        grade: string;
        issues: string[];
    };
    /** Performance metrics */
    performance?: {
        durationMs: number;
        tokensUsed: number;
        resourceUtilization: number;
    };
    /** Warnings and errors */
    messages: Array<{
        level: 'info' | 'warning' | 'error';
        message: string;
        context?: string;
    }>;
    /** Recommendations for follow-up */
    recommendations?: string[];
    /** Timestamp */
    timestamp: string;
}
/**
 * Deliverable to Report Adapter
 */
export declare class DeliverableToReportAdapter {
    /**
     * Convert Deliverable to ExecutionReport
     */
    static convert(deliverable: Deliverable, knowledge?: Knowledge): ExecutionReport;
    /**
     * Create error report for failed execution
     */
    static createErrorReport(error: Error, context?: string): ExecutionReport;
}
/**
 * Convenience function
 */
export declare function deliverableToReport(deliverable: Deliverable, knowledge?: Knowledge): ExecutionReport;
/**
 * Create summary string from report
 */
export declare function summarizeReport(report: ExecutionReport): string;
//# sourceMappingURL=deliverable-to-report.d.ts.map