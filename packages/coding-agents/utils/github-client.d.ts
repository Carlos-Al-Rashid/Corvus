import type { Issue } from '../types/index';
export interface GitHubClientOptions {
    /**
     * GitHub Personal Access Token
     */
    token: string;
    /**
     * Cache TTL in milliseconds (default: 5 minutes)
     */
    cacheTTL?: number;
    /**
     * Enable debug logging
     */
    debug?: boolean;
}
export declare class GitHubClient {
    private octokit;
    private cache;
    private cacheTTL;
    private debug;
    constructor(options: GitHubClientOptions);
    /**
     * Fetch an issue from GitHub
     * @param owner Repository owner
     * @param repo Repository name
     * @param issueNumber Issue number
     * @returns Issue object or null if not found
     */
    fetchIssue(owner: string, repo: string, issueNumber: number): Promise<Issue | null>;
    /**
     * Extract owner and repo from git remote URL
     * @returns Object with owner and repo
     * @throws Error if remote URL is not a valid GitHub URL
     */
    extractOwnerRepo(): {
        owner: string;
        repo: string;
    };
    /**
     * Fetch multiple issues in parallel
     * @param owner Repository owner
     * @param repo Repository name
     * @param issueNumbers Array of issue numbers
     * @returns Array of Issue objects (nulls for not found issues)
     */
    fetchIssues(owner: string, repo: string, issueNumbers: number[]): Promise<(Issue | null)[]>;
    /**
     * Clear the cache
     */
    clearCache(): void;
    /**
     * Get cache statistics
     */
    getCacheStats(): {
        size: number;
        validEntries: number;
        expiredEntries: number;
    };
    /**
     * Clean up expired cache entries
     */
    cleanExpiredCache(): void;
    /**
     * Check GitHub API rate limit status
     */
    getRateLimitStatus(): Promise<{
        limit: number;
        remaining: number;
        reset: Date;
        used: number;
    }>;
}
//# sourceMappingURL=github-client.d.ts.map