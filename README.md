<!-- markdown-it-tasks -->

<p align="center">
  <img src="logo.png" alt="Markdown Logo" width="120" />
</p>

<h1 align="center">@soulnote/markdown-it-tasks</h1>

---

> 🚧 **This project is under active development. APIs and features may change at any time. Feedback and contributions are welcome!**

---

A powerful, flexible, and beautiful plugin for <a href="https://github.com/markdown-it/markdown-it">markdown-it</a> that brings tasks to your Markdown documents. Supports multiple task states (TODO, DOING, DONE, CANCELLED, IMPORTANT, OPTIONAL...) with customizable rendering.

---

## ✨ Features

- ✔️ **Task Syntax**: Add todo, doing, done, cancelled, and important tasks in Markdown.
- 🎨 **Customizable**: Change class names and rendering templates easily.
- 🧩 **Seamless Integration**: Works out-of-the-box with markdown-it.
- 🛡️ **TypeScript Support**: Fully typed for safe and modern development.

---

## 🚀 Installation

```bash
npm install @soulnote/markdown-it-tasks
# or
yarn add @soulnote/markdown-it-tasks
# or
pnpm add @soulnote/markdown-it-tasks
```

---

## 📝 Usage

```js
import MarkdownIt from "markdown-it";
import { Tasks } from "@soulnote/markdown-it-tasks";

const md = new MarkdownIt().use(Tasks());
const html = md.render("[ ] todo item");

console.log(html);
```

### Rendered Output

```html
<span class="md-tasks"
  ><input type="checkbox" disabled /><span>TODO</span>Write documentation</span
>
<span class="md-tasks"
  ><input type="checkbox" disabled checked /><span>DONE</span>Release
  package</span
>
<span class="md-tasks"
  ><input type="checkbox" disabled /><span>DOING</span>Working on new
  feature</span
>
<span class="md-tasks"
  ><input type="checkbox" disabled checked /><span>CANCELLED</span>Dropped
  idea</span
>
<span class="md-tasks"
  ><input type="checkbox" disabled /><span>IMPORTANT</span>Urgent fix</span
>
```

---

## ✅ Supported Task Types

| Markdown Syntax | State     |
| --------------- | --------- |
| `[ ]` or        | TODO      |
| `[x]` or `[X]`  | DONE      |
| `[~]`           | DOING     |
| `[-]`           | CANCELLED |
| `[!]`           | IMPORTANT |
| `[>]`           | OPTIONAL |

---

## ⚙️ Advanced Usage

### Custom Class Name & Rendering

```js
const md = new MarkdownIt().use(
  Task({
    className: "my-task",
    render_open: '<custom class="my-task-open">',
    render_close: "</custom>",
  })
);

md.render("[ ] Custom render");
// <custom class="my-task-open">Custom render</custom>
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br/>
Feel free to check [issues page](https://github.com/mjrt/markdown-it-tasks/issues) or submit a pull request.

---

## 📄 License

MIT © [mjrt](https://github.com/mjrt)
