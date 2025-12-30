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
// ============================================================================
// Learning Implementation
// ============================================================================
/**
 * Extract patterns from deliverable
 */
function extractPatterns(deliverable) {
    const patterns = [];
    // Success pattern
    if (deliverable.summary.status === 'ready' && deliverable.qualityReport.passed) {
        patterns.push({
            patternId: `pattern-success-${Date.now()}`,
            type: 'success',
            description: 'Successful execution with quality standards met',
            frequency: 1,
            confidence: 0.9,
            conditions: [
                `Completeness: ${deliverable.summary.completeness}%`,
                `Quality score: ${deliverable.qualityReport.score}`,
            ],
            outcomes: [
                `Files created: ${deliverable.codeChanges.filesCreated}`,
                `Lines added: ${deliverable.codeChanges.totalLinesAdded}`,
            ],
            recommendations: [
                'Maintain current approach for similar tasks',
            ],
        });
    }
    // Failure pattern
    if (deliverable.summary.status === 'blocked') {
        patterns.push({
            patternId: `pattern-failure-${Date.now()}`,
            type: 'failure',
            description: 'Execution blocked due to issues',
            frequency: 1,
            confidence: 0.85,
            conditions: deliverable.summary.issues,
            outcomes: ['Execution blocked'],
            recommendations: deliverable.qualityReport.recommendations,
        });
    }
    // Quality optimization pattern
    if (deliverable.qualityReport.score >= 90) {
        patterns.push({
            patternId: `pattern-optimization-${Date.now()}`,
            type: 'optimization',
            description: 'High quality execution pattern',
            frequency: 1,
            confidence: 0.95,
            conditions: [
                'Quality score >= 90',
                `Actual score: ${deliverable.qualityReport.score}`,
            ],
            outcomes: ['High quality deliverable'],
            recommendations: [
                'This execution pattern produces excellent results',
                'Consider as template for future similar tasks',
            ],
        });
    }
    // Anti-pattern detection
    if (deliverable.qualityReport.issues.length > 3) {
        patterns.push({
            patternId: `pattern-anti-${Date.now()}`,
            type: 'anti-pattern',
            description: 'Multiple quality issues detected',
            frequency: 1,
            confidence: 0.75,
            conditions: deliverable.qualityReport.issues.map(i => i.message),
            outcomes: ['Quality degradation'],
            recommendations: [
                'Review task decomposition strategy',
                'Add more intermediate validation steps',
            ],
        });
    }
    return patterns;
}
/**
 * Generate performance insights
 */
function generateInsights(deliverable, _intent) {
    const insights = [];
    // Speed insight
    const integrationTime = deliverable.metadata.integrationTimeMs;
    insights.push({
        insightId: `insight-speed-${Date.now()}`,
        category: 'speed',
        metric: 'Integration time',
        currentValue: integrationTime,
        targetValue: 5000, // 5 seconds target
        trend: integrationTime < 5000 ? 'improving' : 'stable',
        actionable: integrationTime > 5000,
        suggestion: integrationTime > 5000
            ? 'Consider reducing artifact complexity'
            : undefined,
    });
    // Quality insight
    const qualityScore = deliverable.qualityReport.score;
    insights.push({
        insightId: `insight-quality-${Date.now()}`,
        category: 'quality',
        metric: 'Quality score',
        currentValue: qualityScore,
        targetValue: 85,
        trend: qualityScore >= 85 ? 'improving' : 'degrading',
        actionable: qualityScore < 85,
        suggestion: qualityScore < 85
            ? 'Focus on test coverage and code review'
            : undefined,
    });
    // Completeness insight
    const completeness = deliverable.summary.completeness;
    insights.push({
        insightId: `insight-completeness-${Date.now()}`,
        category: 'quality',
        metric: 'Task completeness',
        currentValue: completeness,
        targetValue: 100,
        trend: completeness >= 95 ? 'improving' : completeness >= 80 ? 'stable' : 'degrading',
        actionable: completeness < 90,
        suggestion: completeness < 90
            ? 'Investigate failed tasks and retry mechanism'
            : undefined,
    });
    // Cost insight (tokens used)
    const codeVolume = deliverable.codeChanges.totalLinesAdded;
    const costPerLine = codeVolume > 0 ? integrationTime / codeVolume : 0;
    insights.push({
        insightId: `insight-cost-${Date.now()}`,
        category: 'cost',
        metric: 'Time per line of code',
        currentValue: costPerLine,
        targetValue: 10, // 10ms per line target
        trend: costPerLine < 10 ? 'improving' : 'stable',
        actionable: costPerLine > 20,
        suggestion: costPerLine > 20
            ? 'Optimize code generation prompts'
            : undefined,
    });
    return insights;
}
/**
 * Analyze agent performance
 */
