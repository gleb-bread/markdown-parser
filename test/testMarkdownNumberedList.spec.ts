import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Ordered Lists', () => {
    const parser = new DefaultMarkdown();

    it('должен преобразовывать нумерованные списки', () => {
        expect(
            parser.getHTML(
                '1. Первый элемент\n2. Второй элемент\n3. Третий элемент'
            )
        ).toBe(
            '<ol class="diplim_numbered_list"><li class="diplim_numbered_list_item" value="1"> Первый элемент</li><li class="diplim_numbered_list_item" value="2"> Второй элемент</li><li class="diplim_numbered_list_item" value="3"> Третий элемент</li></ol>'
        );
    });

    it('должен корректно обрабатывать списки с разными номерами', () => {
        expect(parser.getHTML('3. Элемент 3\n1. Элемент 1\n2. Элемент 2')).toBe(
            '<ol class="diplim_numbered_list"><li class="diplim_numbered_list_item" value="3"> Элемент 3</li><li class="diplim_numbered_list_item" value="1"> Элемент 1</li><li class="diplim_numbered_list_item" value="2"> Элемент 2</li></ol>'
        );
    });
});
