import moment from "moment";

import { Field } from "../common";

export interface ITimestampFieldOptions {
  /**
   * If this option is set to true, will return number of seconds since epoch (Default: true)
   */
  unix?: boolean;
}

/**
 * The timestamp field
 * @param options The options to the timestamp field
 * @returns property decorator
 */
export function TimestampField(options: ITimestampFieldOptions = {}) {
  const { unix = true } = options;
  return Field({
    encoder({ value }) {
      return unix ? moment(value).unix() : moment(value).valueOf();
    },
    decoder({ value }) {
      return unix ? moment.unix(value).toDate() : moment(value).toDate();
    }
  });
}