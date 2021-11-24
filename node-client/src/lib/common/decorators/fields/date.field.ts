import { isDefined } from 'class-validator';
import moment from 'moment';

import { Field } from "../common";

/**
 * The options for the date field
 */
export interface IDateFieldOptions {
  /**
   * The date format (moment format string). Optional
   */
  format?: string;
}

/**
 * The date field decorator
 * @param [options] The date field options (Optional).
 * @returns a property decorator
 */
export function DateField(options?: IDateFieldOptions): PropertyDecorator
/**
 * The date field decorator
 * @param [format] The date format to use for parsing and formatting
 */
export function DateField(format?: string): PropertyDecorator
export function DateField(formatOrOptions?: string | IDateFieldOptions): PropertyDecorator {
  const { format } = parseOptions(formatOrOptions);
  return Field({
    encoder({ value }) {
      return moment(value).format(format)
    },
    decoder({ value }) {
      return moment(value, format).toDate();
    }
  });
}

/**
 * check if the argument passed is the `format` value.
 * @param formatOrOptions The argument passed to date field decorator
 */
function isFormat(formatOrOptions?: string | IDateFieldOptions): formatOrOptions is string {
  return (typeof formatOrOptions === "string");
}

/**
 * parse the arguments passed to the decorator and return the proper options object
 * @param formatOrOptions The argument passed to date field decorator
 */
function parseOptions(formatOrOptions?: string | IDateFieldOptions): IDateFieldOptions {
  if (!isDefined(formatOrOptions)) {
    return { format: 'DD-MM-YYYY' };
  }
  else if (isFormat(formatOrOptions)) {
    return { format: formatOrOptions };
  }
  else {
    return formatOrOptions;
  }
}