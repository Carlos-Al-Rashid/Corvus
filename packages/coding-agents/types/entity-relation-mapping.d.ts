/**
 * Entity Relation Mapping System
 *
 * LLM-optimized entity relationship notation for workflow automation.
 * Ported from workflow-automation/core/entity_mapping.py
 *
 * Uses N1/N2/N3 hierarchical notation with $H (high) and $L (low) relationship markers.
 * This notation is designed to be easily parseable by LLMs and human-readable.
 *
 * @example
 * ```
 * N1:Issue $H→ N2:CoordinatorAgent $H→ N3:TaskDecomposition
 * N1:Keyword $L→ N2:SerpQuery $H→ N3:TopResults
 * ```
 */
/**
 * Entity Level - Hierarchical abstraction layers
 *
 * N1 (Primary): Root entities that initiate workflows
 * N2 (Processing): Intermediate processing entities
 * N3 (Output): Final output or result entities
 */
export declare enum EntityLevel {
    /**
     * N1: Primary/Root entities
     * Examples: Issue, UserRequest, Keyword, RawData
     * Characteristics: User-facing, entry points, high-level concepts
     */
    N1_PRIMARY = "N1",
    /**
     * N2: Secondary/Processing entities
     * Examples: Agent, Task, Query, Processor
     * Characteristics: Transform or process data, business logic layer
     */
    N2_PROCESSING = "N2",
    /**
     * N3: Tertiary/Output entities
     * Examples: PR, QualityReport, Results, DeployedArtifact
     * Characteristics: Final outputs, deliverables, results
     */
    N3_OUTPUT = "N3"
}
/**
 * Relation Type - Dependency strength markers
 *
 * $H (High): Critical dependency - workflow cannot proceed without this
 * $L (Low): Optional dependency - enhances output but not required
 */
export declare enum RelationStrength {
    /**
     * $H: High priority / Critical dependency
     * - Must be satisfied for workflow to succeed
     * - Failure blocks downstream execution
     * - Used for essential data flow
     */
    HIGH = "$H",
    /**
     * $L: Low priority / Optional dependency
     * - Nice to have, but workflow can proceed without it
     * - Failure does not block downstream execution
     * - Used for enhancement or optimization
     */
    LOW = "$L"
}
/**
 * Entity - Represents a single entity in the workflow
 */
export interface Entity {
    /** Entity name (e.g., "Issue", "CoordinatorAgent") */
    name: string;
    /** Hierarchical level (N1/N2/N3) */
    level: EntityLevel;
    /** Optional metadata */
    metadata?: Record<string, any>;
    /** Optional description */
    description?: string;
}
/**
 * Relation - Represents a directed relationship between two entities
 */
export interface Relation {
    /** Source entity */
    source: Entity;
    /** Target entity */
    target: Entity;
    /** Relationship strength ($H or $L) */
    strength: RelationStrength;
    /** Direction marker (always '→' for left-to-right) */
    direction: '→';
    /** Optional metadata */
    metadata?: Record<string, any>;
}
/**
 * Entity Relation Map - Manages a collection of entities and their relationships
 *
 * This class provides methods to build and query entity-relation workflows.
 * It supports the N1:Entity $H→ N2:Entity notation format.
 *
 * @example
 * ```typescript
 * const map = new EntityRelationMap();
 *
 * // Add entities
 * const issue = map.addEntity('Issue', EntityLevel.N1_PRIMARY);
 * const coordinator = map.addEntity('CoordinatorAgent', EntityLevel.N2_PROCESSING);
 * const tasks = map.addEntity('TaskDecomposition', EntityLevel.N3_OUTPUT);
 *
 * // Add relations
 * map.addRelation(issue, coordinator, RelationStrength.HIGH);
 * map.addRelation(coordinator, tasks, RelationStrength.HIGH);
 *
 * // Generate notation
 * console.log(map.toNotation());
 * // Output: N1:Issue $H→ N2:CoordinatorAgent
 * //         N2:CoordinatorAgent $H→ N3:TaskDecomposition
 * ```
 */
