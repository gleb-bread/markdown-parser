import { AHandler } from './Handler/AHandler';

export abstract class AMarkdown {
    protected abstract _handler: AHandler;

    public getHTML(input: string): string {
        return this._handler.getHTML(input);
    }
}
