/**
 * Ω-System Adapters
 *
 * Bridge between existing Agent system and Ω-System.
 * Provides converters for Issue → IntentSpace, Context → WorldSpace, etc.
 *
 * @module omega-system/adapters
 */
export { IssueToIntentAdapter, issueToIntent } from './issue-to-intent';
export { ContextToWorldAdapter, contextToWorld, createWorldFromEnvironment, } from './context-to-world';
export type { ExecutionContext } from './context-to-world';
export { DeliverableToReportAdapter, deliverableToReport, summarizeReport, } from './deliverable-to-report';
export type { ExecutionReport } from './deliverable-to-report';
export { OmegaAgentAdapter, createOmegaAdapter, executeWithOmega, } from './omega-agent-adapter';
export type { AgentExecutionRequest, AgentExecutionResponse, } from './omega-agent-adapter';
//# sourceMappingURL=index.d.ts.map