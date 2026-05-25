/** 
  * --- components/ui/View.jsx --- */ 
const VALID_TAGS = new Set([
  "div", "section", "main", "article", "aside",
  "header", "footer", "nav", "span", "ul", "ol", "li", "p",
]);

/**
 * --- NK-View ---
 * @param {string} [tag="div"] - Tag HTML do container
 * @param {string} [className] - Classes CSS adicionais
 * @param {React.ReactNode} children
 */
export default function View({ children, tag = "div", ...props }) {
  const Tag = tag;
  // const Tag = VALID_TAGS.has(tag) ? tag : "div";
  return <Tag {...props}>{children}</Tag>;
}
