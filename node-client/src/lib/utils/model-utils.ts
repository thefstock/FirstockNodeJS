import { ClassConstructor, classToPlain, plainToClass } from 'class-transformer';
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
  static parse<T>(constructor: ClassConstructor<T>, object: Record<string, any>): T
  static parse<T>(constructor: ClassConstructor<T>, jsonOrObject: string | Record<string, any>): T {
    if (typeof jsonOrObject === "string") {
      jsonOrObject = JSON.parse(jsonOrObject);
    }
    // retrieve constructor from metadata
    return plainToClass(constructor, jsonOrObject);
  }

  /**
   * Serialize a model instance to plain object
   * @param model The instance of the model to serialize
   * @returns the serialized object
   */
  static serialize<T>(model: T): Record<string, any> {
    return classToPlain(model)
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