"""Stamp every local CSS/JS link in the HTML pages with ?v=<stamp>.

Phones keep old stylesheets and scripts in their cache; a new stamp on each
deploy makes them fetch the fresh files. Run before committing:

    python tools/bust-cache.py
"""
import pathlib
import re
import time

root = pathlib.Path(__file__).resolve().parent.parent
stamp = time.strftime("%Y%m%d%H%M")
pattern = re.compile(r'((?:href|src)="assets/(?:css|js)/[\w.-]+\.(?:css|js))(?:\?v=[\w]+)?"')

for page in sorted(root.glob("*.html")):
    text = page.read_text(encoding="utf-8")
    new, n = pattern.subn(lambda m: f'{m.group(1)}?v={stamp}"', text)
    if new != text:
        page.write_text(new, encoding="utf-8", newline="")
    print(f"{page.name}: {n} links")
print("stamp", stamp)
