export type Character = '好' | '赢' | '强' | '!';
const PaddingBits = '00000000';

export function toBytes(content: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(content);
}

export function toBits(byte: number): Array<number> {
  return (PaddingBits + byte.toString(2)).slice(-8).split('').map(parseFloat);
}

export function map2Character(num: number): Character {
  if (num === 0) {
    return '好';
  }
  if (num === 1) {
    return '赢';
  }
  if (num === 2) {
    return '强';
  }
  if (num === 3) {
    return '!';
  }

  throw new Error('invalid bits');
}

export function mapFromCharacter(char: Character): Array<number> {
  if (char === '好') {
    return [0, 0];
  }
  if (char === '赢') {
    return [0, 1];
  }
  if (char === '强') {
    return [1, 0];
  }
  if (char === '!') {
    return [1, 1];
  }
  return [];
}
