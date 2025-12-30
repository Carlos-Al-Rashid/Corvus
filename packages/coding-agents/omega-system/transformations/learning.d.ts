/**
 * θ₆: Learning Transform
 *
 * Mathematical Definition: θ₆: D × I × W → K
 *
 * Transforms Deliverable, Intent, and World into Knowledge.
 * Creates feedback loop for continuous improvement.
 *
 * @module omega-system/transformations/learning
 */
import type { IntentSpace } from '../../types/intent';
import type { WorldSpace } from '../../types/world';
import type { Deliverable } from './integration';
/**
 * Pattern extracted from execution
 */
export interface ExecutionPattern {
    patternId: string;
    type: 'success' | 'failure' | 'optimization' | 'anti-pattern';
    description: string;
    frequency: number;
    confidence: number;
    conditions: string[];
    outcomes: string[];
    recommendations: string[];
}
/**
 * Performance insight
 */
export interface PerformanceInsight {
    insightId: string;
    category: 'speed' | 'quality' | 'cost' | 'resource';
    metric: string;
    currentValue: number;
    targetValue: number;
    trend: 'improving' | 'stable' | 'degrading';
    actionable: boolean;
    suggestion?: string;
}
/**
 * Agent performance record
 */
export interface AgentPerformanceRecord {
    agentType: string;
    totalExecutions: number;
    successRate: number;
    averageDurationMs: number;
    averageTokensUsed: number;
    qualityScoreAverage: number;
    strengths: string[];
    weaknesses: string[];
    optimalTaskTypes: string[];
}
/**
 * Lesson learned from execution
 */
export interface LessonLearned {
    lessonId: string;
    timestamp: string;
    severity: 'info' | 'warning' | 'critical';
    domain: string;
    title: string;
    description: string;
    context: {
        intentSummary: string;
        worldContext: string;
        deliverableStatus: string;
    };
    impact: string;
    preventionStrategy?: string;
    relatedPatterns: string[];
}
/**
 * Knowledge update for future executions
 */
export interface KnowledgeUpdate {
    updateId: string;
    timestamp: string;
    type: 'pattern' | 'insight' | 'lesson' | 'calibration';
    target: string;
    payload: Record<string, unknown>;
    priority: number;
    expiresAt?: string;
}
/**
 * Model calibration data
 */
export interface ModelCalibration {
    parameterName: string;
    previousValue: number;
    newValue: number;
    adjustmentReason: string;
    confidence: number;
}
/**
 * Knowledge - Output of θ₆
 *
 * K = θ₆(D, I, W)
 */
export interface Knowledge {
    knowledgeId: string;
    createdAt: string;
    /** Source deliverable */
    sourceDeliverableId: string;
    /** Extracted patterns */
    patterns: ExecutionPattern[];
    /** Performance insights */
    insights: PerformanceInsight[];
    /** Agent performance records */
    agentPerformance: AgentPerformanceRecord[];
    /** Lessons learned */
    lessons: LessonLearned[];
    /** Knowledge updates for future */
    updates: KnowledgeUpdate[];
    /** Model calibrations */
    calibrations: ModelCalibration[];
    /** Summary statistics */
    summary: {
        patternsExtracted: number;
        insightsGenerated: number;
        lessonsLearned: number;
        updatesProposed: number;
        overallLearningScore: number;
    };
    /** Recommendations for next execution */
    recommendations: {
        immediate: string[];
        shortTerm: string[];
        longTerm: string[];
    };
    /** Metadata */
    metadata: {
        learningVersion: string;
        learningTimeMs: number;
        feedbackLoopIteration: number;
    };
}
/**
 * θ₆: Learning Transform
 *
 * Transforms Deliverable (D), Intent (I), and World (W) into Knowledge (K)
 *
 * @param deliverable - The deliverable from θ₅
 * @param intent - The original intent
 * @param world - The world context
 * @returns Knowledge for future improvement
 *
 * @example
 * ```typescript
 * const knowledge = await learning(deliverable, intent, world);
 * console.log(knowledge.recommendations.immediate);
 * ```
 */
export declare function learning(deliverable: Deliverable, intent: IntentSpace, world: WorldSpace): Promise<Knowledge>;
/**
 * Validate knowledge output
 */
export declare function validateKnowledge(knowledge: Knowledge): {
    valid: boolean;
    errors: string[];
};
/**
 * Apply knowledge updates to system
 */
export declare function applyKnowledgeUpdates(knowledge: Knowledge): {
    applied: number;
    skipped: number;
};
//# sourceMappingURL=learning.d.ts.map