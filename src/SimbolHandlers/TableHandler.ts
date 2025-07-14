import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class TableHandler extends AHandler {
    protected _items: MarkdownTypes.BasicMarkdownElement[];
    protected _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _has_single_item: boolean = true;
    protected _output_items: MarkdownTypes.BasicMarkdownElement[] = [];
    protected _has_header = false;
    protected _has_start = false;
    protected _has_body = false;
    protected _specsimbol: string = '';
    protected _table_specsimbol = '|';
    protected _table_items: string[] = [];
    protected _table_tr_items: string[] = [];
    protected _table_item_end_simbol = '\n';
    protected _table_tag = 'table';
    protected _table_class = 'dimplim_table';
    protected _table_tr_tag = 'tr';
    protected _table_tr_body_class = 'dimplim_body_tr';
    protected _table_tr_header_class = 'dimplim_thead_tr';
    protected _table_body_tag = 'tbody';
    protected _table_body_class = 'dimplim_body';
    protected _table_header_tag = 'thead';
    protected _table_header_class = 'dimplim_header';
    protected _table_header_item_tag = 'th';
    protected _table_header_item_class = 'dimplim_header_item';
    protected _table_body_item_tag = 'td';
    protected _table_body_item_class = 'dimplim_body_item';

    public type: MarkdownTypes.MarkdownElementTypes = 'table';

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

        if (isLast) {
            if (!this._has_header) {
                this._table_tr_items.forEach((item) => {
                    result += this.getTableHeaderTrItemEnd();
                });

                result += this.getTableItemEnd();
                result += this.getTableHeaderEnd();
            } else {
                this._table_tr_items.forEach((item) => {
                    result += this.getTableBodyTrItemEnd();
                });

                result += this.getTableItemEnd();
                result += this.getTableBodyEnd();
            }

            result += this.getTableEnd();

            this._table_items = [];
            this._table_tr_items = [];
            this._has_body = false;
            this._has_header = false;
            this._has_start = false;

            return this.returnIsEndSimbol(result);
        }

        if (isSpecsimbol && !isSpecsimbol.isEndSimbol) {
            if (!this._has_start) {
                result += this.getTableStart();
                result += this.getTableHeaderStart();
                result += this.getTableHeaderItemStart();
                result += this.getTableHeaderTrItemStart();

                this._table_items.push('htr');
                this._table_tr_items.push('th');

                this._has_start = true;

                return this.returnIsNewSimbol(result);
            } else {
                if (!this._has_header) {
                    result += this.getTableHeaderTrItemEnd();
                    this._table_tr_items.pop();
                } else if (!this._has_body) {
                    result += this.getTableBodyStart();
                    result += this.getTableBodyItemStart();

                    this._table_items.push('btr');

                    this._has_body = true;
                } else if (this._table_tr_items.length) {
                    result += this.getTableBodyTrItemEnd();
                    this._table_tr_items.pop();
                }

                return this.returnIsContinueSimbol(result);
            }
        } else if (isSpecsimbol?.isEndSimbol) {
            if (!this._has_header) {
                this._table_tr_items.forEach((item) => {
                    result += this.getTableHeaderTrItemEnd();
                });

                result += this.getTableItemEnd();
                result += this.getTableHeaderEnd();

                this._table_tr_items = [];
                this._table_items.pop();
                this._has_header = true;
            } else {
                this._table_tr_items.forEach((item) => {
                    result += this.getTableBodyTrItemEnd();
                });

                result += this.getTableItemEnd();

                this._table_tr_items = [];
                this._table_items.pop();
            }

            return this.returnIsContinueSimbol(result);
        }

        if (!this._has_start) {
            return this.returnIsContinueSimbol(v);
        } else {
            if (this._table_tr_items.length) {
                return this.returnIsContinueSimbol(v);
            } else {
                if (!this._has_header) {
                    result += this.getTableHeaderTrItemStart();
                    this._table_tr_items.push('th');
                } else if (this._table_items.length) {
                    result += this.getTableBodyTrItemStart();
                    this._table_tr_items.push('td');
                } else {
                    result += this.getTableBodyItemStart();
                    result += this.getTableBodyTrItemStart();

                    this._table_items.push('btr');
                    this._table_tr_items.push('td');
                }

                return this.returnIsContinueSimbol(result + v);
            }
        }
    }

    public getSpecsimbols(): MarkdownTypes.MarkdownSpecsimbols {
        let result = {} as MarkdownTypes.MarkdownSpecsimbols;

        result[this._table_specsimbol] = this.createSpecsimbol(
            { typeElement: this.type },
            false
        );

        result[this._table_item_end_simbol] = this.createSpecsimbol(
            { typeElement: this.type },
            true
        );

        this._map_specsimbols = { ...result };

        return result;
    }

    public getTableStart() {
        let tag = `<${this._table_tag} `;

        if (this._table_class) tag += `class="${this._table_class}"`;

        tag += '>';

        return tag;
    }

    public getTableEnd() {
        let tag = `</${this._table_tag}>`;

        return tag;
    }

    public getTableHeaderStart() {
        let tag = `<${this._table_header_tag} `;

        if (this._table_header_class)
            tag += `class="${this._table_header_class}"`;

        tag += '>';

        return tag;
    }

    public getTableBodyStart() {
        let tag = `<${this._table_body_tag} `;

        if (this._table_body_class) tag += `class="${this._table_body_class}"`;

        tag += '>';

        return tag;
    }

    public getTableBodyEnd() {
        let tag = `</${this._table_body_tag}>`;

        return tag;
    }

    public getTableHeaderEnd() {
        let tag = `</${this._table_header_tag}>`;
        return tag;
    }

    public getTableHeaderItemStart() {
        let tag = `<${this._table_tr_tag} `;

        if (this._table_tr_header_class)
            tag += `class="${this._table_tr_header_class}"`;

        tag += '>';

        return tag;
    }

    public getTableItemEnd() {
        let tag = `</${this._table_tr_tag}>`;

        return tag;
    }

    public getTableHeaderTrItemStart() {
        let tag = `<${this._table_header_item_tag} `;

        if (this._table_header_item_class)
            tag += `class="${this._table_header_item_class}"`;

        tag += '>';

        return tag;
    }

    public getTableBodyTrItemStart() {
        let tag = `<${this._table_body_item_tag} `;

        if (this._table_body_item_class)
            tag += `class="${this._table_body_item_class}"`;

        tag += '>';

        return tag;
    }

    public getTableHeaderTrItemEnd() {
        let tag = `</${this._table_header_item_tag}`;

        tag += '>';

        return tag;
    }

    public getTableBodyTrItemEnd() {
        let tag = `</${this._table_body_item_tag}`;

        tag += '>';

        return tag;
    }

    public getTableBodyItemStart() {
        let tag = `<${this._table_tr_tag} `;

        if (this._table_tr_body_class)
            tag += `class="${this._table_tr_body_class}"`;

        tag += '>';

        return tag;
    }
}
