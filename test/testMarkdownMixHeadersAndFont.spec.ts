import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Mix Headers And Font', () => {
    const parser = new DefaultMarkdown();

    it('должен поддерживать вложенные стили', () => {
        expect(parser.getHTML('**жирный и *курсив* текст**')).toBe(
            '<b class="diplim_bold">жирный и <i class="diplim_italic">курсив</i> текст</b>'
        );

        expect(parser.getHTML('# **жирный заголовок**')).toBe(
            '<h1 class="diplim_h1"><b class="diplim_bold">жирный заголовок</b></h1>'
        );

        expect(parser.getHTML('## *курсивный заголовок*')).toBe(
            '<h2 class="diplim_h2"><i class="diplim_italic">курсивный заголовок</i></h2>'
        );
    });
});
