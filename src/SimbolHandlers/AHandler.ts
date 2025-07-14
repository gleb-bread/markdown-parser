import * as MarkdownTypes from '../types';

export abstract class AHandler {
    protected abstract _items: MarkdownTypes.BasicMarkdownElement[];
    protected abstract _map_items: MarkdownTypes.MapBasicMarkdownElement;
    protected abstract _map_specsimbols: MarkdownTypes.MarkdownSpecsimbols;
    protected abstract _has_single_item: boolean;
    protected abstract _specsimbol: string;
    protected abstract _output_items: MarkdownTypes.BasicMarkdownElement[];
    public abstract type: MarkdownTypes.MarkdownElementTypes;

    public abstract handlerSimbol(
        v: string,
        isLast?: boolean
    ): MarkdownTypes.HandlerResultText;

    public abstract handlerNewHandler(): MarkdownTypes.HandlerResultText;

    protected getInputSpecsimbol(
        v: string
    ): null | MarkdownTypes.MarkdownSpecsimbol {
        return this._map_specsimbols[v] ?? null;
    }

    public getItem(v: string): MarkdownTypes.BasicMarkdownElement | null {
        return this._map_items[v] ?? null;
    }

    public getSpecsimbols(): MarkdownTypes.MarkdownSpecsimbols {
        let result = {} as MarkdownTypes.MarkdownSpecsimbols;

        this._items.forEach((grandItem) => {
            result[grandItem.specSimbol] = this.createSpecsimbol(
                grandItem,
                false
            );

            if (grandItem.endSimbol && !result[grandItem.endSimbol]) {
                result[grandItem.endSimbol] = this.createSpecsimbol(
                    grandItem,
                    true
                );
                this.addSubSpecsimbols(
                    grandItem.endSimbol,
                    grandItem.typeElement,
                    result
                );
            }

            this.setMapMarkdownElement(grandItem);

            this.addSubSpecsimbols(
                grandItem.specSimbol,
                grandItem.typeElement,
                result
            );
        });

        this._map_specsimbols = result;

        return result;
    }

    protected createSpecsimbol(grandItem: any, isEndSimbol: boolean) {
        return {
            isFullSpecsimbol: true,
            isEndSimbol,
            type: grandItem.typeElement,
        };
    }

    protected addSubSpecsimbols(
        specSimbol: string,
        type: any,
        result: MarkdownTypes.MarkdownSpecsimbols
    ) {
        let subSimbol = '';

        this.getSubSpecsimbols(specSimbol).forEach((item) => {
            subSimbol += item;

            result[subSimbol] ??= {
                isFullSpecsimbol: false,
                isEndSimbol: false,
                type,
            };
        });
    }

    protected getSubSpecsimbols(v: string): string[] {
        let result = v.split('');
        return result;
    }

    protected setMapMarkdownElement(v: MarkdownTypes.BasicMarkdownElement) {
        this._map_items[v.specSimbol] = v;
    }

    protected getStringByItem(
        item: MarkdownTypes.BasicMarkdownElement
    ): string {
        const lastOutputItem = this.getLastOutputItem();

        if (lastOutputItem === null) {
            let str = '';

            if (!this._specsimbol) {
                this._output_items.push(item);
                this._specsimbol += item.specSimbol;
            } else {
                this._output_items.push(item);
                this._specsimbol = '';
                str += this.getStartTag(item);
            }

            return str;
        } else {
            if (lastOutputItem.endSimbol === item.specSimbol) {
                this._output_items.pop();
                this._specsimbol = '';
                return this.getEndTag(item);
            } else {
                let str = '';
                this._specsimbol = item?.specSimbol ?? '';
                this._output_items.push(item);
                str += this.getStartTag(item);
                return str;
            }
        }
    }

    protected getEndTag(item: MarkdownTypes.BasicMarkdownElement) {
        const tag = item.tag ?? null;

        let result = '';

        if (tag) result += `</${tag}`;
        if (!result) return result;

        result += '>';

        return result;
    }

    protected getStartTag(item: MarkdownTypes.BasicMarkdownElement) {
        const tag = item.tag ?? null;
        const tagClass = item.class ?? null;

        let result = '';

        if (tag) result += `<${tag} `;
        if (tagClass && !!result) result += `class="${tagClass}"`;
        if (!result) return result;

        result += '>';

        return result;
    }

    protected getLastOutputItem(): MarkdownTypes.BasicMarkdownElement | null {
        return this._output_items[this._output_items.length - 1] ?? null;
    }

    protected returnIsNewSimbol(text: string): MarkdownTypes.HandlerResultText {
        return {
            isEnd: 1,
            text: text,
        };
    }

    protected returnIsContinueSimbol(
        text: string
    ): MarkdownTypes.HandlerResultText {
        return {
            isEnd: 0,
            text: text,
        };
    }

    protected returnIsEndSimbol(text: string): MarkdownTypes.HandlerResultText {
        return {
            isEnd: -1,
            text: text,
        };
    }

    public restoreOutputVariables() {
        this._specsimbol = '';
        this._output_items = [];
    }

    public hasSingleItem() {
        return this._has_single_item;
    }

    public getSpecsimbolAndClear() {
        const result = this._specsimbol;

        this._specsimbol = '';
        return result;
    }
}
