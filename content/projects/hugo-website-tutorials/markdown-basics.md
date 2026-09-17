---
title: Markdown Basics
description: Almost all of the content on a Hugo site is written in Markdown. These are the essentials.
weight: 3
aliases:
  - /projects/website/markdown-tutorial/
---

Markdown is a lightweight syntax for formatting plain text. Hugo converts it to HTML when it builds your site, and you can mix raw HTML into a Markdown file whenever you need more control. For a complete reference, see the [Markdown Guide](https://www.markdownguide.org/basic-syntax/).

## Headings

Start a line with `#` symbols. The number of symbols sets the heading level, from 1 (largest) to 6 (smallest).

```markdown
# Level 1 heading
## Level 2 heading
### Level 3 heading
#### Level 4 heading
##### Level 5 heading
###### Level 6 heading
```

Use a single level 1 heading per page for the page title, and levels 2 and below for sections. This page's section titles, like **Headings** above, are level 2 headings.

## Emphasis

Wrap text in double asterisks or underscores for **bold**, and single ones for *italic*.

```markdown
**bold text**
__also bold__

*italic text*
_also italic_
```

Output: **bold text**, __also bold__, *italic text*, _also italic_

## Links

Put the link text in square brackets, followed by the URL in parentheses.

```markdown
[Google](https://www.google.com)
```

Output: [Google](https://www.google.com)

## Lists

Create unordered lists with `-` or `*`, and numbered lists with numbers. Indent items to nest them.

```markdown
- List item
  - Nested list item

* Another list item
  * Nested list item

1. First item
2. Second item
```

Output:

- List item
  - Nested list item

1. First item
2. Second item

## Horizontal rule

Three hyphens, asterisks, or underscores on their own line create a horizontal rule.

```markdown
---
```

Output:

---

## Blockquotes

Start a line with `>` to create a blockquote.

```markdown
> "Be yourself; everyone else is already taken." - Oscar Wilde
```

Output:

> "Be yourself; everyone else is already taken." - Oscar Wilde
