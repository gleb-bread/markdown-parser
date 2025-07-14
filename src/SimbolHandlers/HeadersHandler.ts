import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class HeadersHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = true;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'headers';

    constructor(items: MarkdownTypes.BasicMarkdownElement[]) {
        super();

        this._items = items;
        this._map_items = {};
    }

    public handlerNewHandler(): MarkdownTypes.HandlerResultText {
        const v = this._specsimbol;
        const inputItem = this.getItem(v);
        let result = '';

        if (this._output_items.length) {
            const lastOutputItem = this.getLastOutputItem();

            if (lastOutputItem?.endSimbol === v) {
                result = this.getStringByItem(lastOutputItem);

                return this.returnIsContinueSimbol(result);
            }
        } else if (inputItem) {
            result = this.getStringByItem(inputItem);

            return this.returnIsContinueSimbol(result);
        } else {
            result += v;
        }

        this.getSpecsimbolAndClear();

        return this.returnIsEndSimbol(result);
    }

    public handlerSimbol(
        v: string,
        isLast: boolean = false
    ): MarkdownTypes.HandlerResultText {
        const preventItem = this.getItem(this._specsimbol);
        const nextItem = this.getItem(this._specsimbol + v);

        let result = '';

        if (isLast) {
            if (!preventItem) result += this._specsimbol;
            else {
                result += this.getStringByItem(preventItem);
            }

            const item = this.getLastOutputItem();

            if (item) {
                result += this.getEndTag(item);
            }

            return this.returnIsEndSimbol(result);
        }

        if (nextItem) {
            this._specsimbol += v;

            if (this._specsimbol.length === 1)
                return this.returnIsNewSimbol(result);

            return this.returnIsContinueSimbol(result);
        } else if (preventItem && !nextItem) {
            result = this.getStringByItem(preventItem);

            return this.returnIsContinueSimbol(result);
        }

        return this.returnIsContinueSimbol(v);
    }
}
