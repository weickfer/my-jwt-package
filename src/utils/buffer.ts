import * as crypto from 'node:crypto'

export function secureCompare(_a: string, _b: string): boolean {
  const a = Buffer.from(_a);
  const b = Buffer.from(_b);

  if (a.length !== b.length) {
    return false;
  }

  if (crypto.timingSafeEqual) {
    return crypto.timingSafeEqual(a, b);
  }

  let result = 0;

  for (let i = 0; i < a.length; i += 1) {
    /* eslint-disable no-bitwise */
    result |= a[i] ^ b[i];
  }

  return result === 0;
}