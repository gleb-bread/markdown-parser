import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class CodeHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = false;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'code';

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

                if (lastOutputItem.singlComponent) {
                    return this.returnIsContinueSimbol(result);
                } else {
                    this.getSpecsimbolAndClear();

                    return this.returnIsEndSimbol(result);
                }
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
        const isSpecsimbol = this.getInputSpecsimbol(v);
        const preventItem = this.getItem(this._specsimbol);
        const nextItem = this.getItem(this._specsimbol + v);
        const nextItemIsSpecsimbol = this.getInputSpecsimbol(
            this._specsimbol + v
        );
        const lastOutputItem = this.getLastOutputItem();
        let result = '';

        if (isLast) {
            if (!!this._specsimbol) result += this._specsimbol;

            this._output_items.forEach((i, indx) => {
                const index = this._output_items.length - (indx + 1);
                const item = this._output_items[index];
                if (item) {
                    result += this.getEndTag(item);
                }
            });

            this.restoreOutputVariables();

            return this.returnIsEndSimbol(result);
        }

        if (nextItem) {
            this._specsimbol += v;

            if (lastOutputItem?.endSimbol === nextItem.specSimbol) {
                result += this.getStringByItem(nextItem);

                if (!this._has_single_item)
                    return this.returnIsEndSimbol(result);
                else return this.returnIsContinueSimbol(result);
            }

            if (this._specsimbol.length === 1)
                return this.returnIsNewSimbol(result);

            return this.returnIsContinueSimbol(result);
        } else if (preventItem && !nextItem) {
            if (!nextItemIsSpecsimbol)
                result += this.getStringByItem(preventItem) + v;
            else this._specsimbol += v;

            if (preventItem.singlComponent) {
                this._has_single_item = true;
            }

            return this.returnIsContinueSimbol(result);
        }

        if (isSpecsimbol) {
            this._specsimbol += v;

            if (this._specsimbol.length === 1)
                return this.returnIsNewSimbol(result);

            return this.returnIsContinueSimbol(result);
        } else {
            result += this._specsimbol + v;
            this._specsimbol = '';
        }

        if (this._specsimbol) {
            const item = this.getItem(this._specsimbol);
            if (item) result += this.getStringByItem(item);
        }

        return this.returnIsContinueSimbol(result);
    }

    public getSpecsimbolAndClear() {
        const result = this._specsimbol;
        this._has_single_item = false;
        this._specsimbol = '';
        return result;
    }
}
