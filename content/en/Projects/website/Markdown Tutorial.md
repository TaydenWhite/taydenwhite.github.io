---
title: Simple Markdown
linkTitle: Simple Markdown
description: >
  The majority of your content on your Hugo website will be written in markdown. Within these, you can choose to either code in html or markdown.
date: 2017-01-05
weight: 1
cascade:
  - type: "docs"
---
 
[Markdown Guide!](https://www.markdownguide.org/basic-syntax/)

## Headers
Headers are created using '#' symbols. The number of '#' symbols determines the level of the header.

```
# This is a level 1 header
## This is a level 2 header
### This is a level 3 header
#### This is a level 4 header
##### This is a level 5 header
###### This is a level 6 header
```
Output:

# This is a level 1 header
## This is a level 2 header
### This is a level 3 header
#### This is a level 4 header
##### This is a level 5 header
###### This is a level 6 header


## Emphasis

You can make text **bold** or *italic* using double asterisks or underscores.

```
**BOLD WORD #1**
__BOLD WORD #2__

*italic word #1*
_italic word #2_
```
Output:

**BOLD WORD #1** 

__BOLD WORD #2__ 

*italic word #1* 

_italic word #2_ 


## Links

You can create links by enclosing the link text in square brackets, followed by the URL in parentheses. For example, [Google](https://www.google.com) is a link to Google.


```
[Google](https://www.google.com)
```
Output:
[Google](https://www.google.com)


## Lists

Unordered lists can be created using an asterisk or a hyphen:
```
- List one
  - Nested list one

* List two
  * Nexted list two

1. Numbered list
2. Numbered list 
```

- List one
  - Nested list one

* List two
  * Nexted list two

1. Numbered list
2. Numbered list 

## Horizontal Rule

You can create a horizontal rule using three hyphens, three asterisks, or three underscores:

```---```

Output:

---

## Blockquotes

Blockquotes are created using the greater-than symbol (>). Here's an example:
```
> "Be yourself; everyone else is already taken." - Oscar Wilde
```
Output:
> "Be yourself; everyone else is already taken." - Oscar Wilde

