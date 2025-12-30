/**
 * Result Space Type Definitions (SWML-compliant)
 *
 * Mathematical Definition: R(a, m, q) → Deliverable
 *
 * The Result Space captures execution outputs and outcomes,
 * defined by 3 dimensions that together describe deliverables.
 *
 * @module types/result
 * @see miyabi_def/generated/entities.yaml
 */
/**
 * Artifact types
 */
export type ArtifactType = 'code' | 'documentation' | 'data' | 'configuration' | 'test' | 'diagram' | 'report' | 'deployment';
/**
 * Artifact status
 */
export type ArtifactStatus = 'draft' | 'pending-review' | 'approved' | 'rejected' | 'published' | 'archived';
/**
 * Code artifact
 */
export interface CodeArtifact {
    type: 'code';
    path: string;
    language: string;
    content: string;
    operation: 'create' | 'modify' | 'delete';
    linesAdded: number;
    linesRemoved: number;
    hash: string;
}
/**
 * Documentation artifact
 */
export interface DocumentationArtifact {
    type: 'documentation';
    path: string;
    format: 'markdown' | 'html' | 'pdf' | 'docstring';
    content: string;
    sections: string[];
    wordCount: number;
}
/**
 * Data artifact
 */
export interface DataArtifact {
    type: 'data';
    path: string;
    format: 'json' | 'yaml' | 'csv' | 'sql' | 'binary';
    content: string | Buffer;
    schema?: string;
    recordCount?: number;
    sizeBytes: number;
}
/**
 * Configuration artifact
 */
export interface ConfigurationArtifact {
    type: 'configuration';
    path: string;
    format: 'json' | 'yaml' | 'toml' | 'env' | 'ini';
    content: string;
    keys: string[];
    sensitive: boolean;
}
/**
 * Test artifact
 */
export interface TestArtifact {
    type: 'test';
    path: string;
    framework: string;
    testCount: number;
    content: string;
    coverage?: {
        lines: number;
        branches: number;
        functions: number;
    };
}
/**
 * Diagram artifact
 */
export interface DiagramArtifact {
    type: 'diagram';
    path: string;
    format: 'puml' | 'mermaid' | 'svg' | 'png';
    content: string;
    diagramType: 'sequence' | 'class' | 'flowchart' | 'er' | 'architecture';
}
/**
 * Report artifact
 */
export interface ReportArtifact {
    type: 'report';
    path: string;
    format: 'markdown' | 'json' | 'html';
    content: string;
    reportType: 'quality' | 'security' | 'performance' | 'summary';
    metrics: Record<string, number | string>;
}
/**
 * Deployment artifact
 */
export interface DeploymentArtifact {
    type: 'deployment';
    environment: 'staging' | 'production';
    version: string;
    url: string;
    deployedAt: string;
    status: 'success' | 'failed' | 'rolled-back';
}
/**
 * Union type for all artifacts
 */
export type Artifact = CodeArtifact | DocumentationArtifact | DataArtifact | ConfigurationArtifact | TestArtifact | DiagramArtifact | ReportArtifact | DeploymentArtifact;
/**
 * Artifact collection with metadata
 */
export interface ArtifactCollection {
    artifacts: Artifact[];
    totalCount: number;
    byType: Record<ArtifactType, number>;
    totalSizeBytes: number;
}
/**
 * Artifacts Dimension - tangible outputs
 */
export interface ArtifactsDimension {
    code: CodeArtifact[];
    documentation: DocumentationArtifact[];
    data: DataArtifact[];
    configuration: ConfigurationArtifact[];
    tests: TestArtifact[];
    diagrams: DiagramArtifact[];
    reports: ReportArtifact[];
    deployments: DeploymentArtifact[];
    summary: ArtifactCollection;
}
/**
 * Execution timing metadata
 */
export interface TimingMetadata {
    startedAt: string;
    completedAt: string;
    durationMs: number;
    phases: Array<{
        name: string;
        startedAt: string;
        durationMs: number;
    }>;
}
/**
 * Resource usage metadata
 */
export interface ResourceUsageMetadata {
    cpu: {
        peakUtilization: number;
        averageUtilization: number;
    };
    memory: {
        peakMB: number;
        averageMB: number;
    };
    apiCalls: {
        total: number;
        byService: Record<string, number>;
    };
    tokens: {
        input: number;
        output: number;
        total: number;
        cost?: number;
    };
}
/**
 * Dependency metadata
 */
