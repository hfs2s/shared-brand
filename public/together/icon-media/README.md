# Shared pixel icons

24 icons on a 16 × 16 grid. Each field uses joined paths with filled colour. The paper sprite contains one image shared across every crop.

- `shared-icons.svg` is a symbol sprite with the paper image embedded once. Inline the SVG once per document, then reference a symbol such as `<svg viewBox="0 0 16 16"><use href="#icon-reply"/></svg>`. The sprite also works as a same-origin external symbol source in HTML.
- `paper-grain.jpg` is the shared source tile. To supply a separate file, change the sprite image’s `href` to the tile URL. Inline the sprite when using an external tile.
- `paper/` contains stand-alone textured icons with embedded grain so each icon opens on its own.
- `flat/` contains vector-only masters for small sizes, interface labels and print spot colour.
- `logos/` contains the smooth-edged 09 wordmark and compact mark.
- `tokens.css` contains the site’s foundation values.

Use square display dimensions. Pair functional icons with text or an accessible name.
