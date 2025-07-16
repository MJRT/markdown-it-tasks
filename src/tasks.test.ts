import MarkdownIt from "markdown-it";
import { Tasklist } from "./tasks";

describe("Tasklist plugin integration", () => {
  it("renders unchecked task ([ ])", () => {
    const md = new MarkdownIt().use(Tasklist());
    const html = md.render("[ ] todo item");
    expect(html).toContain('<input type="checkbox" disabled>');
    expect(html).toContain("TODO");
    expect(html).toContain("todo item");
    expect(html).not.toContain("checked");
  });

  it("renders checked task ([x])", () => {
    const md = new MarkdownIt().use(Tasklist());
    const html = md.render("[x] done item");
    expect(html).toContain('<input type="checkbox" disabled checked>');
    expect(html).toContain("DONE");
    expect(html).toContain("done item");
  });

  it("renders checked task ([X]) after list item", () => {
    const md = new MarkdownIt().use(Tasklist());
    const html = md.render("- [X] finished");
    expect(html).toContain('<input type="checkbox" disabled checked>');
    expect(html).toContain("DONE");
    expect(html).toContain("finished");
  });

  it("does not match non-task lines", () => {
    const md = new MarkdownIt().use(Tasklist());
    const html = md.render("[y] not a task");
    expect(html).not.toContain('type="checkbox"');
    expect(html).toContain("[y] not a task");
  });

  it("renders normal list item without checkbox", () => {
    const md = new MarkdownIt().use(Tasklist());
    const html = md.render("- normal item");
    expect(html).not.toContain('type="checkbox"');
    expect(html).toContain("normal item");
  });

  it("supports custom class and render", () => {
    const md = new MarkdownIt().use(
      Tasklist({
        className: "my-task",
        render_open: '<custom class="my-task-open">',
        render_close: "</custom>",
      })
    );
    const html = md.render("[ ] custom render");
    expect(html).toContain('<custom class="my-task-open">');
    expect(html).toContain("</custom>");
    expect(html).toContain("custom render");
  });

  it("handles multiple task items and mixed content", () => {
    const md = new MarkdownIt().use(Tasklist());
    const html = md.render(
      `[ ] todo\n- [x] done\n [X] finished\n [y] not a task\n- normal`
    );
    console.log(html);
    expect(html.match(/type="checkbox" disabled>/g)?.length).toBe(1); // only one unchecked
    expect(html.match(/type="checkbox" disabled checked>/g)?.length).toBe(
      undefined
    ); // 0 checked
    expect(html).toContain("TODO");
    expect(html).not.toContain("DONE");
    expect(html).toContain("not a task");
    expect(html).toContain("normal");
  });
});
