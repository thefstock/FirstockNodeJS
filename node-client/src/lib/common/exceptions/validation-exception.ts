import { ValidationError } from "class-validator";

/**
 * The validation errors raised while parsing a model
 * @category Exceptions
 */
export class ValidationException<T extends unknown = any> extends Error {
  /**
   * The target instance
   */
  target?: T;
  /**
   * The errors
   */
  errors?: ValidationError[]

  /**
   * 
   * @param target The target object
   * @param errors The validation errors
   */
  constructor(target?: T, errors?: ValidationError[]) {
    super(`Validation failed for ${target.constructor.name}: ${errors.map(error => error.toString()).join('\n')}`)
    this.target = target;
    this.errors = errors;
  }
}