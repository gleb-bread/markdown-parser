import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class SkipHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = false;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'skip';

    constructor(items: MarkdownTypes.BasicMarkdownElement[]) {
        super();

        this._items = items;
        this._map_items = {};
    }

    public handlerNewHandler(): MarkdownTypes.HandlerResultText {
        return this.returnIsContinueSimbol('');
    }

    public handlerSimbol(
        v: string,
        isLast: boolean = false
    ): MarkdownTypes.HandlerResultText {
        const isSpecsimbol = this.getInputSpecsimbol(v);
        let result = '';

        if (isLast) return this.returnIsEndSimbol(v);
        if (!v) return this.returnIsContinueSimbol(result);

        if (isSpecsimbol) {
            this._specsimbol = v;

            return this.returnIsNewSimbol(result);
        } else {
            this._specsimbol = '';

            return this.returnIsEndSimbol(v);
        }
    }
}
