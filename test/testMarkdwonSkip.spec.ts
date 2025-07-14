import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Skip', () => {
    const parser = new DefaultMarkdown();

    it('должен корректно экранировать символы', () => {
        expect(parser.getHTML('\\**нежирный текст**')).toBe(
            '*<i class="diplim_italic">нежирный текст</i>*'
        );
        expect(parser.getHTML('\\# Не заголовок')).toBe('# Не заголовок');
        expect(parser.getHTML('\\*Не курсив*')).toBe('*Не курсив*');
        expect(parser.getHTML('\\*text\\*')).toBe('*text*');
    });
});
