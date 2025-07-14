import type { AHandler as AHandlerSimbol } from '../SimbolHandlers/AHandler';
import * as MarkdownTypes from '../types';
import { AHandler } from './AHandler';

export class DefaultHandler extends AHandler {
    protected _handlers: AHandlerSimbol[];
    protected _map_spec_simbols: MarkdownTypes.MarkdownSpecsimbols = {};
    protected _map_handlers: MarkdownTypes.MapMarkdownSimbolHandlers = {};
    protected _stackHandlers: MarkdownTypes.MarkdownElementTypes[] = [];

    constructor(...handlers: AHandlerSimbol[]) {
        super();

        this._handlers = handlers;

        this.getMaps();
    }

    public getHTML(input: string) {
        let result = '';
        const text = input.trim().split('');

        text.forEach((v, index) => {
            let str = this.handlerSimbol(v);

            result += str;

            if (index === text.length - 1 && !this.stackHandlersEmpty()) {
                this._stackHandlers.forEach((handlerType) => {
                    result +=
                        this._map_handlers[handlerType].handlerSimbol('', true)
                            ?.text ?? '';

                    this._map_handlers[handlerType].restoreOutputVariables();
                });
            } else if (
                index === text.length - 1 &&
                this.stackHandlersEmpty() &&
                !str
            ) {
                result += v;
            }

            if (index === text.length - 1) {
                this._stackHandlers = [];
            }
        });

        return result;
    }

    private handlerSimbol(v: string) {
        const specSimbol = this._map_spec_simbols[v] || null;

        if (!specSimbol && this.stackHandlersEmpty()) return v;

        const currentType: MarkdownTypes.MarkdownElementTypes | null =
            specSimbol?.type ?? null;
        const preventType = this.getLastHanlder();
        let handler: AHandlerSimbol | null =
            this._map_handlers?.[currentType] ?? null;
        let preventHandler: AHandlerSimbol | null = null;

        if (preventType) {
            preventHandler = this._map_handlers[preventType];
        }

        let str = '';

        const hasHandlerItem = handler?.hasSingleItem?.() ?? false;
        const hasPreventHandlerItem =
            preventHandler?.hasSingleItem?.() ?? false;
        let result: MarkdownTypes.HandlerResultText | null = null;
        let preventResult: MarkdownTypes.HandlerResultText | null = null;
        let type: MarkdownTypes.MarkdownElementTypes | null = null;

        if (hasHandlerItem && !hasPreventHandlerItem && !preventHandler) {
            result = handler!.handlerSimbol(v);
            type = handler!.type;
        } else if (
            hasHandlerItem &&
            hasPreventHandlerItem &&
            preventHandler?.type !== 'skip'
        ) {
            result = preventHandler!.handlerSimbol(v);
            type = preventHandler!.type;
        } else if (
            handler &&
            preventHandler?.type !== 'skip' &&
            preventHandler?.type !== 'code'
        ) {
            if (handler?.type === 'unknown') {
                if (preventHandler?.type) {
                    preventResult = preventHandler!.handlerSimbol(v);
                    type = preventHandler!.type;
                } else {
                    type = handler.getItem(v)?.handlerWhenAllNull ?? null;

                    if (type) {
                        handler = this._map_handlers[type];
                        result = handler.handlerSimbol(v);
                    }
                }
            } else {
                if (!hasHandlerItem) {
                    if (
                        handler?.type != preventHandler?.type &&
                        !hasPreventHandlerItem
                    ) {
                        preventResult =
                            preventHandler?.handlerNewHandler() ?? null;
                    }
                    result = handler!.handlerSimbol(v);
                    type = handler!.type;
                } else {
                    result = preventHandler!.handlerSimbol(v);
                    type = preventHandler!.type;
                }
            }
        } else if (preventHandler) {
            result = preventHandler!.handlerSimbol(v);
            type = preventHandler!.type;
        }

        if (result) {
            if (result.isEnd === -1) {
                this.popStackHandlers();
            } else {
                if (type) {
                    if (result.isEnd === 1) this.pushStackHandlers(type);
                }
            }
        }

        if (preventResult) {
            if (preventResult.isEnd === -1) {
                this.popStackHandlers();
            }
        }

        return str + (preventResult?.text ?? '') + (result?.text ?? '');
    }
}
