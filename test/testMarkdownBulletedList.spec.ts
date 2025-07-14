import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Unordered Lists', () => {
    const parser = new DefaultMarkdown();

    it('должен преобразовывать маркерованные списки', () => {
        expect(
            parser.getHTML(
                '- Первый элемент\n- Второй элемент\n- Третий элемент'
            )
        ).toBe(
            '<ul class="diplim_bulleted_list"><li class="diplim_bulleted_list_item">Первый элемент</li><li class="diplim_bulleted_list_item">Второй элемент</li><li class="diplim_bulleted_list_item">Третий элемент</li></ul>'
        );
    });
});
