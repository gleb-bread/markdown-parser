import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser', () => {
    const parser = new DefaultMarkdown();

    it('должен преобразовывать заголовки', () => {
        const input = '# Заголовок';
        const output = '<h1 class="diplim_h1">Заголовок</h1>';
        expect(parser.getHTML(input)).toBe(output);
    });

    it('должен преобразовывать жирный текст', () => {
        const input = '**жирный текст**';
        const output = '<b class="diplim_bold">жирный текст</b>';
        expect(parser.getHTML(input)).toBe(output);
    });

    it('должен обрабатывать пустую строку', () => {
        expect(parser.getHTML('')).toBe('');
    });
});