export declare class EntityRelationMap {
    private entities;
    private relations;
    /**
     * Add an entity to the map
     *
     * @param name - Entity name
     * @param level - Entity level (N1/N2/N3)
     * @param metadata - Optional metadata
     * @returns The created entity
     */
    addEntity(name: string, level: EntityLevel, metadata?: Record<string, any>): Entity;
    /**
     * Add a relation between two entities
     *
     * @param source - Source entity
     * @param target - Target entity
     * @param strength - Relationship strength ($H or $L)
     * @param metadata - Optional metadata
     * @returns The created relation
     */
    addRelation(source: Entity, target: Entity, strength: RelationStrength, metadata?: Record<string, any>): Relation;
    /**
     * Get entity by name and level
     *
     * @param name - Entity name
     * @param level - Entity level
     * @returns Entity if found, undefined otherwise
     */
    getEntity(name: string, level: EntityLevel): Entity | undefined;
    /**
     * Get all entities
     *
     * @returns Array of all entities
     */
    getAllEntities(): Entity[];
    /**
     * Get all relations
     *
     * @returns Array of all relations
     */
    getAllRelations(): Relation[];
    /**
     * Get relations by source entity
     *
     * @param entity - Source entity
     * @returns Array of relations starting from this entity
     */
    getRelationsBySource(entity: Entity): Relation[];
    /**
     * Get relations by target entity
     *
     * @param entity - Target entity
     * @returns Array of relations ending at this entity
     */
    getRelationsByTarget(entity: Entity): Relation[];
    /**
     * Convert the map to N1:Entity $H→ N2:Entity notation
     *
     * @returns String representation in N1/N2/N3 notation
     */
    toNotation(): string;
    /**
     * Parse notation string and build entity-relation map
     *
     * @param notation - Notation string (one relation per line)
     * @returns Parsed EntityRelationMap
     *
     * @example
     * ```typescript
     * const notation = `
     * N1:Issue $H→ N2:CoordinatorAgent
     * N2:CoordinatorAgent $H→ N3:TaskDecomposition
     * `;
     * const map = EntityRelationMap.fromNotation(notation);
     * ```
     */
    static fromNotation(notation: string): EntityRelationMap;
    /**
     * Export to JSON
     *
     * @returns JSON representation of the map
     */
    toJSON(): {
        entities: Entity[];
        relations: Array<{
            source: string;
            target: string;
            strength: string;
        }>;
    };
    /**
     * Import from JSON
     *
     * @param json - JSON representation
     * @returns Imported EntityRelationMap
     */
    static fromJSON(json: {
        entities: Entity[];
        relations: Array<{
            source: string;
            target: string;
            strength: string;
        }>;
    }): EntityRelationMap;
    /**
     * Clear all entities and relations
     */
    clear(): void;
    /**
     * Get statistics about the map
     *
     * @returns Statistics object
     */
    getStats(): {
        entityCount: number;
        relationCount: number;
        byLevel: Record<string, number>;
        byStrength: Record<string, number>;
    };
}
/**
 * Workflow Template - Predefined entity-relation patterns
 *
 * Common workflow patterns that can be reused across projects.
 */
export declare class WorkflowTemplate {
    /**
     * Issue Processing Workflow
     *
     * Standard workflow for processing GitHub Issues:
     * N1:Issue → N2:IssueAgent → N3:LabeledIssue
     * N1:Issue → N2:CoordinatorAgent → N3:TaskDecomposition
     */
    static issueProcessing(): EntityRelationMap;
    /**
     * Code Generation Workflow
     *
     * Standard workflow for code generation:
     * N1:Task → N2:CodeGenAgent → N3:GeneratedCode
     * N2:CodeGenAgent → N2:ReviewAgent → N3:QualityReport
     */
    static codeGeneration(): EntityRelationMap;
    /**
     * Deployment Workflow
     *
     * Standard workflow for deployment:
     * N1:PR → N2:DeploymentAgent → N3:DeployedArtifact
     * N2:DeploymentAgent → N2:HealthCheck → N3:HealthReport (optional)
     */
    static deployment(): EntityRelationMap;
}
//# sourceMappingURL=entity-relation-mapping.d.ts.map