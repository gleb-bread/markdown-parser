import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Multiple markdown symbols in a row', () => {
    const parser = new DefaultMarkdown();

    it('Должна вернутся строка со всеми спец. символами', () => {
        expect(parser.getHTML('****')).toBe('<b class="diplim_bold"></b>');
        expect(parser.getHTML('te*xt')).toBe(
            'te<i class="diplim_italic">xt</i>'
        );
        expect(parser.getHTML('text*')).toBe('text*');
        expect(parser.getHTML('*text')).toBe(
            '<i class="diplim_italic">text</i>'
        );
    });
});
