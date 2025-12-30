/**
 * World Space Type Definitions (SWML-compliant)
 *
 * Mathematical Definition: W(t, s, c, r, e) → State
 *
 * The World Space represents the complete execution environment,
 * defined by 5 orthogonal dimensions that together determine system state.
 *
 * Ψ(W) = ∫[t₀→t₁] ∇(s, c, r, e) dt
 *
 * @module types/world
 * @see miyabi_def/generated/world_definition.yaml
 */
/**
 * Time format specification
 */
export interface TimeFormat {
    format: 'ISO 8601' | 'Unix timestamp' | 'Relative';
    timezone: string;
    example?: string;
}
/**
 * Time horizon constraints
 */
export interface TimeHorizon {
    projectDuration: string;
    sprintDuration: string;
    taskTimeout: string;
    maxExecutionTime?: number;
}
/**
 * Time-based constraints
 */
export interface TimeConstraints {
    businessHours: string;
    maintenanceWindow: string;
    deploymentWindow: string;
    blackoutPeriods?: string[];
}
/**
 * Temporal Dimension - tracks time-related context
 */
export interface TemporalDimension {
    currentTime: TimeFormat;
    horizon: TimeHorizon;
    constraints: TimeConstraints;
    timezones: {
        primary: string;
        secondary: string[];
    };
}
/**
 * Physical space definition
 */
export interface PhysicalSpace {
    location: string;
    datacenter: string;
    edgeLocations: string[];
}
/**
 * Digital space definition
 */
export interface DigitalSpace {
    repository: {
        primary: string;
        public?: string;
        private?: string;
    };
    deployment: {
        production: string;
        staging: string;
        preview?: string;
    };
    api: {
        rest?: string;
        graphql?: string;
        websocket?: string;
    };
}
/**
 * Abstract conceptual space
 */
export interface AbstractSpace {
    conceptualLayers: {
        layer0Definition: string;
        layer1Integration: string;
        layer2Implementation: string;
        layer3Data: string;
        layer4Documentation: string;
        layer5Configuration: string;
        layer6Testing: string;
        layer7Deployment: string;
        layer8External: string;
        layer9Legacy?: string;
        layer10Business?: string;
    };
    mathematicalSpaces: {
        intentSpace: string;
        worldSpace: string;
        resultSpace: string;
        taskSpace: string;
    };
}
/**
 * Spatial Dimension - defines where execution occurs
 */
export interface SpatialDimension {
    physical: PhysicalSpace;
    digital: DigitalSpace;
    abstract: AbstractSpace;
}
/**
 * Domain context
 */
export interface DomainContext {
    primary: string;
    subDomains: string[];
}
/**
 * User persona definition
 */
export interface UserPersona {
    name: string;
    description: string;
    needs: string[];
}
/**
 * User context
 */
export interface UserContext {
    types: string[];
    personas: UserPersona[];
    currentUser?: {
        id: string;
        type: string;
        permissions: string[];
    };
}
/**
 * System architecture context
 */
export interface SystemContext {
    projectType: string;
    architecture: {
        primary: string;
        patterns: string[];
    };
    techStack: {
        backend: {
            primary: string;
            frameworks: string[];
        };
        frontend: {
            primary: string;
            frameworks: string[];
        };
        infrastructure: {
            cloud: string;
            edge?: string;
            database: string;
        };
        ai: {
            llms: string[];
            tools: string[];
        };
    };
}
/**
 * Contextual Dimension - provides semantic context
 */
export interface ContextualDimension {
    domain: DomainContext;
    user: UserContext;
    system: SystemContext;
}
/**
 * Computational resources
 */
export interface ComputationalResources {
    cpu: {
        available: number;
        allocated: number;
        maxUtilization: number;
    };
    memory: {
        available: number;
        allocated: number;
        maxUtilization: number;
    };
    gpu?: {
        available: boolean;
        type?: string;
        vram?: number;
    };
}
/**
 * Human resources
 */
export interface HumanResources {
    developers: number;
    reviewers: string[];
    escalationTargets: {
        techLead?: string;
        productOwner?: string;
        ciso?: string;
        cto?: string;
    };
}
/**
 * Information resources
 */
