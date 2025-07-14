import * as MarkdownTypes from '../types';
import { AHandler as AHandlerSimbol } from '../SimbolHandlers/AHandler';

export abstract class AHandler {
    protected abstract _handlers: AHandlerSimbol[];
    protected abstract _map_spec_simbols: MarkdownTypes.MarkdownSpecsimbols;
    protected abstract _map_handlers: MarkdownTypes.MapMarkdownSimbolHandlers;
    protected abstract _stackHandlers: MarkdownTypes.MarkdownElementTypes[];

    public abstract getHTML(input: string): string;

    protected getMaps() {
        this._handlers.forEach((handler) => {
            this._map_handlers[handler.type] = handler;

            this._map_spec_simbols = {
                ...this._map_spec_simbols,
                ...handler.getSpecsimbols(),
            };
        });
    }

    protected stackHandlersEmpty() {
        return this._stackHandlers.length === 0;
    }

    protected getLastHanlder(): MarkdownTypes.MarkdownElementTypes | null {
        return this._stackHandlers[this._stackHandlers.length - 1] ?? null;
    }

    protected popStackHandlers() {
        this._stackHandlers.pop();
    }

    protected pushStackHandlers(type: MarkdownTypes.MarkdownElementTypes) {
        this._stackHandlers.push(type);
    }
}
