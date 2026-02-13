# Export Architecture Diagram (SVG/PNG)

Use this on any machine with Node.js:

```bash
cd mistral-riskpilot-m
npx -y @mermaid-js/mermaid-cli -i docs/architecture.mmd -o docs/architecture.svg
npx -y @mermaid-js/mermaid-cli -i docs/architecture.mmd -o docs/architecture.png -w 1800 -H 1100
```

Then embed `docs/architecture.svg` in README/submission form.
