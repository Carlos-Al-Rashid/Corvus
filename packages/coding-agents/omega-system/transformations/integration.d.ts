/**
 * θ₅: Integration Transform
 *
 * Mathematical Definition: θ₅: R → D
 *
 * Transforms Result Set into Deliverable.
 * Integrates execution results, creates PRs, and generates quality reports.
 *
 * @module omega-system/transformations/integration
 */
import type { QualityReport } from '../../types';
import type { ResultSet, ExecutionArtifact } from './execution';
/**
 * Code change summary
 */
export interface CodeChangeSummary {
    filesCreated: number;
    filesModified: number;
    filesDeleted: number;
    totalLinesAdded: number;
    totalLinesRemoved: number;
    languages: string[];
}
/**
 * Test results summary
 */
export interface TestResultsSummary {
    totalTests: number;
    passed: number;
    failed: number;
    skipped: number;
    coveragePercent?: number;
    duration: number;
}
/**
 * Pull Request draft
 */
export interface PullRequestDraft {
    title: string;
    body: string;
    baseBranch: string;
    headBranch: string;
    labels: string[];
    reviewers: string[];
    draft: boolean;
    linkedIssues: number[];
}
/**
 * Documentation update
 */
export interface DocumentationUpdate {
    type: 'readme' | 'api-docs' | 'changelog' | 'inline';
    path: string;
    content: string;
    changeType: 'create' | 'update' | 'delete';
}
/**
 * Deliverable - Output of θ₅
 *
 * D = θ₅(R)
 */
export interface Deliverable {
    deliverableId: string;
    createdAt: string;
    /** Source result set */
    sourceResultSetId: string;
    /** Integrated artifacts */
    artifacts: {
        code: ExecutionArtifact[];
        tests: ExecutionArtifact[];
        documentation: ExecutionArtifact[];
        configuration: ExecutionArtifact[];
        reports: ExecutionArtifact[];
    };
    /** Code changes summary */
    codeChanges: CodeChangeSummary;
    /** Test results */
    testResults?: TestResultsSummary;
    /** Quality report */
    qualityReport: QualityReport;
    /** PR draft (if applicable) */
    pullRequest?: PullRequestDraft;
    /** Documentation updates */
    documentationUpdates: DocumentationUpdate[];
    /** Commit information */
    commit: {
        message: string;
        files: string[];
        hash?: string;
        branch: string;
    };
    /** Integration summary */
    summary: {
        status: 'ready' | 'needs-review' | 'blocked';
        completeness: number;
        issues: string[];
        recommendations: string[];
    };
    /** Metadata */
    metadata: {
        integrationVersion: string;
        integrationTimeMs: number;
    };
}
/**
 * θ₅: Integration Transform
 *
 * Transforms Result Set (R) into Deliverable (D)
 *
 * @param results - The result set from θ₄
 * @returns Deliverable for deployment/merge
 *
 * @example
 * ```typescript
 * const deliverable = await integration(results);
 * console.log(deliverable.summary.status); // 'ready'
 * ```
 */
export declare function integration(results: ResultSet): Promise<Deliverable>;
/**
 * Validate a deliverable
 */
export declare function validateDeliverable(deliverable: Deliverable): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=integration.d.ts.map