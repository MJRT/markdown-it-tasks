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

  it("renders TODO task with non-breaking space ([\u00A0])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[\u00A0] todo with non-breaking space");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>TODO</span>todo with non-breaking space</span></p>\n'
    );
  });

  it("renders DOING task ([~])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[~] working on this");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>DOING</span>working on this</span></p>\n'
    );
  });

  it("renders CANCELLED task ([-])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[-] cancelled item");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled checked><span>CANCELLED</span>cancelled item</span></p>\n'
    );
  });

  it("renders IMPORTANT task ([!])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[!] important task");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>IMPORTANT</span>important task</span></p>\n'
    );
  });

  it("renders OPTIONAL task ([.])", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[.] optional item");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>OPTIONAL</span>optional item</span></p>\n'
    );
  });

  it("renders DOING task in list context", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("- [~] doing this task");
    expect(html).toBe(
      '<ul>\n<li><span class="md-tasks"><input type="checkbox" disabled><span>DOING</span>doing this task</span></li>\n</ul>\n'
    );
  });

  it("renders IMPORTANT task with custom content", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[!] Urgent: Fix the bug");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>IMPORTANT</span>Urgent: Fix the bug</span></p>\n'
    );
  });

  it("renders OPTIONAL task in paragraph", () => {
    const md = new MarkdownIt().use(Tasks());
    const html = md.render("[.] Read the documentation later");
    expect(html).toBe(
      '<p><span class="md-tasks"><input type="checkbox" disabled><span>OPTIONAL</span>Read the documentation later</span></p>\n'
    );
  });
});
