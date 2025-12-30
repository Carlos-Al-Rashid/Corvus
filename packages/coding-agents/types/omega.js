/**
 * Ω (Omega) Function Type Definitions (SWML-compliant)
 *
 * Mathematical Definition: Ω: I × W → R
 *
 * The Omega function is the core transformation that maps
 * Intent Space and World Space to Result Space.
 *
 * SWML Axioms:
 * - A0.1 (Existence): ∀ t: ∃! W(t)
 * - A0.2 (Causality): t₁ < t₂ ⟹ W(t₁) ⊢ W(t₂)
 * - A0.3 (Determinism): Ω(I, W) = R
 *
 * @module types/omega
 * @see miyabi_def/SWML_PAPER.pdf
 */
// ============================================================================
// Default Implementations
// ============================================================================
/**
 * Default omega execution options
 */
export const DEFAULT_OMEGA_OPTIONS = {
    timeout: 300000, // 5 minutes
    retries: 2,
    dryRun: false,
    verbose: false,
    parallel: true,
    maxConcurrency: 3,
    autoApproveThreshold: 80,
};
/**
 * Create a simple omega function from a handler
 */
export function createOmegaFunction(handler) {
    return handler;
}
/**
 * Compose two omega functions
 */
export function composeOmega(omega1, omega2) {
    return async (intent, world) => {
        // Execute first omega (result can be used to modify intent/world for omega2)
        await omega1(intent, world);
        // In a full implementation, result would modify intent/world for omega2
        return omega2(intent, world);
    };
}
//# sourceMappingURL=omega.js.map