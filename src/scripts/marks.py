"""The site's two seals, both 白文 in the link-accent rose, set in Potta One.

見 — "to see". The name seal: one character, legible down to a tab strip.

仰觀俯察 — "looking up, observe; looking down, examine", the classical formula
for observing the natural world (繫辭 commentary of the 易經, reused in the
蘭亭集序). Read in seal order: right column top to bottom, then left.

    ┌─────────┬─────────┐
    │ 3  俯   │ 1  仰   │
    ├─────────┼─────────┤
    │ 4  察   │ 2  觀   │
    └─────────┴─────────┘

Potta One is a Japanese display face, which is what makes the traditional 見 and
觀 available at all — the Chinese brush faces on Google Fonts are simplified-only
and carry neither. It is fetched on first use rather than committed; see
seal_lib.font.

Both marks are optically tuned per size rather than scaled from one master. For
the four-character seal that tuning is mostly erosion: the face is heavy, and
below ~32px its strokes close the gaps between characters, so thinning them buys
back the rose that keeps the thing reading as a stamp.
"""
from PIL import Image

import seal_lib as sl

PHRASE = [('仰', 'T', 'R'), ('觀', 'B', 'R'), ('俯', 'T', 'L'), ('察', 'B', 'L')]


# ---------------------------------------------------------------------- 見

def jian(px, ss=None, box=(0.18, 0.16, 0.82, 0.84), radius=0.16,
         dilate=0.0, rough=0.022, chips=8):
    ss = ss or (8 if px <= 192 else 4)
    S = px * ss
    mask = sl.thicken(sl.font_glyph('見', S, box, sl.font()), S, dilate)
    return sl.press(S, mask, radius, rough, chips).resize((px, px), Image.LANCZOS)


JIAN = {
    16:  dict(box=(0.120, 0.100, 0.880, 0.900), radius=0.15, rough=0.008, chips=3),
    24:  dict(box=(0.140, 0.120, 0.860, 0.880), radius=0.15, rough=0.012, chips=4),
    32:  dict(box=(0.160, 0.140, 0.840, 0.860), radius=0.16, rough=0.016, chips=5),
    48:  dict(box=(0.170, 0.150, 0.830, 0.870), radius=0.16, rough=0.018, chips=6),
    64:  dict(box=(0.175, 0.155, 0.825, 0.865), radius=0.16, rough=0.020, chips=7),
}


def jian_at(px):
    return jian(px, **JIAN.get(px, {}))


# ---------------------------------------------------------------------- 觀

def guan(px, ss=None, box=(0.09, 0.075, 0.91, 0.925), radius=0.16,
         dilate=0.0, rough=0.022, chips=8):
    ss = ss or (8 if px <= 192 else 4)
    S = px * ss
    mask = sl.thicken(sl.font_glyph('觀', S, box, sl.font()), S, dilate)
    return sl.press(S, mask, radius, rough, chips, seed=17).resize((px, px), Image.LANCZOS)


# 觀 is 25 strokes in a heavy face, so the small cuts erode the strokes — the
# counters close long before the strokes do. The glyph keeps the same size in
# the block at every cut, so the mark does not appear to grow in a tab strip.
# Erosion has to clear a whole supersampled pixel to do anything (the filter
# kernel is an odd integer >= 3), so values below roughly 0.02 are silently
# no-ops at these sizes.
GUAN = {
    16:  dict(dilate=-0.024, radius=0.15, rough=0.006, chips=3),
    24:  dict(dilate=-0.024, radius=0.15, rough=0.010, chips=4),
    32:  dict(dilate=-0.018, radius=0.16, rough=0.014, chips=5),
    48:  dict(dilate=-0.012, radius=0.16, rough=0.018, chips=6),
    64:  dict(dilate=-0.008, radius=0.16, rough=0.020, chips=7),
}


def guan_at(px):
    return guan(px, **GUAN.get(px, {}))


# ----------------------------------------------------------------- 仰觀俯察

def yangguan(px, ss=None, margin=0.105, gutter=0.035, dilate=0.0,
             radius=0.10, rough=0.016, chips=9):
    ss = ss or (8 if px <= 192 else 4)
    S = px * ss
    cell = (1 - 2 * margin - gutter) / 2
    col = {'L': margin, 'R': margin + cell + gutter}
    row = {'T': margin, 'B': margin + cell + gutter}

    glyphs = None
    for ch, r, c in PHRASE:
        box = (col[c], row[r], col[c] + cell, row[r] + cell)
        glyphs = sl.font_glyph(ch, S, box, sl.font(), widen=1.1, into=glyphs)
    glyphs = sl.thicken(glyphs, S, dilate)
    return sl.press(S, glyphs, radius, rough, chips, seed=23).resize((px, px), Image.LANCZOS)


YANGGUAN = {
    16:  dict(dilate=-0.024, radius=0.15, rough=0.006, chips=3),
    24:  dict(dilate=-0.024, radius=0.15, rough=0.010, chips=4),
    32:  dict(dilate=-0.018, radius=0.16, rough=0.014, chips=5),
    48:  dict(dilate=-0.012, radius=0.16, rough=0.018, chips=6),
    64:  dict(dilate=-0.008, radius=0.16, rough=0.020, chips=7),
}


def yangguan_at(px):
    return yangguan(px, **YANGGUAN.get(px, {}))
