import { ClassConstructor, classToPlain, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { ValidationException } from '../common';

/**
 * The plain object version of a model class
 */
export type PlainObject<TModel> = {
  [P in keyof TModel]?: any
}

/**
 * The utility class for handling model parsing and serialization
 */
export class ModelUtils {
  /**
       * Parse json string and convert it to model instance
       * @param json The string json
       * @return the instance of this model
       */
  static parse<T>(constructor: ClassConstructor<T>, json: string): T
  /**
   * Parse plain object and convert it to model instance
   * @param object The plain object
   * @return the instance of this model
   */
  static parse<T>(constructor: ClassConstructor<T>, object: PlainObject<T>): T
  static parse<T>(constructor: ClassConstructor<T>, jsonOrObject: string | PlainObject<T>): T {
    if (typeof jsonOrObject === "string") {
      jsonOrObject = JSON.parse(jsonOrObject);
    }
    // retrieve constructor from metadata
    const instance = plainToClass(constructor, jsonOrObject);
    // run validation
    const errors = validateSync(instance as any);
    if (errors.length > 0) {
      throw new ValidationException(instance, errors);
    }
    return instance;
  }

  /**
   * Serialize a model instance to plain object
   * @param model The instance of the model to serialize
   * @returns the serialized object
   */
  static serialize<T, R = PlainObject<T>>(model: T): R {
    return classToPlain(model) as any;
  }

  /**
   * Convert the model instance to json
   * @param model The model to be stringified to json
   * @returns the serialized json string
   */
  static stringify<T>(model: T): string {
    const object = ModelUtils.serialize(model);
    return JSON.stringify(object);
  }
}