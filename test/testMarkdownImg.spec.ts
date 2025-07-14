import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Img', () => {
    const parser = new DefaultMarkdown();

    it('Проверка изображений', () => {
        expect(
            parser.getHTML(
                '![Logo](https://example.com/logo.png?size=large&v=2)'
            )
        ).toBe(
            '<img class="diplim_img" alt="Logo" src="https://example.com/logo.png?size=large&v=2" />'
        );
        expect(parser.getHTML('![Alt]()')).toBe(
            '<img class="diplim_img" alt="Alt" />'
        );
        expect(parser.getHTML('![](https://example.com/image.jpg)')).toBe(
            '<img class="diplim_img" src="https://example.com/image.jpg" />'
        );
        expect(
            parser.getHTML('![Alt Text](https://example.com/image.jpg|fsfsd)')
        ).toBe(
            '<img class="diplim_img" alt="Alt Text" title="fsfsd" src="https://example.com/image.jpg" />'
        );
    });
});
