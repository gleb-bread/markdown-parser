import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Headers', () => {
    const parser = new DefaultMarkdown();

    it('должен преобразовывать заголовки (h1-h6)', () => {
        expect(parser.getHTML('# Заголовок')).toBe(
            '<h1 class="diplim_h1">Заголовок</h1>'
        );
        expect(parser.getHTML('## Заголовок')).toBe(
            '<h2 class="diplim_h2">Заголовок</h2>'
        );
        expect(parser.getHTML('### Заголовок')).toBe(
            '<h3 class="diplim_h3">Заголовок</h3>'
        );
        expect(parser.getHTML('#### Заголовок')).toBe(
            '<h4 class="diplim_h4">Заголовок</h4>'
        );
        expect(parser.getHTML('##### Заголовок')).toBe(
            '<h5 class="diplim_h5">Заголовок</h5>'
        );
        expect(parser.getHTML('###### Заголовок')).toBe(
            '<h6 class="diplim_h6">Заголовок</h6>'
        );
    });
});
