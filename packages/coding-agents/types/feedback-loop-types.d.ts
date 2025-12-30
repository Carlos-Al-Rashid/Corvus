/**
 * Feedback Loop System Types
 *
 * Type definitions for Goal-Oriented TDD + Consumption-Driven infinite feedback loop system
 */
export interface SuccessCriteria {
    minQualityScore: number;
    maxEslintErrors: number;
    maxTypeScriptErrors: number;
    maxSecurityIssues: number;
    minTestCoverage: number;
    minTestsPassed: number;
    maxBuildTimeMs?: number;
    customMetrics?: Array<{
        name: string;
        threshold: number;
        operator: 'gte' | 'lte' | 'eq';
    }>;
}
export interface TestSpecification {
    id: string;
    name?: string;
    type?: 'unit' | 'integration' | 'e2e' | 'functional';
    description: string;
    status: 'pending' | 'passed' | 'failed';
    filePath?: string;
    testFile?: string;
    testFunction?: string;
    testCommand?: string;
    expectedBehavior: string;
    actualBehavior?: string;
    error?: string;
    dependencies?: string[];
}
export interface MetricsThreshold {
    qualityScore: number;
    testCoverage: number;
    buildTime: number;
    codeSize: number;
    cyclomaticComplexity: number;
}
export interface GoalDefinition {
    id: string;
    title: string;
    description: string;
    successCriteria: SuccessCriteria;
    testSpecs: TestSpecification[];
    acceptanceCriteria: string[];
    metricsThresholds: MetricsThreshold;
    priority: number;
    deadline?: string;
    context: {
        issueNumber?: number;
        taskId?: string;
        previousAttempts: number;
        feedbackHistory: FeedbackRecord[];
    };
}
export interface ActualMetrics {
    qualityScore: number;
    eslintErrors: number;
    typeScriptErrors: number;
    securityIssues: number;
    testCoverage: number;
    testsPassed: number;
    testsFailed?: number;
    buildTimeMs: number;
    linesOfCode?: number;
    cyclomaticComplexity?: number;
    customMetrics?: Record<string, number>;
}
export interface ValidationResult {
    criterion: string;
    expected: number;
    actual: number;
    passed: boolean;
    scoreImpact: number;
    feedback: string;
}
export interface GapAnalysis {
    metric: string;
    expected: number;
    actual: number;
    gap: number;
    gapPercentage: number;
    severity: 'critical' | 'high' | 'medium' | 'low';
}
export interface NextAction {
    id: string;
    type: 'fix' | 'test' | 'refactor' | 'document';
    description: string;
    priority: number;
    estimatedImpact: number;
    targetMetric: string;
}
export interface ConsumptionReport {
    goalId: string;
    sessionId: string;
    timestamp: string;
    validationResults: ValidationResult[];
    overallScore: number;
    goalAchieved: boolean;
    actualMetrics: ActualMetrics;
    gaps: GapAnalysis[];
    recommendations: string[];
    nextActions: NextAction[];
}
export interface FeedbackRecord {
    timestamp: string;
    type: 'positive' | 'constructive' | 'corrective' | 'escalation';
    score: number;
    summary: string;
    details: string[];
    codeExamples: Array<{
        issue: string;
        current: string;
        suggested: string;
    }>;
    actionItems: NextAction[];
    references: string[];
}
export interface IterationRecord {
    iteration: number;
    timestamp: string;
    goalDefinition: GoalDefinition;
    consumptionReport: ConsumptionReport;
    feedback: FeedbackRecord;
    durationMs: number;
    scoreImprovement: number;
}
export interface ConvergenceMetrics {
    scoreHistory: number[];
    scoreVariance: number;
    improvementRate: number;
    isConverging: boolean;
    estimatedIterationsToConverge?: number;
}
export interface GoalRefinement {
    timestamp: string;
    reason: string;
    originalGoal: GoalDefinition;
    refinedGoal: GoalDefinition;
    changes: Array<{
        field: string;
        before: any;
        after: any;
        reason: string;
    }>;
    expectedImpact: string;
}
export interface FeedbackLoop {
    loopId: string;
    goalId: string;
    iteration: number;
    maxIterations: number;
    startTime: string;
    lastIterationTime: string;
    status: 'running' | 'converged' | 'diverged' | 'max_iterations_reached' | 'escalated';
    iterations: IterationRecord[];
    convergenceMetrics: ConvergenceMetrics;
    autoRefinementEnabled: boolean;
    refinementHistory: GoalRefinement[];
}
export interface Escalation {
    loopId: string;
    reason: string;
    escalationLevel: 'TechLead' | 'PO' | 'CISO' | 'CTO';
    severity: 'low' | 'medium' | 'high' | 'critical';
    context: Record<string, any>;
}
//# sourceMappingURL=feedback-loop-types.d.ts.map