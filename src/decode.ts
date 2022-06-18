import { Payload, Header } from "./@types";
import { safeJsonParse } from "./utils/object";
import { base64urlDecode } from "./utils/base64";

const tokenRegex = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

export function decodeToken(token: string) {
  if (!tokenRegex.test(token)) {
    throw new Error('Invalid token format');
  }

  const [header, payload, signature] = token.split('.');

  const headerJson = base64urlDecode(header);
  const payloadJson = base64urlDecode(payload);

  return {
    header: safeJsonParse<Header>(headerJson),
    payload: safeJsonParse<Payload>(payloadJson),
    signature,
  }
}