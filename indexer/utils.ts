export function createRange(start: number, end: number): number[] {
  let array: number[] = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
