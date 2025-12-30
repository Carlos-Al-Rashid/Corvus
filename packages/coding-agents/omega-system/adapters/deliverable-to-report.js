/**
 * Deliverable to Report Adapter
 *
 * Converts Ω-System Deliverable back to ExecutionReport format.
 * Bridges Ω-System output to existing agent result handling.
 *
 * @module omega-system/adapters/deliverable-to-report
 */
/**
 * Convert Deliverable summary status to report status
 */
function mapStatus(deliverable) {
    switch (deliverable.summary.status) {
        case 'ready':
            return 'success';
        case 'needs-review':
            return 'partial';
        case 'blocked':
            return 'failure';
        default:
            return 'partial';
    }
}
/**
 * Extract quality from deliverable
 */
function extractQuality(deliverable) {
    const qr = deliverable.qualityReport;
    const score = qr.score;
    return {
        score,
        grade: scoreToGrade(score),
        issues: deliverable.summary.issues,
    };
}
/**
 * Convert score to letter grade
 */
function scoreToGrade(score) {
    if (score >= 90)
        return 'A';
    if (score >= 80)
        return 'B';
    if (score >= 70)
        return 'C';
    if (score >= 60)
        return 'D';
    return 'F';
}
/**
 * Flatten artifacts from categorized structure
 */
function flattenArtifacts(deliverable) {
    const artifacts = [];
    const addArtifacts = (category, items) => {
        for (const item of items) {
            artifacts.push({
                type: `${category}/${item.type}`,
                path: item.path,
                content: item.content,
            });
        }
    };
    addArtifacts('code', deliverable.artifacts.code);
    addArtifacts('tests', deliverable.artifacts.tests);
    addArtifacts('documentation', deliverable.artifacts.documentation);
    addArtifacts('configuration', deliverable.artifacts.configuration);
    addArtifacts('reports', deliverable.artifacts.reports);
    return artifacts;
}
/**
 * Extract recommendations from deliverable and knowledge
 */
function extractRecommendations(deliverable, knowledge) {
    const recommendations = [];
    // From deliverable summary
    recommendations.push(...deliverable.summary.recommendations);
    // From quality report
    const qr = deliverable.qualityReport;
    if (qr.score < 80) {
        recommendations.push('Consider improving code quality - score below 80');
    }
    // From test results
    if (deliverable.testResults) {
        const { passed, totalTests, coveragePercent } = deliverable.testResults;
        if (passed < totalTests) {
            recommendations.push(`Fix ${totalTests - passed} failing tests`);
        }
        if (coveragePercent !== undefined && coveragePercent < 80) {
            recommendations.push(`Increase test coverage from ${coveragePercent}% to at least 80%`);
        }
    }
    // From knowledge if available
    if (knowledge) {
        for (const insight of knowledge.insights) {
            if (insight.actionable && insight.suggestion) {
                recommendations.push(insight.suggestion);
            }
        }
        for (const lesson of knowledge.lessons) {
            if (lesson.severity === 'critical' || lesson.severity === 'warning') {
                recommendations.push(`${lesson.domain}: ${lesson.description}`);
            }
        }
    }
    return recommendations;
}
/**
 * Deliverable to Report Adapter
 */
export class DeliverableToReportAdapter {
    /**
     * Convert Deliverable to ExecutionReport
     */
    static convert(deliverable, knowledge) {
        const status = mapStatus(deliverable);
        // Estimate task counts from completeness
        const completeness = deliverable.summary.completeness;
        const estimatedTotal = 10; // Default estimate
        const tasksCompleted = Math.round((completeness / 100) * estimatedTotal);
        const tasksFailed = deliverable.summary.issues.length;
        const messages = [];
        // Add info about completion
        messages.push({
            level: 'info',
            message: `Execution completed with ${completeness}% completeness`,
        });
        // Add warnings for issues
        for (const issue of deliverable.summary.issues) {
            messages.push({
                level: 'warning',
                message: issue,
                context: 'summary',
            });
        }
        // Add error if blocked
        if (deliverable.summary.status === 'blocked') {
            messages.push({
                level: 'error',
                message: 'Execution is blocked',
            });
        }
        return {
            id: `report-${deliverable.deliverableId}`,
            status,
            summary: `${deliverable.summary.status}: ${completeness}% complete`,
            results: {
                tasksCompleted,
                tasksFailed,
                totalTasks: estimatedTotal,
                successRate: completeness / 100,
            },
            artifacts: flattenArtifacts(deliverable),
            quality: extractQuality(deliverable),
            performance: {
                durationMs: deliverable.metadata.integrationTimeMs,
                tokensUsed: 0, // Not tracked in Deliverable
                resourceUtilization: 0.5, // Default
            },
            messages,
            recommendations: extractRecommendations(deliverable, knowledge),
            timestamp: deliverable.createdAt,
        };
    }
    /**
     * Create error report for failed execution
     */
    static createErrorReport(error, context) {
        return {
            id: `report-error-${Date.now()}`,
            status: 'failure',
            summary: `Execution failed: ${error.message}`,
            results: {
                tasksCompleted: 0,
                tasksFailed: 1,
                totalTasks: 1,
                successRate: 0,
            },
            artifacts: [],
            messages: [
                {
                    level: 'error',
                    message: error.message,
                    context: context || error.name,
                },
            ],
            recommendations: ['Check error logs and retry'],
            timestamp: new Date().toISOString(),
        };
    }
}
/**
 * Convenience function
 */
export function deliverableToReport(deliverable, knowledge) {
    return DeliverableToReportAdapter.convert(deliverable, knowledge);
}
/**
 * Create summary string from report
 */
export function summarizeReport(report) {
    const lines = [];
    lines.push(`## Execution Report: ${report.status.toUpperCase()}`);
    lines.push('');
    lines.push(`**Summary**: ${report.summary}`);
    lines.push('');
    lines.push(`### Results`);
    lines.push(`- Tasks: ${report.results.tasksCompleted}/${report.results.totalTasks} completed`);
    lines.push(`- Success Rate: ${Math.round(report.results.successRate * 100)}%`);
    if (report.quality) {
        lines.push('');
        lines.push(`### Quality`);
        lines.push(`- Score: ${report.quality.score}/100 (${report.quality.grade})`);
        if (report.quality.issues.length > 0) {
            lines.push(`- Issues: ${report.quality.issues.length}`);
        }
    }
    if (report.performance) {
        lines.push('');
        lines.push(`### Performance`);
        lines.push(`- Duration: ${Math.round(report.performance.durationMs / 1000)}s`);
        lines.push(`- Tokens: ${report.performance.tokensUsed.toLocaleString()}`);
    }
    if (report.recommendations && report.recommendations.length > 0) {
        lines.push('');
        lines.push(`### Recommendations`);
        for (const rec of report.recommendations) {
            lines.push(`- ${rec}`);
        }
    }
    return lines.join('\n');
}
//# sourceMappingURL=deliverable-to-report.js.map