import { Fragment, type ReactNode } from "react";
import {
  legalHeadings,
  legalInline,
  parseLegal,
  type LegalFacts,
  type LegalInline,
} from "./legal-markdown";

function inlineElements(nodes: LegalInline[]): ReactNode {
  return nodes.map((node, index) => {
    if (node.type === "bold") return <strong key={index}>{inlineElements(node.children)}</strong>;
    if (node.type === "link")
      return (
        <a
          key={index}
          href={node.href}
          {...(/^https?:\/\//.test(node.href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className="break-words text-primary underline underline-offset-4"
        >
          {inlineElements(node.children)}
        </a>
      );
    if (node.type === "code")
      return (
        <code key={index} className="rounded bg-muted px-1 text-sm">
          {node.text}
        </code>
      );
    if (node.type === "unknown")
      return (
        <span key={index} data-testid="legal-unknown-token">
          {node.text}
        </span>
      );
    return <Fragment key={index}>{node.text}</Fragment>;
  });
}
export function LegalText({
  text,
  facts,
  toc = false,
}: {
  text: string;
  facts: LegalFacts;
  toc?: boolean;
}) {
  const inline = (value: string) => inlineElements(legalInline(value, facts));
  return (
    <div
      data-testid="legal-text"
      className="min-w-0 space-y-4 break-words text-start text-base leading-relaxed text-foreground"
    >
      {toc ? (
        <nav data-testid="legal-toc">
          <ol className="list-decimal space-y-1 ps-6">
            {legalHeadings(text).map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`} className="text-primary underline underline-offset-4">
                  {inline(h.text)}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {parseLegal(text).map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 1 ? "h1" : block.level === 2 ? "h2" : "h3";
          return (
            <Tag key={index} id={block.id} className="scroll-mt-40 font-semibold">
              {inline(block.text)}
            </Tag>
          );
        }
        if (block.type === "paragraph") return <p key={index}>{inline(block.text)}</p>;
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag
              key={index}
              className={`${block.ordered ? "list-decimal" : "list-disc"} space-y-1 ps-6`}
            >
              {block.items.map((value, i) => (
                <li key={i}>{inline(value)}</li>
              ))}
            </Tag>
          );
        }
        return (
          <div key={index} className="max-w-full overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead>
                <tr>
                  {block.headers.map((cell, i) => (
                    <th key={i} className="border-b border-border p-2 text-start font-semibold">
                      {inline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="border-b border-border p-2 align-top">
                        {inline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
