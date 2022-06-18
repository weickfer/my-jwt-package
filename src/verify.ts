import { decodeToken } from "./decode";
import { getStrategy } from "./strategies/getStrategy";

export function verifyToken(token: string, secretOrPublicKey: string) {
  const { header, payload, signature } = decodeToken(token)
  const strategy = getStrategy(header.alg);

  const now = Date.now() / 1000;

  if (now > payload.exp) {
    throw new Error("Token expired");
  }

  const securedInput = token.split('.', 2).join('.')
  const isValid = strategy.verifier(securedInput, signature, secretOrPublicKey)

  if (!isValid) {
    throw new Error("Token signature is invalid");
  }

  return { ...payload, ...header };
}