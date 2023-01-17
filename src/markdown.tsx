import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const hlStyle = {
  'code[class*="language-"]': {
    color: "#5c6e74",
    fontFamily:
      "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    MozTabSize: "2",
    OTabSize: "2",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#5c6e74",
    fontFamily:
      "Inconsolata, Monaco, Consolas, 'Courier New', Courier, monospace",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    MozTabSize: "2",
    OTabSize: "2",
    tabSize: "2",
    WebkitHyphens: "none",
    MozHyphens: "none",
    msHyphens: "none",
    hyphens: "none",
    padding: "1em",
    overflow: "auto",
    background: "#f3f3f3",
  },
  ':not(pre) > code[class*="language-"]': {
    background: "#f9f2f4",
    color: "#db4c69",
  },
  comment: {
    color: "#93a1a1",
  },
  prolog: {
    color: "#93a1a1",
  },
  doctype: {
    color: "#93a1a1",
  },
  cdata: {
    color: "#93a1a1",
  },
  punctuation: {
    color: "#999999",
  },
  ".namespace": {
    Opacity: ".7",
  },
  property: {
    color: "#990055",
  },
  keyword: {
    color: "#990055",
  },
  tag: {
    color: "#990055",
  },
  "class-name": {
    color: "#990055",
    textDecoration: "underline",
  },
  boolean: {
    color: "#990055",
  },
  constant: {
    color: "#990055",
  },
  symbol: {
    color: "#990055",
  },
  deleted: {
    color: "#990055",
  },
  number: {
    color: "#990055",
  },
  selector: {
    color: "#669900",
  },
  "attr-name": {
    color: "#669900",
  },
  string: {
    color: "#669900",
  },
  char: {
    color: "#669900",
  },
  builtin: {
    color: "#669900",
  },
  inserted: {
    color: "#669900",
  },
  variable: {
    color: "#ee9900",
  },
  operator: {
    color: "#a67f59",
  },
  entity: {
    color: "#a67f59",
    cursor: "help",
  },
  url: {
    color: "#a67f59",
  },
  ".language-css .token.string": {
    color: "#a67f59",
  },
  ".style .token.string": {
    color: "#a67f59",
  },
  atrule: {
    color: "#0077aa",
  },
  "attr-value": {
    color: "#0077aa",
  },
  function: {
    color: "#dd4a68",
  },
  regex: {
    color: "#ee9900",
  },
  important: {
    color: "#ee9900",
    fontWeight: "bold",
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
};

const CodeBlock = ({ className, children, inline, ...props }: any) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      language={match[1]}
      PreTag="div"
      {...props}
      style={hlStyle}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export function Markdown({ children }: any) {
  return (
    <ReactMarkdown
      components={{
        code: (props) => <CodeBlock {...props} />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
