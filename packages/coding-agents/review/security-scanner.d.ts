/**
 * Security Scanner - Strategy Pattern Implementation
 *
 * Provides extensible security scanning framework with:
 * - Interface for security scanners
 * - Multiple scanner implementations
 * - Easy addition of new scanners
 */
import { QualityIssue } from '../types/index';
/**
 * Security Scanner Interface (Strategy Pattern)
 */
export interface SecurityScanner {
    /**
     * Scanner name for logging
     */
    readonly name: string;
    /**
     * Run security scan on provided files
     */
    scan(files: string[]): Promise<QualityIssue[]>;
}
/**
 * Hardcoded Secrets Scanner
 *
 * Detects:
 * - API keys
 * - Passwords
 * - Tokens
 * - GitHub tokens
 * - Anthropic API keys
 */
export declare class SecretsScanner implements SecurityScanner {
    readonly name = "SecretsScanner";
    private getSecretPatterns;
    scan(files: string[]): Promise<QualityIssue[]>;
}
/**
 * Vulnerability Patterns Scanner
 *
 * Detects:
 * - eval() usage
 * - innerHTML XSS risks
 * - document.write XSS risks
 * - Command injection risks
 */
export declare class VulnerabilityScanner implements SecurityScanner {
    readonly name = "VulnerabilityScanner";
    private getVulnPatterns;
    scan(files: string[]): Promise<QualityIssue[]>;
}
/**
 * NPM Audit Scanner
 *
 * Detects:
 * - Dependency vulnerabilities (critical/high)
 */
export declare class NpmAuditScanner implements SecurityScanner {
    readonly name = "NpmAuditScanner";
    scan(_files: string[]): Promise<QualityIssue[]>;
}
/**
 * Security Scanner Registry (Factory Pattern)
 *
 * Manages available security scanners and provides easy access
 */
export declare class SecurityScannerRegistry {
    private static scanners;
    /**
     * Register a security scanner
     */
    static register(scanner: SecurityScanner): void;
    /**
     * Get all registered scanners
     */
    static getAll(): SecurityScanner[];
    /**
     * Get scanner by name
     */
    static get(name: string): SecurityScanner | undefined;
    /**
     * Initialize default scanners
     */
    static initializeDefaults(): void;
}
//# sourceMappingURL=security-scanner.d.ts.map