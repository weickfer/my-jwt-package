import { BufferOrString } from "../@types";

export function base64url(string: string, encoding: BufferEncoding) {
  return Buffer
    .from(string, encoding)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function base64urlDecode(str: string): string {
  return Buffer.from(str, 'base64').toString('utf8');
}

export function fromBase64(base64: string) {
  return base64
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function toBase64(base64url: BufferOrString) {
  base64url = base64url.toString();

  const padding = 4 - base64url.length % 4;
  
  if (padding !== 4) {
    for (let i = 0; i < padding; ++i) {
      base64url += '=';
    }
  }

  return base64url
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
}