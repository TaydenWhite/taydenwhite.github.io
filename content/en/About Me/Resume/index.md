---
title: Resume
description: My current resume
weight: 1
cascade:
  - type: "docs"
---
{{ $pdf := .Resources.GetMatch "Tayden White Resume 10_28_25.pdf" }}
{{ if $pdf }}
<iframe src="{{ $pdf.RelPermalink }}#view=FitH" width="100%" height="880" style="border: 1px solid #ddd;"></iframe>

<p><a href="{{ $pdf.RelPermalink }}" target="_blank">Download the full resume (PDF)</a></p>
{{ else }}
<p>Updated resume coming soon.</p>
{{ end }}