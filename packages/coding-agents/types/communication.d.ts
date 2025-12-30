/**
 * Agent Communication Protocol - Type Definitions
 *
 * Standardized messaging protocol for inter-agent communication
 * Issue: #139 - Agent Communication Protocol定義
 */
import { AgentType, Task, AgentResult, EscalationInfo, AgentStatus } from './index';
/**
 * AgentMessage - Standard message format for inter-agent communication
 *
 * @template T - Payload type (specific to message type)
 */
export interface AgentMessage<T = unknown> {
    /** Unique message ID (UUID v4) */
    id: string;
    /** Sender agent type */
    from: AgentType;
    /** Recipient agent type */
    to: AgentType;
    /** Message type (determines payload structure) */
    type: MessageType;
    /** Priority level (affects message queue ordering) */
    priority: MessagePriority;
    /** Message payload (type-safe based on MessageType) */
    payload: T;
    /** ISO 8601 timestamp */
    timestamp: string;
    /** Correlation ID for request-response tracking */
    correlationId?: string;
    /** Message ID to reply to (for responses) */
    replyTo?: string;
    /** Time-to-live in milliseconds (optional) */
    ttl?: number;
}
/**
 * MessageType - Supported message types
 */
export declare enum MessageType {
    /** Task assignment from Coordinator to Specialist */
    TASK_ASSIGNMENT = "task-assignment",
    /** Status update during task execution */
    STATUS_UPDATE = "status-update",
    /** Escalation request to higher authority */
    ESCALATION = "escalation",
    /** Task completion result report */
    RESULT_REPORT = "result-report",
    /** Error report during execution */
    ERROR_REPORT = "error-report",
    /** Heartbeat for health monitoring */
    HEARTBEAT = "heartbeat",
    /** Request for agent capability information */
    CAPABILITY_QUERY = "capability-query",
    /** Agent capability response */
    CAPABILITY_RESPONSE = "capability-response"
}
/**
 * MessagePriority - Message priority levels
 *
 * Lower numbers = higher priority
 */
export declare enum MessagePriority {
    /** Critical - immediate processing required */
    CRITICAL = 0,
    /** High - process soon */
    HIGH = 1,
    /** Medium - standard priority */
    MEDIUM = 2,
    /** Low - process when available */
    LOW = 3
}
/**
 * MessageResponse - Standard response format
 *
 * @template T - Response payload type
 */
export interface MessageResponse<T = unknown> {
    /** ID of the original message */
    messageId: string;
    /** Success flag */
    success: boolean;
    /** Response payload (optional) */
    payload?: T;
    /** Error message (if failed) */
    error?: string;
    /** ISO 8601 timestamp */
    timestamp: string;
    /** Processing duration in milliseconds */
    durationMs?: number;
}
/**
 * TaskAssignmentPayload - Payload for TASK_ASSIGNMENT messages
 */
export interface TaskAssignmentPayload {
    task: Task;
    deadline?: string;
    context?: Record<string, any>;
}
/**
 * StatusUpdatePayload - Payload for STATUS_UPDATE messages
 */
export interface StatusUpdatePayload {
    taskId: string;
    status: AgentStatus;
    progress?: number;
    message?: string;
    estimatedCompletion?: string;
}
/**
 * EscalationPayload - Payload for ESCALATION messages
 */
export interface EscalationPayload {
    taskId: string;
    escalation: EscalationInfo;
    blockedBy?: string;
    requiredAction?: string;
}
/**
 * ResultReportPayload - Payload for RESULT_REPORT messages
 */
export interface ResultReportPayload {
    taskId: string;
    result: AgentResult;
    artifacts?: {
        filesCreated?: string[];
        filesModified?: string[];
        commitSha?: string;
    };
}
/**
 * ErrorReportPayload - Payload for ERROR_REPORT messages
 */
export interface ErrorReportPayload {
    taskId: string;
    errorMessage: string;
    errorCode?: string;
    stackTrace?: string;
    context?: Record<string, any>;
}
/**
 * HeartbeatPayload - Payload for HEARTBEAT messages
 */
export interface HeartbeatPayload {
    agentType: AgentType;
    status: 'idle' | 'busy' | 'degraded';
    currentLoad: number;
    availableCapacity: number;
}
/**
 * CapabilityQueryPayload - Payload for CAPABILITY_QUERY messages
 */
export interface CapabilityQueryPayload {
    requestedCapabilities?: string[];
}
/**
 * CapabilityResponsePayload - Payload for CAPABILITY_RESPONSE messages
 */
export interface CapabilityResponsePayload {
    agentType: AgentType;
    capabilities: {
        taskTypes: string[];
        maxConcurrentTasks: number;
        supportedFeatures: string[];
    };
}
/**
 * isAgentMessage - Type guard for AgentMessage
 */
export declare function isAgentMessage(obj: any): obj is AgentMessage;
/**
 * isMessageResponse - Type guard for MessageResponse
 */
export declare function isMessageResponse(obj: any): obj is MessageResponse;
/**
 * MessageHandler - Function signature for message handlers
 */
export type MessageHandler<T = unknown> = (message: AgentMessage<T>) => Promise<MessageResponse<any>>;
/**
 * MessageBusConfig - Configuration for MessageBus
 */
export interface MessageBusConfig {
    /** Enable message logging */
    enableLogging?: boolean;
    /** Default message TTL in milliseconds */
    defaultTtl?: number;
    /** Maximum message queue size per agent */
    maxQueueSize?: number;
    /** Enable message persistence */
    enablePersistence?: boolean;
    /** Persistence directory path */
    persistenceDir?: string;
}
//# sourceMappingURL=communication.d.ts.map