function analyzeAgentPerformance(deliverable) {
    const records = [];
    // CodeGenAgent analysis (inferred from artifacts)
    const codeArtifacts = deliverable.artifacts.code;
    if (codeArtifacts.length > 0) {
        records.push({
            agentType: 'CodeGenAgent',
            totalExecutions: codeArtifacts.length,
            successRate: deliverable.summary.completeness / 100,
            averageDurationMs: deliverable.metadata.integrationTimeMs / codeArtifacts.length,
            averageTokensUsed: 5000, // Estimated
            qualityScoreAverage: deliverable.qualityReport.score,
            strengths: deliverable.qualityReport.passed
                ? ['Consistent code generation', 'Follows patterns']
                : [],
            weaknesses: deliverable.qualityReport.issues.map(i => i.message),
            optimalTaskTypes: deliverable.codeChanges.languages,
        });
    }
    // ReviewAgent analysis (inferred from quality report)
    if (deliverable.qualityReport) {
        records.push({
            agentType: 'ReviewAgent',
            totalExecutions: 1,
            successRate: deliverable.qualityReport.passed ? 1 : 0.5,
            averageDurationMs: 2000, // Estimated
            averageTokensUsed: 2000, // Estimated
            qualityScoreAverage: deliverable.qualityReport.score,
            strengths: ['Comprehensive quality checks'],
            weaknesses: [],
            optimalTaskTypes: ['code-review', 'quality-assurance'],
        });
    }
    return records;
}
/**
 * Extract lessons learned
 */
function extractLessons(deliverable, intent, world) {
    const lessons = [];
    // Quality lesson
    if (!deliverable.qualityReport.passed) {
        lessons.push({
            lessonId: `lesson-quality-${Date.now()}`,
            timestamp: new Date().toISOString(),
            severity: 'warning',
            domain: 'quality',
            title: 'Quality standards not met',
            description: `Deliverable scored ${deliverable.qualityReport.score}/100, below the passing threshold of 80.`,
            context: {
                intentSummary: intent.goals.primary.main?.description || 'Unknown',
                worldContext: world.contextual.system.projectType,
                deliverableStatus: deliverable.summary.status,
            },
            impact: 'Deliverable requires additional review before merge',
            preventionStrategy: 'Add intermediate quality gates during execution',
            relatedPatterns: ['pattern-quality-gate'],
        });
    }
    // Completeness lesson
    if (deliverable.summary.completeness < 100) {
        lessons.push({
            lessonId: `lesson-completeness-${Date.now()}`,
            timestamp: new Date().toISOString(),
            severity: deliverable.summary.completeness < 80 ? 'critical' : 'info',
            domain: 'execution',
            title: `Incomplete execution: ${deliverable.summary.completeness}%`,
            description: `Not all tasks completed. ${deliverable.summary.issues.join('; ')}`,
            context: {
                intentSummary: intent.goals.primary.main?.description || 'Unknown',
                worldContext: world.contextual.system.projectType,
                deliverableStatus: deliverable.summary.status,
            },
            impact: 'Some requirements may not be fulfilled',
            preventionStrategy: 'Implement retry mechanism for failed tasks',
            relatedPatterns: ['pattern-retry', 'pattern-fallback'],
        });
    }
    // Success lesson
    if (deliverable.summary.status === 'ready' && deliverable.qualityReport.passed) {
        lessons.push({
            lessonId: `lesson-success-${Date.now()}`,
            timestamp: new Date().toISOString(),
            severity: 'info',
            domain: 'process',
            title: 'Successful execution pattern',
            description: 'All quality standards met with good completion rate',
            context: {
                intentSummary: intent.goals.primary.main?.description || 'Unknown',
                worldContext: world.contextual.system.projectType,
                deliverableStatus: deliverable.summary.status,
            },
            impact: 'Positive - this approach works well',
            preventionStrategy: undefined,
            relatedPatterns: ['pattern-success'],
        });
    }
    return lessons;
}
/**
 * Generate knowledge updates
 */
