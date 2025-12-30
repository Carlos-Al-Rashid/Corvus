/**
 * GitRepository - Shared utility for Git repository operations
 *
 * Consolidates duplicate repository parsing logic used across:
 * - IssueAgent
 * - PRAgent
 *
 * This utility provides consistent repository information extraction from git remote.
 */
export interface RepositoryInfo {
    owner: string;
    repo: string;
    remoteUrl: string;
}
export declare class GitRepository {
    /**
     * Parse repository owner and name from git remote
     * Supports both HTTPS and SSH URLs:
     * - HTTPS: https://github.com/owner/repo.git
     * - SSH: git@github.com:owner/repo.git
     */
    static parse(): Promise<RepositoryInfo>;
    /**
     * Get git remote URL for origin
     */
    private static getRemoteUrl;
    /**
     * Parse GitHub URL into owner and repo
     * Supports both HTTPS and SSH formats
     */
    private static parseGitUrl;
    /**
     * Get current branch name
     */
    static getCurrentBranch(): Promise<string>;
    /**
     * Check if repository is clean (no uncommitted changes)
     */
    static isClean(): Promise<boolean>;
    /**
     * Get repository root directory
     */
    static getRoot(): Promise<string>;
}
//# sourceMappingURL=git-repository.d.ts.map