export interface InformationResources {
    documentation: string[];
    codebase: {
        totalFiles: number;
        languages: string[];
        testCoverage?: number;
    };
    knowledgeBase?: {
        vectors: number;
        lastUpdated: string;
    };
}
/**
 * Financial resources
 */
export interface FinancialResources {
    budget: {
        monthly: number;
        currency: string;
    };
    apiCosts: {
        currentSpend: number;
        limit: number;
        warningThreshold: number;
    };
}
/**
 * Resources Dimension - defines available resources
 */
export interface ResourceDimension {
    computational: ComputationalResources;
    human: HumanResources;
    information: InformationResources;
    financial: FinancialResources;
}
/**
 * System load metrics
 */
export interface SystemLoad {
    cpuUtilization: number;
    memoryUtilization: number;
    networkLatency: number;
    queueDepth: number;
}
/**
 * External dependencies
 */
export interface ExternalDependencies {
    apis: Array<{
        name: string;
        status: 'healthy' | 'degraded' | 'down';
        latency: number;
    }>;
    services: Array<{
        name: string;
        status: 'healthy' | 'degraded' | 'down';
    }>;
}
/**
 * Environmental constraints
 */
export interface EnvironmentalConstraints {
    rateLimit: {
        requestsPerMinute: number;
        tokensPerMinute: number;
    };
    concurrency: {
        maxWorkers: number;
        maxWorktrees: number;
    };
    security: {
        requiresReview: boolean;
        allowedOperations: string[];
    };
}
/**
 * External factors
 */
export interface ExternalFactors {
    networkStatus: 'online' | 'offline' | 'degraded';
    maintenanceMode: boolean;
    featureFlags: Record<string, boolean>;
}
/**
 * Environmental Dimension - external conditions affecting execution
 */
export interface EnvironmentalDimension {
    load: SystemLoad;
    dependencies: ExternalDependencies;
    constraints: EnvironmentalConstraints;
    external: ExternalFactors;
}
/**
 * World Space Metadata
 */
export interface WorldMetadata {
    worldId: string;
    worldName: string;
    worldVersion: string;
    formatVersion: string;
    createdAt: string;
    lastUpdated: string;
    maintainer: string;
    license: string;
}
/**
 * World Space - Complete execution environment definition
 *
 * Mathematical representation: W(t, s, c, r, e) → State
 *
 * @example
 * ```typescript
 * const world: WorldSpace = {
 *   metadata: { worldId: 'miyabi-prod', ... },
 *   temporal: { currentTime: { format: 'ISO 8601', ... }, ... },
 *   spatial: { physical: { ... }, digital: { ... }, abstract: { ... } },
 *   contextual: { domain: { ... }, user: { ... }, system: { ... } },
 *   resources: { computational: { ... }, human: { ... }, ... },
 *   environmental: { load: { ... }, dependencies: { ... }, ... }
 * };
 * ```
 */
export interface WorldSpace {
    /** World metadata */
    metadata: WorldMetadata;
    /** t: Temporal Dimension - 時間次元 */
    temporal: TemporalDimension;
    /** s: Spatial Dimension - 空間次元 */
    spatial: SpatialDimension;
    /** c: Contextual Dimension - 文脈次元 */
    contextual: ContextualDimension;
    /** r: Resources Dimension - リソース次元 */
    resources: ResourceDimension;
    /** e: Environmental Dimension - 環境次元 */
    environmental: EnvironmentalDimension;
}
/**
 * World state snapshot at a point in time
 */
export interface WorldState {
    timestamp: string;
    world: WorldSpace;
    hash: string;
}
/**
 * World state delta between two snapshots
 */
export interface WorldStateDelta {
    from: string;
    to: string;
    changes: Array<{
        path: string;
        oldValue: unknown;
        newValue: unknown;
    }>;
}
/**
 * Evaluate current world state
 */
export type WorldStateEvaluator = (world: WorldSpace) => WorldState;
/**
 * Compare two world states
 */
export type WorldStateComparator = (state1: WorldState, state2: WorldState) => WorldStateDelta;
//# sourceMappingURL=world.d.ts.map