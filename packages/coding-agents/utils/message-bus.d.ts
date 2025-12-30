/**
 * MessageBus - Inter-agent messaging infrastructure
 *
 * Provides centralized message routing and delivery between agents
 * Issue: #139 - Agent Communication Protocol定義
 */
import { EventEmitter } from 'events';
import { AgentMessage, MessageResponse, MessageType, MessagePriority, MessageHandler, MessageBusConfig } from '../types/communication';
import { AgentType } from '../types/index';
/**
 * MessageBus - Central message routing and delivery
 *
 * Features:
 * - Agent registration
 * - Message routing
 * - Priority queue management
 * - Message logging and tracing
 * - Error handling
 */
export declare class MessageBus extends EventEmitter {
    private handlers;
    private messageQueue;
    private config;
    private messageLog;
    private isProcessing;
    constructor(config?: MessageBusConfig);
    /**
     * Register an agent message handler
     *
     * @param agentType - Type of agent to register
     * @param handler - Message handler function
     */
    register(agentType: AgentType, handler: MessageHandler): void;
    /**
     * Unregister an agent
     *
     * @param agentType - Type of agent to unregister
     */
    unregister(agentType: AgentType): void;
    /**
     * Check if an agent is registered
     */
    isRegistered(agentType: AgentType): boolean;
    /**
     * Send a message to another agent
     *
     * @param message - Message to send
     * @returns Promise<MessageResponse>
     */
    send<T = unknown>(message: AgentMessage<T>): Promise<MessageResponse>;
    /**
     * Send a message and wait for response
     *
     * @param message - Message to send
     * @param timeoutMs - Timeout in milliseconds
     * @returns Promise<MessageResponse>
     */
    sendAndWait<T = unknown>(message: AgentMessage<T>, timeoutMs?: number): Promise<MessageResponse>;
    /**
     * Enqueue message for processing
     */
    private enqueueMessage;
    /**
     * Process message queue for an agent
     */
    private processQueue;
    /**
     * Create a new message with defaults
     */
    createMessage<T = unknown>(from: AgentType, to: AgentType, type: MessageType, payload: T, priority?: MessagePriority): AgentMessage<T>;
    /**
     * Get queue size for an agent
     */
    getQueueSize(agentType: AgentType): number;
    /**
     * Get total message count across all queues
     */
    getTotalQueueSize(): number;
    /**
     * Get message log (recent messages)
     */
    getMessageLog(limit?: number): AgentMessage[];
    /**
     * Clear message log
     */
    clearMessageLog(): void;
    /**
     * Get registered agents
     */
    getRegisteredAgents(): AgentType[];
    /**
     * Get statistics
     */
    getStats(): {
        registeredAgents: number;
        totalQueueSize: number;
        messageLogSize: number;
        queueSizesByAgent: {
            [k: string]: number;
        };
    };
}
/**
 * Global MessageBus instance
 */
export declare const globalMessageBus: MessageBus;
//# sourceMappingURL=message-bus.d.ts.map