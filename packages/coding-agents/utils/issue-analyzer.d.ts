/**
 * IssueAnalyzer - Shared utility for Issue analysis
 *
 * Consolidates duplicate Issue analysis logic used across:
 * - CoordinatorAgent
 * - IssueAgent
 *
 * This utility provides consistent Issue type, severity, impact, and duration estimation.
 */
import { Issue, Task, Severity, ImpactLevel } from '../types/index';
export declare class IssueAnalyzer {
    /**
     * Determine task type from labels or title
     */
    static determineType(labels: string[], title: string, body?: string): Task['type'];
    /**
     * Determine Issue type from Issue object
     */
    static determineIssueType(issue: Issue): Task['type'];
    /**
     * Determine severity from labels or content
     */
    static determineSeverity(labels: string[], title: string, body?: string): Severity;
    /**
     * Determine severity from Issue object
     */
    static determineSeverityFromIssue(issue: Issue): Severity;
    /**
     * Determine impact level from labels or content
     */
    static determineImpact(labels: string[], title: string, body?: string): ImpactLevel;
    /**
     * Determine impact from Issue object
     */
    static determineImpactFromIssue(issue: Issue): ImpactLevel;
    /**
     * Estimate task duration (minutes)
     */
    static estimateDuration(title: string, body: string, type: Task['type']): number;
    /**
     * Estimate duration from Issue object
     */
    static estimateDurationFromIssue(issue: Issue, type: Task['type']): number;
    /**
     * Extract dependency Issue numbers (#123 format)
     */
    static extractDependencies(body: string): string[];
    /**
     * Extract dependencies from Issue object
     */
    static extractDependenciesFromIssue(issue: Issue): string[];
}
//# sourceMappingURL=issue-analyzer.d.ts.map