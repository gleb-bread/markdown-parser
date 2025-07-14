import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Link', () => {
    const parser = new DefaultMarkdown();
    it('должен преобразовывать текст в ссылку', () => {
        expect(parser.getHTML('[Привет мир!](https://example)')).toBe(
            '<a class="diplim_link" href="https://example">Привет мир!</a>'
        );
        expect(parser.getHTML('[](https://example.com)')).toBe(
            '<a class="diplim_link" href="https://example.com"></a>'
        );
        expect(parser.getHTML('[Text]()')).toBe(
            '<a class="diplim_link">Text</a>'
        );
        expect(
            parser.getHTML(
                '[Example](https://example.com/?q=test&lang=ru#hash)'
            )
        ).toBe(
            '<a class="diplim_link" href="https://example.com/?q=test&lang=ru#hash">Example</a>'
        );
    });
});
