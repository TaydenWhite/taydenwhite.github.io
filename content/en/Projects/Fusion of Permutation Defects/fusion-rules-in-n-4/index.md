---
title: Fusion Rules in n = 4 (PDF)
weight: 20
---
{{ $pdf := .Resources.GetMatch "Fusion Rules in n = 4.pdf" }}
{{ if $pdf }}
<iframe src="{{ $pdf.RelPermalink }}#view=FitH" width="100%" height="900" style="border: 1px solid #ddd;"></iframe>

<p><a href="{{ $pdf.RelPermalink }}" target="_blank">Open PDF in new tab</a></p>
{{ else }}
<p>PDF coming soon.</p>
{{ end }}

