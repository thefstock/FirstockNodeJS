import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsString } from 'class-validator';

import { Compose, Field } from '../common';

export interface IPrimitiveOptions {
  /**
   * whether the value is an array or not
   */
  isArray?: boolean;
}

/**
 * A string field decorator
 */
export function StringField(options: IPrimitiveOptions = {}): PropertyDecorator {
  const { isArray = false } = options;
  return Compose([
    IsString({ each: isArray }),
    Type(() => String)
  ]);
}

/**
 * A number field decorator
 */
export function NumberField(options: IPrimitiveOptions = {}): PropertyDecorator {
  const { isArray = false } = options;
  return Compose([
    IsNumber({}, { each: isArray }),
    Type(() => Number)
  ])
}

/**
 * The boolean field decorator
 */
export function BoolField(options: IPrimitiveOptions = {}): PropertyDecorator {
  const { isArray = false } = options;
  return Compose([
    IsBoolean({ each: isArray }),
    Field({
      decoder({ value }) {
        const decode = (val: any) => {
          if (typeof val === "string" && val.toLowerCase().trim() === "false") return false;
          return !!val;
        }
        return isArray ? value.map(decode) : decode(value);
      }
    })
  ])
}

/**
 * A field whose values should be on from an enum
 * @param enumType The type of enum
 */
export function EnumField(enumType: any): PropertyDecorator {
  return IsIn(Object.values(enumType));
}