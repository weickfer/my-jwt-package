import { Algorithm, AlgorithmName, Bits } from '../@types'

import { HmacSignature } from "./hmac"
import { RsaStrategy } from "./rsa"

const supportedAlgorithms = ['HS', 'RS']
const supportedBits = ['256', '384', '512']

const regex = new RegExp(`^(${supportedAlgorithms.join('|')})(${supportedBits.join('|')})$`)
const strategies = {
  HS: new HmacSignature(),
  RS: new RsaStrategy(),
}

export function getStrategy(algorithm: Algorithm) {
  // regex to match the algorithm name and bits
  const match = regex.exec(algorithm)

  if (!match) {
    throw new Error(`Unsupported algorithm: ${algorithm}`)
  }

  const [, name, bits] = match

  return {
    signer: strategies[name as AlgorithmName].signer(bits as Bits),
    verifier: strategies[name as AlgorithmName].verifier(bits as Bits),
  }
}