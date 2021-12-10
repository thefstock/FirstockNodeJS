import { isDefined } from 'class-validator';

import { Encode } from '../common';

/**
 * The options for `Joined` encoder
 * @internal
 */
export interface IJoinedOptions {
  separator?: string;
}

/**
 * Used to encode string array into a 'x'-separated string
 * @param options The options for the decorator (Optional).
 * @internal
 */
export function Joined(options?: IJoinedOptions): PropertyDecorator;
/**
 * Used to encode string array into a 'x'-separated string
 * @param separator the separator used to separate each list item (Default ',')
 */
export function Joined(separator?: string): PropertyDecorator;
export function Joined(separatorOrOptions?: IJoinedOptions | string): PropertyDecorator {
  const { separator }: IJoinedOptions = parseOptions(separatorOrOptions);
  return Encode<string>(({ value }) => {
    return value.join(separator);
  });
}

/**
 * Check whether the options passed is the separator
 * @param options The options passed to the `Joined` encoder.
 * @internal
 */
function isSeparator(options: string | IJoinedOptions): options is string {
  return (typeof options === "string");
}

/**
 * @internal
 * Convert the argument passed to proper options object.
 * @param separatorOrOptions The argument passed to the `Joined` encoder
 */
function parseOptions(separatorOrOptions: string | IJoinedOptions): IJoinedOptions {
  if (!isDefined(separatorOrOptions)) {
    return { separator: '|' };
  }
  else if (isSeparator(separatorOrOptions)) {
    return { separator: separatorOrOptions };
  }
  else {
    return separatorOrOptions;
  }
}