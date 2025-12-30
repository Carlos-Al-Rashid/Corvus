/**
 * θ₁: Understanding Transform
 *
 * Mathematical Definition: θ₁: I × W → S
 *
 * Transforms Intent Space and World Space into a Strategic Plan.
 * This is the first stage of the Ω-System execution pipeline.
 *
 * @module omega-system/transformations/understanding
 */
import type { IntentSpace, GoalPriority } from '../../types/intent';
import type { WorldSpace } from '../../types/world';
/**
 * Strategic objective derived from goals
 */
export interface StrategicObjective {
    id: string;
    sourceGoalId: string;
    description: string;
    priority: GoalPriority;
    estimatedComplexity: 'trivial' | 'simple' | 'moderate' | 'complex' | 'very-complex';
    requiredCapabilities: string[];
    constraints: string[];
    successMetrics: Array<{
        metric: string;
        target: number | string;
        weight: number;
    }>;
}
/**
 * Resource requirements analysis
 */
export interface ResourceRequirements {
    computational: {
        estimatedTokens: number;
        estimatedDurationMs: number;
        parallelizable: boolean;
    };
    human: {
        reviewRequired: boolean;
        approvalRequired: boolean;
        escalationLikelihood: number;
    };
    information: {
        requiredContext: string[];
        knowledgeGaps: string[];
    };
}
/**
 * Risk assessment
 */
export interface RiskAssessment {
    overallRisk: 'low' | 'medium' | 'high' | 'critical';
    factors: Array<{
        factor: string;
        severity: 'low' | 'medium' | 'high';
        mitigation?: string;
    }>;
    blockers: string[];
    dependencies: string[];
}
/**
 * Strategic Plan - Output of θ₁
 *
 * S = θ₁(I, W)
 */
export interface StrategicPlan {
    planId: string;
    createdAt: string;
    /** Source intent */
    intentSummary: {
        primaryGoal: string;
        goalCount: number;
        preferenceProfile: string;
        outputModality: string;
    };
    /** World context summary */
    worldContext: {
        environment: string;
        availableResources: string[];
        activeConstraints: string[];
    };
    /** Derived objectives */
    objectives: StrategicObjective[];
    /** Resource analysis */
    resources: ResourceRequirements;
    /** Risk assessment */
    risks: RiskAssessment;
    /** Execution strategy */
    strategy: {
        approach: 'sequential' | 'parallel' | 'hybrid';
        phases: Array<{
            phaseId: string;
            name: string;
            objectives: string[];
            dependsOn: string[];
        }>;
        estimatedTotalDurationMs: number;
        confidenceLevel: number;
    };
    /** Metadata */
    metadata: {
        analysisVersion: string;
        modelUsed?: string;
        analysisTimeMs: number;
    };
}
/**
 * θ₁: Understanding Transform
 *
 * Transforms Intent Space (I) and World Space (W) into Strategic Plan (S)
 *
 * @param intent - The intent space specification
 * @param world - The world space context
 * @returns Strategic plan for execution
 *
 * @example
 * ```typescript
 * const plan = await understanding(intent, world);
 * console.log(plan.strategy.approach); // 'parallel'
 * ```
 */
export declare function understanding(intent: IntentSpace, world: WorldSpace): Promise<StrategicPlan>;
/**
 * Validate a strategic plan
 */
export declare function validatePlan(plan: StrategicPlan): {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=understanding.d.ts.map