export type BufferOrString = Buffer | string;

export type Algorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512"
export type AlgorithmName = "HS" | "RS"
export type Bits = "256" | "384" | "512"

export type Signer = (input: string, secretOrPrivateKey: string) => string;
export type Verifier = (input: string, signature: string, secretOrPublicKey: string) => boolean;

export type GetStrategyResult = {
  sign: Signer;
  verify: Verifier;
}

export interface IStrategy {
  signer(bits: Bits): Signer;
  verifier(bits: Bits): Verifier;
}

type SignOptions = Partial<{
  algorithm: Algorithm
  expiresIn: number | string
  keyId: string
  jwtId: string
  audience: string
  issuer: string
  noTimestamp: boolean
  subject: string
}>

type Header = {
  alg: Algorithm;
  typ?: string | undefined;
  kid?: string | undefined;
}

export type Payload = {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
}

export type DecodedToken = {
  header: Header
  payload: Payload
  signature: string
}

export function createSignedToken(
  payload: Record<string, string>, 
  secretOrPrivateKey: string, 
  options?: SignOptions
): string

export function decodeToken(token: string): DecodedToken
export function verifyToken(token: string, secretOrPublicKey: string): string
export function verifyToken(token: string, secretOrPublicKey: string): string