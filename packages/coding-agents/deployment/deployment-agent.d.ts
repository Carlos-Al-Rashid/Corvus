/**
 * DeploymentAgent - CI/CD and Deployment Automation Agent
 *
 * Responsibilities:
 * - Automated deployment to staging/production
 * - Firebase project deployment
 * - Health check verification
 * - Automatic rollback on failure
 * - Deployment metrics collection
 * - CTO escalation for production deployments
 */
import { BaseAgent } from '../base-agent';
import { AgentResult, AgentConfig, Task, DeploymentResult } from '../types/index';
import { OmegaAgentAdapter } from '../omega-system/adapters';
export declare class DeploymentAgent extends BaseAgent {
    private deploymentHistory;
    private omegaAdapter?;
    constructor(config: AgentConfig);
    /**
     * Main execution: Deploy application
     */
    execute(task: Task): Promise<AgentResult>;
    /**
     * Create deployment configuration from task
     */
    private createDeploymentConfig;
    /**
     * Get version from package.json or git tag
     */
    private getVersion;
    /**
     * Get health check URL for environment
     */
    private getHealthCheckUrl;
    /**
     * Validate system before deployment
     */
    private validatePreDeployment;
    /**
     * Build application
     */
    private buildApplication;
    /**
     * Run tests
     */
    private runTests;
    /**
     * Deploy to Firebase
     */
    private deploy;
    /**
     * Perform health check on deployed application
     */
    private performHealthCheck;
    /**
     * Rollback to previous deployment
     */
    private rollback;
    /**
     * Notify stakeholders of deployment
     */
    private notifyDeployment;
    /**
     * Get deployment history for environment
     */
    getDeploymentHistory(environment?: 'staging' | 'production'): DeploymentResult[];
    /**
     * Get latest deployment for environment
     */
    getLatestDeployment(environment: 'staging' | 'production'): DeploymentResult | undefined;
    /**
     * Execute deployment using Ω-System pipeline
     */
    executeWithOmega(task: Task): Promise<AgentResult>;
    /**
     * Check if Ω-System is enabled
     */
    isOmegaEnabled(): boolean;
    /**
     * Get Ω-System adapter
     */
    getOmegaAdapter(): OmegaAgentAdapter | undefined;
}
//# sourceMappingURL=deployment-agent.d.ts.map