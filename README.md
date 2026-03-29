# Next.js + Contentlayer

A template with Next.js 13 app dir, Contentlayer, Tailwind CSS and dark mode.

https://next-contentlayer.vercel.app

## Import Obsidian Blog Post

Convert an Obsidian `.md` note into a post at `content/posts/<slug>.mdx`:

```bash
npm run import:obsidian -- "/path/to/your-note.md"
```

Optional flags:

- `--slug my-post-slug`
- `--title "My Post Title"`
- `--description "Short summary"`
- `--date 2026-03-29`
- `--force` to overwrite existing output
- `--dry-run` to preview file operations

Notes:

- Obsidian embeds like `![[image.png]]` are converted and copied to `public/blog/<slug>/`.
- Copied image names are rewritten as `<post-slug>-1.<ext>`, `<post-slug>-2.<ext>`, etc.
- Obsidian wiki links like `[[Some Note|Alias]]` are converted to plain text (`Alias`).
