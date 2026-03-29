#!/usr/bin/env node

import fs from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".webp",
  ".avif",
  ".svg",
  ".bmp",
])

function printUsage() {
  console.log(`Usage:
  npm run import:obsidian -- "/absolute/or/relative/path/to/note.md" [options]

Options:
  --slug <slug>             Override output file slug
  --title <title>           Override frontmatter title
  --description <text>      Override frontmatter description
  --date <YYYY-MM-DD>       Override frontmatter date
  --force                   Overwrite output file if it already exists
  --dry-run                 Print target paths without writing files
`)
}

function parseArgs(argv) {
  const args = {
    inputPath: "",
    slug: "",
    title: "",
    description: "",
    date: "",
    force: false,
    dryRun: false,
  }

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (!token) continue

    if (token === "--help" || token === "-h") {
      args.help = true
      continue
    }

    if (!token.startsWith("--") && !args.inputPath) {
      args.inputPath = token
      continue
    }

    if (token === "--force") {
      args.force = true
      continue
    }

    if (token === "--dry-run") {
      args.dryRun = true
      continue
    }

    const next = argv[i + 1]
    if (!next) {
      throw new Error(`Missing value for ${token}`)
    }

    if (token === "--slug") args.slug = next
    else if (token === "--title") args.title = next
    else if (token === "--description") args.description = next
    else if (token === "--date") args.date = next
    else throw new Error(`Unknown option: ${token}`)

    i += 1
  }

  return args
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function trimQuotes(value) {
  return value.replace(/^['"]|['"]$/g, "").trim()
}

function extractFrontmatter(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/)
  if (!match) {
    return { data: {}, body: raw }
  }

  const data = {}
  const frontmatterBody = match[1] || ""
  for (const line of frontmatterBody.split(/\r?\n/)) {
    const keyValue = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.+)$/)
    if (!keyValue) continue
    const key = keyValue[1]
    const value = trimQuotes(keyValue[2])
    data[key] = value
  }

  return {
    data,
    body: raw.slice(match[0].length),
  }
}

function extractFirstHeading(body) {
  const headingMatch = body.match(/^\s*#\s+(.+?)\s*$/m)
  return headingMatch ? headingMatch[1].trim() : ""
}

function stripLeadingH1(body, title) {
  const pattern = new RegExp(
    `^\\s*#\\s+${escapeRegExp(title)}\\s*\\n+`,
    "i"
  )
  return body.replace(pattern, "")
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function plainTextExcerpt(markdown, maxLength = 160) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, " ")
  const withoutImages = withoutCode.replace(/!\[[^\]]*]\([^)]+\)/g, " ")
  const withoutLinks = withoutImages.replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
  const withoutMarkup = withoutLinks
    .replace(/^#+\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/[*_~`]/g, "")
  const normalized = withoutMarkup.replace(/\s+/g, " ").trim()
  if (!normalized) return ""
  if (normalized.length <= maxLength) return normalized
  return `${normalized.slice(0, maxLength - 1)}...`
}

function parseDate(value, fallbackDate) {
  if (!value) return fallbackDate
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return fallbackDate
  return parsed.toISOString().slice(0, 10)
}

function escapeYaml(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function convertWikiLinks(content) {
  return content.replace(
    /(^|[^!])\[\[([^\]|]+)(?:\|([^\]]+))?]]/g,
    (match, prefix, target, alias) => {
      const display = (alias || target || "").trim()
      return `${prefix}${display}`
    }
  )
}

function isExternalPath(value) {
  return /^(https?:)?\/\//i.test(value) || value.startsWith("/")
}

function isImagePath(value) {
  const extension = path.extname(value).toLowerCase()
  return IMAGE_EXTENSIONS.has(extension)
}

