#!/usr/bin/env python3
import os, sys, re
from pathlib import Path

TEXT_EXT = {".md",".txt",".json",".yml",".yaml",".ts",".tsx",".js",".jsx",".css",".scss",".html",".py",".go",".rs",".java",".kt",".php",".sql",".prisma"}

def is_text_file(p: Path) -> bool:
    return p.suffix.lower() in TEXT_EXT and p.stat().st_size < 2_000_000

def main(root: str):
    rootp = Path(root).resolve()
    out_dir = rootp / "blueprint"
    out_dir.mkdir(exist_ok=True)

    summary_path = out_dir / "INVENTORY_SUMMARY.md"
    lines = ["# Inventory Summary", "", f"Root: `{rootp}`", ""]

    buckets = {
        "product_docs": [],
        "frontend": [],
        "backend": [],
        "infra": [],
        "assets": [],
        "unknown": [],
    }

    for p in rootp.rglob("*"):
        if p.is_dir(): 
            continue
        rel = p.relative_to(rootp)
        low = str(rel).lower()

        if any(k in low for k in ["figma","wireframe","prd","spec","docs","requirements"]) or p.name.lower().startswith("readme"):
            buckets["product_docs"].append(rel)
        elif any(k in low for k in ["pages","app","components","frontend","web","ui","styles","css","tailwind","next","vite"]):
            buckets["frontend"].append(rel)
        elif any(k in low for k in ["api","server","backend","routes","controllers","services","models","db","prisma","migrations"]):
            buckets["backend"].append(rel)
        elif any(k in low for k in [".github","docker","k8s","terraform","infra","ci","cd","deploy"]):
            buckets["infra"].append(rel)
        elif any(k in low for k in ["assets","public","images","img","static","content"]):
            buckets["assets"].append(rel)
        else:
            buckets["unknown"].append(rel)

    def write_bucket(title, items, max_items=200):
        lines.append(f"## {title}")
        lines.append("")
        if not items:
            lines.append("_None_")
            lines.append("")
            return
        for rel in sorted(items)[:max_items]:
            lines.append(f"- `{rel}`")
        if len(items) > max_items:
            lines.append(f"- … (+{len(items)-max_items} more)")
        lines.append("")

    write_bucket("Product / Docs", buckets["product_docs"])
    write_bucket("Frontend", buckets["frontend"])
    write_bucket("Backend / API / DB", buckets["backend"])
    write_bucket("Infra / DevOps", buckets["infra"])
    write_bucket("Assets / Content", buckets["assets"])
    write_bucket("Unclassified", buckets["unknown"], max_items=300)

    summary_path.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {summary_path}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else ".")
