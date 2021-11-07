/**
 * Converts string representation of file size
 * in to a number
 */
export function sizeToBytes(size: string | number): number {
  if (typeof size === 'number') {
    return size;
  }

  const units = [['bytes', 'b'], 'kb', 'mb', 'gb', 'tb', 'pb'];
  const unit = size.replace(/[0-9.]/g, '').toLowerCase().replace(/\s/g, '');
  const power = units.findIndex(item => Array.isArray(item) ? item.includes(unit) : item === unit);
  return power === -1
      ? 0
      : (parseFloat(size) || 0) * Math.pow(1024, power);
}
