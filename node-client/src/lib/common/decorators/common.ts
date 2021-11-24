/**
 * The decorators used for defining property transformations
 */
import { Transform, TransformationType, TransformFnParams } from "class-transformer";

/**
 * The type of encoder function
 */
type TransformerFn<TOutput> = (params: TransformFnParams) => TOutput;

/**
 * compose multiple property decorators together
 * @param decorators The decorators to compose
 * @param [reverse] Whether to compose from last to first (This is the default behaviour).
 * @returns a property decorator which the composition of all the decorators
 */
export function Compose(decorators: PropertyDecorator[], reverse = true): PropertyDecorator {
  if (reverse) {
    decorators = decorators.reduceRight((acc, item) => acc.concat(item), []);
  }
  return (target: any, propertyKey: string | symbol) => {
    decorators.forEach(decorator => decorator(target, propertyKey));
  }
}

/**
 * Assign an encoder to the property.
 * Encoders define how a property is transformed when converted to plain object or json.
 * @param transformer The function to transform the value
 * @returns a property decorator
 */
export function Encode<TOutput>(transformer: TransformerFn<TOutput>) {
  return Transform(transformer, { toPlainOnly: true })
}

/**
 * Assign a decoder to the property.
 * Decoders define how a property is transformed when parsing a plain object or json.
 * @param transformer The function to transform the value
 * @returns a property decorator
 */
export function Decode<TOutput>(transformer: TransformerFn<TOutput>) {
  return Transform(transformer, { toClassOnly: true })
}

/**
 * The interface for the options passed to a Field decorator
 */
export interface IFieldTransformOption<TEncoded, TDecoded> {
  /**
   * The transformation to run on class instance to plain object or json conversion
   */
  encoder?: TransformerFn<TEncoded>;
  /**
   * The transformation to run on plain object / json to class instance conversion
   */
  decoder?: TransformerFn<TDecoded>;
};

/**
 * Assign the property as a field.
 * The `Field` decorator will run transformation of both encoder and decoder
 * @param options The field transformation options
 * @returns a property decorator
 */
export function Field<TEncoded = any, TDecoded = any>(
  options: IFieldTransformOption<TEncoded, TDecoded>
) {
  const { encoder, decoder } = options;
  // we write a transform function that will check the transformation type
  const transformer: TransformerFn<any> = (params) => {
    // if the transformation type is from class to plain, run the encoder transformation
    if (params.type === TransformationType.CLASS_TO_PLAIN) {
      return encoder ? encoder(params) : params.value;
    }
    // if the transformation type is from plain to class, run the decoder transformation
    else if (params.type === TransformationType.PLAIN_TO_CLASS) {
      return decoder ? decoder(params) : params.value;
    }
    // if the transformation type is from class to class, don't run any transformation
    else {
      return params.value;
    }
  }
  return Transform(transformer);
}