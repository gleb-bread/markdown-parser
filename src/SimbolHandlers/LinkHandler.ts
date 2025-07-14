import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class LinkHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = false;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    protected _input_text: string = '';
    protected _link_text: string = '';
    protected _link_href: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'link';

    constructor(items: MarkdownTypes.BasicMarkdownElement[]) {
        super();

        this._items = items;
        this._map_items = {};
    }

    public handlerNewHandler(): MarkdownTypes.HandlerResultText {
        const v = this._specsimbol;
        let result = '';

        if (this._output_items.length && v) {
            const lastOutputItem = this.getLastOutputItem();

            if (lastOutputItem?.endSimbol === v) {
                if (lastOutputItem.target === 'link_href') {
                    result += this.getStringByItem(lastOutputItem);
                }

                this._output_items.pop();

                this.getSpecsimbolAndClear();

                return this.returnIsEndSimbol(result);
            }
        } else {
            result = this._input_text;
        }

        this.getSpecsimbolAndClear();

        return this.returnIsEndSimbol(result);
    }

    public handlerSimbol(
        v: string,
        isLast: boolean = false
    ): MarkdownTypes.HandlerResultText {
        this._input_text += v;
        const isSpecsimbol = this.getInputSpecsimbol(v);
        const preventItem = this.getItem(this._specsimbol);
        const nextItem = this.getItem(this._specsimbol + v);
        let lastOutputItem = this.getLastOutputItem();
        let result = '';

        if (isLast) {
            if (!preventItem) result += this._input_text;
            else {
                result += this.getStringByItem(preventItem);
            }

            return this.returnIsEndSimbol(result);
        }

        if (nextItem) {
            this._specsimbol += v;

            if (this._specsimbol.length === 1) {
                return this.returnIsNewSimbol(result);
            }

            return this.returnIsContinueSimbol(result);
        } else if (preventItem && !nextItem) {
            this._output_items.push(preventItem);

            if (!isSpecsimbol) {
                if (preventItem?.target === 'link_text') {
                    this._link_text += v;
                } else if (preventItem?.target === 'link_href') {
                    this._link_href += v;
                }
            } else {
                lastOutputItem = this.getLastOutputItem();

                if (lastOutputItem?.endSimbol === v) {
                    if (lastOutputItem.target === 'link_href') {
                        result += this.getStringByItem(lastOutputItem);

                        this.getSpecsimbolAndClear();

                        this._output_items.pop();

                        return this.returnIsEndSimbol(result);
                    } else {
                        this._output_items.pop();
                        this._specsimbol = '';
                    }

                    return this.returnIsContinueSimbol(result);
                }
            }

            this._specsimbol = '';

            return this.returnIsContinueSimbol(result);
        }

        if (isSpecsimbol) {
            if (lastOutputItem?.endSimbol === v) {
                if (lastOutputItem.target === 'link_href') {
                    result += this.getStringByItem(lastOutputItem);

                    this.getSpecsimbolAndClear();
                }

                this._output_items.pop();

                return this.returnIsEndSimbol(result);
            }
        } else {
            if (lastOutputItem?.target === 'link_href') {
                this._link_href += v;
            } else if (lastOutputItem?.target === 'link_text') {
                this._link_text += v;
            }
        }

        return this.returnIsContinueSimbol(result);
    }

    protected getStringByItem(
        item: MarkdownTypes.BasicMarkdownElement
    ): string {
        let link = '';
        this._output_items = [];

        link += this.getStartTag(item);
        link += this._link_text;
        link += this.getEndTag(item);

        this._link_href = '';
        this._link_text = '';
        this._input_text = '';

        return link;
    }

    protected getStartTag(item: MarkdownTypes.BasicMarkdownElement) {
        const tag = item.tag ?? null;
        const tagClass = item.class ?? null;

        let result = '';

        if (tag) result += `<${tag} `;
        if (tagClass && !!result) result += `class="${tagClass}"`;
        if (this._link_href) result += ` href="${this._link_href}"`;
        if (!result) return result;

        result += '>';

        return result;
    }

    public getSpecsimbolAndClear() {
        const result = this._specsimbol;
        this._has_single_item = false;
        this._specsimbol = '';
        this._input_text = '';
        this._link_href = '';
        this._link_text = '';
        return result;
    }
}