async function pathExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) {
    printUsage()
    process.exit(0)
  }

  if (!args.inputPath) {
    printUsage()
    throw new Error("Missing input path to an Obsidian note.")
  }

  const repoRoot = process.cwd()
  const absoluteInputPath = path.resolve(repoRoot, args.inputPath)
  const sourceDir = path.dirname(absoluteInputPath)

  const rawInput = await fs.readFile(absoluteInputPath, "utf8")
  const { data, body: bodyWithoutFrontmatter } = extractFrontmatter(rawInput)

  const fallbackTitle = extractFirstHeading(bodyWithoutFrontmatter) || path.basename(absoluteInputPath, ".md")
  const title = args.title || data.title || fallbackTitle
  if (!title) {
    throw new Error("Could not derive a title. Pass --title explicitly.")
  }

  const slug = args.slug || slugify(title)
  if (!slug) {
    throw new Error("Could not derive slug. Pass --slug explicitly.")
  }

  const today = new Date().toISOString().slice(0, 10)
  const date = parseDate(args.date || data.date, today)

  let contentBody = stripLeadingH1(bodyWithoutFrontmatter.trim(), title)
  contentBody = convertWikiLinks(contentBody)

  const publicImageDir = path.join(repoRoot, "public", "blog", slug)
  const outputPostPath = path.join(repoRoot, "content", "posts", `${slug}.mdx`)
  const outputRelativePath = path.relative(repoRoot, outputPostPath)

  if (!args.force && (await pathExists(outputPostPath))) {
    throw new Error(`Output file already exists: ${outputRelativePath}. Use --force to overwrite.`)
  }

  const imageMappingsBySource = new Map()
  const plannedCopies = []
  let nextImageIndex = 1

  const ensureImageMapping = (sourceReference) => {
    if (!isImagePath(sourceReference)) return null

    const normalizedRef = sourceReference.trim()
    const sourceAbsolutePath = path.resolve(sourceDir, normalizedRef)
    const existing = imageMappingsBySource.get(sourceAbsolutePath)
    if (existing) return existing

    const extension = path.extname(normalizedRef).toLowerCase()
    const targetName = `${slug}-${nextImageIndex}${extension}`
    nextImageIndex += 1
    const targetAbsolutePath = path.join(publicImageDir, targetName)
    const publicPath = `/blog/${slug}/${targetName}`

    const mapping = {
      sourceAbsolutePath,
      targetAbsolutePath,
      publicPath,
    }

    imageMappingsBySource.set(sourceAbsolutePath, mapping)
    plannedCopies.push(mapping)
    return mapping
  }

  contentBody = contentBody.replace(
    /!\[\[([^\]|]+)(?:\|([^\]]+))?]]/g,
    (match, sourceReference, altText) => {
      const mapping = ensureImageMapping(sourceReference)
      if (!mapping) return match
      const alt = (altText || path.parse(sourceReference).name).trim()
      return `![${alt}](${mapping.publicPath})`
    }
  )

  contentBody = contentBody.replace(
    /!\[([^\]]*)]\(([^)]+)\)/g,
    (match, altText, sourceReferenceRaw) => {
      const sourceReference = sourceReferenceRaw.trim().replace(/^<|>$/g, "")
      if (isExternalPath(sourceReference) || !isImagePath(sourceReference)) {
        return match
      }

      const mapping = ensureImageMapping(sourceReference)
      if (!mapping) return match
      return `![${altText}](${mapping.publicPath})`
    }
  )

  const description =
    args.description ||
    data.description ||
    plainTextExcerpt(contentBody, 160) ||
    `Imported from Obsidian note "${title}".`

  const finalOutput = `---
title: "${escapeYaml(title)}"
description: "${escapeYaml(description)}"
date: "${date}"
---

${contentBody.trim()}
`

  if (args.dryRun) {
    console.log(`[dry-run] Would write: ${outputRelativePath}`)
    for (const mapping of plannedCopies) {
      const sourceRelative = path.relative(repoRoot, mapping.sourceAbsolutePath)
      const targetRelative = path.relative(repoRoot, mapping.targetAbsolutePath)
      console.log(`[dry-run] Would copy image: ${sourceRelative} -> ${targetRelative}`)
    }
    process.exit(0)
  }

  await fs.mkdir(path.dirname(outputPostPath), { recursive: true })
  await fs.writeFile(outputPostPath, finalOutput, "utf8")

  if (plannedCopies.length > 0) {
    await fs.mkdir(publicImageDir, { recursive: true })
  }

  for (const mapping of plannedCopies) {
    const exists = await pathExists(mapping.sourceAbsolutePath)
    if (!exists) {
      console.warn(
        `Warning: image not found, skipped copy: ${path.relative(repoRoot, mapping.sourceAbsolutePath)}`
      )
      continue
    }
    await fs.copyFile(mapping.sourceAbsolutePath, mapping.targetAbsolutePath)
  }

  console.log(`Created post: ${outputRelativePath}`)
  if (plannedCopies.length > 0) {
    console.log(`Copied ${plannedCopies.length} image(s) to public/blog/${slug}/`)
  }
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
