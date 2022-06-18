import { Algorithm, AlgorithmName, Bits, BufferOrString } from "../@types";

export function splitAlgorithmNameBits(algorithm: Algorithm): [name: AlgorithmName, bits: Bits] {
  return [
    algorithm.slice(0, 2).toUpperCase() as AlgorithmName,
    algorithm.slice(2) as Bits
  ]
}

export function toString(obj: any) {
  if (typeof obj === 'string') {
    return obj
  }

  if (typeof obj === 'number' || Buffer.isBuffer(obj)) {
    return obj.toString()
  }

  return JSON.stringify(obj)
}

export function hasBufferOrString(obj: any): obj is BufferOrString {
  return Buffer.isBuffer(obj) || typeof obj === 'string';
}

export function normalizeInput(thing: any): BufferOrString {
  if (hasBufferOrString(thing)) {
    return thing
  }

  return JSON.stringify(thing)
}