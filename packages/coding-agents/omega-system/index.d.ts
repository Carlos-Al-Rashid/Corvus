/**
 * Ω-System: Autonomous Execution Engine
 *
 * Mathematical Foundation: Ω: I × W → R
 *
 * A 6-stage transformation pipeline for autonomous task execution:
 *
 * E = θ₆ ∘ θ₅ ∘ θ₄ ∘ θ₃ ∘ θ₂ ∘ θ₁
 *
 * Where:
 * - θ₁: I × W → S (Understanding)
 * - θ₂: S × W → 𝕋 (Generation)
 * - θ₃: 𝕋 × W → A (Allocation)
 * - θ₄: A → R (Execution)
 * - θ₅: R → D (Integration)
 * - θ₆: D × I × W → K (Learning)
 *
 * @module omega-system
 */
export { OmegaEngine, omega, omegaWithoutLearning, omegaStrict, type OmegaEngineConfig, type OmegaResult, type ExecutionTrace, type PipelineStage, type PipelineState, } from './omega-engine';
export { understanding, validatePlan, type StrategicPlan, type StrategicObjective, type ResourceRequirements, type RiskAssessment, } from './transformations/understanding';
export { generation, validateTaskSet, type TaskSet, type GeneratedTask, type TaskGroup, } from './transformations/generation';
export { allocation, validateAllocation, type AgentAllocation, type AgentCapability, type WorkerAssignment, type ExecutionBatch, } from './transformations/allocation';
export { execution, validateResultSet, retryFailedTasks, type ResultSet, type TaskExecutionResult, type WorkerExecutionResult, type BatchExecutionResult, type ExecutionArtifact, type ExecutionLog, } from './transformations/execution';
export { integration, validateDeliverable, type Deliverable, type CodeChangeSummary, type TestResultsSummary, type PullRequestDraft, type DocumentationUpdate, } from './transformations/integration';
export { learning, validateKnowledge, applyKnowledgeUpdates, type Knowledge, type ExecutionPattern, type PerformanceInsight, type AgentPerformanceRecord, type LessonLearned, type KnowledgeUpdate, type ModelCalibration, } from './transformations/learning';
export { IssueToIntentAdapter, issueToIntent, ContextToWorldAdapter, contextToWorld, createWorldFromEnvironment, DeliverableToReportAdapter, deliverableToReport, summarizeReport, OmegaAgentAdapter, createOmegaAdapter, executeWithOmega, type ExecutionContext, type ExecutionReport, type AgentExecutionRequest, type AgentExecutionResponse, } from './adapters';
//# sourceMappingURL=index.d.ts.map