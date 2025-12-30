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
// Main engine
export { OmegaEngine, omega, omegaWithoutLearning, omegaStrict, } from './omega-engine';
// θ₁: Understanding Transform
export { understanding, validatePlan, } from './transformations/understanding';
// θ₂: Generation Transform
export { generation, validateTaskSet, } from './transformations/generation';
// θ₃: Allocation Transform
export { allocation, validateAllocation, } from './transformations/allocation';
// θ₄: Execution Transform
export { execution, validateResultSet, retryFailedTasks, } from './transformations/execution';
// θ₅: Integration Transform
export { integration, validateDeliverable, } from './transformations/integration';
// θ₆: Learning Transform
export { learning, validateKnowledge, applyKnowledgeUpdates, } from './transformations/learning';
// Adapters (Bridge to existing Agent system)
export { 
// Issue to Intent
IssueToIntentAdapter, issueToIntent, 
// Context to World
ContextToWorldAdapter, contextToWorld, createWorldFromEnvironment, 
// Deliverable to Report
DeliverableToReportAdapter, deliverableToReport, summarizeReport, 
// Main adapter
OmegaAgentAdapter, createOmegaAdapter, executeWithOmega, } from './adapters';
//# sourceMappingURL=index.js.map