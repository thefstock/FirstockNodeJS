import { sha256 } from 'hash.js';

import { Encode } from '../common';

/**
 * Encoder to hash the property value using sha256 algorithm
 * @returns a property decorator
 */
export function Hashed() {
  return Encode(({ value }) => {
    return sha256().update(value).digest('hex');
  });
}