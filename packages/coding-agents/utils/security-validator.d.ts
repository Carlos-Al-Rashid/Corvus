/**
 * Security Validator for Dynamic Code Generation
 *
 * Validates generated code for dangerous patterns and security vulnerabilities
 */
/**
 * Security validation result
 */
export interface SecurityValidationResult {
    /** Whether code is safe */
    safe: boolean;
    /** Detected security issues */
    issues: SecurityIssue[];
    /** Severity level (0-100, higher is more severe) */
    maxSeverity: number;
    /** Sanitized code (if fixable) */
    sanitizedCode?: string;
}
/**
 * Security issue
 */
export interface SecurityIssue {
    /** Issue type */
    type: SecurityIssueType;
    /** Severity (0-100) */
    severity: number;
    /** Issue description */
    message: string;
    /** Line number (if applicable) */
    line?: number;
    /** Code snippet */
    snippet?: string;
    /** Suggested fix */
    suggestedFix?: string;
}
/**
 * Security issue types
 */
export declare enum SecurityIssueType {
    EVAL_USAGE = "eval_usage",
    EXEC_USAGE = "exec_usage",
    REQUIRE_DYNAMIC = "require_dynamic",
    CHILD_PROCESS = "child_process",
    FILE_SYSTEM_WRITE = "file_system_write",
    NETWORK_REQUEST = "network_request",
    ENVIRONMENT_ACCESS = "environment_access",
    GLOBAL_MODIFICATION = "global_modification",
    PROTOTYPE_POLLUTION = "prototype_pollution",
    ARBITRARY_CODE = "arbitrary_code"
}
/**
 * Security Validator
 */
export declare class SecurityValidator {
    /**
     * Validate code for security issues
     */
    static validate(code: string): SecurityValidationResult;
    /**
     * Validate and throw if unsafe
     */
    static validateOrThrow(code: string): void;
    /**
     * Check if code contains specific security issue type
     */
    static hasIssueType(code: string, type: SecurityIssueType): boolean;
    /**
     * Get security score (0-100, higher is better)
     */
    static getSecurityScore(code: string): number;
    /**
     * Get allowed patterns (whitelist)
     */
    static isWhitelisted(code: string): boolean;
    /**
     * Get line number from index
     */
    private static getLineNumber;
    /**
     * Get code snippet around index
     */
    private static getCodeSnippet;
    /**
     * Sanitize code by removing dangerous patterns (best effort)
     */
    static sanitize(code: string): {
        sanitized: string;
        removed: string[];
    };
    /**
     * Generate security report
     */
    static generateReport(code: string): string;
}
//# sourceMappingURL=security-validator.d.ts.map