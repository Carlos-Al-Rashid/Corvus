/**
 * TTL-based LRU Cache with Automatic Cleanup
 *
 * Prevents memory leaks and provides efficient caching
 */
/**
 * Cache entry with TTL
 */
interface CacheEntry<T> {
    value: T;
    createdAt: number;
    lastAccessedAt: number;
    accessCount: number;
    expiresAt: number;
}
/**
 * Cache statistics
 */
export interface CacheStats {
    size: number;
    maxSize: number;
    hits: number;
    misses: number;
    evictions: number;
    hitRate: number;
    oldestEntryAge: number;
    newestEntryAge: number;
}
/**
 * Cache options
 */
export interface CacheOptions {
    /** Maximum number of entries */
    maxSize?: number;
    /** Time to live in milliseconds */
    ttlMs?: number;
    /** Cleanup interval in milliseconds */
    cleanupIntervalMs?: number;
    /** Enable automatic cleanup */
    autoCleanup?: boolean;
    /** Callback when entry is evicted */
    onEvict?: (key: string, value: any) => void;
}
/**
 * TTL-based LRU Cache
 */
export declare class TTLCache<T> {
    private cache;
    private readonly maxSize;
    private readonly ttlMs;
    private readonly cleanupIntervalMs;
    private readonly autoCleanup;
    private readonly onEvict?;
    private cleanupTimer?;
    private hits;
    private misses;
    private evictions;
    constructor(options?: CacheOptions);
    /**
     * Set cache entry
     */
    set(key: string, value: T, customTTL?: number): void;
    /**
     * Get cache entry
     */
    get(key: string): T | undefined;
    /**
     * Check if key exists and is not expired
     */
    has(key: string): boolean;
    /**
     * Delete cache entry
     */
    delete(key: string): boolean;
    /**
     * Clear all cache entries
     */
    clear(): void;
    /**
     * Get cache size
     */
    size(): number;
    /**
     * Get all keys
     */
    keys(): string[];
    /**
     * Get all values
     */
    values(): T[];
    /**
     * Get all entries
     */
    entries(): Array<[string, T]>;
    /**
     * Evict least recently used entry
     */
    private evictLRU;
    /**
     * Cleanup expired entries
     */
    cleanup(): number;
    /**
     * Start automatic cleanup
     */
    private startAutoCleanup;
    /**
     * Stop automatic cleanup
     */
    stopAutoCleanup(): void;
    /**
     * Get cache statistics
     */
    getStats(): CacheStats;
    /**
     * Reset statistics
     */
    resetStats(): void;
    /**
     * Get entry metadata
     */
    getMetadata(key: string): Omit<CacheEntry<T>, 'value'> | undefined;
    /**
     * Refresh entry TTL
     */
    refresh(key: string, customTTL?: number): boolean;
    /**
     * Get or set (lazy initialization)
     */
    getOrSet(key: string, factory: () => Promise<T>, customTTL?: number): Promise<T>;
    /**
     * Dispose cache (cleanup and stop timers)
     */
    dispose(): void;
}
/**
 * Create a TTL cache with default options
 */
export declare function createCache<T>(options?: CacheOptions): TTLCache<T>;
/**
 * Memoize function with TTL cache
 */
export declare function memoize<Args extends any[], Result>(fn: (...args: Args) => Promise<Result>, options?: CacheOptions & {
    keyGenerator?: (...args: Args) => string;
}): (...args: Args) => Promise<Result>;
export {};
//# sourceMappingURL=cache.d.ts.map