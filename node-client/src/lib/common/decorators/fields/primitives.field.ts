import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

import { Compose, Field } from '../common';

/**
 * A string field decorator
 */
export function StringField(): PropertyDecorator {
  return Compose([
    IsString(),
    Type(() => String)
  ]);
}

/**
 * A number field decorator
 */
export function NumberField(): PropertyDecorator {
  return Compose([
    IsNumber(),
    Type(() => Number)
  ])
}

/**
 * The boolean field decorator
 */
export function BoolField(): PropertyDecorator {
  return Compose([
    IsBoolean(),
    Field({
      decoder({ value }) {
        if (typeof value === "string" && value.toLowerCase().trim() === "false") return false;
        return !!value;
      }
    })
  ])
}