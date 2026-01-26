#!/usr/bin/env python3
import sys, re
from pathlib import Path

ROUTE_HINTS = [
    re.compile(r"export\s+default\s+function\s+(\w+)"),
    re.compile(r"export\s+default\s+(\w+)"),
]

def main(root: str):
    rootp = Path(root).resolve()
    out_dir = rootp / "blueprint"
    out_dir.mkdir(exist_ok=True)

    route_files = []
    component_files = []

    for p in rootp.rglob("*"):
        if p.is_dir():
            continue
        if p.suffix.lower() not in {".ts",".tsx",".js",".jsx"}:
            continue
        rel = p.relative_to(rootp)
        low = str(rel).lower()

        if any(seg in low for seg in ["/pages/","/app/"]) and ("route" in low or p.name in {"page.tsx","page.jsx","index.tsx","index.jsx"} or "/pages/" in low):
            route_files.append(rel)
        if any(seg in low for seg in ["/components/","/ui/"]):
            component_files.append(rel)

    md = []
    md.append("# Routes & Components (Heuristic)")
    md.append("")
    md.append("## Suspected routes/pages")
    md.append("")
    if route_files:
        for r in sorted(route_files):
            md.append(f"- `{r}`")
    else:
        md.append("_None detected_")

    md.append("")
    md.append("## Suspected components")
    md.append("")
    if component_files:
        for c in sorted(component_files)[:400]:
            md.append(f"- `{c}`")
        if len(component_files) > 400:
            md.append(f"- … (+{len(component_files)-400} more)")
    else:
        md.append("_None detected_")

    out_path = out_dir / "ROUTES_COMPONENTS.md"
    out_path.write_text("\n".join(md), encoding="utf-8")
    print(f"Wrote {out_path}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
