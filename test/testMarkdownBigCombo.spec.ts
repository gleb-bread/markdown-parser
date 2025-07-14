import { describe, it, expect } from 'vitest';
import { DefaultMarkdown } from '../defaultMarkdown';

describe('Markdown Parser Big Combo', () => {
    const parser = new DefaultMarkdown();
    it('должен поддерживать сложные комбинации', () => {
        expect(parser.getHTML('# Заголовок **с жирным** и *курсивом*')).toBe(
            '<h1 class="diplim_h1">Заголовок <b class="diplim_bold">с жирным</b> и <i class="diplim_italic">курсивом</i></h1>'
        );

        expect(parser.getHTML('~~зачеркнутый **жирный *курсив***~~')).toBe(
            '<u class="diplim_underlined">зачеркнутый <b class="diplim_bold">жирный <i class="diplim_italic">курсив</i></b></u>'
        );
    });
});
