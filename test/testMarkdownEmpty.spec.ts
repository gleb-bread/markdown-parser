import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Empty', () => {
    const parser = new DefaultMarkdown();
    it('должен обрабатывать пустую строку и случайный текст', () => {
        expect(parser.getHTML('')).toBe('');
        expect(parser.getHTML('Обычный текст без разметки')).toBe(
            'Обычный текст без разметки'
        );
    });
});
