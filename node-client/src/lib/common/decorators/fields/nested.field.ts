import { ClassConstructor } from "class-transformer";

import { ModelUtils } from "../../../utils/model-utils";
import { Field } from "../common";

/**
 * Include a nested model
 * @param constructor The class constructor
 * @returns a property decorator
 */
export function Nested<TModel>(constructor: ClassConstructor<TModel>) {
  return Field({
    encoder({ value }) {
      return ModelUtils.serialize(value);
    },
    decoder({ value }) {
      return ModelUtils.parse(constructor, value);
    }
  });
}