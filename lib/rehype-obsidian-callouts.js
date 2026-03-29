import { visit } from "unist-util-visit"

const CALLOUT_PATTERN = /^\[!([a-zA-Z-]+)\]([+-])?\s*(.*)$/

const capitalize = (value) =>
  value.length ? `${value[0].toUpperCase()}${value.slice(1)}` : value

const findFirstTextNode = (node) => {
  if (!node || !Array.isArray(node.children)) return null
  for (const child of node.children) {
    if (child.type === "text") return child
    const nested = findFirstTextNode(child)
    if (nested) return nested
  }
  return null
}

const normalizeClassName = (className) => {
  if (!className) return []
  if (Array.isArray(className)) return className
  if (typeof className === "string") return [className]
  return []
}

export default function rehypeObsidianCallouts() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName !== "blockquote" || !Array.isArray(node.children)) return
      if (node.children.length === 0) return

      const firstChild = node.children[0]
      if (!firstChild || firstChild.type !== "element" || firstChild.tagName !== "p") {
        return
      }

      const firstTextNode = findFirstTextNode(firstChild)
      if (!firstTextNode || typeof firstTextNode.value !== "string") return

      const calloutMatch = firstTextNode.value.trim().match(CALLOUT_PATTERN)
      if (!calloutMatch) return

      const calloutType = (calloutMatch[1] || "note").toLowerCase()
      const inlineTitle = (calloutMatch[3] || "").trim()
      const title = inlineTitle || capitalize(calloutType)

      firstTextNode.value = firstTextNode.value.replace(CALLOUT_PATTERN, inlineTitle)

      const existingClassNames = normalizeClassName(node.properties?.className)
      node.properties = {
        ...(node.properties || {}),
        className: [
          ...new Set([
            ...existingClassNames,
            "obsidian-callout",
            `obsidian-callout-${calloutType}`,
          ]),
        ],
        "data-callout": calloutType,
      }

      node.children.unshift({
        type: "element",
        tagName: "p",
        properties: { className: ["callout-title"] },
        children: [{ type: "text", value: title }],
      })

      const isFirstParagraphNowEmpty =
        Array.isArray(firstChild.children) &&
        firstChild.children.every(
          (child) => child.type === "text" && String(child.value || "").trim() === ""
        )

      if (isFirstParagraphNowEmpty) {
        node.children = node.children.filter((child) => child !== firstChild)
      }
    })
  }
}
