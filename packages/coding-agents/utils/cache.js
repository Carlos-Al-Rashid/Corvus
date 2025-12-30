/**
 * TTL-based LRU Cache with Automatic Cleanup
 *
 * Prevents memory leaks and provides efficient caching
 */
/**
 * TTL-based LRU Cache
 */
export class TTLCache {
    cache = new Map();
    maxSize;
    ttlMs;
    cleanupIntervalMs;
    autoCleanup;
    onEvict;
    cleanupTimer;
    hits = 0;
    misses = 0;
    evictions = 0;
    constructor(options = {}) {
        this.maxSize = options.maxSize ?? 100;
        this.ttlMs = options.ttlMs ?? 15 * 60 * 1000; // 15 minutes default
        this.cleanupIntervalMs = options.cleanupIntervalMs ?? 60 * 1000; // 1 minute default
        this.autoCleanup = options.autoCleanup ?? true;
        this.onEvict = options.onEvict;
        if (this.autoCleanup) {
            this.startAutoCleanup();
        }
    }
    /**
     * Set cache entry
     */
    set(key, value, customTTL) {
        const now = Date.now();
        const ttl = customTTL ?? this.ttlMs;
        // If cache is full, evict LRU entry
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            this.evictLRU();
        }
        const entry = {
            value,
            createdAt: now,
            lastAccessedAt: now,
            accessCount: 0,
            expiresAt: now + ttl,
        };
        this.cache.set(key, entry);
    }
    /**
     * Get cache entry
     */
    get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            this.misses++;
            return undefined;
        }
        const now = Date.now();
        // Check if expired
        if (now > entry.expiresAt) {
            this.delete(key);
            this.misses++;
            return undefined;
        }
        // Update access stats
        entry.lastAccessedAt = now;
        entry.accessCount++;
        this.hits++;
        return entry.value;
    }
    /**
     * Check if key exists and is not expired
     */
    has(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return false;
        }
        const now = Date.now();
        // Check if expired
        if (now > entry.expiresAt) {
            this.delete(key);
            return false;
        }
        return true;
    }
    /**
     * Delete cache entry
     */
    delete(key) {
        const entry = this.cache.get(key);
        if (entry && this.onEvict) {
            this.onEvict(key, entry.value);
        }
        return this.cache.delete(key);
    }
    /**
     * Clear all cache entries
     */
    clear() {
        if (this.onEvict) {
            for (const [key, entry] of this.cache.entries()) {
                this.onEvict(key, entry.value);
            }
        }
        this.cache.clear();
        this.hits = 0;
        this.misses = 0;
        this.evictions = 0;
    }
    /**
     * Get cache size
     */
    size() {
        return this.cache.size;
    }
    /**
     * Get all keys
     */
    keys() {
        return Array.from(this.cache.keys());
    }
    /**
     * Get all values
     */
    values() {
        return Array.from(this.cache.values()).map((entry) => entry.value);
    }
    /**
     * Get all entries
     */
    entries() {
        return Array.from(this.cache.entries()).map(([key, entry]) => [key, entry.value]);
    }
    /**
     * Evict least recently used entry
     */
    evictLRU() {
        let lruKey;
        let lruTime = Infinity;
        // Find LRU entry
        for (const [key, entry] of this.cache.entries()) {
            if (entry.lastAccessedAt < lruTime) {
                lruTime = entry.lastAccessedAt;
                lruKey = key;
            }
        }
        if (lruKey) {
            this.delete(lruKey);
            this.evictions++;
        }
    }
    /**
     * Cleanup expired entries
     */
    cleanup() {
        const now = Date.now();
        let count = 0;
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.delete(key);
                count++;
            }
        }
        return count;
    }
    /**
     * Start automatic cleanup
     */
    startAutoCleanup() {
        this.cleanupTimer = setInterval(() => {
            const expired = this.cleanup();
            if (expired > 0) {
                console.log(`[TTLCache] Cleaned up ${expired} expired entries`);
            }
        }, this.cleanupIntervalMs);
        // Don't prevent process from exiting
        if (this.cleanupTimer.unref) {
            this.cleanupTimer.unref();
        }
    }
    /**
     * Stop automatic cleanup
     */
    stopAutoCleanup() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = undefined;
        }
    }
    /**
     * Get cache statistics
     */
    getStats() {
        const now = Date.now();
        let oldestAge = 0;
        let newestAge = Infinity;
        for (const entry of this.cache.values()) {
            const age = now - entry.createdAt;
            if (age > oldestAge)
                oldestAge = age;
            if (age < newestAge)
                newestAge = age;
        }
        const totalRequests = this.hits + this.misses;
        const hitRate = totalRequests > 0 ? this.hits / totalRequests : 0;
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hits: this.hits,
            misses: this.misses,
            evictions: this.evictions,
            hitRate: Math.round(hitRate * 100) / 100,
            oldestEntryAge: oldestAge,
            newestEntryAge: newestAge === Infinity ? 0 : newestAge,
        };
    }
    /**
     * Reset statistics
     */
    resetStats() {
        this.hits = 0;
        this.misses = 0;
        this.evictions = 0;
    }
    /**
     * Get entry metadata
     */
    getMetadata(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return undefined;
        }
        const { value, ...metadata } = entry;
        return metadata;
    }
    /**
     * Refresh entry TTL
     */
    refresh(key, customTTL) {
        const entry = this.cache.get(key);
        if (!entry) {
            return false;
        }
        const ttl = customTTL ?? this.ttlMs;
        entry.expiresAt = Date.now() + ttl;
        return true;
    }
    /**
     * Get or set (lazy initialization)
     */
    async getOrSet(key, factory, customTTL) {
        const cached = this.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const value = await factory();
        this.set(key, value, customTTL);
        return value;
    }
    /**
     * Dispose cache (cleanup and stop timers)
     */
    dispose() {
        this.stopAutoCleanup();
        this.clear();
    }
}
/**
 * Create a TTL cache with default options
 */
export function createCache(options) {
    return new TTLCache(options);
}
/**
 * Memoize function with TTL cache
 */
export function memoize(fn, options = {}) {
    const cache = new TTLCache(options);
    const keyGenerator = options.keyGenerator ?? ((...args) => JSON.stringify(args));
    return async (...args) => {
        const key = keyGenerator(...args);
        return cache.getOrSet(key, () => fn(...args));
    };
}
//# sourceMappingURL=cache.js.map