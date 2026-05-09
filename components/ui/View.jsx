/**
 * --- NK-View ---
 * @param {string} tag - A tag container (div, section, main, etc)
 */
export default function View({ children, tag = "div", ...props }) {
  const Tag = tag;
  return <Tag {...props}>{children}</Tag>;
}