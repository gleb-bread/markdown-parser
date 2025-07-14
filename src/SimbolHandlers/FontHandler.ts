import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class FontHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = false;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'font';

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

                this.getSpecsimbolAndClear();

                return this.returnIsEndSimbol(result);
            } else {
                if (inputItem) {
                    result += this.getStringByItem(inputItem);

                    this._specsimbol = '';

                    return this.returnIsContinueSimbol(result);
                } else {
                    result += v;
                    this._specsimbol = '';

                    return this.returnIsContinueSimbol(result);
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
        const lastOutputItem = this.getLastOutputItem();
        let result = '';

        if (isLast) {
            if (!!this._specsimbol) result += this._specsimbol;

            const item = this.getLastOutputItem();

            if (item) {
                result += this.getEndTag(item);
            }

            return this.returnIsEndSimbol(result);
        }

        if (nextItem) {
            if (lastOutputItem?.ignoreSpecSimbols) {
                if (lastOutputItem.endSimbol === nextItem.specSimbol) {
                    result += this.getStringByItem(nextItem);
                    this._specsimbol = '';

                    return this.returnIsEndSimbol(result);
                } else {
                    result += this._specsimbol + v;
                    this._specsimbol = '';
                    return this.returnIsContinueSimbol(result);
                }
            } else {
                this._specsimbol += v;

                if (lastOutputItem?.endSimbol === nextItem.specSimbol) {
                    result += this.getStringByItem(nextItem);
                    this._specsimbol = '';

                    if (this._output_items.length) {
                        return this.returnIsContinueSimbol(result);
                    }

                    return this.returnIsEndSimbol(result);
                }

                if (
                    this._output_items.length === 0 &&
                    this._specsimbol.length === 1
                )
                    return this.returnIsNewSimbol(result);

                return this.returnIsContinueSimbol(result);
            }
        } else if (preventItem && !nextItem) {
            result = this.getStringByItem(preventItem);

            if (!isSpecsimbol || preventItem?.ignoreSpecSimbols) {
                result += v;
                this._specsimbol = '';
            } else this._specsimbol = v;

            if (!!this._specsimbol || this._output_items.length) {
                return this.returnIsContinueSimbol(result);
            } else {
                return this.returnIsEndSimbol(result);
            }
        }

        if (isSpecsimbol && !lastOutputItem?.ignoreSpecSimbols) {
            result += this._specsimbol;
            this._specsimbol = v;
        } else {
            result += this._specsimbol + v;
            this._specsimbol = '';
        }

        if (this._specsimbol) {
            const item = this.getItem(this._specsimbol);

            if (
                this.getLastOutputItem() &&
                item &&
                this.getLastOutputItem()?.endSimbol === item?.specSimbol
            ) {
                result += this.getStringByItem(item);
            }
        }

        if (!!this._specsimbol || this._output_items.length) {
            if (
                this._output_items.length === 0 &&
                this._specsimbol.length === 1
            ) {
                return this.returnIsNewSimbol(result);
            } else {
                return this.returnIsContinueSimbol(result);
            }
        } else {
            return this.returnIsEndSimbol(result);
        }
    }
}