function generateUpdates(patterns, insights, lessons) {
    const updates = [];
    // Pattern-based updates
    for (const pattern of patterns) {
        if (pattern.type === 'success' || pattern.type === 'optimization') {
            updates.push({
                updateId: `update-${pattern.patternId}`,
                timestamp: new Date().toISOString(),
                type: 'pattern',
                target: 'execution-templates',
                payload: {
                    patternType: pattern.type,
                    conditions: pattern.conditions,
                    recommendations: pattern.recommendations,
                },
                priority: pattern.type === 'optimization' ? 1 : 2,
            });
        }
    }
    // Insight-based updates
    for (const insight of insights) {
        if (insight.actionable) {
            updates.push({
                updateId: `update-${insight.insightId}`,
                timestamp: new Date().toISOString(),
                type: 'insight',
                target: `${insight.category}-optimization`,
                payload: {
                    metric: insight.metric,
                    current: insight.currentValue,
                    target: insight.targetValue,
                    suggestion: insight.suggestion,
                },
                priority: insight.category === 'quality' ? 1 : 2,
            });
        }
    }
    // Lesson-based updates
    for (const lesson of lessons) {
        if (lesson.severity !== 'info') {
            updates.push({
                updateId: `update-${lesson.lessonId}`,
                timestamp: new Date().toISOString(),
                type: 'lesson',
                target: `${lesson.domain}-knowledge`,
                payload: {
                    title: lesson.title,
                    prevention: lesson.preventionStrategy,
                    patterns: lesson.relatedPatterns,
                },
                priority: lesson.severity === 'critical' ? 0 : 1,
            });
        }
    }
    return updates;
}
/**
 * Generate model calibrations
 */
function generateCalibrations(deliverable, insights) {
    const calibrations = [];
    // Quality threshold calibration
    const qualityInsight = insights.find(i => i.metric === 'Quality score');
    if (qualityInsight && qualityInsight.currentValue < qualityInsight.targetValue) {
        calibrations.push({
            parameterName: 'quality_threshold',
            previousValue: 80,
            newValue: 75, // Temporary adjustment
            adjustmentReason: 'Quality consistently below target, adjusting threshold temporarily',
            confidence: 0.7,
        });
    }
    // Completeness threshold calibration
    if (deliverable.summary.completeness >= 95) {
        calibrations.push({
            parameterName: 'completeness_target',
            previousValue: 90,
            newValue: 95,
            adjustmentReason: 'Consistently achieving high completeness, raising target',
            confidence: 0.85,
        });
    }
    // Parallelization factor calibration
    const codeVolume = deliverable.codeChanges.totalLinesAdded;
    if (codeVolume > 500) {
        calibrations.push({
            parameterName: 'max_parallel_workers',
            previousValue: 3,
            newValue: 5,
            adjustmentReason: 'Large code volume suggests benefit from more parallelization',
            confidence: 0.6,
        });
    }
    return calibrations;
}
/**
 * Generate recommendations
 */
