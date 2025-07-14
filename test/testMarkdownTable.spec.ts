import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Tables', () => {
    const parser = new DefaultMarkdown();

    it('должен преобразовывать таблицы', () => {
        expect(
            parser.getHTML(
                `| Заголовок 1 | Заголовок 2 |\n| Данные 1   | Данные 2   |\n| Данные 3   | Данные 4   |\n`
            )
        ).toBe(
            `<table class="dimplim_table"><thead class="dimplim_header"><tr class="dimplim_thead_tr"><th class="dimplim_header_item"> Заголовок 1 </th><th class="dimplim_header_item"> Заголовок 2 </th></tr></thead><tbody class="dimplim_body"><tr class="dimplim_body_tr"><td class="dimplim_body_item"> Данные 1   </td><td class="dimplim_body_item"> Данные 2   </td></tr><tr class="dimplim_body_tr"><td class="dimplim_body_item"> Данные 3   </td><td class="dimplim_body_item"> Данные 4   </td></tr></tbody></table>`
        );
    });
});
