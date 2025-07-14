import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Code', () => {
    const parser = new DefaultMarkdown();
    it('должен преобразовывать текст в формат кода', () => {
        expect(parser.getHTML('`код инлайн текст`')).toBe(
            '<code class="diplim_inline_code">код инлайн текст</code>'
        );
        expect(parser.getHTML('```код блок текст```')).toBe(
            '<code class="diplim_code_block">код блок текст</code>'
        );
    });
});
