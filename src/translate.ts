import { Character, mapFromCharacter } from './utils';

export function translate(content: string): string {
  const chars = toChars(content.trim());
  const bytes: Array<number> = [];
  let buffer: Array<number> = [];
  for (const char of chars) {
    const bits = mapFromCharacter(char);
    buffer = buffer.concat(bits);
    if (buffer.length === 8) {
      let n = 0;
      let c = 0;
      for (const b of buffer.reverse()) {
        n += b * Math.pow(2, c);
        c += 1;
      }
      bytes.push(n);
      buffer = [];
    }
  }
  return new TextDecoder('utf-8').decode(new Uint8Array(bytes));
}

const toChars = (content: string) => content.split('') as Array<Character>;
