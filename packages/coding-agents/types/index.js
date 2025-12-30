/**
 * Agent Types and Interfaces
 *
 * Core type definitions for the Autonomous Operations Agent system
 */
// ============================================================================
// Error Types
// ============================================================================
export class AgentError extends Error {
    agentType;
    taskId;
    cause;
    constructor(message, agentType, taskId, cause) {
        super(message);
        this.agentType = agentType;
        this.taskId = taskId;
        this.cause = cause;
        this.name = 'AgentError';
    }
}
export class EscalationError extends Error {
    target;
    severity;
    context;
    constructor(message, target, severity, context) {
        super(message);
        this.target = target;
        this.severity = severity;
        this.context = context;
        this.name = 'EscalationError';
    }
}
export class CircularDependencyError extends Error {
    cycle;
    constructor(message, cycle) {
        super(message);
        this.cycle = cycle;
        this.name = 'CircularDependencyError';
    }
}
// ============================================================================
// Performance Metrics Types (E15)
// ============================================================================
export * from './performance-metrics';
// ============================================================================
// Feedback Loop System Types
// ============================================================================
export * from './feedback-loop-types';
// Entity Relation Mapping types (N1/N2/N3 notation)
export { EntityLevel, RelationStrength, EntityRelationMap, WorkflowTemplate } from './entity-relation-mapping';
// ============================================================================
// Agent Communication Protocol (Issue #139)
// ============================================================================
export { MessageType, MessagePriority, isAgentMessage, isMessageResponse, } from './communication';
// ============================================================================
// SWML (Shunsuke World Model Logic) Types - Ω-System (#217)
// ============================================================================
// World Space Types (W) - 5 dimensions: temporal, spatial, contextual, resources, environmental
export * from './world';
// Intent Space Types (I) - 4 dimensions: goals, preferences, objectives, modality
export * from './intent';
// Result Space Types (R) - 3 dimensions: artifacts, metadata, quality
export * from './result';
// Omega Function Types (Ω: I × W → R)
export * from './omega';
//# sourceMappingURL=index.js.map