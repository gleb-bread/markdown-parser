import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class ImgHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = true;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _specsimbol: string = '';
    protected _input_text: string = '';
    protected _img_alt: string = '';
    protected _img_href: string = '';
    protected _img_title: string = '';
    public type: MarkdownTypes.MarkdownElementTypes = 'img';

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
                if (lastOutputItem.target === 'img_href') {
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
        const totalItem = this.getItem(v);
        let lastOutputItem = this.getLastOutputItem();
        let result = '';

        if (lastOutputItem && this.isFirstSimbolExistItem(lastOutputItem, v)) {
            if (lastOutputItem?.target === 'img_title') {
                this._img_title += v;
            } else if (lastOutputItem?.target === 'img_href') {
                this._img_href += v;
            } else if (lastOutputItem?.target === 'img_alt') {
                this._img_alt += v;
            }

            return this.returnIsContinueSimbol(result);
        }

        if (isLast) {
            if (!preventItem) result += this._input_text;
            else {
                result += this.getStringByItem(preventItem);
            }

            this.restoreOutputVariables();

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
                if (preventItem?.target === 'img_title') {
                    this._img_title += v;
                } else if (preventItem?.target === 'img_href') {
                    this._img_href += v;
                } else if (preventItem?.target === 'img_alt') {
                    this._img_alt += v;
                }
            } else {
                lastOutputItem = this.getLastOutputItem();

                if (lastOutputItem?.endSimbol === v) {
                    if (lastOutputItem.target === 'img_href') {
                        result += this.getStringByItem(lastOutputItem);

                        this.getSpecsimbolAndClear();
                    } else {
                        this._output_items.pop();
                        this._specsimbol = '';
                    }

                    return this.returnIsContinueSimbol(result);
                } else if (
                    lastOutputItem &&
                    lastOutputItem.target === 'img_title'
                ) {
                    if (this._output_items.length === 2) {
                        let firstOutputItem = this._output_items[0];

                        if (firstOutputItem.endSimbol === v) {
                            result += this.getStringByItem(firstOutputItem);

                            this.getSpecsimbolAndClear();

                            this._output_items = [];

                            return this.returnIsContinueSimbol(result);
                        }
                    }
                }
            }

            this._specsimbol = '';

            return this.returnIsContinueSimbol(result);
        }

        if (isSpecsimbol) {
            if (lastOutputItem?.endSimbol === v) {
                if (lastOutputItem.target === 'img_href') {
                    result += this.getStringByItem(lastOutputItem);

                    this.getSpecsimbolAndClear();
                }

                this._output_items.pop();

                return this.returnIsContinueSimbol(result);
            } else if (
                lastOutputItem &&
                lastOutputItem.target === 'img_title'
            ) {
                if (this._output_items.length === 2) {
                    let firstOutputItem = this._output_items[0];

                    if (firstOutputItem.endSimbol === v) {
                        result += this.getStringByItem(lastOutputItem);

                        this.getSpecsimbolAndClear();

                        this._output_items = [];

                        return this.returnIsContinueSimbol(result);
                    }
                }
            } else {
                this._specsimbol += v;

                if (this._specsimbol.length === 1)
                    return this.returnIsNewSimbol('');
                else return this.returnIsContinueSimbol('');
            }
        } else {
            if (lastOutputItem?.target === 'img_title') {
                this._img_title += v;
            } else if (lastOutputItem?.target === 'img_href') {
                this._img_href += v;
            } else if (lastOutputItem?.target === 'img_alt') {
                this._img_alt += v;
            }
        }

        return this.returnIsContinueSimbol(result);
    }

    protected getStringByItem(
        item: MarkdownTypes.BasicMarkdownElement
    ): string {
        let img = '';
        this._output_items = [];

        img += this.getTag(item);

        this._img_alt = '';
        this._img_title = '';
        this._img_href = '';
        this._input_text = '';

        return img;
    }

    protected getTag(item: MarkdownTypes.BasicMarkdownElement) {
        let result = '<img ';

        if (item.class) result += `class="${item.class}" `;
        if (this._img_alt) result += `alt="${this._img_alt.trim()}" `;
        if (this._img_title) result += `title="${this._img_title.trim()}" `;
        if (this._img_href) result += `src="${this._img_href.trim()}" `;

        result += '/>';

        return result;
    }

    public restoreOutputVariables(): void {
        this._specsimbol = '';
        this._input_text = '';
        this._img_alt = '';
        this._img_href = '';
        this._img_title = '';
        this._output_items = [];
    }

    public getSpecsimbolAndClear() {
        const result = this._specsimbol;
        this._specsimbol = '';
        this._input_text = '';
        this._img_alt = '';
        this._img_href = '';
        this._img_title = '';
        return result;
    }

    protected isFirstSimbolExistItem(
        item: MarkdownTypes.BasicMarkdownElement,
        simbol: string
    ) {
        const subSimbols = item.specSimbol.split('');

        return subSimbols[0] == simbol;
    }
}
