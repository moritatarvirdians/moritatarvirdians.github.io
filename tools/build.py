#!/usr/bin/env python3
"""
Tiny maintenance script for the site. No dependencies, no build system.

Usage:
    python3 tools/build.py sync            # push _partials/header.html and footer.html into every page
    python3 tools/build.py sitemap         # regenerate sitemap.xml from the HTML files present
    python3 tools/build.py domain NEW.COM  # rewrite every absolute URL to a new domain
    python3 tools/build.py check           # look for leftover placeholders and broken local links
    python3 tools/build.py all             # sync + sitemap + check

Why a script instead of a static site generator: the pages ship as plain HTML, which is what
AI crawlers and search engines read most reliably, and there is nothing to break when a
framework version changes. This script only edits marked regions.
"""

import datetime
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_DOMAIN = "moritatarvirdians.com"

SKIP_DIRS = {"_partials", "tools", ".git", "assets"}


def html_files():
    for p in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts):
            continue
        yield p


def replace_region(text, name, replacement):
    """Replace the region between <!-- #name --> and <!-- /#name -->."""
    pattern = re.compile(
        r"(<!--\s*#%s\s*-->)(.*?)(<!--\s*/#%s\s*-->)" % (name, name), re.S
    )
    if not pattern.search(text):
        return text, False
    new = pattern.sub(lambda m: m.group(1) + "\n" + replacement.strip() + "\n" + m.group(3), text)
    return new, new != text


def cmd_sync():
    header = (ROOT / "_partials" / "header.html").read_text(encoding="utf-8")
    footer = (ROOT / "_partials" / "footer.html").read_text(encoding="utf-8")
    changed = 0
    for f in html_files():
        text = original = f.read_text(encoding="utf-8")
        text, _ = replace_region(text, "header", header)
        text, _ = replace_region(text, "footer", footer)
        if text != original:
            f.write_text(text, encoding="utf-8")
            changed += 1
            print(f"  updated {f.relative_to(ROOT)}")
    print(f"sync: {changed} file(s) updated")


def current_domain():
    idx = (ROOT / "index.html").read_text(encoding="utf-8")
    m = re.search(r'<link rel="canonical" href="https://([^/"]+)', idx)
    return m.group(1) if m else DEFAULT_DOMAIN


def cmd_sitemap():
    domain = current_domain()
    today = datetime.date.today().isoformat()
    urls = []
    for f in html_files():
        rel = f.relative_to(ROOT).as_posix()
        if rel == "404.html":
            continue
        loc = "" if rel == "index.html" else rel.replace("writing/index.html", "writing/")
        priority = "1.0" if rel == "index.html" else "0.8"
        urls.append((f"https://{domain}/{loc}", priority))

    body = "\n".join(
        f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{today}</lastmod>\n"
        f"    <priority>{pri}</priority>\n  </url>"
        for loc, pri in urls
    )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        f"{body}\n</urlset>\n"
    )
    (ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")
    print(f"sitemap: {len(urls)} URL(s) written for {domain}")


def cmd_domain(new):
    old = current_domain()
    if new == old:
        print(f"domain: already {new}")
        return
    count = 0
    for f in list(html_files()) + [ROOT / "robots.txt", ROOT / "llms.txt", ROOT / "sitemap.xml"]:
        if not f.exists():
            continue
        text = f.read_text(encoding="utf-8")
        if old in text:
            f.write_text(text.replace(old, new), encoding="utf-8")
            count += 1
    print(f"domain: {old} -> {new} in {count} file(s). Run `sitemap` next.")


PLACEHOLDERS = [
    "REPLACE_ME",
    "REPLACE_WITH_YOUR_FORM_ENDPOINT",
    "0000-0003-4246-0016",
    'class="ph"',
]


def cmd_check():
    problems = 0

    # Leftover placeholders
    for f in html_files():
        text = f.read_text(encoding="utf-8")
        for ph in PLACEHOLDERS:
            n = text.count(ph)
            if n:
                print(f"  placeholder {ph!r} x{n} in {f.relative_to(ROOT)}")
                problems += n

    # Local links that point nowhere
    for f in html_files():
        text = f.read_text(encoding="utf-8")
        for href in re.findall(r'(?:href|src)="(/[^"#?]*)"', text):
            target = ROOT / href.lstrip("/")
            if href.endswith("/"):
                target = target / "index.html"
            if not target.exists():
                print(f"  broken local link {href} in {f.relative_to(ROOT)}")
                problems += 1

    print(f"check: {problems} item(s) to look at (placeholders are expected until you fill them in)")


def main():
    args = sys.argv[1:]
    cmd = args[0] if args else "all"
    if cmd == "sync":
        cmd_sync()
    elif cmd == "sitemap":
        cmd_sitemap()
    elif cmd == "domain":
        cmd_domain(args[1])
    elif cmd == "check":
        cmd_check()
    elif cmd == "all":
        cmd_sync()
        cmd_sitemap()
        cmd_check()
    else:
        print(__doc__)
        sys.exit(1)


if __name__ == "__main__":
    main()
