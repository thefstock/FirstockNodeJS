import { ClassConstructor } from "class-transformer";

import { ModelUtils } from "../../../utils/model-utils";
import { Field } from "../common";

/**
 * The options for the `Nested` decorator
 */
export interface INestedFieldOptions {
  isArray?: boolean;
}

/**
 * Include a nested model
 * @param constructor The class constructor
 * @returns a property decorator
 */
export function Nested<TModel>(constructor: ClassConstructor<TModel>, options: INestedFieldOptions = {}) {
  const { isArray = false } = options;

  return Field({
    encoder({ value }) {
      return isArray ?
        value.map((v: TModel) => ModelUtils.serialize(v)) :
        ModelUtils.serialize<TModel>(value);
    },
    decoder({ value }) {
      return isArray ?
        value.map((v: any) => ModelUtils.parse(constructor, v)) :
        ModelUtils.parse(constructor, value);
    }
  });
}