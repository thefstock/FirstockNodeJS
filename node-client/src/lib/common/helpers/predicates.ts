/**
 * Some common predicates used throughout the project
 */

/**
 * Check if a value is callable or not
 * @param value The value to check
 * @returns whether the value is callable or not
 */
export function isCallable(value: unknown | CallableFunction): value is CallableFunction {
  return (typeof value === "function");
}