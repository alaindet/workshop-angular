export function descendingByKey<T = any>(
  key: keyof T,
): (a: T, b: T) => number {
  return (a: T, b: T) => {
    const aValue = a[key];
    const bValue = b[key];
    return (aValue === bValue) ? 0 : (aValue < bValue ? 1 : -1);
  };
}
