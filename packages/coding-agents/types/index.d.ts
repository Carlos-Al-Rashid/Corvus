/**
 * Agent Types and Interfaces
 *
 * Core type definitions for the Autonomous Operations Agent system
 */
export type AgentStatus = 'idle' | 'running' | 'completed' | 'failed' | 'escalated';
export type EscalationTarget = 'TechLead' | 'PO' | 'CISO' | 'CTO' | 'DevOps';
export type AgentType = 'CoordinatorAgent' | 'CodeGenAgent' | 'ReviewAgent' | 'IssueAgent' | 'PRAgent' | 'DeploymentAgent' | 'AutoFixAgent' | 'WaterSpiderAgent';
export type Severity = 'Sev.1-Critical' | 'Sev.2-High' | 'Sev.3-Medium' | 'Sev.4-Low' | 'Sev.5-Trivial';
export type ImpactLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export interface Task {
    id: string;
    title: string;
    description: string;
    type: 'feature' | 'bug' | 'refactor' | 'docs' | 'test' | 'deployment';
    priority: number;
    severity?: Severity;
    impact?: ImpactLevel;
    assignedAgent?: AgentType;
    dependencies: string[];
    estimatedDuration?: number;
    status?: AgentStatus;
    startTime?: number;
    endTime?: number;
    metadata?: Record<string, any>;
}
export interface Issue {
    number: number;
    title: string;
    body: string;
    state: 'open' | 'closed';
    labels: string[];
    assignee?: string;
    createdAt: string;
    updatedAt: string;
    url: string;
}
export interface DAG {
    nodes: Task[];
    edges: Array<{
        from: string;
        to: string;
    }>;
    levels: string[][];
}
export interface TaskGroup {
    groupId: string;
    tasks: Task[];
    agent: AgentType;
    priority: number;
    estimatedDurationMs: number;
    worktreePath: string;
    level: number;
}
export interface GroupingConfig {
    minGroupSize: number;
    maxGroupSize: number;
    maxConcurrentGroups: number;
    priorityWeight: number;
    durationWeight: number;
    agentWeight: number;
}
export interface AgentResult {
    status: 'success' | 'failed' | 'escalated';
    data?: any;
    error?: string;
    metrics?: Partial<AgentMetrics>;
    escalation?: EscalationInfo;
}
export interface AgentMetrics {
    taskId: string;
    agentType: AgentType;
    durationMs: number;
    qualityScore?: number;
    linesChanged?: number;
    testsAdded?: number;
    coveragePercent?: number;
    errorsFound?: number;
    timestamp: string;
}
export interface EscalationInfo {
    reason: string;
    target: EscalationTarget;
    severity: Severity;
    context: Record<string, any>;
    timestamp: string;
}
export interface QualityReport {
    score: number;
    passed: boolean;
    issues: QualityIssue[];
    recommendations: string[];
    breakdown: {
        eslintScore: number;
        typeScriptScore: number;
        securityScore: number;
        testCoverageScore: number;
    };
}
export interface QualityIssue {
    type: 'eslint' | 'typescript' | 'security' | 'coverage';
    severity: 'critical' | 'high' | 'medium' | 'low';
    message: string;
    file?: string;
    line?: number;
    column?: number;
    scoreImpact: number;
}
export interface TaskDecomposition {
    originalIssue: Issue;
    tasks: Task[];
    dag: DAG;
    estimatedTotalDuration: number;
    hasCycles: boolean;
    recommendations: string[];
}
export interface ExecutionPlan {
    sessionId: string;
    deviceIdentifier: string;
    concurrency: number;
    tasks: Task[];
    dag: DAG;
    estimatedDuration: number;
    startTime: number;
}
export interface ExecutionReport {
    sessionId: string;
    deviceIdentifier: string;
    startTime: number;
    endTime: number;
    totalDurationMs: number;
    summary: {
        total: number;
        completed: number;
        failed: number;
        escalated: number;
        successRate: number;
    };
    tasks: TaskResult[];
    metrics: AgentMetrics[];
    escalations: EscalationInfo[];
}
export interface TaskResult {
    taskId: string;
    status: AgentStatus;
    agentType: AgentType;
    durationMs: number;
    result?: AgentResult;
    error?: string;
}
export interface CodeSpec {
    feature: string;
    requirements: string[];
    context: {
        existingFiles: string[];
        architecture: string;
        dependencies: string[];
    };
    constraints: string[];
}
export interface GeneratedCode {
    files: Array<{
        path: string;
        content: string;
        type: 'new' | 'modified';
    }>;
    tests: Array<{
        path: string;
        content: string;
    }>;
    documentation: string;
    summary: string;
}
export interface ReviewRequest {
    files: string[];
    branch: string;
    context: string;
}
export interface ReviewResult {
    qualityReport: QualityReport;
    approved: boolean;
    escalationRequired: boolean;
    escalationTarget?: EscalationTarget;
    comments: ReviewComment[];
}
export interface ReviewComment {
    file: string;
    line: number;
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    message: string;
    suggestion?: string;
}
export interface PRRequest {
    title: string;
    body: string;
    baseBranch: string;
    headBranch: string;
    draft: boolean;
    issueNumber?: number;
    labels?: string[];
    reviewers?: string[];
}
export interface PRResult {
    number: number;
    url: string;
    state: 'draft' | 'open' | 'merged' | 'closed';
    createdAt: string;
}
export interface DeploymentConfig {
    environment: 'staging' | 'production';
    version: string;
    projectId: string;
    targets: string[];
    skipTests?: boolean;
    autoRollback: boolean;
    healthCheckUrl: string;
}
export interface DeploymentResult {
    environment: 'staging' | 'production';
    version: string;
    projectId: string;
    deploymentUrl: string;
    deployedAt: string;
    durationMs: number;
    status: 'success' | 'failed' | 'rolled_back';
}
export interface CodexPromptChain {
    intent: string;
    plan: string[];
    implementation: string[];
    verification: string[];
}
export interface ToolInvocation {
    command: string;
    workdir: string;
    timestamp: string;
    status: 'passed' | 'failed';
    notes: string;
    output?: string;
    error?: string;
}
export interface LDDLog {
    sessionId: string;
    date: string;
    deviceIdentifier: string;
    codexPromptChain: CodexPromptChain;
    toolInvocations: ToolInvocation[];
    memoryBankUpdates: string[];
    nextSteps: string;
}
export interface WorkerPool {
    maxConcurrency: number;
    activeWorkers: number;
    queue: Task[];
    running: Map<string, Task>;
    completed: Map<string, TaskResult>;
    failed: Map<string, TaskResult>;
}
export interface ProgressStatus {
    total: number;
    completed: number;
    running: number;
    waiting: number;
    failed: number;
    percentage: number;
}
export interface AgentConfig {
    deviceIdentifier: string;
    githubToken: string;
    useTaskTool: boolean;
    useWorktree: boolean;
    worktreeBasePath?: string;
    logDirectory: string;
    reportDirectory: string;
    techLeadGithubUsername?: string;
    cisoGithubUsername?: string;
    poGithubUsername?: string;
    firebaseProductionProject?: string;
    firebaseStagingProject?: string;
    productionUrl?: string;
    stagingUrl?: string;
    useOmegaSystem?: boolean;
    timeoutMs?: number;
}
export interface ExecutionOptions {
    issues?: number[];
    todos?: string[];
    concurrency: number;
    dryRun?: boolean;
    ignoreDependencies?: boolean;
    timeout?: number;
}
export declare class AgentError extends Error {
    agentType: AgentType;
    taskId?: string | undefined;
    cause?: Error | undefined;
    constructor(message: string, agentType: AgentType, taskId?: string | undefined, cause?: Error | undefined);
}
export declare class EscalationError extends Error {
    target: EscalationTarget;
    severity: Severity;
    context: Record<string, any>;
    constructor(message: string, target: EscalationTarget, severity: Severity, context: Record<string, any>);
}
export declare class CircularDependencyError extends Error {
    cycle: string[];
    constructor(message: string, cycle: string[]);
}
export interface DiscordCommunity {
    serverId: string;
    serverName: string;
    channels: DiscordChannel[];
    roles: DiscordRole[];
    members: number;
    webhooks: WebhookConfig[];
    botIntegrations: BotConfig[];
    createdAt: string;
}
export interface DiscordChannel {
    id: string;
    name: string;
    type: 'text' | 'voice' | 'forum';
    category: string;
    purpose: string;
}
export interface DiscordRole {
    id: string;
    name: string;
    level: number;
    requirements: string;
}
export interface WebhookConfig {
    channelId: string;
    webhookUrl: string;
    triggerEvents: string[];
}
export interface BotConfig {
    name: string;
    enabled: boolean;
    commands: BotCommand[];
}
export interface BotCommand {
    name: string;
    description: string;
    usage: string;
}
/**
 * Issue State - 8 types covering complete lifecycle
 */
