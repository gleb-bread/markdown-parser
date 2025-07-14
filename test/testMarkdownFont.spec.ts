import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Font', () => {
    const parser = new DefaultMarkdown();
    it('должен преобразовывать форматированный текст', () => {
        expect(parser.getHTML('**жирный текст**')).toBe(
            '<b class="diplim_bold">жирный текст</b>'
        );
        expect(parser.getHTML('*курсив*')).toBe(
            '<i class="diplim_italic">курсив</i>'
        );
        expect(parser.getHTML('~~подчеркнутый~~')).toBe(
            '<u class="diplim_underlined">подчеркнутый</u>'
        );
        expect(parser.getHTML('~~~зачеркнутый~~~')).toBe(
            '<s class="diplim_strikethrough">зачеркнутый</s>'
        );
        expect(parser.getHTML('`код`')).toBe(
            '<code class="diplim_inline_code">код</code>'
        );
    });
});
