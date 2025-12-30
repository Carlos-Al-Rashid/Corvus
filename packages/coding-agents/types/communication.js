/**
 * Agent Communication Protocol - Type Definitions
 *
 * Standardized messaging protocol for inter-agent communication
 * Issue: #139 - Agent Communication Protocol定義
 */
/**
 * MessageType - Supported message types
 */
export var MessageType;
(function (MessageType) {
    /** Task assignment from Coordinator to Specialist */
    MessageType["TASK_ASSIGNMENT"] = "task-assignment";
    /** Status update during task execution */
    MessageType["STATUS_UPDATE"] = "status-update";
    /** Escalation request to higher authority */
    MessageType["ESCALATION"] = "escalation";
    /** Task completion result report */
    MessageType["RESULT_REPORT"] = "result-report";
    /** Error report during execution */
    MessageType["ERROR_REPORT"] = "error-report";
    /** Heartbeat for health monitoring */
    MessageType["HEARTBEAT"] = "heartbeat";
    /** Request for agent capability information */
    MessageType["CAPABILITY_QUERY"] = "capability-query";
    /** Agent capability response */
    MessageType["CAPABILITY_RESPONSE"] = "capability-response";
})(MessageType || (MessageType = {}));
/**
 * MessagePriority - Message priority levels
 *
 * Lower numbers = higher priority
 */
export var MessagePriority;
(function (MessagePriority) {
    /** Critical - immediate processing required */
    MessagePriority[MessagePriority["CRITICAL"] = 0] = "CRITICAL";
    /** High - process soon */
    MessagePriority[MessagePriority["HIGH"] = 1] = "HIGH";
    /** Medium - standard priority */
    MessagePriority[MessagePriority["MEDIUM"] = 2] = "MEDIUM";
    /** Low - process when available */
    MessagePriority[MessagePriority["LOW"] = 3] = "LOW";
})(MessagePriority || (MessagePriority = {}));
// ============================================================================
// Type Guards
// ============================================================================
/**
 * isAgentMessage - Type guard for AgentMessage
 */
export function isAgentMessage(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.from === 'string' &&
        typeof obj.to === 'string' &&
        typeof obj.type === 'string' &&
        typeof obj.priority === 'number' &&
        'payload' in obj &&
        typeof obj.timestamp === 'string');
}
/**
 * isMessageResponse - Type guard for MessageResponse
 */
export function isMessageResponse(obj) {
    return (typeof obj === 'object' &&
        obj !== null &&
        typeof obj.messageId === 'string' &&
        typeof obj.success === 'boolean' &&
        typeof obj.timestamp === 'string');
}
//# sourceMappingURL=communication.js.map