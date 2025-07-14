import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class NumberdListHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = true;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _list_items: MarkdownTypes.NumberedListMarkdownElement[] = [];
    protected _specsimbol: string = '';
    protected _list_tag = 'ol';
    protected _has_start = false;
    protected _list_class = 'diplim_numbered_list';
    protected _list_item_class = 'diplim_numbered_list_item';
    protected _list_item_tag = 'li';
    protected _list_item_end_simbol = '\n';
    public type: MarkdownTypes.MarkdownElementTypes = 'numbered_list';

    constructor(items: MarkdownTypes.BasicMarkdownElement[]) {
        super();

        this._items = items;
        this._map_items = {};
    }

    public handlerNewHandler(): MarkdownTypes.HandlerResultText {
        return this.returnIsContinueSimbol('');
    }

    protected isNumber = (s: string) => !isNaN(Number(s));

    protected createListItem(
        v: string
    ): MarkdownTypes.NumberedListMarkdownElement {
        const value = this.isNumber(v) ? Number(v) : 0;

        return {
            class: this._list_item_class,
            endSimbol: this._list_item_end_simbol,
            tag: this._list_item_tag,
            value: value,
        };
    }

    public handlerSimbol(
        v: string,
        isLast: boolean = false
    ): MarkdownTypes.HandlerResultText {
        const isSpecsimbol = this.getInputSpecsimbol(v);
        let result = '';

        if (isLast) {
            if (this._list_items.length) {
                this._list_items.forEach((item) => {
                    result += this.getEndItemTag();
                });
            }

            result += this.getEndListTag();

            this._specsimbol = '';
            this._list_items = [];
            this._has_start = false;

            return this.returnIsEndSimbol(result);
        }

        if (isSpecsimbol) {
            if (this._specsimbol.length > 0) {
                if (this.isNumber(v)) {
                    this._specsimbol += v;
                    return this.returnIsContinueSimbol(result);
                } else if (!isSpecsimbol.isEndSimbol) {
                    const newItem = this.createListItem(this._specsimbol);

                    this._list_items.push(newItem);
                    let lastItemList = this.getLastItemList();

                    if (!this._has_start) {
                        result += this.getStartListTag();
                        this._has_start = true;
                    }

                    result += this.getStartItemTag(lastItemList);

                    this._specsimbol = '';

                    return this.returnIsContinueSimbol(result);
                } else {
                    return this.returnIsContinueSimbol(this._specsimbol + v);
                }
            } else {
                if (this.isNumber(v) && this._list_items.length == 0) {
                    this._specsimbol += v;
                    if (!this._has_start) return this.returnIsNewSimbol(result);
                    else return this.returnIsContinueSimbol(result);
                } else if (isSpecsimbol.isEndSimbol) {
                    if (this._has_start) {
                        result += this.getEndItemTag();

                        this._list_items.pop();

                        this._specsimbol = '';

                        return this.returnIsContinueSimbol(result);
                    } else {
                        return this.returnIsContinueSimbol(v);
                    }
                } else {
                    return this.returnIsContinueSimbol(v);
                }
            }
        }
        if (this._has_start) return this.returnIsContinueSimbol(v);
        else {
            const result = this.returnIsEndSimbol(this._specsimbol + v);
            this._specsimbol = '';
            return result;
        }
    }

    public getSpecsimbols(): MarkdownTypes.MarkdownSpecsimbols {
        let result = {} as MarkdownTypes.MarkdownSpecsimbols;

        for (let number = 0; number < 10; number++) {
            const stringNumber = String(number);
            result[stringNumber] = this.createSpecsimbol(
                { typeElement: this.type },
                false
            );
        }

        result['.'] = this.createSpecsimbol({ typeElement: this.type }, false);

        result[this._list_item_end_simbol] = this.createSpecsimbol(
            { typeElement: this.type },
            true
        );

        this._map_specsimbols = { ...result };

        return result;
    }

    protected getStartListTag(): string {
        let tag = `<${this._list_tag} `;

        if (this._list_class) tag += `class="${this._list_class}"`;

        tag += '>';

        return tag;
    }

    protected getEndListTag(): string {
        let tag = `</${this._list_tag}>`;

        return tag;
    }

    protected getStartItemTag(
        item: MarkdownTypes.NumberedListMarkdownElement
    ): string {
        let tag = `<${this._list_item_tag} `;

        if (this._list_item_class) tag += `class="${this._list_item_class}" `;

        tag += `value="${item.value}"`;

        tag += '>';

        return tag;
    }

    protected getEndItemTag(): string {
        let tag = `</${this._list_item_tag}>`;

        return tag;
    }

    protected getLastItemList() {
        return this._list_items[this._list_items.length - 1];
    }
}
