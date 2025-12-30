/**
 * Issue to Intent Space Adapter
 *
 * Converts GitHub Issue to SWML IntentSpace.
 * Maps Issue structure to the 4-dimensional Intent Space I(g, p, o, m).
 *
 * @module omega-system/adapters/issue-to-intent
 */
import type { Issue } from '../../types';
import type { IntentSpace } from '../../types/intent';
/**
 * Issue to Intent Space Adapter
 */
export declare class IssueToIntentAdapter {
    /**
     * Convert Issue to IntentSpace
     */
    static convert(issue: Issue): IntentSpace;
}
/**
 * Convenience function
 */
export declare function issueToIntent(issue: Issue): IntentSpace;
//# sourceMappingURL=issue-to-intent.d.ts.map