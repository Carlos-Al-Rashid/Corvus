/**
 * Global Metrics Collector Stub
 *
 * This is a local stub that provides a no-op implementation of the metrics collector.
 * The actual dashboard metrics collection is handled by .claude/monitoring/metrics-collector.ts
 * which runs as a separate process.
 */
/**
 * MetricsCollectorStub - No-op implementation for package isolation
 */
class MetricsCollectorStub {
    onAgentStart(_agentType, _taskId, _taskTitle) {
        // No-op - actual metrics collected by external dashboard process
    }
    onAgentComplete(_agentType, _taskId, _metrics) {
        // No-op - actual metrics collected by external dashboard process
    }
    onAgentFailed(_agentType, _taskId, _errorMessage, _durationMs) {
        // No-op - actual metrics collected by external dashboard process
    }
}
export const globalMetricsCollector = new MetricsCollectorStub();
//# sourceMappingURL=global-metrics.js.map