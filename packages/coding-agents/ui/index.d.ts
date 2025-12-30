/**
 * Agentic OS UI System — Unified Exports
 *
 * Addresses Issue #4 - Rich CLI Output Styling
 *
 * Usage:
 * ```typescript
 * import { logger, theme } from '@miyabi/coding-agents/ui/index';
 *
 * logger.header('Agentic OS');
 * logger.agent('CoordinatorAgent', 'Starting execution...');
 * logger.success('Task completed!');
 * ```
 */
export { RichLogger, logger } from './logger';
export { theme, agentColors, severityColors, phaseColors } from './theme';
export type { Theme, AgentName, SeverityLevel, PhaseLevel } from './theme';
export type { LogOptions, BoxOptions } from './logger';
export * from './table';
export * from './box';
export * from './progress';
export * from './tree';
export type { Ora } from 'ora';
//# sourceMappingURL=index.d.ts.map