export interface DependencyMetadata {
    inputs: Array<{
        type: string;
        source: string;
        version?: string;
    }>;
    outputs: Array<{
        type: string;
        destination: string;
        version?: string;
    }>;
    externalServices: string[];
}
/**
 * Agent execution metadata
 */
export interface AgentMetadata {
    agentType: string;
    agentVersion: string;
    sessionId: string;
    taskId: string;
    worktreePath?: string;
    configuration: Record<string, unknown>;
}
/**
 * Provenance metadata for traceability
 */
export interface ProvenanceMetadata {
    issueNumber?: number;
    prNumber?: number;
    commitHash?: string;
    branch: string;
    triggeredBy: string;
    parentExecution?: string;
}
/**
 * Metadata Dimension - execution context and traceability
 */
export interface MetadataDimension {
    timing: TimingMetadata;
    resources: ResourceUsageMetadata;
    dependencies: DependencyMetadata;
    agent: AgentMetadata;
    provenance: ProvenanceMetadata;
}
/**
 * Quality score breakdown
 */
export interface QualityScores {
    overall: number;
    codeQuality: number;
    typeScript: number;
    security: number;
    testCoverage: number;
    documentation: number;
    performance: number;
}
/**
 * Quality issue
 */
export interface QualityIssueDetail {
    id: string;
    category: 'code' | 'security' | 'performance' | 'documentation' | 'test';
    severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
    message: string;
    file?: string;
    line?: number;
    column?: number;
    rule?: string;
    suggestion?: string;
    autoFixable: boolean;
}
/**
 * Completeness assessment
 */
export interface CompletenessAssessment {
    requirementsCovered: number;
    testsCovering: number;
    documentedItems: number;
    missingItems: string[];
}
/**
 * Accuracy assessment
 */
export interface AccuracyAssessment {
    syntaxErrors: number;
    typeErrors: number;
    logicIssues: number;
    regressions: number;
    verified: boolean;
}
/**
 * Efficiency assessment
 */
export interface EfficiencyAssessment {
    codeReuse: number;
    duplication: number;
    complexity: {
        cyclomatic: number;
        cognitive: number;
    };
    bundleSize?: number;
}
/**
 * Quality Dimension - assessment of output quality
 */
export interface QualityDimension {
    scores: QualityScores;
    issues: QualityIssueDetail[];
    completeness: CompletenessAssessment;
    accuracy: AccuracyAssessment;
    efficiency: EfficiencyAssessment;
    passed: boolean;
    approved: boolean;
    recommendations: string[];
}
/**
 * Result status
 */
export type ResultStatus = 'success' | 'partial-success' | 'failed' | 'cancelled' | 'escalated';
/**
 * Result metadata
 */
export interface ResultMetadata {
    resultId: string;
    status: ResultStatus;
    createdAt: string;
    version: number;
}
/**
 * Result Space - Complete execution outcome
 *
 * Mathematical representation: R(a, m, q) → Deliverable
 *
 * @example
 * ```typescript
 * const result: ResultSpace = {
 *   metadata: { resultId: 'res-123', status: 'success', ... },
 *   artifacts: { code: [...], documentation: [...], ... },
 *   executionMetadata: { timing: {...}, resources: {...}, ... },
 *   quality: { scores: {...}, issues: [...], ... }
 * };
 * ```
 */
export interface ResultSpace {
    /** Result metadata */
    metadata: ResultMetadata;
    /** a: Artifacts Dimension - 成果物次元 */
    artifacts: ArtifactsDimension;
    /** m: Metadata Dimension - メタデータ次元 */
    executionMetadata: MetadataDimension;
    /** q: Quality Dimension - 品質次元 */
    quality: QualityDimension;
}
/**
 * Result summary for quick overview
 */
export interface ResultSummary {
    status: ResultStatus;
    duration: string;
    artifactCount: number;
    qualityScore: number;
    issueCount: number;
    recommendations: string[];
}
/**
 * Result comparison between two executions
 */
export interface ResultComparison {
    baseline: ResultSpace;
    current: ResultSpace;
    improvements: string[];
    regressions: string[];
    unchanged: string[];
    scoreDelta: number;
}
/**
 * Generate result summary
 */
export type ResultSummarizer = (result: ResultSpace) => ResultSummary;
/**
 * Compare two results
 */
export type ResultComparator = (baseline: ResultSpace, current: ResultSpace) => ResultComparison;
/**
 * Validate result meets requirements
 */
export type ResultValidator = (result: ResultSpace, requirements: Record<string, unknown>) => {
    valid: boolean;
    violations: string[];
};
//# sourceMappingURL=result.d.ts.map