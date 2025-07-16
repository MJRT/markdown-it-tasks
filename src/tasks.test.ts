import MarkdownIt from "markdown-it";
import { Tasks } from "./tasks";

describe("Task plugin integration", () => {
  it("renders unchecked task ([ ])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[ ] todo item");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>TODO</span>todo item</span></p>\n'
    );
  });

  it("renders checked task ([x])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[x] done item");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled checked><span>DONE</span>done item</span></p>\n'
    );
  });

  it("renders checked task ([X]) after list item", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("- [X] finished");
    expect(html).toBe(
      '<ul>\n<li><span class="md-tasks"><input type="checkbox" disabled checked><span>DONE</span>finished</span></li>\n</ul>\n'
    );
  });

  it("does not match non-task lines", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[y] not a task");
    expect(html).toBe("<p>[y] not a task</p>\n");
  });

  it("renders normal list item without checkbox", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("- normal item");
    expect(html).toBe("<ul>\n<li>normal item</li>\n</ul>\n");
  });

  it("supports custom class and render", () => {
    const md = new MarkdownIt().use(
      Tasks({
        className: "my-task",
        render_open: '<custom class="my-task-open">',
        render_close: "</custom>",
      })
    );
    const html = md.render("[ ] custom render");
    expect(html).toBe(
      '<p><custom class="my-task-open">custom render</custom></p>\n'
    );
  });
});
