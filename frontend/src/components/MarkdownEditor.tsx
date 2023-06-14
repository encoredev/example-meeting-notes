import { FC } from "react";
import { Milkdown, useEditor } from "@milkdown/react";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { commonmark } from "@milkdown/preset-commonmark";
import { history } from "@milkdown/plugin-history";

const defaultContent = `
# Markdown Meeting Note

*Date:* ${new Date().toLocaleDateString()}
*Note taker:* Simon Johansson
*Attendees:* Marcus, Johan, Erik

---

Write your notes in **markdown** to make pretty meeting notes.
After saving the document you will get a link that you can share.

`;

const MarkdownEditor: FC<{
  content: string | null;
  setContent: (text: string) => void;
}> = ({ content, setContent }) => {
  useEditor((root) =>
    Editor.make()
      // .config(nord)
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, content || defaultContent);
        ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
          setContent(markdown);
        });
      })
      .use(listener)
      .use(commonmark)
      .use(history)
  );

  return <Milkdown />;
};

export default MarkdownEditor;
