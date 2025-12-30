/**
 * Performance Metrics Types
 *
 * Defines metrics for monitoring Task Tool parallel execution performance.
 * Tracks system resources, execution times, and success rates.
 */
export interface PerformanceMetrics {
    sessionId: string;
    timestamp: number;
    system: SystemMetrics;
    execution: ExecutionMetrics;
    resources: ResourceMetrics;
    quality: QualityMetrics;
    cost: CostMetrics;
}
export interface SystemMetrics {
    cpuUsagePercent: number;
    memoryUsedMB: number;
    memoryTotalMB: number;
    memoryUsagePercent: number;
    diskUsedMB: number;
    diskTotalMB: number;
    loadAverage: number[];
    platform: string;
    arch: string;
    nodeVersion: string;
}
export interface ExecutionMetrics {
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    runningTasks: number;
    pendingTasks: number;
    totalGroups: number;
    completedGroups: number;
    failedGroups: number;
    runningGroups: number;
    successRate: number;
    throughput: number;
    averageTaskDurationMs: number;
    medianTaskDurationMs: number;
    p95TaskDurationMs: number;
    p99TaskDurationMs: number;
    totalDurationMs: number;
    estimatedRemainingMs: number;
}
export interface ResourceMetrics {
    totalWorktrees: number;
    activeWorktrees: number;
    worktreeDiskUsageMB: number;
    currentConcurrency: number;
    maxConcurrency: number;
    optimalConcurrency: number;
    concurrencyUtilization: number;
    gitOperationsCount: number;
    gitOperationsTotalMs: number;
    gitOperationsAvgMs: number;
}
export interface QualityMetrics {
    averageQualityScore: number;
    excellentCount: number;
    goodCount: number;
    acceptableCount: number;
    poorCount: number;
    typeScriptErrors: number;
    eslintErrors: number;
    eslintWarnings: number;
    testCoverage: number;
}
export interface CostMetrics {
    apiCallsCount: number;
    totalInputTokens: number;
    totalOutputTokens: number;
    estimatedCostUSD: number;
    cpuTimeMs: number;
    estimatedComputeCostUSD: number;
    totalEstimatedCostUSD: number;
}
export interface MetricsSnapshot {
    timestamp: number;
    metrics: PerformanceMetrics;
}
export interface MetricsHistory {
    sessionId: string;
    snapshots: MetricsSnapshot[];
    startTime: number;
    endTime?: number;
}
export interface MetricsTrend {
    metric: keyof PerformanceMetrics;
    values: number[];
    timestamps: number[];
    trend: 'increasing' | 'decreasing' | 'stable';
    changeRate: number;
}
export interface PerformanceAlert {
    severity: 'critical' | 'warning' | 'info';
    metric: string;
    message: string;
    value: number;
    threshold: number;
    timestamp: number;
    suggestion?: string;
}
export interface PerformanceReport {
    sessionId: string;
    startTime: number;
    endTime: number;
    durationMs: number;
    summary: {
        totalTasks: number;
        successRate: number;
        averageThroughput: number;
        totalCostUSD: number;
    };
    metrics: PerformanceMetrics;
    history: MetricsHistory;
    trends: MetricsTrend[];
    alerts: PerformanceAlert[];
    recommendations: string[];
}
//# sourceMappingURL=performance-metrics.d.ts.map