import { createSign, createVerify } from 'node:crypto'
import { fromBase64, toBase64 } from '../utils/base64'
import { IStrategy, Signer, Verifier } from '../@types'

export class RsaStrategy implements IStrategy {
  public signer(bits: string): Signer {
    return function (input: string, privateKey: string): string {
      const signature = createSign(`RSA-SHA${bits}`)
        .update(input)
        .sign(privateKey, 'base64')

      return fromBase64(signature)
    }
  }

  public verifier(bits: string): Verifier {
    return function (input: string, signature: string, publicKey: string): boolean {
      const verifier = createVerify(`RSA-SHA${bits}`).update(input)

      return verifier.verify(publicKey, toBase64(signature), 'base64')
    }
  }

}