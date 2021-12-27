export function roundAccurately(number: number, decimalPlaces: number) {
  // @ts-ignore
  return Number(Math.round(number + 'e' + decimalPlaces) + 'e-' + decimalPlaces);
}