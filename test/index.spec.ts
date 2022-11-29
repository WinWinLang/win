import { parse } from '../src';
import { translate } from '../src/translate';

describe('parse', () => {
  describe('parse simple', () => {
    it('should parse success', () => {
      const message = '不好！';
      const result = parse(message);
      const t = translate(result);
      expect(RegExp(message).exec(t));
    });
  });
});
