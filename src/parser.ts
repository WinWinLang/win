type Character = '好' | '赢' | '强' | '!';
const PaddingBits = '00000000';

/**
 * Parse content to WinWinLang
 */
export function parse(content: string): string {
  const bytes = toBytes(content.trim());
  return parseBytes(bytes).join('');
}

function toBytes(content: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(content);
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
    chars.push(mapCharacter(num));
  }
  return chars;
}

function toBits(byte: number) {
  return (PaddingBits + byte.toString(2)).slice(-8).split('').map(parseFloat);
}

function mapCharacter(num: number): Character {
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
