import { createHmac } from 'node:crypto'

import { secureCompare } from '../utils/buffer';
import { fromBase64 } from '../utils/base64';
import { Bits, IStrategy, Signer, Verifier } from "../@types";

export class HmacSignature implements IStrategy {
  public signer(bits: Bits): Signer {
    return function (input: string, secret: string): string {
      const signature = createHmac(`sha${bits}`, secret)
        .update(input)
        .digest('base64')

      return fromBase64(signature)
    }
  }

  public verifier(bits: Bits): Verifier {
    const signer = this.signer(bits)

    return function (input: string, signature: string, secret: string): boolean {
      const computedSignature = signer(input, secret)

      return secureCompare(computedSignature, signature)
    }
  }
}