import { Character, toBytes, toBits, map2Character } from './utils';

/**
 * Parse content to WinWinLang
 */
export function parse(content: string): string {
  const bytes = toBytes(content.trim());
  return parseBytes(bytes).join('');
}

function parseBytes(bytes: Uint8Array) {
  let allChars: Array<Character> = [];
  for (const b of bytes) {
    const chars = parseByte(b);
    allChars = allChars.concat(chars);
  }
  return allChars;
}

function parseByte(byte: number) {
  const bits = toBits(byte);
  const chars: Array<Character> = [];
  for (let i = 0; i < 8; i += 2) {
    const num = bits[i] * 2 + bits[i + 1];
    chars.push(map2Character(num));
  }
  return chars;
}
