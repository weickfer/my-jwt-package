export function deleteFalsyFields(obj: any) {
  for (const key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }

  return obj;
}

export function hasObject(thing: any): thing is object {
  return typeof thing === 'object' && thing !== null;
}

export function safeJsonParse<T>(thing: string): T | undefined {
  if (hasObject(thing)) {
    return thing as T;
  }

  try { 
    return JSON.parse(thing) as T;
  }
  catch { 
    return undefined; 
  }
}