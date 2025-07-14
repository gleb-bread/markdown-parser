# diplim-markdown-parser

A lightweight and extensible Markdown parser designed for converting Markdown syntax into HTML with custom class names. This library provides a flexible and efficient way to process Markdown content, making it suitable for various web applications and content management systems.

## Installation

To install the parser, use npm:

```bash
npm install diplim-markdown-parser
```

## Usage

### Basic Conversion

Import `DefaultMarkdown` and use the `getHTML` method to convert Markdown strings to HTML.

```typescript
import { DefaultMarkdown } from "diplim-markdown-parser";

const parser = new DefaultMarkdown();
const markdownText = "# Hello, World!\n**This is bold text.**";
const htmlOutput = parser.getHTML(markdownText);

console.log(htmlOutput);
// Expected output:
// <h1 class="diplim_h1">Hello, World!</h1><b class="diplim_bold">This is bold text.</b>
```

### Supported Markdown Features

The parser supports various Markdown features, including:

- **Headers**: `#`, `##`, `###`, `####`, `#####`, `######`
  - Example: `# Heading 1` -> `<h1 class="diplim_h1">Heading 1</h1>`
- **Font Styles**:
  - Bold: `**bold text**` -> `<b class="diplim_bold">bold text</b>`
  - Italic: `*italic text*` -> `<i class="diplim_italic">italic text</i>`
  - Underlined: `~~underlined text~~` -> `<u class="diplim_underlined">underlined text</u>`
  - Strikethrough: `~~~strikethrough text~~~` -> `<s class="diplim_strikethrough">strikethrough text</s>`
- **Inline Code**: `` `inline code` `` -> `<code class="diplim_inline_code">inline code</code>`
- **Links**: `[Link Text](https://example.com)` -> `<a class="diplim_link" href="https://example.com">Link Text</a>`
- **Bulleted Lists**:
  ```markdown
  - Item 1
  - Item 2
  ```
  ->
  ```html
  <ul class="diplim_bulleted_list">
    <li class="diplim_bulleted_list_item">Item 1</li>
    <li class="diplim_bulleted_list_item">Item 2</li>
  </ul>
  ```

## Development

### Building the Project

To build the project (compile TypeScript to JavaScript for ESM and CJS, and generate type declarations):

```bash
npm run build
```

This command uses Rollup to create output in the `dist/esm` (ES Modules) and `dist/cjs` (CommonJS) directories, and TypeScript to generate declaration files in the `types` directory.

### Running Tests

Tests are written with Vitest. To run them:

```bash
npm test
```

## Contributing

Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
