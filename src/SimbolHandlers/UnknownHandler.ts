import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class UnknownHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = false;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'unknown';

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
        return this.returnIsContinueSimbol('');
    }
}