function generateRecommendations(patterns, insights, lessons) {
    const immediate = [];
    const shortTerm = [];
    const longTerm = [];
    // From patterns
    for (const pattern of patterns) {
        if (pattern.type === 'failure' || pattern.type === 'anti-pattern') {
            immediate.push(...pattern.recommendations);
        }
    }
    // From insights
    for (const insight of insights) {
        if (insight.actionable && insight.suggestion) {
            if (insight.trend === 'degrading') {
                immediate.push(insight.suggestion);
            }
            else {
                shortTerm.push(insight.suggestion);
            }
        }
    }
    // From lessons
    for (const lesson of lessons) {
        if (lesson.preventionStrategy) {
            if (lesson.severity === 'critical') {
                immediate.push(lesson.preventionStrategy);
            }
            else if (lesson.severity === 'warning') {
                shortTerm.push(lesson.preventionStrategy);
            }
            else {
                longTerm.push(lesson.preventionStrategy);
            }
        }
    }
    // Default long-term recommendations
    if (longTerm.length === 0) {
        longTerm.push('Continue monitoring execution patterns');
        longTerm.push('Review and update agent capabilities periodically');
    }
    return {
        immediate: [...new Set(immediate)],
        shortTerm: [...new Set(shortTerm)],
        longTerm: [...new Set(longTerm)],
    };
}
// ============================================================================
// Main Transform Function
// ============================================================================
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
export async function learning(deliverable, intent, world) {
    const startTime = Date.now();
    // Extract patterns
    const patterns = extractPatterns(deliverable);
    // Generate insights
    const insights = generateInsights(deliverable, intent);
    // Analyze agent performance
    const agentPerformance = analyzeAgentPerformance(deliverable);
    // Extract lessons
    const lessons = extractLessons(deliverable, intent, world);
    // Generate updates
    const updates = generateUpdates(patterns, insights, lessons);
    // Generate calibrations
    const calibrations = generateCalibrations(deliverable, insights);
    // Generate recommendations
    const recommendations = generateRecommendations(patterns, insights, lessons);
    // Calculate learning score
    const learningScore = Math.round((patterns.length * 10) +
        (insights.filter(i => i.actionable).length * 15) +
        (lessons.length * 10) +
        (updates.length * 5) +
        (calibrations.length * 5));
    const knowledge = {
        knowledgeId: `knowledge-${Date.now()}`,
        createdAt: new Date().toISOString(),
        sourceDeliverableId: deliverable.deliverableId,
        patterns,
        insights,
        agentPerformance,
        lessons,
        updates,
        calibrations,
        summary: {
            patternsExtracted: patterns.length,
            insightsGenerated: insights.length,
            lessonsLearned: lessons.length,
            updatesProposed: updates.length,
            overallLearningScore: Math.min(100, learningScore),
        },
        recommendations,
        metadata: {
            learningVersion: '1.0.0',
            learningTimeMs: Date.now() - startTime,
            feedbackLoopIteration: 1, // Would increment in real implementation
        },
    };
    return knowledge;
}
/**
 * Validate knowledge output
 */
export function validateKnowledge(knowledge) {
    const errors = [];
    if (knowledge.patterns.length === 0 && knowledge.lessons.length === 0) {
        errors.push('No patterns or lessons extracted');
    }
    if (knowledge.recommendations.immediate.length === 0 &&
        knowledge.recommendations.shortTerm.length === 0 &&
        knowledge.recommendations.longTerm.length === 0) {
        errors.push('No recommendations generated');
    }
    return {
        valid: errors.length === 0,
        errors,
    };
}
/**
 * Apply knowledge updates to system
 */
export function applyKnowledgeUpdates(knowledge) {
    let applied = 0;
    let skipped = 0;
    for (const update of knowledge.updates) {
        // In real implementation, this would update a knowledge store
        if (update.priority <= 1) {
            applied++;
            // Apply update to knowledge store
        }
        else {
            skipped++;
            // Queue for later review
        }
    }
    return { applied, skipped };
}
//# sourceMappingURL=learning.js.map