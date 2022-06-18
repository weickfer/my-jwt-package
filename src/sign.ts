import { SignOptions, Algorithm } from './@types'
import { toMs } from "./utils/ms";
import { base64url } from "./utils/base64";
import { toString } from "./utils/string";
import { getStrategy } from "./strategies/getStrategy";
import { deleteFalsyFields } from "./utils/object";

const defaultSignOptions: SignOptions = {
  algorithm: 'HS256',
  noTimestamp: false
}

function getExpiresIn(iat: number, expiresIn: number | string) {
  let exp = 0
  
  if (typeof expiresIn === 'number') {
    exp = iat + expiresIn
  }

  if (typeof expiresIn === 'string') {
    const milliseconds = toMs(expiresIn)

    exp = iat + milliseconds
  }

  return exp;
}

function createSecuredInput(
  header: Record<string, any>, 
  payload: Record<string, any>,
  payloadEncoding: BufferEncoding = 'utf8'
) {
  const encodedHeader = base64url(toString(header), 'binary')
  const encodedPayload = base64url(toString(payload), payloadEncoding)

  return `${encodedHeader}.${encodedPayload}`
}

function createTokenData(options: SignOptions) {
  const iat = Math.floor(Date.now() / 1000)

  const header = deleteFalsyFields({
    typ: 'JWT',
    alg: options.algorithm,
    kid: options.keyId,
  })

  const payload = deleteFalsyFields({
    iat: options.noTimestamp ? undefined : iat,
    exp: getExpiresIn(iat, options.expiresIn || '1h'),
    jti: options.jwtId,
    aud: options.audience,
    iss: options.issuer,
    sub: options.subject,
  })

  return { header, payload }
}

export function createSignedToken(payload: Record<string, any>, secretOrPrivateKey: string, options?: SignOptions) {
  options = Object.assign(defaultSignOptions, options || {})

  if (!options) return

  const { header, payload: _payload } = createTokenData(options)

  const securedInput = createSecuredInput(header, { ..._payload, ...payload })
  const strategy = getStrategy(options.algorithm as Algorithm)
  const signature = strategy.signer(securedInput, secretOrPrivateKey)

  return `${securedInput}.${signature}`
}
