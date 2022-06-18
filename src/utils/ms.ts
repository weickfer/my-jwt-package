const times = {
  s: 1, // second
  m: 60, // minute
  h: 60 * 60, // hour
  d: 60 * 60 * 24, // day
  w: 60 * 60 * 24 * 7, // week
  M: 60 * 60 * 24 * 30, // month
  y: 60 * 60 * 24 * 365, // year
}

export function toMs(value: string) {
  const unit = Object.keys(times).find(key => value.endsWith(key))

  if (!unit) {
    return 0
  }

  const amount = value.replace(unit, '').toLocaleLowerCase()

  // verify if amount have letter
  if (/[a-z]/i.test(amount)) {
    return 0
  }

  const multiplier = times[(unit as keyof typeof times)];

  return multiplier * Number(amount);
}