export type IssueState = 'pending' | 'analyzing' | 'implementing' | 'reviewing' | 'deploying' | 'done' | 'blocked' | 'failed';
/**
 * State Transition - tracks state changes
 */
export interface StateTransition {
    from: IssueState;
    to: IssueState;
    timestamp: string;
    triggeredBy: string;
    reason?: string;
}
/**
 * Agent Execution Record - tracks individual agent runs
 */
export interface AgentExecution {
    agentType: AgentType;
    taskId?: string;
    startTime: string;
    endTime?: string;
    durationMs?: number;
    status: AgentStatus;
    result?: AgentResult;
    error?: string;
}
/**
 * Label Change Record - tracks label modifications
 */
export interface LabelChange {
    timestamp: string;
    action: 'added' | 'removed';
    label: string;
    performedBy: string;
}
/**
 * Trace Note - manual annotations
 */
export interface TraceNote {
    timestamp: string;
    author: string;
    content: string;
    tags?: string[];
}
/**
 * Issue Trace Log - complete lifecycle tracking
 */
export interface IssueTraceLog {
    issueNumber: number;
    issueTitle: string;
    issueUrl: string;
    createdAt: string;
    closedAt?: string;
    currentState: IssueState;
    stateTransitions: StateTransition[];
    agentExecutions: AgentExecution[];
    totalTasks: number;
    completedTasks: number;
    failedTasks: number;
    labelChanges: LabelChange[];
    currentLabels: string[];
    qualityReports: QualityReport[];
    finalQualityScore?: number;
    pullRequests: PRResult[];
    deployments: DeploymentResult[];
    escalations: EscalationInfo[];
    notes: TraceNote[];
    metadata: {
        deviceIdentifier: string;
        sessionIds: string[];
        totalDurationMs?: number;
        lastUpdated: string;
    };
}
export * from './performance-metrics';
export * from './feedback-loop-types';
export type { WorktreeInfo, WorktreeManagerConfig, WorktreeExecutionContext } from '../worktree/worktree-manager';
export { EntityLevel, RelationStrength, EntityRelationMap, WorkflowTemplate, type Entity, type Relation } from './entity-relation-mapping';
export { MessageType, MessagePriority, isAgentMessage, isMessageResponse, type AgentMessage, type MessageResponse, type TaskAssignmentPayload, type StatusUpdatePayload, type EscalationPayload, type ResultReportPayload, type ErrorReportPayload, type HeartbeatPayload, type CapabilityQueryPayload, type CapabilityResponsePayload, type MessageHandler, type MessageBusConfig, } from './communication';
export * from './world';
export * from './intent';
export * from './result';
export * from './omega';
//# sourceMappingURL=index.d.ts.map